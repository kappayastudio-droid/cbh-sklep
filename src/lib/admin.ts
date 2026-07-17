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
        .select("id, product_id, value, base_price, in_stock, sort")
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
}

/** Lista klientów (auth.users + profiles) — do zatwierdzania w panelu. */
export async function adminListCustomers(): Promise<AdminCustomer[]> {
  const supabase = createAdminClient()
  const [{ data: usersData }, { data: profiles }] = await Promise.all([
    supabase.auth.admin.listUsers(),
    supabase.from("profiles").select("id, role, is_approved, company_name"),
  ])

  const profileById = new Map(
    (profiles ?? []).map((p) => [p.id, p])
  )

  return (usersData?.users ?? [])
    .map((u) => {
      const p = profileById.get(u.id)
      return {
        id: u.id,
        email: u.email ?? "—",
        companyName: p?.company_name ?? null,
        role: p?.role ?? "customer",
        isApproved: Boolean(p?.is_approved),
        createdAt: u.created_at,
      }
    })
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
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
  customerEmail: string
  customerCompany: string | null
  address: string | null
  items: AdminOrderItem[]
  /** Dane do nadania w DPD. */
  recipientName: string | null
  phone: string | null
  addr: {
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
    .select("id, profile_id, status, total_net, created_at, shipping_address_id")
    .order("created_at", { ascending: false })

  if (!orders || orders.length === 0) return []

  const orderIds = orders.map((o) => o.id)
  const profileIds = [...new Set(orders.map((o) => o.profile_id))]
  const addressIds = orders
    .map((o) => o.shipping_address_id)
    .filter((id): id is string => Boolean(id))

  const [{ data: items }, { data: profiles }, { data: addresses }, usersRes] =
    await Promise.all([
      supabase
        .from("order_items")
        .select("order_id, name_snapshot, unit_price_net, qty")
        .in("order_id", orderIds),
      supabase
        .from("profiles")
        .select("id, company_name, phone")
        .in("id", profileIds),
      addressIds.length
        ? supabase
            .from("addresses")
            .select("id, line1, line2, city, postal_code")
            .in("id", addressIds)
        : Promise.resolve({ data: [] as Record<string, string>[] }),
      supabase.auth.admin.listUsers(),
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
      customerEmail: emailById.get(o.profile_id) ?? "—",
      customerCompany: companyById.get(o.profile_id) ?? null,
      address: o.shipping_address_id
        ? (addressById.get(o.shipping_address_id) ?? null)
        : null,
      items,
      recipientName: nameById.get(o.profile_id) ?? null,
      phone: phoneById.get(o.profile_id) ?? null,
      addr: o.shipping_address_id
        ? (addrPartsById.get(o.shipping_address_id) ?? null)
        : null,
      weightGrams: estimateWeightGrams(items),
    }
  })
}
