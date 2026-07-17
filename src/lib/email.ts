import "server-only"

import { Resend } from "resend"

import { formatPriceNet, grossFromNet, vatFromNet } from "@/lib/format"

/**
 * Wysyłka e-maili transakcyjnych (Resend).
 *
 * Bezpieczne bez konfiguracji: jeśli brak `RESEND_API_KEY`, funkcje są no-op
 * (logują ostrzeżenie i zwracają `false`) — złożenie zamówienia NIGDY nie może
 * paść przez brak/awarię maila.
 *
 * Nadawca: `RESEND_FROM` (np. "CBH Polska <zamowienia@twojadomena.pl>").
 * Domyślnie `onboarding@resend.dev` — działa tylko do testów (Resend wysyła
 * wtedy wyłącznie na adres właściciela konta). Produkcyjnie: zweryfikuj domenę.
 */

const FROM = process.env.RESEND_FROM || "CBH Polska <onboarding@resend.dev>"

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export type OrderEmailItem = {
  name: string
  qty: number
  unitPriceNet: number
}

type OrderConfirmationInput = {
  to: string
  orderId: string
  customerName?: string
  items: OrderEmailItem[]
  totalNet: number
}

function renderOrderHtml({
  orderId,
  customerName,
  items,
  totalNet,
}: Omit<OrderConfirmationInput, "to">): string {
  const rows = items
    .map(
      (i) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #dedcd4;color:#26241f;">
            ${escapeHtml(i.name)}<span style="color:#8a857c;"> × ${i.qty}</span>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #dedcd4;text-align:right;white-space:nowrap;color:#26241f;">
            ${formatPriceNet(i.unitPriceNet * i.qty)}
          </td>
        </tr>`
    )
    .join("")

  const shortId = orderId.slice(0, 8).toUpperCase()

  return `<!doctype html>
<html lang="pl">
  <body style="margin:0;background:#f0efeb;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#26241f;">
    <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
      <div style="background:#787169;color:#fff;padding:20px 24px;">
        <div style="font-size:18px;font-weight:600;letter-spacing:.02em;">CBH Polska</div>
      </div>
      <div style="background:#fdfcfa;border:1px solid #dedcd4;border-top:none;padding:24px;">
        <h1 style="margin:0 0 4px;font-size:20px;">Dziękujemy za zamówienie${
          customerName ? `, ${escapeHtml(customerName)}` : ""
        }!</h1>
        <p style="margin:0 0 20px;color:#5c584f;font-size:14px;">
          Przyjęliśmy Twoje zamówienie <strong>#${shortId}</strong> do realizacji.
          Potwierdzimy szczegóły wysyłki osobnym mailem.
        </p>

        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${rows}
          <tr>
            <td style="padding:14px 0 2px;color:#5c584f;">Razem netto</td>
            <td style="padding:14px 0 2px;text-align:right;color:#5c584f;">${formatPriceNet(
              totalNet
            )}</td>
          </tr>
          <tr>
            <td style="padding:2px 0;color:#5c584f;">VAT 23%</td>
            <td style="padding:2px 0;text-align:right;color:#5c584f;">${formatPriceNet(
              vatFromNet(totalNet)
            )}</td>
          </tr>
          <tr>
            <td style="padding:8px 0 0;border-top:1px solid #dedcd4;font-weight:600;">Do zapłaty (brutto)</td>
            <td style="padding:8px 0 0;border-top:1px solid #dedcd4;text-align:right;font-weight:600;">${formatPriceNet(
              grossFromNet(totalNet)
            )}</td>
          </tr>
        </table>

        <p style="margin:18px 0 0;color:#8a857c;font-size:12px;line-height:1.6;">
          Kwota do zapłaty zawiera VAT 23%. Do zamówienia zostanie wystawiona faktura VAT.
          W razie pytań odpowiedz na tę wiadomość lub skontaktuj się z opiekunem handlowym.
        </p>
      </div>
      <p style="margin:16px 0 0;color:#a8a49b;font-size:11px;text-align:center;">
        CBH Polska — hurtownia kosmetyków fryzjerskich
      </p>
    </div>
  </body>
</html>`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/**
 * Wysyła klientowi potwierdzenie złożenia zamówienia.
 * Zwraca `true` przy sukcesie, `false` gdy pominięto (brak klucza) lub błąd.
 * Nigdy nie rzuca — bezpieczne do wywołania w `placeOrder`.
 */
export async function sendOrderConfirmation(
  input: OrderConfirmationInput
): Promise<boolean> {
  const resend = client()
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY nie ustawiony — pomijam mail potwierdzający."
    )
    return false
  }
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: input.to,
      subject: `Potwierdzenie zamówienia #${input.orderId
        .slice(0, 8)
        .toUpperCase()} — CBH Polska`,
      html: renderOrderHtml(input),
    })
    if (error) {
      console.error("[email] Resend error:", error)
      return false
    }
    return true
  } catch (e) {
    console.error("[email] wyjątek przy wysyłce:", e)
    return false
  }
}
