// Wyprowadzenie „linii/serii produktowej" z nazwy produktu.
// Używane w panelu admina (grupowanie) i w „Zobacz też" na stronie produktu
// (priorytet: ta sama seria w obrębie marki → potem kategoria).
// Kolejność od najbardziej szczegółowej; pierwsze trafienie wygrywa.

export const LINE_RULES: [string, string[]][] = [
  ["Kerabond Summer", ["summer"]],
  ["Kerabond", ["kerabond"]],
  ["Greencare", ["greencare"]],
  ["URBN", ["urbn"]],
  ["He.She", ["he.she", "he she"]],
  ["Hairzoe", ["hairzoe"]],
  ["Bottox Effect", ["bottox"]],
  ["Botanical", ["botanical"]],
  ["LHC / Liposome", ["liposom", "lhc", "karta kolor"]],
  ["Vitamin Colors", ["vitamin", "koloryzujący"]],
  ["Anti-Age", ["anti-age", "anti age"]],
  ["Argan", ["argan", "arganow"]],
  ["Keep in Color", ["keep in color"]],
  ["Sun Deluxe", ["sun "]],
  ["Silver", ["silver"]],
  ["Define Curl", ["define curl"]],
  ["Full Expand", ["full expand"]],
  ["Protective Color", ["protective color"]],
  ["Rich & Shine", ["rich & shine", "rich shine"]],
  ["Smooth", ["smooth"]],
  ["Active", ["active"]],
  ["Regal", ["regal"]],
  // Power Shine należy do linii I-FIX (ujawnione w opisie, nie w nazwie).
  ["iFix", ["ifix", "i-fix", "power shine"]],
  ["Koloryzacja / Oxy", ["oxy ", "oxicreme"]],
  ["Bleach / Puder", ["bleach", "dark diamond", "puder"]],
  ["XY", ["xy "]],
  ["Cream Color Off", ["color off"]],
  ["Anti Orange", ["anti orange"]],
  ["Hy-Plex", ["hy-plex", "hy plex"]],
  ["Biological Waving", ["waving", "biological"]],
  // 6 Zero — profesjonalne szampony salonowe (linia „Salon" wg opisów:
  // „Nutri Salon", „Post Color Salon", „Regular Salon"…).
  ["Salon", ["salon", "nutri", "post color"]],
  // 6 Zero — maski „Treatment" (Herb Treatment, Almond & Karité Treatment).
  ["Treatment", ["herbal", "almond", "karite"]],
  ["Color Clean", ["color clean", "chusteczki"]],
  [
    "Akcesoria",
    ["nożyczki", "szczotka", "prostownica", "miseczka", "pędzelek", "pelerynki"],
  ],
]

/** Etykieta serii albo "Pozostałe" gdy nazwa nie pasuje do żadnej reguły. */
export function deriveLine(name: string): string {
  const n = name.toLowerCase()
  for (const [label, keys] of LINE_RULES) {
    if (keys.some((k) => n.includes(k))) return label
  }
  return "Pozostałe"
}
