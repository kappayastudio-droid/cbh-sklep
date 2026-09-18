"use server"

import { revalidatePath } from "next/cache"

import { requireAdmin } from "@/lib/admin"
import { ORDER_STATUSES } from "@/lib/format"
import { sendAccountApproved } from "@/lib/email"
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

  // Promocja: procent od ceny bazowej + opcjonalna data końca.
  const promoRaw = String(formData.get("promo_pct") ?? "").replace(",", ".").trim()
  const promoParsed = Number.parseFloat(promoRaw)
  const promoPct = Number.isFinite(promoParsed)
    ? Math.min(100, Math.max(0, Math.round(promoParsed * 100) / 100))
    : 0
  const untilRaw = String(formData.get("promo_until") ?? "").trim()
  const promoUntil = /^\d{4}-\d{2}-\d{2}$/.test(untilRaw) ? untilRaw : null

  const supabase = createAdminClient()
  await supabase
    .from("variants")
    .update({
      base_price: Math.max(0, basePrice),
      in_stock: inStock,
      promo_pct: promoPct,
      // Data bez promocji nie ma sensu — czyścimy ją razem z rabatem.
      promo_until: promoPct > 0 ? promoUntil : null,
    })
    .eq("id", id)

  revalidatePath("/admin/ceny")
  revalidatePath("/promocje")
}

/** Zapis opisu, nazwy i widoczności produktu (strona /admin/produkty/[slug]). */
export async function updateProduct(formData: FormData) {
  await requireAdmin()

  const slug = String(formData.get("slug") ?? "").trim()
  const name = String(formData.get("name") ?? "").trim()
  if (!slug || !name) return

  const shortDescription = String(formData.get("shortDescription") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const isPublished = formData.get("is_published") != null

  const supabase = createAdminClient()
  await supabase
    .from("products")
    .update({
      name,
      short_description: shortDescription,
      description,
      is_published: isPublished,
    })
    .eq("slug", slug)

  revalidatePath(`/admin/produkty/${slug}`)
  revalidatePath("/admin/ceny")
  revalidatePath(`/produkty/${slug}`)
  revalidatePath("/sklep")
}

/**
 * Zatwierdzenie / cofnięcie zatwierdzenia klienta B2B.
 *
 * Po zatwierdzeniu wysyłamy klientowi maila — bez tego salon rejestruje się,
 * czeka i nigdy się nie dowiaduje, że może już kupować. Mail leci WYŁĄCZNIE
 * przy faktycznej zmianie „oczekuje" → „zatwierdzony", więc ponowne kliknięcie
 * ani cofnięcie zatwierdzenia nikogo nie zasypuje wiadomościami.
 */
export async function setCustomerApproval(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get("profileId") ?? "")
  const approved = String(formData.get("approved") ?? "") === "true"
  if (!id) return

  const supabase = createAdminClient()

  // Stan sprzed zmiany — decyduje, czy to jest nowe zatwierdzenie.
  const { data: before } = await supabase
    .from("profiles")
    .select("is_approved, company_name")
    .eq("id", id)
    .maybeSingle()

  await supabase.from("profiles").update({ is_approved: approved }).eq("id", id)

  const justApproved = approved && !before?.is_approved
  if (justApproved) {
    // Best-effort: awaria poczty nie może cofnąć zatwierdzenia konta.
    try {
      const { data: userRes } = await supabase.auth.admin.getUserById(id)
      const email = userRes?.user?.email
      if (email) {
        await sendAccountApproved({
          to: email,
          customerName:
            (userRes?.user?.user_metadata?.first_name as string | undefined) ||
            undefined,
          companyName: before?.company_name ?? undefined,
        })
      }
    } catch (e) {
      console.error("[admin] nie udało się wysłać maila o zatwierdzeniu:", e)
    }
  }

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

// ── Banery na stronie głównej ─────────────────────────────────────────

function bannerFields(formData: FormData) {
  const sortRaw = Number.parseInt(String(formData.get("sort") ?? ""), 10)
  return {
    sort: Number.isFinite(sortRaw) ? sortRaw : 0,
    is_published: formData.get("is_published") != null,
    image: String(formData.get("image") ?? "").trim(),
    alt: String(formData.get("alt") ?? "").trim(),
    eyebrow: String(formData.get("eyebrow") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    subtitle: String(formData.get("subtitle") ?? "").trim(),
    cta_label: String(formData.get("ctaLabel") ?? "").trim(),
    cta_href: String(formData.get("ctaHref") ?? "").trim(),
  }
}

/** Nowy baner. Trafia na koniec karuzeli i domyślnie jest ukryty. */
export async function createBanner(formData: FormData) {
  await requireAdmin()

  const supabase = createAdminClient()
  const { data: last } = await supabase
    .from("banners")
    .select("sort")
    .order("sort", { ascending: false })
    .limit(1)
    .maybeSingle()

  await supabase.from("banners").insert({
    ...bannerFields(formData),
    sort: (Number(last?.sort ?? 0) || 0) + 10,
    // Nowy baner nie pokazuje się od razu — właściciel najpierw go uzupełnia.
    is_published: false,
  })

  revalidatePath("/admin/banery")
  revalidatePath("/")
}

/** Zapis treści banera. */
export async function updateBanner(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get("bannerId") ?? "")
  if (!id) return

  const supabase = createAdminClient()
  await supabase.from("banners").update(bannerFields(formData)).eq("id", id)

  revalidatePath("/admin/banery")
  revalidatePath("/")
}

/** Usunięcie banera. */
export async function deleteBanner(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get("bannerId") ?? "")
  if (!id) return

  const supabase = createAdminClient()
  await supabase.from("banners").delete().eq("id", id)

  revalidatePath("/admin/banery")
  revalidatePath("/")
}
