// Wyliczenia sumy zamówienia: rabaty progowe od wartości netto + koszt dostawy.
// Jedno źródło prawdy dla koszyka, checkoutu, serwera (placeOrder), maila i panelu.
// Wszystkie kwoty w GROSZACH netto. Progi liczone od wartości NETTO towarów.

/** Progi rabatu ilościowego [min. netto w groszach, rabat %], malejąco. */
export const VOLUME_TIERS: [number, number][] = [
  [250000, 30],
  [200000, 25],
  [150000, 20],
  [100000, 15],
  [50000, 5],
]

/** Rabat % dla danej wartości netto towarów. */
export function volumeDiscountPct(subtotalNet: number): number {
  for (const [min, pct] of VOLUME_TIERS) if (subtotalNet >= min) return pct
  return 0
}

/** Koszt dostawy (netto, grosze) i próg darmowej dostawy. */
export const SHIPPING_NET = 1500 // 15 zł netto
export const FREE_SHIPPING_THRESHOLD_NET = 30000 // 300 zł netto (po rabacie)

export function shippingNet(netAfterDiscount: number): number {
  return netAfterDiscount >= FREE_SHIPPING_THRESHOLD_NET ? 0 : SHIPPING_NET
}

export type OrderTotals = {
  subtotalNet: number // towary netto (przed rabatem)
  discountPct: number
  discountAmount: number
  netAfterDiscount: number
  shippingNet: number
  freeShipping: boolean
  totalNet: number // netto do zapłaty (towary po rabacie + dostawa)
}

/** Pełne wyliczenie sum zamówienia z wartości netto towarów. */
export function computeOrderTotals(subtotalNet: number): OrderTotals {
  const discountPct = volumeDiscountPct(subtotalNet)
  const discountAmount = Math.round((subtotalNet * discountPct) / 100)
  const netAfterDiscount = subtotalNet - discountAmount
  const ship = shippingNet(netAfterDiscount)
  return {
    subtotalNet,
    discountPct,
    discountAmount,
    netAfterDiscount,
    shippingNet: ship,
    freeShipping: ship === 0,
    totalNet: netAfterDiscount + ship,
  }
}

/**
 * Ile netto (grosze) brakuje do kolejnego progu (darmowa dostawa lub wyższy
 * rabat). Zwraca null, gdy nie ma już wyższego progu. Do komunikatów w koszyku.
 */
export function nextThresholdHint(
  subtotalNet: number
): { target: number; missing: number; label: string } | null {
  const pct = volumeDiscountPct(subtotalNet)
  // najbliższy próg rabatu powyżej obecnego
  const higher = [...VOLUME_TIERS]
    .sort((a, b) => a[0] - b[0])
    .find(([min, p]) => min > subtotalNet && p > pct)
  // próg darmowej dostawy (po rabacie i tak zwykle bliski)
  const freeShipTarget = FREE_SHIPPING_THRESHOLD_NET
  const candidates: { target: number; label: string }[] = []
  if (subtotalNet < freeShipTarget) {
    candidates.push({ target: freeShipTarget, label: "darmowej dostawy" })
  }
  if (higher) {
    candidates.push({ target: higher[0], label: `rabatu ${higher[1]}%` })
  }
  if (candidates.length === 0) return null
  const nearest = candidates.sort((a, b) => a.target - b.target)[0]
  return {
    target: nearest.target,
    missing: nearest.target - subtotalNet,
    label: nearest.label,
  }
}
