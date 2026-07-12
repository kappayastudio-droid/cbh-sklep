import "server-only"
import { cache } from "react"

import { formatPriceNet } from "@/lib/format"
import { deriveLine } from "@/lib/product-line"
import { createClient } from "@/lib/supabase/server"
import {
  ALL_PRODUCTS,
  BRANDS,
  CATEGORIES,
  type Brand,
  type Category,
  type Product,
  type ProductCategory,
  type ProductVariant,
} from "@/lib/products"

/**
 * Warstwa katalogu. Czyta z publicznych widoków Supabase (catalog_*), a gdy
 * baza nie jest jeszcze skonfigurowana (albo zapytanie padnie) — spada na
 * statyczny `products.ts`. Dzięki temu strona działa identycznie przed i po
 * podłączeniu Supabase. Ceny NIE są tu pobierane (widoki ich nie zawierają) —
 * od tego jest RPC `variant_prices` (patrz getVariantPrices).
 */

function configured() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

type CatalogData = {
  products: Product[]
  categories: Category[]
  brands: Brand[]
}

async function fetchCatalog(): Promise<CatalogData | null> {
  if (!configured()) return null
  try {
    const supabase = await createClient()
    const [prodRes, pcRes, varRes, catRes, brandRes] = await Promise.all([
      supabase.from("catalog_products").select("*"),
      supabase.from("catalog_product_categories").select("*"),
      supabase.from("catalog_variants").select("*").order("sort"),
      supabase.from("catalog_categories").select("*").order("sort"),
      supabase.from("catalog_brands").select("*"),
    ])

    if (prodRes.error || !prodRes.data) return null

    const catsByProduct = new Map<string, ProductCategory[]>()
    for (const pc of pcRes.data ?? []) {
      const arr = catsByProduct.get(pc.product_id) ?? []
      arr.push({ name: pc.category_name, slug: pc.category_slug })
      catsByProduct.set(pc.product_id, arr)
    }

    const variantsByProduct = new Map<string, ProductVariant[]>()
    const defaultVariantByProduct = new Map<string, string>()
    for (const v of varRes.data ?? []) {
      // "default" to syntetyczny wariant z seeda (produkt bez wariantów) —
      // nie pokazujemy go jako opcji, ale zapamiętujemy jako nośnik ceny.
      if (v.value === "default") {
        defaultVariantByProduct.set(v.product_id, v.id)
        continue
      }
      const arr = variantsByProduct.get(v.product_id) ?? []
      arr.push({ id: v.id, value: v.value, inStock: v.in_stock })
      variantsByProduct.set(v.product_id, arr)
    }

    const products: Product[] = prodRes.data.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category_name ?? "",
      categorySlug: p.category_slug ?? "",
      categories: catsByProduct.get(p.id) ?? [],
      brand: p.brand_name ?? "",
      brandSlug: p.brand_slug ?? "",
      shortDescription: p.short_description ?? "",
      description: p.description ?? "",
      image: p.image ?? "",
      images: p.images ?? [],
      inStock: p.in_stock,
      variantAttribute: p.variant_attribute ?? "",
      variants: variantsByProduct.get(p.id) ?? [],
      priceVariantId: defaultVariantByProduct.get(p.id),
    }))

    const categories: Category[] = (catRes.data ?? []).map((c) => ({
      name: c.name,
      slug: c.slug,
      count: Number(c.product_count ?? 0),
    }))

    const brands: Brand[] = (brandRes.data ?? []).map((b) => ({
      name: b.name,
      slug: b.slug,
      count: Number(b.product_count ?? 0),
    }))

    return { products, categories, brands }
  } catch {
    return null
  }
}

// Memoizacja w obrębie jednego renderu — helpery nie odpytują bazy wielokrotnie.
const getCatalog = cache(fetchCatalog)

// ── Publiczne API (parytet z src/lib/products.ts, ale async) ──

export async function getVisibleProducts(): Promise<Product[]> {
  const data = await getCatalog()
  return (data?.products ?? ALL_PRODUCTS).filter((p) => p.inStock)
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  return (await getVisibleProducts()).find((p) => p.slug === slug)
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  return (await getVisibleProducts()).filter((p) =>
    p.categories.some((c) => c.slug === categorySlug)
  )
}

export async function getProductsByBrand(
  brandSlug: string
): Promise<Product[]> {
  return (await getVisibleProducts()).filter((p) => p.brandSlug === brandSlug)
}

export async function getCategories(): Promise<Category[]> {
  const data = await getCatalog()
  return data?.categories ?? CATEGORIES
}

export async function getBrands(): Promise<Brand[]> {
  const data = await getCatalog()
  return data?.brands ?? BRANDS
}

/**
 * „Zobacz też" — dopasowanie wg trafności, priorytet malejąco:
 *   1. ta sama SERIA/linia w obrębie tej samej marki (np. Kerabond, He.She, iFix),
 *   2. wspólna KATEGORIA,
 *   3. ta sama MARKA.
 * Punkty sumują się (np. seria+marka > kategoria+marka > sama kategoria), więc
 * seria zawsze wygrywa. Gdy dopasowań jest za mało, listę uzupełniamy resztą.
 */
export async function getRelatedProducts(
  slug: string,
  limit = 4
): Promise<Product[]> {
  const products = await getVisibleProducts()
  const current = products.find((p) => p.slug === slug)
  if (!current) return []

  const currentLine = deriveLine(current.name)
  const currentCats = new Set(current.categories.map((c) => c.slug))

  const score = (p: Product) => {
    let s = 0
    // Seria liczy się tylko gdy produkt faktycznie należy do jakiejś linii
    // i jest tej samej marki (Kerabond to Chenice, He.She to 6 Zero itd.).
    if (
      currentLine !== "Pozostałe" &&
      current.brandSlug &&
      p.brandSlug === current.brandSlug &&
      deriveLine(p.name) === currentLine
    ) {
      s += 100
    }
    if (p.categories.some((c) => currentCats.has(c.slug))) s += 10
    if (current.brandSlug && p.brandSlug === current.brandSlug) s += 1
    return s
  }

  return products
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s) // stabilne — remisy zachowują kolejność katalogu
    .slice(0, limit)
    .map((x) => x.p)
}

/**
 * Ceny netto (grosze) per wariant — WYŁĄCZNIE dla zatwierdzonych klientów.
 * RPC `variant_prices` zwraca pusto dla gościa/niezatwierdzonego, więc ceny
 * nigdy nie wyciekają. Zwraca mapę { variantId: price_net }.
 */
export async function getVariantPrices(
  variantIds: string[]
): Promise<Record<string, number>> {
  if (!configured() || variantIds.length === 0) return {}
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.rpc("variant_prices", {
      p_variant_ids: variantIds,
    })
    if (error || !data) return {}
    const out: Record<string, number> = {}
    for (const row of data as { variant_id: string; price_net: number }[]) {
      out[row.variant_id] = row.price_net
    }
    return out
  } catch {
    return {}
  }
}

/**
 * Ceny do wyświetlenia na kartach (listy produktów). Zwraca mapę { slug: "129,00 zł" }
 * (albo "od 69,00 zł" gdy warianty mają różne ceny). Dla gościa/niezatwierdzonego —
 * pusta mapa (RPC nie wydaje cen), więc karty pokazują bramkę logowania.
 */
export async function getListingPrices(
  products: Product[]
): Promise<Record<string, string>> {
  const ids: string[] = []
  for (const p of products) {
    if (p.variants.length) {
      for (const v of p.variants) if (v.id) ids.push(v.id)
    } else if (p.priceVariantId) {
      ids.push(p.priceVariantId)
    }
  }
  if (ids.length === 0) return {}
  const priceMap = await getVariantPrices(ids)
  if (Object.keys(priceMap).length === 0) return {}

  const out: Record<string, string> = {}
  for (const p of products) {
    let vals: number[] = []
    if (p.variants.length) {
      vals = p.variants
        .map((v) => (v.id ? priceMap[v.id] : undefined))
        .filter((n): n is number => typeof n === "number" && n > 0)
    } else if (p.priceVariantId && priceMap[p.priceVariantId] > 0) {
      vals = [priceMap[p.priceVariantId]]
    }
    if (!vals.length) continue
    const min = Math.min(...vals)
    const multiple = new Set(vals).size > 1
    out[p.slug] = (multiple ? "od " : "") + formatPriceNet(min)
  }
  return out
}
