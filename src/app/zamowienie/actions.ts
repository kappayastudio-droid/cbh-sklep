"use server"

import { redirect } from "next/navigation"

import { sendOrderConfirmation } from "@/lib/email"
import { createClient } from "@/lib/supabase/server"

type IncomingItem = { slug: string; variantValue: string | null; qty: number }

/**
 * Składa zamówienie: waliduje sesję/zatwierdzenie, RE-KALKULUJE ceny po stronie
 * serwera (RPC variant_prices — nie ufamy cenom z koszyka w przeglądarce),
 * sprawdza dostępność, zapisuje adres + orders + order_items.
 */
export async function placeOrder(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login?error=" + encodeURIComponent("Zaloguj się, aby zamówić."))
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_approved")
    .eq("id", user.id)
    .maybeSingle()
  if (!profile?.is_approved) {
    redirect(
      "/login?error=" +
        encodeURIComponent("Twoje konto oczekuje na zatwierdzenie.")
    )
  }

  // Pozycje z koszyka (tylko slug/wariant/ilość — reszta liczona serwerowo).
  let incoming: IncomingItem[] = []
  try {
    incoming = JSON.parse(String(formData.get("items") ?? "[]"))
  } catch {
    incoming = []
  }
  incoming = incoming
    .filter((i) => i && typeof i.slug === "string")
    .map((i) => ({
      slug: i.slug,
      variantValue: i.variantValue ?? null,
      qty: Math.max(1, Math.min(999, Math.floor(Number(i.qty) || 1))),
    }))
  if (incoming.length === 0) {
    redirect("/koszyk?error=" + encodeURIComponent("Koszyk jest pusty."))
  }

  // Rozwiązanie slug+wariant → UUID wariantu (widoki publiczne, bez cen).
  const slugs = [...new Set(incoming.map((i) => i.slug))]
  const { data: products } = await supabase
    .from("catalog_products")
    .select("id, slug, name")
    .in("slug", slugs)
  const productBySlug = new Map((products ?? []).map((p) => [p.slug, p]))
  const productIds = (products ?? []).map((p) => p.id)

  const { data: variants } = await supabase
    .from("catalog_variants")
    .select("id, product_id, value, in_stock")
    .in("product_id", productIds.length ? productIds : ["00000000-0000-0000-0000-000000000000"])

  function resolveVariant(slug: string, value: string | null) {
    const product = productBySlug.get(slug)
    if (!product) return null
    const wanted = value ?? "default"
    const v = (variants ?? []).find(
      (x) => x.product_id === product.id && x.value === wanted
    )
    if (!v) return null
    return { id: v.id as string, inStock: v.in_stock as boolean, product }
  }

  const resolved = incoming
    .map((i) => ({ ...i, r: resolveVariant(i.slug, i.variantValue) }))
    .filter((i) => i.r && i.r.inStock)
  if (resolved.length === 0) {
    redirect(
      "/koszyk?error=" +
        encodeURIComponent("Produkty z koszyka są niedostępne.")
    )
  }

  // Autorytatywne ceny netto (grosze) — z RPC, w kontekście zalogowanego klienta.
  const variantIds = resolved.map((i) => i.r!.id)
  const { data: priceRows } = await supabase.rpc("variant_prices", {
    p_variant_ids: variantIds,
  })
  const priceById = new Map(
    ((priceRows ?? []) as { variant_id: string; price_net: number }[]).map(
      (r) => [r.variant_id, r.price_net]
    )
  )

  const lineItems = resolved
    .map((i) => {
      const price = priceById.get(i.r!.id) ?? 0
      const label =
        i.r!.product.name + (i.variantValue ? ` – ${i.variantValue}` : "")
      return {
        variant_id: i.r!.id,
        name_snapshot: label,
        unit_price_net: price,
        qty: i.qty,
      }
    })
    .filter((li) => li.unit_price_net > 0)

  if (lineItems.length === 0) {
    redirect(
      "/koszyk?error=" +
        encodeURIComponent("Brak cen dla pozycji w koszyku — skontaktuj się z nami.")
    )
  }

  const totalNet = lineItems.reduce(
    (sum, li) => sum + li.unit_price_net * li.qty,
    0
  )

  // Adres wysyłki
  const { data: address } = await supabase
    .from("addresses")
    .insert({
      profile_id: user.id,
      line1: String(formData.get("line1") ?? "").trim(),
      line2: String(formData.get("line2") ?? "").trim() || null,
      city: String(formData.get("city") ?? "").trim(),
      postal_code: String(formData.get("postalCode") ?? "").trim(),
      country: "PL",
    })
    .select("id")
    .single()

  // Zamówienie
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      profile_id: user.id,
      status: "pending",
      total_net: totalNet,
      shipping_address_id: address?.id ?? null,
    })
    .select("id")
    .single()

  if (orderErr || !order) {
    redirect(
      "/koszyk?error=" +
        encodeURIComponent("Nie udało się złożyć zamówienia. Spróbuj ponownie.")
    )
  }

  await supabase
    .from("order_items")
    .insert(lineItems.map((li) => ({ ...li, order_id: order.id })))

  // Mail potwierdzający (best-effort — brak/awaria maila nie blokuje zamówienia).
  if (user.email) {
    await sendOrderConfirmation({
      to: user.email,
      orderId: order.id,
      customerName:
        (user.user_metadata?.first_name as string | undefined) || undefined,
      items: lineItems.map((li) => ({
        name: li.name_snapshot,
        qty: li.qty,
        unitPriceNet: li.unit_price_net,
      })),
      totalNet,
    })
  }

  redirect(`/zamowienie/potwierdzenie?order=${order.id}`)
}
