-- b2b-shop — RLS, widoki publiczne i funkcja cenowa (Faza 1)
--
-- Zasada: ceny i stany magazynowe NIGDY nie wyciekają do niezalogowanych /
-- niezatwierdzonych. Katalog (nazwy/zdjęcia/opisy) jest publiczny przez WIDOKI,
-- które nie zawierają kolumn cenowych. Ceny wydaje wyłącznie funkcja RPC
-- sprawdzająca is_approved.

-- ── Włącz RLS na wszystkich tabelach (domyślnie: brak dostępu) ──
alter table price_lists       enable row level security;
alter table profiles          enable row level security;
alter table categories        enable row level security;
alter table brands            enable row level security;
alter table products          enable row level security;
alter table product_categories enable row level security;
alter table variants          enable row level security;
alter table customer_prices   enable row level security;
alter table addresses         enable row level security;
alter table orders            enable row level security;
alter table order_items       enable row level security;

-- Pomocnicze: czy bieżący użytkownik jest adminem
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

-- Pomocnicze: czy bieżący użytkownik jest zatwierdzonym klientem
create or replace function public.is_approved()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and is_approved);
$$;

-- ─────────────────────────────────────────────────────────────
-- profiles: własny wiersz (odczyt/edycja); admin widzi/edytuje wszystkie
-- ─────────────────────────────────────────────────────────────
create policy profiles_select_own on profiles
  for select using (auth.uid() = id or public.is_admin());
create policy profiles_update_own on profiles
  for update using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());
-- UWAGA: is_approved/role zmienia tylko admin (patrz zabezpieczenie niżej).

-- Nie pozwól klientowi samemu ustawić is_approved/role (tylko admin).
create or replace function public.protect_profile_privileges()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  -- Chronimy TYLKO zalogowanych nie-adminów (klientów przez API). Zaufane konteksty
  -- serwerowe (service_role, SQL editor) mają auth.uid() = null → mogą nadać admina.
  if auth.uid() is not null and not public.is_admin() then
    new.is_approved := old.is_approved;
    new.role := old.role;
    new.price_list_id := old.price_list_id;
  end if;
  return new;
end $$;
drop trigger if exists profiles_protect on profiles;
create trigger profiles_protect
  before update on profiles
  for each row execute function public.protect_profile_privileges();

-- ─────────────────────────────────────────────────────────────
-- Katalog: tabele bazowe dostępne do odczytu TYLKO adminowi
-- (publiczność korzysta z widoków poniżej). Zapis: tylko admin.
-- ─────────────────────────────────────────────────────────────
create policy categories_admin_all on categories
  for all using (public.is_admin()) with check (public.is_admin());
create policy brands_admin_all on brands
  for all using (public.is_admin()) with check (public.is_admin());
create policy products_admin_all on products
  for all using (public.is_admin()) with check (public.is_admin());
create policy product_categories_admin_all on product_categories
  for all using (public.is_admin()) with check (public.is_admin());
create policy variants_admin_all on variants
  for all using (public.is_admin()) with check (public.is_admin());
create policy price_lists_admin_all on price_lists
  for all using (public.is_admin()) with check (public.is_admin());

-- customer_prices: klient czyta swoje; zapis tylko admin
create policy customer_prices_select_own on customer_prices
  for select using (profile_id = auth.uid() or public.is_admin());
create policy customer_prices_admin_write on customer_prices
  for all using (public.is_admin()) with check (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- WIDOKI PUBLICZNE — bez kolumn cenowych. Własność: postgres → omijają RLS
-- tabel bazowych; udostępniamy tylko bezpieczne kolumny.
-- ─────────────────────────────────────────────────────────────
create or replace view public.catalog_products as
  select p.id, p.slug, p.name, p.short_description, p.description,
         p.image, p.images, p.in_stock, p.variant_attribute,
         b.slug as brand_slug, b.name as brand_name,
         c.slug as category_slug, c.name as category_name
  from products p
  left join brands b on b.id = p.brand_id
  left join categories c on c.id = p.primary_category_id
  where p.is_published;

create or replace view public.catalog_variants as
  select v.id, v.product_id, v.value, v.in_stock, v.sort
  from variants v;   -- BEZ base_price

create or replace view public.catalog_product_categories as
  select pc.product_id, c.slug as category_slug, c.name as category_name
  from product_categories pc
  join categories c on c.id = pc.category_id;

create or replace view public.catalog_categories as
  select c.id, c.slug, c.name, c.sort,
         count(distinct pc.product_id) as product_count
  from categories c
  left join product_categories pc on pc.category_id = c.id
  left join products p on p.id = pc.product_id and p.is_published and p.in_stock
  group by c.id;

create or replace view public.catalog_brands as
  select b.id, b.slug, b.name, b.banner_image,
         count(distinct p.id) as product_count
  from brands b
  left join products p on p.brand_id = b.id and p.is_published and p.in_stock
  group by b.id;

grant select on
  public.catalog_products,
  public.catalog_variants,
  public.catalog_product_categories,
  public.catalog_categories,
  public.catalog_brands
to anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- CENY — wyłącznie przez RPC, tylko dla zatwierdzonych klientów.
-- Kolejność: nadpisanie klienta → rabat listy → cena bazowa.
-- Anon / niezatwierdzony → pusty wynik (brak cen).
-- ─────────────────────────────────────────────────────────────
create or replace function public.variant_prices(p_variant_ids uuid[])
returns table (variant_id uuid, price_net integer)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_approved() then
    return;                       -- brak cen dla niezatwierdzonych/anon
  end if;
  return query
    select v.id,
      coalesce(
        cp.price,
        round(v.base_price * (1 - coalesce(pl.discount_pct, 0) / 100.0))::int
      )
    from variants v
    left join profiles pr on pr.id = auth.uid()
    left join price_lists pl on pl.id = pr.price_list_id
    left join customer_prices cp
           on cp.variant_id = v.id and cp.profile_id = auth.uid()
    where v.id = any(p_variant_ids);
end $$;

grant execute on function public.variant_prices(uuid[]) to authenticated;

-- ─────────────────────────────────────────────────────────────
-- addresses / orders / order_items: właściciel + admin
-- ─────────────────────────────────────────────────────────────
create policy addresses_own on addresses
  for all using (profile_id = auth.uid() or public.is_admin())
  with check (profile_id = auth.uid() or public.is_admin());

create policy orders_select_own on orders
  for select using (profile_id = auth.uid() or public.is_admin());
create policy orders_insert_own on orders
  for insert with check (profile_id = auth.uid());
create policy orders_admin_update on orders
  for update using (public.is_admin()) with check (public.is_admin());

create policy order_items_select_own on order_items
  for select using (
    exists (select 1 from orders o
            where o.id = order_id and (o.profile_id = auth.uid() or public.is_admin()))
  );
create policy order_items_insert_own on order_items
  for insert with check (
    exists (select 1 from orders o where o.id = order_id and o.profile_id = auth.uid())
  );
