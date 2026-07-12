-- b2b-shop — schemat bazy (Faza 1)
-- Ceny: NETTO, w groszach (integer). Konwencja: snake_case, PK uuid.

create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────
-- Cenniki (profile rabatowe)
-- ─────────────────────────────────────────────────────────────
create table if not exists price_lists (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  discount_pct numeric(5,2) not null default 0,   -- globalny rabat % dla listy
  created_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- Profile klientów (rozszerza auth.users)
-- ─────────────────────────────────────────────────────────────
create table if not exists profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          text not null default 'customer' check (role in ('customer','admin')),
  is_approved   boolean not null default false,   -- bramka B2B
  company_name  text,
  nip           text,
  phone         text,
  price_list_id uuid references price_lists(id) on delete set null,
  created_at    timestamptz not null default now()
);

-- Auto-utworzenie profilu po rejestracji (dane z metadata przy signUp)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, company_name, nip, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'company_name',
    new.raw_user_meta_data->>'nip',
    new.raw_user_meta_data->>'phone'
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- Katalog
-- ─────────────────────────────────────────────────────────────
create table if not exists categories (
  id   uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sort int not null default 0
);

create table if not exists brands (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  banner_image text
);

create table if not exists products (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  name                text not null,
  short_description   text not null default '',
  description         text not null default '',
  brand_id            uuid references brands(id) on delete set null,
  primary_category_id uuid references categories(id) on delete set null,
  image               text not null default '',
  images              text[] not null default '{}',
  in_stock            boolean not null default true,   -- flaga; NIGDY nie trzymamy ilości
  variant_attribute   text not null default '',
  is_published        boolean not null default true,
  created_at          timestamptz not null default now()
);
create index if not exists products_brand_idx on products(brand_id);
create index if not exists products_primary_cat_idx on products(primary_category_id);

create table if not exists product_categories (
  product_id  uuid not null references products(id) on delete cascade,
  category_id uuid not null references categories(id) on delete cascade,
  primary key (product_id, category_id)
);

create table if not exists variants (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  value      text not null,                 -- np. "250 ml"
  base_price integer not null default 0,    -- NETTO w groszach
  in_stock   boolean not null default true,
  sku        text,
  sort       int not null default 0
);
create index if not exists variants_product_idx on variants(product_id);
create unique index if not exists variants_product_value_uq on variants(product_id, value);

-- Indywidualne nadpisania cen per klient (opcjonalne, granularne)
create table if not exists customer_prices (
  profile_id uuid not null references profiles(id) on delete cascade,
  variant_id uuid not null references variants(id) on delete cascade,
  price      integer not null,              -- NETTO w groszach; nadpisuje bazę + rabat
  primary key (profile_id, variant_id)
);

-- ─────────────────────────────────────────────────────────────
-- Adresy i zamówienia
-- ─────────────────────────────────────────────────────────────
create table if not exists addresses (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references profiles(id) on delete cascade,
  line1       text not null,
  line2       text,
  city        text not null,
  postal_code text not null,
  country     text not null default 'PL',
  is_default  boolean not null default false
);
create index if not exists addresses_profile_idx on addresses(profile_id);

create table if not exists orders (
  id                     uuid primary key default gen_random_uuid(),
  profile_id             uuid not null references profiles(id) on delete restrict,
  status                 text not null default 'pending'
                           check (status in ('pending','paid','shipped','cancelled')),
  total_net              integer not null default 0,      -- grosze, liczone na serwerze
  p24_session_id         text,
  p24_order_id           text,
  fakturownia_invoice_id text,
  shipping_address_id    uuid references addresses(id) on delete set null,
  created_at             timestamptz not null default now()
);
create index if not exists orders_profile_idx on orders(profile_id);
create unique index if not exists orders_p24_session_uq on orders(p24_session_id)
  where p24_session_id is not null;

create table if not exists order_items (
  id             uuid primary key default gen_random_uuid(),
  order_id       uuid not null references orders(id) on delete cascade,
  variant_id     uuid references variants(id) on delete set null,
  name_snapshot  text not null,              -- nazwa w chwili zakupu
  unit_price_net integer not null,           -- cena w chwili zakupu (grosze)
  qty            integer not null check (qty > 0)
);
create index if not exists order_items_order_idx on order_items(order_id);
