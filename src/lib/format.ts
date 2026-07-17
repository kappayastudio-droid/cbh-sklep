/**
 * Formatuje cenę netto z groszy na "129,00 zł". Deterministyczne (bez Intl),
 * więc bezpieczne dla hydratacji SSR/CSR. Separator tysięcy = twarda spacja.
 */
export function formatPriceNet(grosze: number): string {
  const zl = Math.floor(grosze / 100)
  const gr = grosze % 100
  const zlStr = zl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  return `${zlStr},${gr.toString().padStart(2, "0")} zł`
}

/** Stawka VAT (23%). Sklep pokazuje ceny netto, pobiera brutto. */
export const VAT_RATE = 0.23

/** Kwota brutto (grosze) z netto: net × 1,23, zaokrąglone do grosza. */
export function grossFromNet(net: number): number {
  return Math.round(net * (1 + VAT_RATE))
}

/** Wartość VAT (grosze) = brutto − netto (spójne z grossFromNet). */
export function vatFromNet(net: number): number {
  return grossFromNet(net) - net
}

/** ISO → "10.07.2026" (deterministyczne, bez Intl/timezone). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-")
  return `${d}.${m}.${y}`
}

/** Etykiety statusów zamówień (PL). */
export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Nowe",
  paid: "Opłacone",
  shipped: "Wysłane",
  cancelled: "Anulowane",
}

export const ORDER_STATUSES = [
  "pending",
  "paid",
  "shipped",
  "cancelled",
] as const
