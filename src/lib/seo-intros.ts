// Krótkie, unikalne opisy kategorii i marek — pokazywane na stronach list
// oraz w metadanych (description). Poprawiają SEO (unikalna treść na stronie).

const CATEGORY_INTRO: Record<string, string> = {
  "ochrona-wlosow":
    "Preparaty chroniące włosy przed zniszczeniem, wysoką temperaturą i utratą koloru — do codziennej i profesjonalnej pielęgnacji w salonie.",
  szampony:
    "Profesjonalne szampony do każdego typu włosów i skóry głowy — oczyszczające, pielęgnacyjne i salonowe opakowania hurtowe.",
  stylizacja:
    "Produkty do modelowania i wykończenia fryzury — żele, pianki, lakiery, woski i serum o różnym stopniu utrwalenia.",
  "odbudowa-wlosow":
    "Kuracje i maski regenerujące włosy zniszczone — keratyna, proteiny i składniki odbudowujące strukturę włosa.",
  koloryzacja:
    "Farby, rozjaśniacze i utleniacze do profesjonalnej koloryzacji — trwały kolor i pełna paleta odcieni.",
  "produkty-techniczne":
    "Preparaty do zabiegów technicznych w salonie — przygotowanie włosów, trwała ondulacja, prostowanie i pielęgnacja pozabiegowa.",
  "maski-i-odzywki":
    "Maski i odżywki nawilżające oraz regenerujące — intensywna pielęgnacja włosów suchych i zniszczonych.",
  zestawy:
    "Zestawy produktów do kuracji i pielęgnacji — kompletne rozwiązania dla salonu w atrakcyjnej cenie hurtowej.",
  akcesoria:
    "Akcesoria fryzjerskie do pracy w salonie — nożyczki, szczotki, miseczki, pędzelki i pelerynki.",
}

const BRAND_INTRO: Record<string, string> = {
  chenice:
    "Chenice — włoska marka profesjonalnych kosmetyków fryzjerskich: koloryzacja, pielęgnacja i stylizacja dla salonów.",
  "6-zero":
    "6 Zero (Sei Punto Zero) — profesjonalna pielęgnacja i stylizacja włosów: linie He.She, Hairzoe oraz szampony salonowe.",
  "color-clean":
    "Color Clean — chusteczki i preparaty do usuwania plam po farbie ze skóry, z aloesem i pro-witaminą B5.",
}

export function categoryIntro(slug: string, name: string): string {
  return (
    CATEGORY_INTRO[slug] ??
    `Profesjonalne produkty z kategorii „${name}” dostępne w hurtowni CBH Polska dla salonów fryzjerskich.`
  )
}

export function brandIntro(slug: string, name: string): string {
  return (
    BRAND_INTRO[slug] ??
    `Produkty marki ${name} w ofercie hurtowej CBH Polska dla salonów fryzjerskich.`
  )
}
