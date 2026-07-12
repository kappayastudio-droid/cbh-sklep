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
