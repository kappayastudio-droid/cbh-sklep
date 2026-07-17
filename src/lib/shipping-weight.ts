// Szacowanie wagi paczki na podstawie rozmiaru produktów (ml / g / l).
// Dla kosmetyków przyjmujemy gęstość ≈ 1 g/ml. Do zawartości doliczamy narzut
// na opakowanie (butelka/nakrętka/etykieta) oraz karton+wypełniacz na paczkę.
// Wynik to SZACUNEK — w panelu jest edytowalny przed nadaniem w DPD.

const PARCEL_BASE_G = 150 // karton + wypełniacz (raz na paczkę)
const PACKAGING_FACTOR = 1.12 // +12% na opakowanie zawartości
const PACKAGING_FLAT_G = 40 // butelka/nakrętka/etykieta na sztukę

// Domyślne wagi (gram/szt., wartości „brutto") dla pozycji bez rozmiaru.
// Dopasowanie po słowie kluczowym w nazwie.
const FALLBACK: [RegExp, number][] = [
  [/prostownic/i, 600],
  [/no[żz]yczk/i, 120],
  [/szczotk/i, 150],
  [/miseczk|color bowl/i, 90],
  [/p[ęe]dzel|color brush/i, 40],
  [/pelerynk/i, 350],
  [/karta kolor/i, 300],
  [/ampu[łl]k/i, 200],
  [/zestaw|box|kit/i, 500],
  [/oxicreme/i, 300],
  [/chusteczk/i, 250],
  [/[żz]el/i, 250],
]
const FALLBACK_DEFAULT_G = 250

/** Wyciąga gramaturę zawartości z tekstu (np. "250 ml", "4x50 ml", "500g", "1L"). */
export function contentGramsFromText(text: string): number | null {
  const t = text.toLowerCase().replace(",", ".")
  // "4 x 50 ml", "12 x 6 ml"
  let m = t.match(/(\d+)\s*[x×]\s*(\d+(?:\.\d+)?)\s*(ml|g|l)\b/)
  if (m) {
    const n = Number(m[1])
    const v = Number(m[2])
    return n * (m[3] === "l" ? v * 1000 : v)
  }
  // "250 ml", "1l", "500 g", "2 kg"
  m = t.match(/(\d+(?:\.\d+)?)\s*(ml|l|g|kg)\b/)
  if (m) {
    const v = Number(m[1])
    const u = m[2]
    return u === "l" ? v * 1000 : u === "kg" ? v * 1000 : v
  }
  return null
}

/** Waga jednej sztuki (gram) — z rozmiaru + opakowanie, albo domyślna. */
function unitGrams(name: string): number {
  const content = contentGramsFromText(name)
  if (content !== null) {
    return Math.round(content * PACKAGING_FACTOR + PACKAGING_FLAT_G)
  }
  for (const [re, g] of FALLBACK) if (re.test(name)) return g
  return FALLBACK_DEFAULT_G
}

/** Szacowana waga całej paczki (gram) dla pozycji zamówienia. */
export function estimateWeightGrams(
  items: { name: string; qty: number }[]
): number {
  const content = items.reduce((sum, it) => sum + unitGrams(it.name) * it.qty, 0)
  const total = content + PARCEL_BASE_G
  return Math.max(PARCEL_BASE_G, Math.ceil(total / 10) * 10) // zaokrąglenie w górę do 10 g
}

/** Gram → "1,25 kg" (deterministyczne). */
export function formatKg(grams: number): string {
  const kg = grams / 1000
  return `${kg.toFixed(2).replace(".", ",")} kg`
}
