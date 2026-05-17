# b2b-shop

Sklep internetowy B2B — ceny produktów widoczne **wyłącznie po zalogowaniu** (autoryzowani klienci hurtowi).

## Stack

- **Frontend / framework:** Next.js 15 (App Router, TypeScript, React 19), Tailwind CSS v4, shadcn/ui
- **Backend / DB / Auth:** Supabase (Postgres + Auth + Storage + RLS)
- **Płatności:** Przelewy24
- **Faktury:** Fakturownia (API)
- **E-mail transakcyjny:** Resend
- **Hosting:** Vercel

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

## Skrypty

```bash
pnpm dev      # dev server (localhost:3000)
pnpm build    # production build
pnpm start    # production server
pnpm lint     # eslint
```
