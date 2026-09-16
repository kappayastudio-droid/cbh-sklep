"use server"

import { revalidatePath } from "next/cache"

import { requireAdmin } from "@/lib/admin"
import { ORDER_STATUSES } from "@/lib/format"
import { createAdminClient } from "@/lib/supabase/admin"

/** Zapis ceny (zł → grosze) i stanu magazynowego pojedynczego wariantu. */
export async function updateVariant(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get("variantId") ?? "")
  const priceZl = String(formData.get("price") ?? "").replace(",", ".").trim()
  const inStock = formData.get("in_stock") != null

  const parsed = Number.parseFloat(priceZl)
  const basePrice = Number.isFinite(parsed) ? Math.round(parsed * 100) : 0

  if (!id) return

  const supabase = createAdminClient()
  await supabase
    .from("variants")
    .update({ base_price: Math.max(0, basePrice), in_stock: inStock })
    .eq("id", id)

  revalidatePath("/admin/ceny")
}

/** Zatwierdzenie / cofnięcie zatwierdzenia klienta B2B. */
export async function setCustomerApproval(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get("profileId") ?? "")
  const approved = String(formData.get("approved") ?? "") === "true"
  if (!id) return

  const supabase = createAdminClient()
  await supabase.from("profiles").update({ is_approved: approved }).eq("id", id)

  revalidatePath("/admin/klienci")
}

/** Zmiana statusu zamówienia. */
export async function setOrderStatus(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get("orderId") ?? "")
  const status = String(formData.get("status") ?? "")
  if (!id || !ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number]))
    return

  const supabase = createAdminClient()
  await supabase.from("orders").update({ status }).eq("id", id)

  revalidatePath("/admin/zamowienia")
}

/**
 * Parsuje rabat z formularza: "40", "40,5", "40.5" → liczba 0–100 (2 miejsca).
 * Zwraca null przy wartości niepoprawnej — akcja wtedy nic nie zapisuje.
 */
function parseDiscountPct(raw: FormDataEntryValue | null): number | null {
  const parsed = Number.parseFloat(String(raw ?? "").replace(",", ".").trim())
  if (!Number.isFinite(parsed)) return null
  return Math.min(100, Math.max(0, Math.round(parsed * 100) / 100))
}

/** Nowy cennik rabatowy (np. „Stali klienci — 40%”). */
export async function createPriceList(formData: FormData) {
  await requireAdmin()

  const name = String(formData.get("name") ?? "").trim()
  const discountPct = parseDiscountPct(formData.get("discountPct"))
  if (!name || discountPct === null) return

  const supabase = createAdminClient()
  await supabase.from("price_lists").insert({ name, discount_pct: discountPct })

  revalidatePath("/admin/rabaty")
  revalidatePath("/admin/klienci")
}

/** Zmiana nazwy / wysokości rabatu istniejącego cennika. */
export async function updatePriceList(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get("priceListId") ?? "")
  const name = String(formData.get("name") ?? "").trim()
  const discountPct = parseDiscountPct(formData.get("discountPct"))
  if (!id || !name || discountPct === null) return

  const supabase = createAdminClient()
  await supabase
    .from("price_lists")
    .update({ name, discount_pct: discountPct })
    .eq("id", id)

  revalidatePath("/admin/rabaty")
  revalidatePath("/admin/klienci")
}

/**
 * Usunięcie cennika. Klienci do niego przypisani wracają do cen bazowych
 * (FK `on delete set null`) — panel ostrzega o tym przed usunięciem.
 */
export async function deletePriceList(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get("priceListId") ?? "")
  if (!id) return

  const supabase = createAdminClient()
  await supabase.from("price_lists").delete().eq("id", id)

  revalidatePath("/admin/rabaty")
  revalidatePath("/admin/klienci")
}

/** Przypisanie klientowi cennika rabatowego (pusta wartość = ceny bazowe). */
export async function setCustomerPriceList(formData: FormData) {
  await requireAdmin()

  const profileId = String(formData.get("profileId") ?? "")
  const priceListId = String(formData.get("priceListId") ?? "").trim()
  if (!profileId) return

  const supabase = createAdminClient()
  await supabase
    .from("profiles")
    .update({ price_list_id: priceListId || null })
    .eq("id", profileId)

  revalidatePath("/admin/klienci")
}
