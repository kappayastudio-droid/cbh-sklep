// Wyliczenia sumy zamówienia: rabaty ilościowe per produkt, rabaty progowe od
// wartości netto i koszt dostawy. Jedno źródło prawdy dla koszyka, checkoutu,
// serwera (placeOrder), maila i panelu.
// Wszystkie kwoty w GROSZACH netto.

/** Pozycja zamówienia w postaci potrzebnej do wyliczeń. */
export type OrderLine = {
  /** Slug produktu — po nim rozpoznajemy progi ilościowe. */
  slug: string
  qty: number
  /**
   * Cena netto za sztukę (grosze). UWAGA: to już jest cena DLA TEGO KLIENTA —
   * RPC `variant_prices` nałożyło na nią rabat z cennika lub nadpisanie.
   */
  unitPriceNet: number
}

/**
 * Progi ilościowe PER PRODUKT: [min. liczba sztuk, rabat %], malejąco.
 * Rabat liczony od wartości TEJ pozycji, nie całego zamówienia.
 *
 * Klucz = slug produktu (patrz `products.slug` w bazie).
 */
export const PRODUCT_QUANTITY_BREAKS: Record<string, [number, number][]> = {
  // Color Clean chusteczki — karton 48 szt.
  "color-clean-chusteczki": [[48, 40]],
}

/**
 * Od ilu sztuk poniżej progu podpowiadamy klientowi, ile brakuje.
 * Przy 30 szt. Color Clean pokażemy „dodaj jeszcze 18 szt.".
 */
export const QUANTITY_HINT_FROM = 30

/**
 * Czy pozycja, która dostała rabat ilościowy, bierze udział także w rabacie
 * progowym od wartości zamówienia.
 *
 * `true` = NIE bierze (domyślnie, praktyka hurtowa: jeden rabat na pozycję).
 * Zmiana na `false` sprawi, że rabaty się zsumują — decyzja właściciela.
 */
export const QUANTITY_BREAK_EXCLUDES_VOLUME_TIER = true

/** Progi rabatu od WARTOŚCI zamówienia [min. netto w groszach, rabat %], malejąco. */
export const VOLUME_TIERS: [number, number][] = [
  [250000, 30],
  [200000, 25],
  [150000, 20],
  [100000, 15],
  [50000, 5],
]

/** Rabat % od wartości netto towarów. */
export function volumeDiscountPct(subtotalNet: number): number {
  for (const [min, pct] of VOLUME_TIERS) if (subtotalNet >= min) return pct
  return 0
}

/** Rabat ilościowy % dla danego produktu przy danej liczbie sztuk. */
export function quantityBreakPct(slug: string, qty: number): number {
  const tiers = PRODUCT_QUANTITY_BREAKS[slug]
  if (!tiers) return 0
  for (const [minQty, pct] of tiers) if (qty >= minQty) return pct
  return 0
}

/**
 * Ile sztuk brakuje do kolejnego progu ilościowego — do komunikatu w koszyku.
 * Zwraca null, gdy produkt nie ma progów, klient jest już na najwyższym progu,
 * albo jest jeszcze za daleko (poniżej `QUANTITY_HINT_FROM`).
 */
export function quantityBreakHint(
  slug: string,
  qty: number
): { missing: number; pct: number; target: number } | null {
  const tiers = PRODUCT_QUANTITY_BREAKS[slug]
  if (!tiers) return null
  const current = quantityBreakPct(slug, qty)
  // Najbliższy próg powyżej obecnej ilości, dający lepszy rabat.
  const next = [...tiers]
    .sort((a, b) => a[0] - b[0])
    .find(([minQty, pct]) => minQty > qty && pct > current)
  if (!next) return null
  const [target, pct] = next
  if (qty < QUANTITY_HINT_FROM) return null
  return { missing: target - qty, pct, target }
}

/** Koszt dostawy (netto, grosze) i próg darmowej dostawy. */
export const SHIPPING_NET = 1500 // 15 zł netto
export const FREE_SHIPPING_THRESHOLD_NET = 30000 // 300 zł netto (po rabacie)

export function shippingNet(netAfterDiscount: number): number {
  return netAfterDiscount >= FREE_SHIPPING_THRESHOLD_NET ? 0 : SHIPPING_NET
}

export type OrderLineTotals = {
  slug: string
  qty: number
  unitPriceNet: number
  /** Wartość pozycji przed rabatem ilościowym. */
  grossNet: number
  /** Rabat ilościowy zastosowany do tej pozycji (%). */
  breakPct: number
  /** Kwota rabatu ilościowego na tej pozycji. */
  breakAmount: number
  /** Wartość pozycji po rabacie ilościowym. */
  net: number
}

export type OrderTotals = {
  /** Towary netto przed jakimkolwiek rabatem. */
  subtotalNet: number
  /** Suma rabatów ilościowych (per pozycja). */
  quantityDiscount: number
  /** Rabat progowy od wartości zamówienia (%). */
  volumeDiscountPct: number
  /** Kwota rabatu progowego. */
  volumeDiscount: number
  /** Łączny rabat = ilościowy + progowy. */
  discountAmount: number
  /** Efektywny rabat % (do wyświetlenia na mailu/fakturze). */
  discountPct: number
  netAfterDiscount: number
  shippingNet: number
  freeShipping: boolean
  /** Netto do zapłaty (towary po rabatach + dostawa). */
  totalNet: number
  lines: OrderLineTotals[]
}

/**
 * Pełne wyliczenie sum zamówienia z pozycji koszyka.
 *
 * Kolejność:
 *  1. Rabat ilościowy per pozycja (np. Color Clean od 48 szt. → −40%).
 *  2. Rabat progowy od wartości zamówienia — próg liczony od wartości PO
 *     rabatach ilościowych (duże zamówienie nadal kwalifikuje się do progu),
 *     ale naliczany WYŁĄCZNIE od pozycji bez rabatu ilościowego
 *     (patrz QUANTITY_BREAK_EXCLUDES_VOLUME_TIER).
 *  3. Dostawa od wartości po wszystkich rabatach.
 */
export function computeOrderTotals(lines: OrderLine[]): OrderTotals {
  // Próg liczymy od ŁĄCZNEJ liczby sztuk produktu w koszyku, nie od pojedynczej
  // pozycji — 24 szt. w jednym wariancie i 24 w drugim to nadal 48 szt. produktu.
  const qtyBySlug = new Map<string, number>()
  for (const l of lines) {
    qtyBySlug.set(l.slug, (qtyBySlug.get(l.slug) ?? 0) + l.qty)
  }

  const detailed: OrderLineTotals[] = lines.map((l) => {
    const grossNet = l.unitPriceNet * l.qty
    const breakPct = quantityBreakPct(l.slug, qtyBySlug.get(l.slug) ?? l.qty)
    const breakAmount = Math.round((grossNet * breakPct) / 100)
    return {
      slug: l.slug,
      qty: l.qty,
      unitPriceNet: l.unitPriceNet,
      grossNet,
      breakPct,
      breakAmount,
      net: grossNet - breakAmount,
    }
  })

  const subtotalNet = detailed.reduce((s, l) => s + l.grossNet, 0)
  const quantityDiscount = detailed.reduce((s, l) => s + l.breakAmount, 0)

  // Próg rabatowy oceniamy po wartości, jaką klient faktycznie płaci za towar.
  const thresholdBase = subtotalNet - quantityDiscount
  const pct = volumeDiscountPct(thresholdBase)

  // ...ale naliczamy go tylko od pozycji, które nie dostały rabatu ilościowego.
  const tierBase = QUANTITY_BREAK_EXCLUDES_VOLUME_TIER
    ? detailed.filter((l) => l.breakPct === 0).reduce((s, l) => s + l.net, 0)
    : thresholdBase
  const volumeDiscount = Math.round((tierBase * pct) / 100)

  const discountAmount = quantityDiscount + volumeDiscount
  const netAfterDiscount = subtotalNet - discountAmount
  const ship = shippingNet(netAfterDiscount)

  return {
    subtotalNet,
    quantityDiscount,
    volumeDiscountPct: pct,
    volumeDiscount,
    discountAmount,
    discountPct:
      subtotalNet > 0 ? Math.round((discountAmount / subtotalNet) * 100) : 0,
    netAfterDiscount,
    shippingNet: ship,
    freeShipping: ship === 0,
    totalNet: netAfterDiscount + ship,
    lines: detailed,
  }
}

/**
 * Wyliczenie z samej wartości netto — bez znajomości pozycji, więc BEZ rabatów
 * ilościowych. Używane wyłącznie do zamówień sprzed wprowadzenia progów
 * ilościowych, które nie mają zapisanych kwot (patrz migracja 0003).
 */
export function legacyTotalsFromSubtotal(subtotalNet: number): OrderTotals {
  const pct = volumeDiscountPct(subtotalNet)
  const volumeDiscount = Math.round((subtotalNet * pct) / 100)
  const netAfterDiscount = subtotalNet - volumeDiscount
  const ship = shippingNet(netAfterDiscount)
  return {
    subtotalNet,
    quantityDiscount: 0,
    volumeDiscountPct: pct,
    volumeDiscount,
    discountAmount: volumeDiscount,
    discountPct: pct,
    netAfterDiscount,
    shippingNet: ship,
    freeShipping: ship === 0,
    totalNet: netAfterDiscount + ship,
    lines: [],
  }
}

/**
 * Ile netto (grosze) brakuje do kolejnego progu WARTOŚCIOWEGO (darmowa dostawa
 * lub wyższy rabat). Zwraca null, gdy nie ma już wyższego progu.
 */
export function nextThresholdHint(
  subtotalNet: number
): { target: number; missing: number; label: string } | null {
  const pct = volumeDiscountPct(subtotalNet)
  const higher = [...VOLUME_TIERS]
    .sort((a, b) => a[0] - b[0])
    .find(([min, p]) => min > subtotalNet && p > pct)
  const candidates: { target: number; label: string }[] = []
  if (subtotalNet < FREE_SHIPPING_THRESHOLD_NET) {
    candidates.push({
      target: FREE_SHIPPING_THRESHOLD_NET,
      label: "darmowej dostawy",
    })
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

/** Kwoty zapisane na zamówieniu (migracja 0003). NULL = zamówienie starsze. */
export type StoredOrderAmounts = {
  subtotalNet: number | null
  discountNet: number | null
  shippingNet: number | null
  totalNet: number
}

/**
 * Kwoty do pokazania na mailu, fakturze i w panelu.
 *
 * Zamówienie złożone po migracji 0003 ma kwoty zapisane — używamy ich i NIE
 * liczymy niczego od nowa (order_items nie zna sluga, więc nie odtworzyłoby
 * rabatów ilościowych; a i tak faktura musi pokazywać kwotę faktycznie pobraną).
 * Starsze zamówienia liczymy wstecznie z wartości pozycji.
 */
export function storedOrLegacyTotals(
  stored: StoredOrderAmounts,
  fallbackSubtotalNet: number
): OrderTotals {
  if (stored.subtotalNet == null) {
    return legacyTotalsFromSubtotal(fallbackSubtotalNet)
  }
  const subtotalNet = stored.subtotalNet
  const discountAmount = stored.discountNet ?? 0
  const ship = stored.shippingNet ?? 0
  return {
    subtotalNet,
    quantityDiscount: 0,
    volumeDiscountPct: 0,
    volumeDiscount: 0,
    discountAmount,
    discountPct:
      subtotalNet > 0 ? Math.round((discountAmount / subtotalNet) * 100) : 0,
    netAfterDiscount: subtotalNet - discountAmount,
    shippingNet: ship,
    freeShipping: ship === 0,
    totalNet: stored.totalNet,
    lines: [],
  }
}
