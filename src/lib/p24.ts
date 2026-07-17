import "server-only"

import crypto from "crypto"

/**
 * Integracja Przelewy24 (REST API v1).
 *
 * Bezpiecznik środowisk: w trybie `P24_SANDBOX=true` (albo gdy brak jawnego
 * `false`) rozmawiamy WYŁĄCZNIE z `sandbox.przelewy24.pl` — nie ma jak obciążyć
 * prawdziwej karty. Endpoint produkcyjny wchodzi dopiero przy `P24_SANDBOX=false`.
 *
 * Uwierzytelnienie REST: Basic Auth (login = POS ID, hasło = klucz API/raportów).
 * Podpis `sign`: SHA-384 z JSON-a o ŚCIŚLE określonej kolejności pól + klucz CRC.
 */

const CURRENCY = "PLN"

function cfg() {
  return {
    merchantId: Number(process.env.P24_MERCHANT_ID),
    posId: Number(process.env.P24_POS_ID),
    crc: process.env.P24_CRC ?? "",
    apiKey: process.env.P24_API_KEY ?? "",
    // Produkcja tylko przy jawnym P24_SANDBOX=false.
    sandbox: process.env.P24_SANDBOX !== "false",
  }
}

export function isP24Configured(): boolean {
  const c = cfg()
  return (
    Number.isFinite(c.merchantId) &&
    Number.isFinite(c.posId) &&
    !!c.crc &&
    !!c.apiKey
  )
}

function baseUrl(): string {
  return cfg().sandbox
    ? "https://sandbox.przelewy24.pl"
    : "https://secure.przelewy24.pl"
}

function sha384(input: string): string {
  return crypto.createHash("sha384").update(input, "utf8").digest("hex")
}

function authHeader(): string {
  const c = cfg()
  return "Basic " + Buffer.from(`${c.posId}:${c.apiKey}`).toString("base64")
}

/** URL bramki, na który przekierowujemy klienta po rejestracji transakcji. */
export function gatewayUrl(token: string): string {
  return `${baseUrl()}/trnRequest/${token}`
}

/**
 * Rejestruje transakcję i zwraca token bramki. Rzuca przy błędzie.
 * amount = kwota BRUTTO w groszach.
 */
export async function registerTransaction(params: {
  sessionId: string
  amount: number
  email: string
  description: string
  urlReturn: string
  urlStatus: string
}): Promise<string> {
  const c = cfg()
  const sign = sha384(
    JSON.stringify({
      sessionId: params.sessionId,
      merchantId: c.merchantId,
      amount: params.amount,
      currency: CURRENCY,
      crc: c.crc,
    })
  )

  const res = await fetch(`${baseUrl()}/api/v1/transaction/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
    body: JSON.stringify({
      merchantId: c.merchantId,
      posId: c.posId,
      sessionId: params.sessionId,
      amount: params.amount,
      currency: CURRENCY,
      description: params.description,
      email: params.email,
      country: "PL",
      language: "pl",
      urlReturn: params.urlReturn,
      urlStatus: params.urlStatus,
      sign,
    }),
  })

  const json = (await res.json().catch(() => null)) as
    | { data?: { token?: string } }
    | null
  const token = json?.data?.token
  if (!res.ok || !token) {
    throw new Error(`P24 register failed (${res.status})`)
  }
  return token
}

/**
 * Weryfikacja podpisu powiadomienia (webhook P24 → nasz serwer).
 * Chroni przed sfałszowanym powiadomieniem o płatności.
 */
export function verifyNotificationSign(p: {
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
}): boolean {
  const c = cfg()
  const expected = sha384(
    JSON.stringify({
      merchantId: p.merchantId,
      posId: p.posId,
      sessionId: p.sessionId,
      amount: p.amount,
      originAmount: p.originAmount,
      currency: p.currency,
      orderId: p.orderId,
      methodId: p.methodId,
      statement: p.statement,
      crc: c.crc,
    })
  )
  // porównanie w stałym czasie
  const a = Buffer.from(expected)
  const b = Buffer.from(p.sign ?? "")
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

/**
 * Potwierdza transakcję w P24 (krok „verify"). Dopiero po `success` uznajemy
 * płatność za zaksięgowaną. amount = BRUTTO w groszach.
 */
export async function verifyTransaction(params: {
  sessionId: string
  amount: number
  orderId: number
}): Promise<boolean> {
  const c = cfg()
  const sign = sha384(
    JSON.stringify({
      sessionId: params.sessionId,
      orderId: params.orderId,
      amount: params.amount,
      currency: CURRENCY,
      crc: c.crc,
    })
  )

  const res = await fetch(`${baseUrl()}/api/v1/transaction/verify`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
    body: JSON.stringify({
      merchantId: c.merchantId,
      posId: c.posId,
      sessionId: params.sessionId,
      amount: params.amount,
      currency: CURRENCY,
      orderId: params.orderId,
      sign,
    }),
  })

  const json = (await res.json().catch(() => null)) as
    | { data?: { status?: string } }
    | null
  return res.ok && json?.data?.status === "success"
}
