-- b2b-shop — ceny promocyjne (Faza 4)
--
-- Promocja = rabat % na WARIANT, widoczny dla wszystkich, z opcjonalną datą końca.
-- To trzeci, niezależny rodzaj rabatu obok:
--   • cennika klienta (price_lists.discount_pct) — per klient,
--   • progu ilościowego (src/lib/pricing.ts) — per produkt i liczba sztuk.
--
-- DECYZJA WŁAŚCICIELA: promocja SUMUJE SIĘ z rabatem klienta, składkowo.
-- Klient z rabatem 25% przy promocji 20% płaci 0,75 × 0,80 = 60% ceny bazowej
-- (czyli −40%), a nie −45%. Indywidualne nadpisanie ceny (customer_prices)
-- nadal wygrywa ze wszystkim.

alter table variants
  add column if not exists promo_pct   numeric(5,2) not null default 0,
  add column if not exists promo_until date;

alter table variants
  drop constraint if exists variants_promo_pct_range;
alter table variants
  add constraint variants_promo_pct_range check (promo_pct >= 0 and promo_pct <= 100);

comment on column variants.promo_pct is
  'Rabat promocyjny % od ceny bazowej, widoczny dla wszystkich. 0 = brak promocji.';
comment on column variants.promo_until is
  'Ostatni dzień promocji (włącznie). NULL = promocja bezterminowa, do ręcznego wyłączenia.';

-- Czy promocja jest dziś aktywna — jedno miejsce, używane przez RPC i widok.
create or replace function public.active_promo_pct(p_pct numeric, p_until date)
returns numeric language sql stable as $$
  select case
    when p_pct is null or p_pct <= 0 then 0
    when p_until is not null and p_until < current_date then 0
    else p_pct
  end;
$$;

-- ─────────────────────────────────────────────────────────────
-- Publiczny katalog: plakietka „−20%" BEZ ceny. Nie zdradza cennika,
-- a pozwala oznaczyć promocje osobom niezalogowanym.
-- ─────────────────────────────────────────────────────────────
create or replace view public.catalog_variants as
  select v.id, v.product_id, v.value, v.in_stock, v.sort,
         public.active_promo_pct(v.promo_pct, v.promo_until) as promo_pct
  from variants v;   -- nadal BEZ base_price

grant select on public.catalog_variants to anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- CENY — jak dotąd tylko dla zatwierdzonych klientów, ale teraz zwracamy też
-- cenę sprzed promocji, żeby sklep mógł pokazać ją przekreśloną.
-- Kolejność: nadpisanie klienta → (cennik klienta × promocja) → cena bazowa.
-- ─────────────────────────────────────────────────────────────
drop function if exists public.variant_prices(uuid[]);

create or replace function public.variant_prices(p_variant_ids uuid[])
returns table (
  variant_id            uuid,
  price_net             integer,
  promo_pct             numeric,
  price_before_promo_net integer
)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_approved() then
    return;                       -- brak cen dla niezatwierdzonych/anon
  end if;
  return query
    select
      v.id,
      coalesce(
        cp.price,
        round(
          v.base_price
          * (1 - coalesce(pl.discount_pct, 0) / 100.0)
          * (1 - public.active_promo_pct(v.promo_pct, v.promo_until) / 100.0)
        )::int
      ),
      -- Przy indywidualnej cenie klienta promocji nie pokazujemy: jego cena
      -- jest ustalona wprost i nie wynika z żadnego procentu.
      case when cp.price is not null
           then 0::numeric
           else public.active_promo_pct(v.promo_pct, v.promo_until) end,
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
