/**
 * Mapa przekierowań 301 ze starego sklepu WordPress/WooCommerce na nową strukturę.
 *
 * Stara struktura (WooCommerce)      →  nowa (Next.js)
 *   /produkt/<slug>                  →  /produkty/<slug>
 *   /kategoria-produktu/<slug>       →  /kategorie/<slug>
 *   /marka/<slug>, /tag-produktu/... →  /marki/<slug>
 *   /serie/<slug>, /pojemnosc/...    →  najbliższa kategoria lub /sklep
 *
 * Źródło listy starych adresów: archiwum Wayback Machine (WordPress skasowany).
 * Slugi produktów zmieniły się przy imporcie — mapowanie jest ręcznie zweryfikowane.
 */

/** Stary slug produktu → nowy slug produktu (/produkt/X → /produkty/Y). */
const PRODUCT_SLUG_MAP: Record<string, string> = {
  // — 6 Zero / He.She —
  "6-zero-active-por-fragi": "active-ampulki",
  "6-zero-active-por-shampoo-300ml": "active-power-shampoo-300ml",
  "6-zero-almondkarite-mask": "almond-karite-mask-1000-ml",
  "6-zero-curl-cream-90ml": "he-she-curl-cream-90ml",
  "6-zero-def-curl-mask-300ml": "define-curl-mask-300ml",
  "6-zero-def-curl-shampoo-300ml": "define-curl-shampoo-300ml",
  "6-zero-dust-matt-7g": "he-she-dust-up-7g",
  "6-zero-expbnd-spray-150ml": "full-expand-spray-150ml",
  "6-zero-full-exp-mask-300ml": "full-expand-mask-300ml",
  "6-zero-full-expbnd-shampoo-300ml": "full-expand-shampoo-300ml",
  "6-zero-gel-in-mousse-300ml": "he-she-gel-in-mousse-300ml",
  "6-zero-herb-tr-mask-1000ml": "herbal-mask-1000ml",
  "6-zero-hese-matt-wax-100ml": "he-she-matt-wax-100ml",
  "6-zero-hese-water-max-100ml": "he-she-water-wax-100ml",
  "6-zero-hq1020p-shampoo-300ml": "hairzoe-shampoo-300ml",
  "6-zero-hq102df-cream-500ml": "hairzoe-cream-500ml",
  "6-zero-hq102df-mask-250ml": "hairzoe-mask-250ml",
  "6-zero-hq102df-multi-1l10": "ampulki-hairzoe-12x10",
  "6-zero-hq102df-spray-150ml": "hairzoe-spray-150ml",
  "6-zero-lacca-ecold-400ml": "he-she-lacca-eco-400ml",
  "6-zero-nutri-shampoo-1l": "nutri-shampoo-1l",
  "6-zero-oil-non-oil-200ml": "he-she-oil-non-oil-200ml",
  "6-zero-post-color-shampoo-1l": "post-color-shampoo-1l",
  "6-zero-prot-col-mask-300ml": "protective-color-mask-300ml",
  "6-zero-protec-shampoo-300ml": "protective-color-shampoo",
  "6-zero-richshine-mask-300ml": "rich-shine-mask-300ml",
  "6-zero-richshine-oil-amp": "rich-shine-ampulki",
  "6-zero-richshine-shampoo-300ml": "rich-shine-shampoo-300ml",
  "6-zero-sh-salon-latte-10l": "shampoo-salon-latte-10l",
  "6-zero-sh-salon-vita-10l": "multi-witamin-shampoo-salon-10l",
  "6-zero-silver-mask-500ml": "silver-mask-500ml",
  "6-zero-silver-shampoo-300ml": "silver-shampoo-300ml",
  "6-zero-smooth-cream-200ml": "he-she-smooth-cream-200ml",
  "6-zero-smooth-mask-300ml": "smooth-mask-300ml",
  "6-zero-smooth-shampoo-1l": "smooth-shampoo-300-ml",
  "6-zero-spa-salt-200g": "he-she-sea-salt-200g",
  "6-zero-spray-bifasico-200ml": "he-she-spray-bifasico-200ml",
  "6-zero-spray-direct-400ml": "he-she-spray-direct-400ml",
  "6-zero-spray-gloss-500ml": "he-she-spray-gloss-300ml",
  "6-zero-sun-mask-300ml": "sun-mask-300ml",
  "6-zero-sun-olio-150ml": "sun-oil-150ml",
  "6-zero-therm-screen-200ml": "he-she-therm-screen-200ml",
  "6-zeroxy-mask-16x1-200ml": "xy-maska-10w1-200-ml",
  "6-zeroxy-olio-16x1-100ml": "xy-olio-ampulki-10w1-100ml",
  "he-she-mocny-lakier-dodajacy-objetosci-500-ml": "he-she-mocny-lakier-500-ml",

  // — Chenice —
  "botanical-farby-permanentne-bez-amoniaku-100-ml-11":
    "botanical-farby-permanentne-bez-amoniaku-100-ml-1-1",
  "liposomowe-farby-do-wlosow-11-5-100ml": "liposomowe-farby-do-wlosow-1-1-5-100ml",
  "hy-plex-zestaw-11-22": "hy-plex-zestaw-1-1-2-2",
  "hydrokeratin-shampoo": "kerabond-hydrokeratin-shampoo",
  "multi-vitamin-oil": "kerabond-multi-vitamin-oil",
  "kerabonding-mask": "kerabond-maska",
  "kerabond-shiny-body-krem-150ml": "kerabond-summer-shiny-body-krem-150ml",
  "sumer-kerabond-greens-szampon-250ml": "kerabond-summer-shampoo-250-ml",
  "oxicreme-20-vol": "oxicreme",
  "urbn-nourishing-maska-1000-ml": "urbn-nourishing-maska",
  // Kuracja 4x6 ml wycofana — kierujemy na wariant 12x6 ml.
  "regal-life-ampulki-kuracja-4-x-6-ml": "regal-life-ampulki-kuracja-12-x-6-ml",

  // Produkt przemianowany z „Porosity Equalizer" na „Pair Equalizer".
  "porosity-equalizer-150ml": "pair-equalizer-150ml",

  // — slugi, które się nie zmieniły, obsługuje reguła ogólna /produkt/:slug —
}

/** Stary adres → nowy adres (dokładne dopasowanie ścieżki). */
const EXACT_MAP: Record<string, string> = {
  // Strony statyczne
  "/moje-konto": "/konto",
  "/o-nas": "/",
  "/kontakt": "/",
  "/porady": "/",
  "/nowosci": "/sklep",
  "/sale": "/promocje",
  "/category/skora": "/",
  "/category/wlosy": "/",

  // Kategorie WooCommerce, których nie ma w nowym katalogu
  "/kategoria-produktu/higiena-i-dezynfekcja": "/kategorie/inne",
  "/kategoria-produktu/lupiez-i-lojotok": "/kategorie/szampony",
  "/kategoria-produktu/pielegnacja-wlosow": "/kategorie/ochrona-wlosow",

  // Serie produktowe → najbliższy produkt lub kategoria
  "/serie/bleach": "/kategorie/koloryzacja",
  "/serie/bottox": "/produkty/bottox-effect-4x50-ml",
  "/serie/farba-liposome": "/produkty/liposomowe-farby-do-wlosow-1-1-5-100ml",
  "/serie/farby-botanical": "/produkty/botanical-farby-permanentne-bez-amoniaku-100-ml-1-1",
  "/serie/greencare": "/produkty/greencare-zestaw-fluid-szampon-emulsja-100-ml",
  "/serie/ifix": "/produkty/ifix-shape-it-guma-modelujaca-100ml",
  "/serie/kerabond": "/kategorie/ochrona-wlosow",
  "/serie/kerabond-summer": "/kategorie/ochrona-wlosow",
  "/serie/oxycreme": "/produkty/oxicreme",
  "/serie/trwala": "/kategorie/produkty-techniczne",
  "/serie/urbn": "/kategorie/ochrona-wlosow",
  "/serie/vitamin-colors": "/kategorie/koloryzacja",

  // Zmiana nazwy produktu już na nowej stronie (Porosity → Pair).
  "/produkty/porosity-equalizer-150ml": "/produkty/pair-equalizer-150ml",

  // Produkty bez odpowiednika 1:1
  "/produkt/intensyfikatory-koloru": "/kategorie/koloryzacja",
  "/produkt/kerabond-pure-sheen-150-ml": "/kategorie/ochrona-wlosow",
  "/produkt/6-zero-anti-odor-dff250-250ml": "/marki/6-zero",
}

export type LegacyRedirect = {
  source: string
  destination: string
  permanent: boolean
}

/** Wszystkie przekierowania 301 dla next.config.ts. */
export function legacyRedirects(): LegacyRedirect[] {
  const r = (source: string, destination: string): LegacyRedirect => ({
    source,
    destination,
    permanent: true,
  })

  return [
    // 1) Dokładne dopasowania (mają pierwszeństwo przed regułami ogólnymi).
    ...Object.entries(EXACT_MAP).map(([from, to]) => r(from, to)),

    // 2) Produkty ze zmienionym slugiem.
    ...Object.entries(PRODUCT_SLUG_MAP).map(([from, to]) =>
      r(`/produkt/${from}`, `/produkty/${to}`),
    ),

    // 3) Warianty kolorów / pojemności — całe podrzewa na produkt nadrzędny.
    r("/botanical-color/:slug*", "/produkty/botanical-farby-permanentne-bez-amoniaku-100-ml-1-1"),
    r("/liposomehaircolor/:slug*", "/produkty/liposomowe-farby-do-wlosow-1-1-5-100ml"),
    r("/oxicreme/:slug*", "/produkty/oxicreme"),
    r("/pojemnosc/:slug*", "/sklep"),

    // 4) Marki i tagi.
    r("/marka/:slug", "/marki/:slug"),
    r("/tag-produktu/:slug", "/marki/:slug"),

    // 5) Taksonomie o niezmienionych slugach.
    r("/kategoria-produktu/:slug", "/kategorie/:slug"),

    // 6) Reguły ogólne — na końcu, łapią wszystko, co zostało.
    r("/produkt/:slug", "/produkty/:slug"),
    r("/serie/:slug*", "/sklep"),
    r("/author/:slug*", "/"),
    r("/category/:slug*", "/"),
    // Wpisy blogowe WordPressa: /RRRR/MM/DD/slug
    r("/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug*", "/"),
  ]
}
