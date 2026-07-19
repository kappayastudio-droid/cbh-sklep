# Architektura b2b-shop (CBH Polska)

Plan doprowadzenia sklepu od **statycznego katalogu** do **działającego sklepu B2B**.
Dokument roboczy — odhaczaj `[ ]` → `[x]` w miarę postępu.

## Stan obecny (2026-07)

Zbudowane: **tylko frontend + statyczny katalog**.

- Katalog (108 produktów) generowany z CSV WooCommerce skryptem `scratchpad/gen.py`
  → `src/lib/products.ts` (plik statyczny, commitowany).
- Model `Product` **nie ma pola ceny**. Karty/strony dostają `price=""` jako placeholder.
- `isAuthenticated = false` **zahardkodowane** (strona produktu, `product-purchase.tsx`,
  karty). Gating cen jest więc tylko wizualny — nic nie jest egzekwowane.
- **Brak**: Supabase, auth, RLS, API routes / route handlers, middleware, `.env.local`,
  koszyka, zamówień, płatności, faktur, maili, panelu admina.
- Zależności backendowe **niezainstalowane** (brak `@supabase/*`, `resend` itd.).

> Wniosek: reguły domenowe z `CLAUDE.md` (ceny po zalogowaniu, zatwierdzanie kont,
> indywidualne cenniki, P24 → Fakturownia → Resend) są jeszcze do zbudowania.

## Docelowy przepływ

```
Gość ──► katalog (nazwy/zdjęcia/opisy)   [ceny/stany ukryte przez RLS]
  │
  ▼ rejestracja (is_approved = false)
Klient (niezatwierdzony) ──► widzi katalog, NIE widzi cen, czeka na akceptację
  │
  ▼ admin zatwierdza (is_approved = true)
Klient B2B ──► ceny netto + indywidualne rabaty ──► koszyk ──► zamówienie
  │
  ▼ Przelewy24 (webhook + weryfikacja sygnatury)
Płatność OK ──► order.status = paid ──► Fakturownia (faktura VAT) ──► Resend (mail + faktura)
```

Zasada nadrzędna: **wszystko wrażliwe liczone i egzekwowane na serwerze (RLS + walidacja).
Nigdy nie ufamy klientowi.**

---

## Schemat bazy (Supabase / Postgres)

Konwencje: `snake_case`, PK `id uuid default gen_random_uuid()`, `created_at timestamptz default now()`.
Ceny w groszach (`integer`) żeby uniknąć błędów zmiennoprzecinkowych; **netto** (decyzja B2B).

### `profiles` — rozszerza `auth.users`
| kolumna | typ | uwagi |
|---|---|---|
| id | uuid PK | = `auth.users.id` (FK, on delete cascade) |
| role | text | `'customer' \| 'admin'`, default `'customer'` |
| is_approved | boolean | default `false` — bramka B2B |
| company_name | text | |
| nip | text | |
| phone | text | |
| price_list_id | uuid FK → price_lists | null = cennik domyślny |
| created_at | timestamptz | |

### `categories`
| kolumna | typ | uwagi |
|---|---|---|
| id | uuid PK | |
| slug | text unique | |
| name | text | |
| sort | int | kolejność wyświetlania |

### `brands`
| kolumna | typ | uwagi |
|---|---|---|
| id | uuid PK | |
| slug | text unique | `chenice`, `6-zero`, `color-clean` |
| name | text | |
| banner_image | text | np. `/banner-6zero.jpg` |

### `products`
| kolumna | typ | uwagi |
|---|---|---|
| id | uuid PK | |
| slug | text unique | zgodny z obecnymi (URL-e nie mogą się zmienić) |
| name | text | |
| short_description | text | |
| description | text | (już oczyszczony z HTML w gen.py) |
| brand_id | uuid FK → brands | nullable |
| primary_category_id | uuid FK → categories | do breadcrumbs |
| image | text | ścieżka lokalna lub URL |
| images | text[] | galeria |
| in_stock | boolean | **stan pokazujemy tylko jako flaga, nigdy ilość** |
| variant_attribute | text | np. `Pojemność`, `Kolor`; puste gdy brak |
| is_published | boolean | default true |

### `product_categories` — M:N (produkt bywa w kilku kategoriach)
| kolumna | typ |
|---|---|
| product_id | uuid FK → products |
| category_id | uuid FK → categories |
| PK (product_id, category_id) | |

### `variants`
| kolumna | typ | uwagi |
|---|---|---|
| id | uuid PK | |
| product_id | uuid FK → products (cascade) | |
| value | text | np. `250 ml` |
| base_price | integer | **cena netto bazowa w groszach** |
| in_stock | boolean | |
| sku | text | opcjonalnie |

### `price_lists` — profile cenowe/rabatowe
| kolumna | typ | uwagi |
|---|---|---|
| id | uuid PK | |
| name | text | np. „Standard", „Salon Premium" |
| discount_pct | numeric | globalny rabat % dla tej listy |

### `customer_prices` — nadpisania per klient (opcjonalne, granularne)
| kolumna | typ | uwagi |
|---|---|---|
| profile_id | uuid FK → profiles | |
| variant_id | uuid FK → variants | |
| price | integer | netto w groszach; nadpisuje bazę + rabat listy |
| PK (profile_id, variant_id) | | |

### `addresses`
| kolumna | typ |
|---|---|
| id | uuid PK |
| profile_id | uuid FK → profiles |
| line1, line2, city, postal_code, country | text |
| is_default | boolean |

### `orders`
| kolumna | typ | uwagi |
|---|---|---|
| id | uuid PK | |
| profile_id | uuid FK → profiles | |
| status | text | `pending \| paid \| shipped \| cancelled` |
| total_net | integer | grosze, przeliczone **na serwerze** |
| p24_session_id | text | id transakcji P24 |
| p24_order_id | text | z webhooka |
| fakturownia_invoice_id | text | |
| shipping_address_id | uuid FK → addresses | |
| created_at | timestamptz | |

### `order_items`
| kolumna | typ | uwagi |
|---|---|---|
| id | uuid PK | |
| order_id | uuid FK → orders (cascade) | |
| variant_id | uuid FK → variants | |
| name_snapshot | text | nazwa w chwili zakupu |
| unit_price_net | integer | cena w chwili zakupu (grosze) |
| qty | integer | |

### RLS (Row Level Security) — najważniejsze
- `products`, `variants`, `categories`, `brands`: **SELECT publiczny**, ALE
  - `variants.base_price` i `variants.in_stock` **nie mogą trafić do anona** →
    realizacja przez **widok** `public_products` bez kolumn cenowych, albo osobne
    zapytanie cenowe dostępne tylko dla `is_approved`.
- `profiles`: SELECT/UPDATE tylko własny wiersz (`auth.uid() = id`); admin widzi wszystkie.
- `customer_prices`: klient czyta tylko swoje; zapis tylko admin.
- `orders` / `order_items`: klient czyta/tworzy tylko swoje; admin wszystkie.
- Ceny finalne (baza → rabat listy → nadpisanie klienta) liczone w **funkcji SQL / Server
  Component**, nie w komponencie klienckim.

---

## Checklista wdrożenia (fazami)

### Faza 0 — Setup projektu Supabase
- [x] `pnpm add @supabase/supabase-js @supabase/ssr`
- [x] Klienci: `src/lib/supabase/server.ts`, `client.ts`, `admin.ts`, `middleware.ts`
- [x] `src/middleware.ts` — odświeżanie sesji (no-op dopóki brak env → nie psuje strony)
- [x] `.env.local.example` (szablon; realne wartości → `.env.local`, do zrobienia po stronie usera)
- [ ] **[USER]** Utworzyć projekt Supabase i uzupełnić `.env.local` (patrz `supabase/README.md`)

### Faza 1 — Schemat + migracja danych
- [x] Migracje SQL wszystkich tabel (`supabase/migrations/0001_schema.sql`)
- [x] RLS + polityki dla każdej tabeli (`0002_rls.sql`)
- [x] Widoki publiczne `catalog_*` (bez cen) + funkcja `variant_prices` (ceny tylko dla approved)
- [x] Skrypt bootstrapu katalogu `scripts/gen_seed.py` → `supabase/seed.sql`
      (generowany z `products.ts` — zachowuje nazwy/zdjęcia/kategorie/slugi 1:1)
- [x] Slugi zgodne z obecnymi (seed bierze je wprost z `products.ts` → URL-e bez zmian)
- [ ] **[USER]** Zastosować `0001` → `0002` → `seed.sql` w Supabase (instrukcja: `supabase/README.md`)
- [ ] Uzupełnić ceny wariantów (na razie `base_price = 0`) — docelowo w panelu admina (Faza 6)

### Faza 2 — Warstwa danych w aplikacji
- [x] `src/lib/catalog.ts` — async API czytające z widoków `catalog_*`, z fallbackiem
      do statycznego `products.ts` (bez env = zero zmian w działaniu). React `cache()`
      dedupuje zapytania w obrębie renderu.
- [x] Przepięte wszystkie konsumenty: strona główna (bestsellers, categories),
      `/sklep`, `/marki/[slug]`, `/kategorie/[slug]`, `/produkty/[slug]` (+ generateStaticParams)
- [x] `TopNav` (client) dostaje kategorie propsem z layoutu — katalog nie trafia
      już do bundla klienta
- [x] Seam cenowy: `variants.id` + `priceVariantId` w modelu, `getVariantPrices()` +
      `getListingPrices()` (RPC `variant_prices`), `formatPriceNet()`
- [x] **Flip cen** wpięty i zweryfikowany end-to-end: strona produktu (cena + wybór wariantu +
      zakup), karty na listach (`/sklep`, `/marki`, `/kategorie`, bestsellery, „zobacz też").
      Gość/niezatwierdzony NIE widzi cen (potwierdzone na żywej bazie).
- [ ] Zdecydować ISR vs SSR dla świeżości stanów (na razie fallback/SSG)

### Faza 3 — Auth + gating (rdzeń B2B)
- [x] Helper sesji `src/lib/auth.ts` (`getSession` — bezpieczny bez env)
- [x] `/rejestracja` → server action `signup` (`supabase.auth.signUp` + metadata → trigger profiles)
- [x] `/login` → server action `login` (`signInWithPassword`), błędy przez `?error=`
- [x] Wylogowanie (`src/lib/actions/auth.ts`) + stan konta w nawigacji (email + „Wyloguj")
- [x] Komunikat „konto utworzone, czeka na zatwierdzenie" po rejestracji
- [x] `/reset-hasla` — żądanie linku → `/reset-hasla/potwierdz` (exchange code/OTP) → `/reset-hasla/nowe-haslo` (updateUser) → `/login?reset=1`
- [ ] Realne `isAuthenticated`/`isApproved` w gatingu **cen** na stronie produktu/kartach
      — **świadomie odłożone do Fazy 2**: w DB `base_price = 0`, więc włączenie teraz
      pokazałoby puste ceny. Najpierw katalog+ceny z DB, potem flip.
- [ ] Pobieranie **ceny finalnej** per wariant przez RPC `variant_prices` (Faza 2)
- [ ] Gość / niezatwierdzony: brak cen, brak „do koszyka" (egzekwowane serwerowo)

### Faza 4 — Koszyk + zamówienie
- [x] Stan koszyka: `src/lib/cart/cart-context.tsx` (Context + localStorage, hydration-safe)
      + `Providers` w layoucie
- [x] Ikona koszyka z plakietką liczby sztuk w nawigacji (`CartButton`)
- [x] „Dodaj do koszyka" w `product-purchase.tsx` (gated: tylko zalogowany klient B2B)
- [x] Strona `/koszyk` — pozycje, ilość +/−, usuwanie, czyszczenie, pusty stan
- [x] Ceny i suma netto w koszyku (cena zapamiętywana przy dodaniu pozycji)
- [x] Checkout: `/zamowienie` (gated: tylko `is_approved`) → formularz adresu + podsumowanie
- [x] `placeOrder` — **re-kalkulacja cen na serwerze** (RPC `variant_prices`, nie ufamy
      koszykowi z przeglądarki), walidacja dostępności, zapis `addresses`/`orders`/`order_items`
- [x] `/zamowienie/potwierdzenie` — podziękowanie + wyczyszczenie koszyka
- [x] Płatność/status opłacenia + mail potwierdzający — Faza 5 (P24 działa w sandbox; live przed startem)

### Faza 5 — Płatności → mail
- [x] `pnpm add resend`
- [x] `src/lib/email.ts` — `sendOrderConfirmation` (no-op bez `RESEND_API_KEY`, nigdy nie rzuca)
- [x] Mail potwierdzający zamówienie wpięty w `placeOrder` (best-effort, nie blokuje zamówienia)
- [x] `src/lib/p24.ts` — register/verify + weryfikacja podpisu CRC (SHA-384); bezpiecznik sandbox
- [x] `placeOrder` — rejestracja transakcji + redirect na bramkę; fallback bez P24
- [x] Webhook `/api/p24/webhook` — weryfikacja podpisu → `verify` → status `paid` → mail (idempotentnie)
- [x] **Zweryfikowane end-to-end w SANDBOX** (2026-07-17): zamówienie → bramka → webhook → `paid`
- [x] Rozbicie VAT (netto / VAT 23% / brutto) w koszyku, checkout i mailu; do P24 idzie BRUTTO
- [ ] **[USER/PROD]** `RESEND_API_KEY` + `RESEND_FROM` (zweryfikowana domena) — inaczej nasz mail pomijany
- [ ] **[USER/PROD]** P24 LIVE: `P24_SANDBOX=false` + produkcyjne klucze + URL-e w panelu P24 live
- [ ] Po `paid`: mail o opłaceniu. **Faktury NIE wystawia sklep** — robi to program KSeF właściciela

### Faza 5b — Wysyłka DPD (nadawanie ręczne)
- [x] `src/lib/shipping-weight.ts` — szacowanie wagi paczki z ml/g (+ opakowanie), fallback akcesoriów
- [x] `/admin/zamowienia` — karta „Wysyłka DPD": dane odbiorcy + waga + przycisk Kopiuj
- [x] Eksport CSV zamówień do wysyłki
- [ ] (opcjonalnie, przyszłość) pełna integracja DPD API / broker → etykieta PDF z panelu

### Faza 5c — SEO
- [x] Metadane bazowe (metadataBase, OpenGraph, Twitter, robots), `src/lib/site.ts`
- [x] `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`
- [x] JSON-LD: Organization + WebSite (home), Product (strony produktów); canonical + OG per produkt
- [ ] **[USER/PROD]** Zgłosić sitemapę w Google Search Console (po podpięciu domeny)

### Faza 6 — Panel administracyjny
- [x] Layout `/admin` chroniony rolą `admin` (`requireAdmin` → redirect; gość dostaje 307)
- [x] `/admin/ceny` — edycja cen (zł → grosze) i stanów magazynowych wariantów
- [x] `/admin/klienci` — lista kont + zatwierdzanie/cofanie (`is_approved`)
- [x] Link „Panel" w nawigacji dla admina
- [x] `/admin/zamowienia` — lista zamówień (klient, pozycje, adres, suma) + zmiana statusu
- [x] Konto klienta `/konto` — pełne dane z rejestracji (w tym adres) + EDYCJA (imię, telefon, firma, adres) + historia zamówień
- [x] Auto-promocja właściciela na admina przy rejestracji (`BOOTSTRAP_ADMINS` / env `ADMIN_EMAILS`)
- [ ] Przypisywanie `price_list_id` (cenniki/rabaty) — kolejna iteracja
- [ ] Edycja produktów (nazwa/opis/zdjęcia), (opcjonalnie) `customer_prices`

### Faza 7 — Przed produkcją (checklista startowa)

**Treść (uzupełnia właścicielka — patrz `TRESC-DO-UZUPELNIENIA.md`):**
- [ ] 10 zdjęć: 7 akcesoriów + Karta kolorów Botanical + Hairzoe Cream 500ml + Hy-Plex zestaw
- [ ] 10 opisów pełnych + 1 krótki (Hy-Plex)
- [ ] Kategoria: Kerabond Summer Shiny Body krem 150ml → wyjąć z „Inne"
- [x] Ceny — komplet (0 wariantów z ceną 0)

**Płatności / maile (tryb live):**
- [ ] P24 LIVE: `P24_SANDBOX=false` + produkcyjne CRC/API (ze starego WordPressa) + URL-e w panelu P24 live
- [ ] Resend: `RESEND_API_KEY` + zweryfikowana domena nadawcy (np. `@chenice.pl`)
- [ ] Szablony maili Supabase po polsku (gotowy HTML: `Downloads/maile-supabase.txt`)
- [ ] Supabase → URL Configuration: dodać produkcyjną domenę (Site URL + Redirect URLs)

**Domena / hosting:**
- [ ] Podpiąć docelową domenę do Vercela (DNS) + `NEXT_PUBLIC_SITE_URL` = ta domena
- [ ] Plan Vercel (użycie komercyjne = Pro) lub alternatywa (Netlify)

**Prawne / zaufanie:**
- [ ] Dane firmy: **NIP + pełna nazwa** w stopce/regulaminie (obecnie tylko adres/tel/e-mail)
- [ ] Przegląd Regulaminu i Polityki prywatności pod kątem B2B (potwierdzić z prawnikiem/księgową)
- [ ] Cookies/zgoda — tylko jeśli dojdzie analityka (GA/Pixel)

**Porządki + QA:**
- [ ] Wyczyścić testowe zamówienia z bazy
- [ ] Zatwierdzić realne konta klientów (`is_approved`)
- [ ] Test end-to-end na koncie zwykłego klienta: rejestracja → akceptacja → zakup → płatność LIVE → mail
- [ ] Ostatni przegląd mobile

**SEO (po starcie):**
- [ ] Zgłosić sitemapę w Google Search Console

---

## Zmienne środowiskowe (`.env.local`, nie commitować)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # tylko serwer (webhooki, admin)
P24_MERCHANT_ID=
P24_POS_ID=
P24_API_KEY=
P24_CRC=
FAKTUROWNIA_API_TOKEN=
FAKTUROWNIA_DOMAIN=
RESEND_API_KEY=
```

---

## Nowe pliki / katalogi (orientacyjnie)

```
supabase/migrations/*.sql          # schemat + RLS
src/lib/supabase/{server,client,middleware}.ts
src/middleware.ts                  # sesja
src/lib/products.ts                # PRZEROBIĆ: fetch z DB zamiast statycznej tablicy
src/lib/pricing.ts                 # logika ceny finalnej (serwer)
src/lib/cart/*                     # stan koszyka
src/app/api/p24/{register,webhook}/route.ts
src/app/api/invoices/route.ts      # Fakturownia
src/app/koszyk/page.tsx
src/app/zamowienie/*               # checkout
src/app/admin/*                    # panel
```

## Ryzyka / decyzje do potwierdzenia
- **Cache vs świeżość stanów** — stany magazynowe zmienne; ISR z krótką rewalidacją
  lub SSR dla stron listujących.
- **Wyciek cen** — audyt, że żadne API/props nie zwraca ceny dla `!is_approved`.
- **Idempotencja webhooka P24** — zabezpieczyć przed podwójną fakturą/mailem.
- **Zgodność slugów** przy migracji — inaczej psujemy istniejące/indeksowane URL-e.
- **VAT** — ceny trzymamy netto; brutto liczone przy prezentacji/fakturze wg stawki.
