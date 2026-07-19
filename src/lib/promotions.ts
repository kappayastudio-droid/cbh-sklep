import "server-only"

import { formatPriceNet } from "@/lib/format"
import { ALL_PRODUCTS } from "@/lib/products"
import { createAdminClient } from "@/lib/supabase/admin"

export type PromoProduct = {
  slug: string
  name: string
  image: string
  shortDescription: string
  newPrice: string
  oldPrice: string
  discountPct: number
}

/**
 * Produkty przecenione dla danego klienta B2B: warianty, dla których cena
 * efektywna (nadpisanie klienta LUB rabat cennika) jest NIŻSZA niż cena bazowa.
 * Liczone serwerowo klientem service_role, ale ściśle w zakresie `userId`.
 * Zwraca listę produktów posortowaną wg wielkości rabatu (malejąco).
 */
export async function getPromoForUser(userId: string): Promise<PromoProduct[]> {
  const admin = createAdminClient()

  const [{ data: profile }, { data: cprices }, { data: variants }, { data: products }] =
    await Promise.all([
      admin.from("profiles").select("price_list_id").eq("id", userId).maybeSingle(),
      admin
        .from("customer_prices")
        .select("variant_id, price")
        .eq("profile_id", userId),
      admin.from("variants").select("id, product_id, base_price"),
      admin.from("products").select("id, slug"),
    ])

  let listDiscountPct = 0
  if (profile?.price_list_id) {
    const { data: pl } = await admin
      .from("price_lists")
      .select("discount_pct")
      .eq("id", profile.price_list_id)
      .maybeSingle()
    listDiscountPct = Number(pl?.discount_pct ?? 0)
  }

  const override = new Map(
    (cprices ?? []).map((c) => [c.variant_id as string, c.price as number])
  )
  const slugByProductId = new Map(
    (products ?? []).map((p) => [p.id as string, p.slug as string])
  )
  const staticBySlug = new Map(ALL_PRODUCTS.map((p) => [p.slug, p]))

  // Dla każdego produktu bierzemy wariant z najniższą przecenioną ceną.
  const byProduct = new Map<string, { best: number; base: number }>()
  for (const v of variants ?? []) {
    const base = v.base_price as number
    if (!base || base <= 0) continue
    const eff = override.has(v.id as string)
      ? (override.get(v.id as string) as number)
      : Math.round(base * (1 - listDiscountPct / 100))
    if (eff >= base) continue // brak przeceny
    const slug = slugByProductId.get(v.product_id as string)
    if (!slug) continue
    const cur = byProduct.get(slug)
    if (!cur || eff < cur.best) byProduct.set(slug, { best: eff, base })
  }

  const promos: PromoProduct[] = []
  for (const [slug, { best, base }] of byProduct) {
    const p = staticBySlug.get(slug)
    if (!p) continue
    promos.push({
      slug,
      name: p.name,
      image: p.image,
      shortDescription: p.shortDescription,
      newPrice: formatPriceNet(best),
      oldPrice: formatPriceNet(base),
      discountPct: Math.round((1 - best / base) * 100),
    })
  }
  promos.sort((a, b) => b.discountPct - a.discountPct)
  return promos
}
