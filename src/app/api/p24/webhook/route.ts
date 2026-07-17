import { NextResponse, type NextRequest } from "next/server"

import { sendOrderConfirmation } from "@/lib/email"
import { grossFromNet } from "@/lib/format"
import { verifyNotificationSign, verifyTransaction } from "@/lib/p24"
import { createAdminClient } from "@/lib/supabase/admin"

export const dynamic = "force-dynamic"

type Notification = {
  merchantId: number
  posId: number
  sessionId: string
  amount: number
  originAmount: number
  currency: string
  orderId: number
  methodId: number
  statement: string
  sign: string
}

/**
 * Webhook Przelewy24 (urlStatus). P24 wysyła powiadomienie o płatności.
 * Kroki: weryfikacja podpisu CRC → dopasowanie zamówienia → kontrola kwoty →
 * `verify` w P24 → oznaczenie zamówienia `paid` (idempotentnie) → mail.
 * Zwraca 200 tylko gdy przetworzono lub bezpiecznie pominięto (P24 ponawia).
 */
export async function POST(request: NextRequest) {
  let p: Notification
  try {
    p = (await request.json()) as Notification
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }

  // 1) Podpis — chroni przed sfałszowanym powiadomieniem.
  if (!verifyNotificationSign(p)) {
    return NextResponse.json({ error: "bad sign" }, { status: 400 })
  }

  const admin = createAdminClient()

  // 2) Zamówienie po sessionId (= id zamówienia).
  const { data: order } = await admin
    .from("orders")
    .select("id, status, total_net, profile_id")
    .eq("p24_session_id", p.sessionId)
    .maybeSingle()

  if (!order) {
    // Nie nasze / nieznane — nic do zrobienia, nie prowokuj ponawiania.
    return NextResponse.json({ ok: true })
  }
  if (order.status === "paid") {
    return NextResponse.json({ ok: true }) // idempotencja
  }

  // 3) Kwota musi zgadzać się z zamówieniem (BRUTTO w groszach).
  const expectedAmount = grossFromNet(order.total_net)
  if (p.amount !== expectedAmount) {
    return NextResponse.json({ error: "amount mismatch" }, { status: 400 })
  }

  // 4) Potwierdzenie transakcji w P24.
  const ok = await verifyTransaction({
    sessionId: p.sessionId,
    amount: p.amount,
    orderId: p.orderId,
  })
  if (!ok) {
    return NextResponse.json({ error: "verify failed" }, { status: 400 })
  }

  // 5) Oznacz jako opłacone.
  await admin
    .from("orders")
    .update({ status: "paid", p24_order_id: String(p.orderId) })
    .eq("id", order.id)

  // 6) Mail potwierdzający (best-effort).
  try {
    const [{ data: items }, { data: userRes }] = await Promise.all([
      admin
        .from("order_items")
        .select("name_snapshot, unit_price_net, qty")
        .eq("order_id", order.id),
      admin.auth.admin.getUserById(order.profile_id),
    ])
    const email = userRes?.user?.email
    if (email) {
      await sendOrderConfirmation({
        to: email,
        orderId: order.id,
        customerName:
          (userRes?.user?.user_metadata?.first_name as string | undefined) ||
          undefined,
        items: (items ?? []).map((it) => ({
          name: it.name_snapshot,
          qty: it.qty,
          unitPriceNet: it.unit_price_net,
        })),
        totalNet: order.total_net,
      })
    }
  } catch {
    // brak maila nie może cofnąć zaksięgowania płatności
  }

  return NextResponse.json({ ok: true })
}
