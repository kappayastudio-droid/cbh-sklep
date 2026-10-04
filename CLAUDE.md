# b2b-shop

Sklep internetowy B2B — ceny produktów widoczne **wyłącznie po zalogowaniu** (autoryzowani klienci hurtowi).

## Stack

- **Frontend / framework:** Next.js 15 (App Router, TypeScript, React 19), Tailwind CSS v4, shadcn/ui
- **Backend / DB / Auth:** Supabase (Postgres + Auth + Storage + RLS)
- **Płatności:** Przelewy24
- **Faktury:** Fakturownia (API)
- **E-mail transakcyjny:** Resend
- **Hosting:** Netlify (`netlify.toml` + `@netlify/plugin-nextjs`); domena cbh-polska.pl

## Reguły domenowe

- Ceny, stany magazynowe i opcja "do koszyka" są ukryte dla niezalogowanych — publiczny katalog pokazuje tylko nazwy/zdjęcia/opisy.
- Konta B2B wymagają zatwierdzenia (np. flaga `is_approved` w profilu) zanim zobaczą ceny.
- Każdy klient może mieć indywidualną politykę cenową / rabatową — egzekwuj po stronie serwera, nigdy w komponencie klienckim.
- Po zakupie: P24 webhook → potwierdzenie zamówienia → Fakturownia (faktura VAT) → Resend (mail do klienta z fakturą).

## Konwencje techniczne

- App Router (`src/app/`), Server Components domyślnie; `"use client"` tylko gdy konieczne.
- Wszystkie dane wrażliwe (ceny, dane klientów, zamówienia) — Supabase RLS + walidacja na serwerze. Nie ufaj klientowi.
- Sekrety w `.env.local` (nie commituj). Wymagane keys:
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
  - `P24_MERCHANT_ID`, `P24_POS_ID`, `P24_API_KEY`, `P24_CRC`
  - `FAKTUROWNIA_API_TOKEN`, `FAKTUROWNIA_DOMAIN`
  - `RESEND_API_KEY`
- Webhooks (P24, Supabase): zawsze weryfikuj sygnaturę.
- Komponenty UI z shadcn dodawaj przez `pnpm dlx shadcn@latest add <name>`; nie edytuj generowanych prymitywów w połowie — kopiuj i rozszerzaj.

## Deploy — kolejność ma znaczenie

**Push na GitHuba NIE uruchamia migracji bazy.** Netlify buduje tylko kod.
Migracje z `supabase/migrations/` wgrywa się ręcznie: Supabase → SQL Editor →
wklej plik → Run.

Kolejność przy każdej zmianie dotykającej schematu:

1. **Najpierw migracja** na produkcyjnym Supabase.
2. Potem push kodu, który z tych kolumn korzysta.

Odwrotna kolejność już dwa razy wyłożyła sklep po cichu — kod odwoływał się do
kolumn, których nie było, a nic tego nie zgłaszało (patrz niżej).

### Kontrola przed deployem

```sql
-- czy kolumny/tabele z nowej migracji faktycznie są na produkcji
select column_name from information_schema.columns
where table_schema = 'public' and table_name = 'profiles';

select table_name from information_schema.tables
where table_schema = 'public';
```

### Pułapka: PostgREST odrzuca CAŁY update

Jeśli `update()` wymienia choć jedną nieistniejącą kolumnę, Supabase odrzuca
całe zapytanie — także te kolumny, które istnieją. Stąd zasada:

- **Zapis krytyczny idzie osobnym zapytaniem.** `is_approved` nigdy razem
  z polami opcjonalnymi.
- **Zawsze sprawdzaj `error`** z `update()` / `insert()`. Supabase go nie
  rzuca, tylko zwraca — `try/catch` go NIE złapie, a `await` bez sprawdzenia
  przejdzie jak gdyby nigdy nic.
- Pola opcjonalne (notatki, ślad audytowy) nie mogą cofać skutku operacji
  krytycznej.

Realny przypadek: konta B2B z poprawnym NIP-em nie zatwierdzały się przez
dwa tygodnie, bo brakowało kolumn `verification_*`, a klient i tak widział
komunikat o powodzeniu.

## Stan magazynowy — dwie flagi

Dostępność produktu siedzi w dwóch miejscach i liczy się ICH KONIUNKCJA:

- `products.in_stock` — flaga produktu,
- `variants.in_stock` — stan wariantu; produkt bez wariantów ma syntetyczny
  wariant `default` i to **jego** checkbox pokazuje panel.

Nigdy nie filtruj po samym `products.in_stock` — używaj `isProductAvailable`
z `src/lib/availability.ts`. Produkt niedostępny znika z list, ale jego adres
nadal działa i pokazuje „Chwilowo niedostępny" (adresy są zaindeksowane).

## SEO — stary WooCommerce

Sklep zastąpił WordPressa pod tą samą domeną. Przekierowania 301 ze starych
adresów (`/produkt/*`, `/kategoria-produktu/*`, `/marka/*`, `/serie/*`) żyją
w `src/lib/legacy-redirects.ts` i są wpięte w `next.config.ts`. Dodając lub
zmieniając slug produktu, dopisz przekierowanie ze starego adresu.

## Skrypty

```bash
pnpm dev      # dev server (localhost:3000)
pnpm build    # production build
pnpm start    # production server
pnpm lint     # eslint
```
