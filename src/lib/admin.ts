import "server-only"
import { redirect } from "next/navigation"

import { getSession } from "@/lib/auth"
import { deriveLine } from "@/lib/product-line"
import { estimateWeightGrams } from "@/lib/shipping-weight"
import { createAdminClient } from "@/lib/supabase/admin"

/**
 * Wymusza rolę admina. Wywoływać na początku każdej strony/akcji admina.
 * Nie-admin → przekierowanie na stronę główną.
 */
export async function requireAdmin() {
  const session = await getSession()
  if (!session.isAdmin) redirect("/")
  return session
}

export type AdminVariant = {
  id: string
  value: string
  basePrice: number
  inStock: boolean
  /** Rabat promocyjny % (0 = brak). */
  promoPct: number
  /** Ostatni dzień promocji (YYYY-MM-DD) albo null = bezterminowa. */
  promoUntil: string | null
}

export type AdminProduct = {
  id: string
  slug: string
  name: string
  brand: string
  line: string
  variants: AdminVariant[]
}

/** Pełny katalog z cenami/stanami — do edycji w panelu (service_role, po bramce admina). */
export async function adminListCatalog(): Promise<AdminProduct[]> {
  const supabase = createAdminClient()
  const [{ data: products }, { data: variants }, { data: brands }] =
    await Promise.all([
      supabase.from("products").select("id, slug, name, brand_id").order("name"),
      supabase
        .from("variants")
        .select(
          "id, product_id, value, base_price, in_stock, sort, promo_pct, promo_until"
        )
        .order("sort"),
      supabase.from("brands").select("id, name"),
    ])

  const byProduct = new Map<string, AdminVariant[]>()
  for (const v of variants ?? []) {
    const arr = byProduct.get(v.product_id) ?? []
    arr.push({
      id: v.id,
      value: v.value,
      basePrice: v.base_price,
      inStock: v.in_stock,
      promoPct: Number(v.promo_pct ?? 0),
      promoUntil: v.promo_until ?? null,
    })
    byProduct.set(v.product_id, arr)
  }
  const brandById = new Map((brands ?? []).map((b) => [b.id, b.name]))

  return (products ?? []).map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand_id ? (brandById.get(p.brand_id) ?? "Inne") : "Inne",
    line: deriveLine(p.name),
    variants: byProduct.get(p.id) ?? [],
  }))
}

export type AdminCustomer = {
  id: string
  email: string
  companyName: string | null
  role: string
  isApproved: boolean
  createdAt: string
  /** Przypisany cennik rabatowy (null = ceny bazowe, bez rabatu). */
  priceListId: string | null
  priceListName: string | null
  discountPct: number
  /** Powód oczekiwania z automatycznej weryfikacji NIP (null = konto sprzed tej funkcji). */
  verificationNote: string | null
  verificationOutcome: string | null
}

/** Lista klientów (auth.users + profiles) — do zatwierdzania i rabatów w panelu. */
export async function adminListCustomers(): Promise<AdminCustomer[]> {
  const supabase = createAdminClient()
  const [{ data: usersData }, { data: profiles }, { data: lists }] =
    await Promise.all([
      supabase.auth.admin.listUsers(),
      supabase
        .from("profiles")
        .select(
          "id, role, is_approved, company_name, price_list_id, verification_note, verification_outcome"
        ),
      supabase.from("price_lists").select("id, name, discount_pct"),
    ])

  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]))
  const listById = new Map((lists ?? []).map((l) => [l.id, l]))

  return (usersData?.users ?? [])
    .map((u) => {
      const p = profileById.get(u.id)
      const list = p?.price_list_id ? listById.get(p.price_list_id) : undefined
      return {
        id: u.id,
        email: u.email ?? "—",
        companyName: p?.company_name ?? null,
        role: p?.role ?? "customer",
        isApproved: Boolean(p?.is_approved),
        createdAt: u.created_at,
        priceListId: p?.price_list_id ?? null,
        priceListName: list?.name ?? null,
        discountPct: Number(list?.discount_pct ?? 0),
        verificationNote: p?.verification_note ?? null,
        verificationOutcome: p?.verification_outcome ?? null,
      }
    })
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}

export type AdminPriceList = {
  id: string
  name: string
  discountPct: number
  /** Ilu klientów korzysta z tego cennika — ostrzeżenie przed usunięciem. */
  customerCount: number
}

/** Cenniki rabatowe wraz z liczbą przypisanych klientów (najwyższy rabat pierwszy). */
export async function adminListPriceLists(): Promise<AdminPriceList[]> {
  const supabase = createAdminClient()
  const [{ data: lists }, { data: profiles }] = await Promise.all([
    supabase
      .from("price_lists")
      .select("id, name, discount_pct")
      .order("discount_pct", { ascending: false }),
    supabase.from("profiles").select("price_list_id"),
  ])

  const countById = new Map<string, number>()
  for (const p of profiles ?? []) {
    if (!p.price_list_id) continue
    countById.set(p.price_list_id, (countById.get(p.price_list_id) ?? 0) + 1)
  }

  return (lists ?? []).map((l) => ({
    id: l.id,
    name: l.name,
    discountPct: Number(l.discount_pct),
    customerCount: countById.get(l.id) ?? 0,
  }))
}

export type AdminOrderItem = {
  name: string
  qty: number
  unitPriceNet: number
}

export type AdminOrder = {
  id: string
  createdAt: string
  status: string
  totalNet: number
  /** Kwoty zapisane przy składaniu zamówienia (migracja 0003); null = starsze zamówienie. */
  subtotalNet: number | null
  discountNet: number | null
  shippingNet: number | null
  customerEmail: string
  customerCompany: string | null
  address: string | null
  items: AdminOrderItem[]
  /** Dane do nadania w DPD / do faktury. */
  recipientName: string | null
  phone: string | null
  nip: string | null
  addr: {
    line1: string
    line2: string | null
    postalCode: string
    city: string
  } | null
  /**
   * Adres NABYWCY — domyślny adres z konta, podany przy rejestracji.
   * To on należy na fakturę (art. 106e ust. 1 pkt 3), a nie adres dostawy:
   * salon bywa zarejestrowany gdzie indziej, niż odbiera paczkę.
   */
  billingAddr: {
    line1: string
    line2: string | null
    postalCode: string
    city: string
  } | null
  /** Szacowana waga paczki (gram) — podpowiedź, edytowalna przy nadawaniu. */
  weightGrams: number
}

/** Wszystkie zamówienia (najnowsze pierwsze) z pozycjami, klientem i adresem. */
export async function adminListOrders(): Promise<AdminOrder[]> {
  const supabase = createAdminClient()
  const { data: orders } = await supabase
    .from("orders")
    .select(
      "id, profile_id, status, total_net, subtotal_net, discount_net, shipping_net, created_at, shipping_address_id"
    )
    .order("created_at", { ascending: false })

  if (!orders || orders.length === 0) return []

  const orderIds = orders.map((o) => o.id)
  const profileIds = [...new Set(orders.map((o) => o.profile_id))]
  const addressIds = orders
    .map((o) => o.shipping_address_id)
    .filter((id): id is string => Boolean(id))

  const [
    { data: items },
    { data: profiles },
    { data: addresses },
    usersRes,
    { data: billingAddresses },
  ] = await Promise.all([
      supabase
        .from("order_items")
        .select("order_id, name_snapshot, unit_price_net, qty")
        .in("order_id", orderIds),
      supabase
        .from("profiles")
        .select("id, company_name, phone, nip")
        .in("id", profileIds),
      addressIds.length
        ? supabase
            .from("addresses")
            .select("id, line1, line2, city, postal_code")
            .in("id", addressIds)
        : Promise.resolve({ data: [] as Record<string, string>[] }),
      supabase.auth.admin.listUsers(),
      supabase
        .from("addresses")
        .select("profile_id, line1, line2, city, postal_code")
        .in("profile_id", profileIds)
        .eq("is_default", true),
    ])

  const itemsByOrder = new Map<string, AdminOrderItem[]>()
  for (const it of items ?? []) {
    const arr = itemsByOrder.get(it.order_id) ?? []
    arr.push({
      name: it.name_snapshot,
      qty: it.qty,
      unitPriceNet: it.unit_price_net,
    })
    itemsByOrder.set(it.order_id, arr)
  }
  const companyById = new Map(
    (profiles ?? []).map((p) => [p.id, p.company_name])
  )
  const phoneById = new Map(
    (profiles ?? []).map((p) => [p.id, (p as { phone?: string }).phone ?? null])
  )
  const nipById = new Map(
    (profiles ?? []).map((p) => [p.id, (p as { nip?: string }).nip ?? null])
  )
  const addressById = new Map(
    (addresses ?? []).map((a) => [
      a.id,
      [a.line1, a.line2, `${a.postal_code} ${a.city}`]
        .filter(Boolean)
        .join(", "),
    ])
  )
  const addrPartsById = new Map(
    (addresses ?? []).map((a) => [
      a.id,
      {
        line1: a.line1 ?? "",
        line2: a.line2 ?? null,
        postalCode: a.postal_code ?? "",
        city: a.city ?? "",
      },
    ])
  )
  const billingByProfile = new Map(
    (billingAddresses ?? []).map((a) => [
      a.profile_id,
      {
        line1: a.line1 ?? "",
        line2: a.line2 ?? null,
        postalCode: a.postal_code ?? "",
        city: a.city ?? "",
      },
    ])
  )
  const emailById = new Map(
    (usersRes.data?.users ?? []).map((u) => [u.id, u.email ?? "—"])
  )
  const nameById = new Map(
    (usersRes.data?.users ?? []).map((u) => {
      const meta = (u.user_metadata ?? {}) as Record<string, string>
      const name = [meta.first_name, meta.last_name].filter(Boolean).join(" ")
      return [u.id, name || null]
    })
  )

  return orders.map((o) => {
    const items = itemsByOrder.get(o.id) ?? []
    return {
      id: o.id,
      createdAt: o.created_at,
      status: o.status,
      totalNet: o.total_net,
      subtotalNet: o.subtotal_net ?? null,
      discountNet: o.discount_net ?? null,
      shippingNet: o.shipping_net ?? null,
      customerEmail: emailById.get(o.profile_id) ?? "—",
      customerCompany: companyById.get(o.profile_id) ?? null,
      address: o.shipping_address_id
        ? (addressById.get(o.shipping_address_id) ?? null)
        : null,
      items,
      recipientName: nameById.get(o.profile_id) ?? null,
      phone: phoneById.get(o.profile_id) ?? null,
      nip: nipById.get(o.profile_id) ?? null,
      addr: o.shipping_address_id
        ? (addrPartsById.get(o.shipping_address_id) ?? null)
        : null,
      billingAddr: billingByProfile.get(o.profile_id) ?? null,
      weightGrams: estimateWeightGrams(items),
    }
  })
}

export type AdminProductDetail = {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  isPublished: boolean
  image: string
}

/** Jeden produkt do edycji na stronie /admin/produkty/[slug]. */
export async function adminGetProduct(
  slug: string
): Promise<AdminProductDetail | null> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from("products")
    .select("id, slug, name, short_description, description, is_published, image")
    .eq("slug", slug)
    .maybeSingle()
  if (!data) return null
  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    shortDescription: data.short_description ?? "",
    description: data.description ?? "",
    isPublished: Boolean(data.is_published),
    image: data.image ?? "",
  }
}

export type AdminBanner = {
  id: string
  sort: number
  isPublished: boolean
  image: string
  alt: string
  eyebrow: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
}

/** Wszystkie banery — także ukryte — do edycji w panelu. */
export async function adminListBanners(): Promise<AdminBanner[]> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from("banners")
    .select(
      "id, sort, is_published, image, alt, eyebrow, title, subtitle, cta_label, cta_href"
    )
    .order("sort", { ascending: true })

  return (data ?? []).map((b) => ({
    id: b.id,
    sort: Number(b.sort ?? 0),
    isPublished: Boolean(b.is_published),
    image: b.image ?? "",
    alt: b.alt ?? "",
    eyebrow: b.eyebrow ?? "",
    title: b.title ?? "",
    subtitle: b.subtitle ?? "",
    ctaLabel: b.cta_label ?? "",
    ctaHref: b.cta_href ?? "",
  }))
}

/**
 * Zdjęcia leżące w /public — podpowiedzi do pola „Zdjęcie" w banerach.
 * Właściciel wybiera spośród tego, co już jest na serwerze; wgranie zupełnie
 * nowego pliku nadal wymaga programisty (patrz uwaga w panelu).
 */
export async function listPublicImages(): Promise<string[]> {
  const { readdir } = await import("node:fs/promises")
  const { join } = await import("node:path")
  const root = join(process.cwd(), "public")
  const out: string[] = []
  const exts = /\.(png|jpe?g|webp|avif|svg)$/i

  async function walk(dir: string, prefix: string) {
    let entries
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith(".")) continue
      if (e.isDirectory()) {
        await walk(join(dir, e.name), `${prefix}/${e.name}`)
      } else if (exts.test(e.name)) {
        out.push(`${prefix}/${e.name}`)
      }
    }
  }
  await walk(root, "")
  return out.sort()
}
