/**
 * Walidacja NIP — bez sieci, bez żadnego rejestru.
 *
 * To jedyne miejsce w całym procesie, w którym maszyna mówi „nie", i mówi to
 * o NUMERZE, a nie o człowieku: wyłapuje literówki i numery wymyślone. Nie
 * stwierdza, czy firma istnieje — od tego jest weryfikacja w wykazie VAT.
 */

/** Wagi sumy kontrolnej NIP (9 pierwszych cyfr). */
const WEIGHTS = [6, 5, 7, 2, 3, 4, 5, 6, 7]

/**
 * Sprowadza wpisany tekst do 10 cyfr. Ludzie wpisują NIP z myślnikami,
 * spacjami, kropkami i prefiksem „PL" — wszystko to jest poprawne wejście
 * i nie wolno za nie karać.
 */
export function normalizeNip(input: string): string {
  return (input || "")
    .toUpperCase()
    .replace(/[\s\-. ]/g, "")
    .replace(/^PL/, "")
}

/** Czy tekst wygląda na numer VAT innego kraju UE (np. DE123456789). */
export function looksLikeForeignVat(input: string): boolean {
  const raw = (input || "").toUpperCase().replace(/[\s\-. ]/g, "")
  if (raw.startsWith("PL")) return false
  if (!/^[A-Z]{2}[0-9A-Z]{2,13}$/.test(raw)) return false
  // Wymagamy co najmniej dwóch cyfr — bez tego zwykłe słowo („abcdefghij")
  // przechodziłoby jako numer zagraniczny i omijało walidację NIP.
  return raw.slice(2).replace(/[^0-9]/g, "").length >= 2
}

/**
 * Suma kontrolna NIP. Zwraca true tylko dla numeru, który MOŻE istnieć.
 * Reszta z dzielenia równa 10 oznacza numer niemożliwy — taki NIP nigdy
 * nie został nikomu nadany.
 */
export function isValidNip(input: string): boolean {
  const d = normalizeNip(input)
  if (!/^\d{10}$/.test(d)) return false
  // Same powtórzone cyfry (0000000000, 1111111111) bywają „poprawne"
  // rachunkowo, a nie są prawdziwymi numerami.
  if (new Set(d).size === 1) return false
  const sum = WEIGHTS.reduce((acc, w, i) => acc + w * Number(d[i]), 0)
  const rest = sum % 11
  if (rest === 10) return false
  return rest === Number(d[9])
}

/** Komunikat dla pola formularza. Null = wszystko w porządku. */
export function nipFieldError(input: string): string | null {
  const raw = (input || "").trim()
  if (!raw) return null // pusty obsługuje atrybut `required`
  if (looksLikeForeignVat(raw)) return null // zagraniczne puszczamy do kolejki
  const d = normalizeNip(raw)
  if (!/^\d+$/.test(d)) return "NIP składa się z samych cyfr."
  if (d.length !== 10) return `NIP ma 10 cyfr — wpisano ${d.length}.`
  if (!isValidNip(d)) return "Ten numer NIP wygląda na niepoprawny — sprawdź, czy nie ma literówki."
  return null
}

/** NIP w formie 777-113-48-77 — do pokazania, nigdy do zapisu. */
export function formatNip(input: string): string {
  const d = normalizeNip(input)
  if (!/^\d{10}$/.test(d)) return input
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8)}`
}
