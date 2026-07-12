# Supabase — wdrożenie (Faza 1)

Katalog zawiera schemat, RLS i bootstrap katalogu. Kolejność zastosowania jest istotna.

## Co tu jest

- `migrations/0001_schema.sql` — tabele, indeksy, trigger tworzący profil po rejestracji.
- `migrations/0002_rls.sql` — RLS, publiczne widoki katalogu (bez cen), funkcja cenowa `variant_prices`.
- `seed.sql` — 108 produktów + warianty + kategorie + marki (generowane z `products.ts`
  przez `scripts/gen_seed.py`; ceny = 0, do uzupełnienia w adminie).

## Kroki (jednorazowo)

1. **Utwórz projekt** na https://supabase.com → skopiuj z *Project Settings → API*:
   `Project URL`, `anon key`, `service_role key`.
2. **Uzupełnij `.env.local`** (skopiuj z `.env.local.example`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```
3. **Zastosuj SQL** — w Supabase → *SQL Editor* wklej i uruchom kolejno:
   1. `migrations/0001_schema.sql`
   2. `migrations/0002_rls.sql`
   3. `seed.sql`

   (Albo przez Supabase CLI: `supabase db push` po `supabase link`.)
4. **Zrób siebie adminem** — w SQL Editor po założeniu konta przez `/rejestracja`:
   ```sql
   update profiles set role = 'admin', is_approved = true
   where id = (select id from auth.users where email = 'twoj@email');
   ```
5. **Restart dev servera** (`pnpm dev`), żeby wczytał `.env.local`.

## Weryfikacja

- Anon (wylogowany): `select * from catalog_products;` → działa; `select base_price from variants;` → brak dostępu.
- `select * from variant_prices(array[...]::uuid[]);` jako anon → pusto; jako zatwierdzony klient → ceny.

## Ponowny import katalogu

`python3 scripts/gen_seed.py` regeneruje `seed.sql` z aktualnego `products.ts`.
Jest idempotentny (ON CONFLICT) — można uruchomić ponownie bez duplikatów.
Po przejściu na edycję w panelu admina (Faza 6) seed przestaje być potrzebny.
