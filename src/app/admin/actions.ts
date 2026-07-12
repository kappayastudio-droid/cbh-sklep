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
