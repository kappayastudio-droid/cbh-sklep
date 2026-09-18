import type { Product } from "@/lib/products"

/**
 * Czy produkt da się DZIŚ kupić.
 *
 * Stan magazynowy siedzi w dwóch miejscach i oba trzeba sprawdzić:
 *  • `product.inStock` — flaga na produkcie,
 *  • stan wariantu — a dla produktu BEZ wariantów jest to syntetyczny wariant
 *    „default", który w panelu ma własny checkbox „na stanie".
 *
 * Właśnie ten drugi przypadek uciekał: panel zapisywał `variants.in_stock`,
 * ale katalog gubił tę flagę po drodze, więc sklep pokazywał aktywny przycisk
 * „Do koszyka" dla produktu, którego nie ma w magazynie.
 */
export function isProductAvailable(product: Product): boolean {
  if (!product.inStock) return false
  if (product.variants.length > 0) {
    return product.variants.some((v) => v.inStock)
  }
  // Brak jawnej informacji (statyczny fallback) traktujemy jako dostępny.
  return product.priceVariantInStock !== false
}

/** Jednolity komunikat — używany na kafelku i na karcie produktu. */
export const UNAVAILABLE_LABEL = "Chwilowo niedostępny"
