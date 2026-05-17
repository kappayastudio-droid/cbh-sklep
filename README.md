# b2b-shop

Sklep internetowy B2B z ukrytymi cenami dla niezalogowanych użytkowników.

## Stack

- **Next.js 15** (App Router, TypeScript) + **React 19**
- **Tailwind CSS v4** + **shadcn/ui**
- **Supabase** — Postgres, Auth, Storage, RLS
- **Przelewy24** — płatności
- **Fakturownia** — faktury VAT (API)
- **Resend** — e-mail transakcyjny
- Hosting: **Vercel**

## Wymagania

- Node.js 20+
- pnpm 9+

## Start

```bash
pnpm install
cp .env.example .env.local   # uzupełnij sekrety (gdy plik powstanie)
pnpm dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Skrypty

| Komenda | Opis |
| --- | --- |
| `pnpm dev` | dev server z hot reloadem |
| `pnpm build` | build produkcyjny |
| `pnpm start` | serwer produkcyjny |
| `pnpm lint` | ESLint |

## Struktura

```
src/
  app/            # App Router (strony, layouty, route handlers)
  components/ui/  # komponenty shadcn/ui
  lib/            # utils, klienci zewnętrznych usług
```

## Deployment

Wdrożenie przez Vercel — podłącz repo, ustaw zmienne środowiskowe (patrz `CLAUDE.md`), build odpalany automatycznie.

## Dokumentacja wewnętrzna

Szczegóły domenowe, reguły biznesowe i konwencje techniczne — patrz [`CLAUDE.md`](./CLAUDE.md).
