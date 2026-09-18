import "server-only"

import { isValidNip, looksLikeForeignVat, normalizeNip } from "@/lib/nip"

/**
 * Weryfikacja firmy w wykazie podatników VAT („biała lista", MF/KAS).
 *
 * ZASADA NACZELNA: maszyna mówi wyłącznie „tak" albo „nie wiem". Nigdy „nie".
 * Każdy przypadek inny niż jednoznaczne potwierdzenie trafia do kolejki do
 * ręcznego sprawdzenia — konto i tak powstaje, klient dostaje spokojny
 * komunikat, a właściciel widzi powód w panelu.
 *
 * Dlaczego nie odrzucamy automatycznie:
 *  • Rejestracja jako „podatnik VAT zwolniony" jest DOBROWOLNA (art. 96 ust. 3
 *    ustawy o VAT), więc prawdziwy jednoosobowy salon poniżej progu może w
 *    wykazie nie istnieć w ogóle. Brak wpisu to nie jest dowód na cokolwiek.
 *  • Automatyczna ODMOWA warunków handlowych byłaby zautomatyzowanym
 *    podejmowaniem decyzji w rozumieniu art. 22 RODO, z całym pakietem
 *    obowiązków. Automatyczna ZGODA nim nie jest.
 */

const API = "https://wl-api.mf.gov.pl/api/search/nip"
const TIMEOUT_MS = 3000

export type VerificationOutcome = "approved" | "review"

export type VerificationResult = {
  outcome: VerificationOutcome
  /** Kod techniczny — do panelu i do logów, nie dla klienta. */
  reason: string
  /** Zdanie po polsku dla właściciela w panelu. */
  note: string
  /** Nazwa z rejestru — dla jednoosobowej firmy to imię i nazwisko, nie szyld. */
  registryName?: string
  registryAddress?: string
  regon?: string
  statusVat?: string
  /** Identyfikator zapytania MF — ślad audytowy. */
  requestId?: string
}

/** Dzisiejsza data w strefie Europe/Warsaw — API wymaga parametru `date`. */
function todayWarsaw(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date())
}

export async function verifyBusinessByNip(
  rawNip: string
): Promise<VerificationResult> {
  if (looksLikeForeignVat(rawNip)) {
    return {
      outcome: "review",
      reason: "foreign_vat",
      note: "Zgłoszenie zagraniczne — NIP spoza Polski, wykaz VAT go nie obejmuje.",
    }
  }

  const nip = normalizeNip(rawNip)
  if (!isValidNip(nip)) {
    // Do tego miejsca nie powinno dojść (formularz waliduje wcześniej),
    // ale gdyby ktoś ominął formularz — kolejka, nie odrzucenie.
    return {
      outcome: "review",
      reason: "bad_checksum",
      note: "NIP nie przechodzi sumy kontrolnej — sprawdź, czy nie ma literówki.",
    }
  }

  let res: Response
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
    res = await fetch(`${API}/${nip}?date=${todayWarsaw()}`, {
      signal: ctrl.signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    })
    clearTimeout(timer)
  } catch {
    return {
      outcome: "review",
      reason: "network_error",
      note: "Nie udało się połączyć z wykazem VAT — konto czeka na ręczne sprawdzenie.",
    }
  }

  if (res.status === 429) {
    return {
      outcome: "review",
      reason: "rate_limited",
      note: "Wyczerpany dzienny limit zapytań do wykazu VAT (100/dzień). Sprawdź ręcznie.",
    }
  }
  if (!res.ok) {
    return {
      outcome: "review",
      reason: `http_${res.status}`,
      note: `Wykaz VAT odpowiedział błędem ${res.status} — konto czeka na ręczne sprawdzenie.`,
    }
  }

  let subject: Record<string, unknown> | null = null
  let requestId: string | undefined
  try {
    const body = (await res.json()) as {
      result?: { subject?: Record<string, unknown> | null; requestId?: string }
    }
    subject = body.result?.subject ?? null
    requestId = body.result?.requestId
  } catch {
    return {
      outcome: "review",
      reason: "bad_response",
      note: "Wykaz VAT zwrócił nieczytelną odpowiedź — konto czeka na ręczne sprawdzenie.",
    }
  }

  // Brak wpisu NIE znaczy „firma nie istnieje". Firma zwolniona z VAT, która
  // nigdy nie złożyła VAT-R, w wykazie nie figuruje — a odpowiedź jest wtedy
  // identyczna jak dla numeru nienadanego nikomu.
  if (!subject) {
    return {
      outcome: "review",
      reason: "not_in_registry",
      note: "NIP nieznaleziony w wykazie VAT — może być firma zwolniona z VAT albo zarejestrowana w ostatnich dniach.",
      requestId,
    }
  }

  const statusVat = String(subject.statusVat ?? "")
  const common = {
    registryName: subject.name ? String(subject.name) : undefined,
    registryAddress: subject.residenceAddress
      ? String(subject.residenceAddress)
      : subject.workingAddress
        ? String(subject.workingAddress)
        : undefined,
    regon: subject.regon ? String(subject.regon) : undefined,
    statusVat,
    requestId,
  }

  // „Czynny" i „Zwolniony" są równorzędne: oba dowodzą, że po drugiej stronie
  // jest zarejestrowana firma. Warunek tylko na „Czynny" odciąłby małe salony.
  if (statusVat === "Czynny" || statusVat === "Zwolniony") {
    return {
      outcome: "approved",
      reason: statusVat === "Czynny" ? "vat_active" : "vat_exempt",
      note:
        statusVat === "Czynny"
          ? "Potwierdzone w wykazie VAT (podatnik czynny)."
          : "Potwierdzone w wykazie VAT (podatnik zwolniony).",
      ...common,
    }
  }

  // „Niezarejestrowany" bywa też stanem firmy zwolnionej — do człowieka.
  const removed = subject.removalDate ? String(subject.removalDate) : null
  const denied = subject.registrationDenialDate
    ? String(subject.registrationDenialDate)
    : null
  return {
    outcome: "review",
    reason: "vat_unregistered",
    note: removed
      ? `Wykreślony z rejestru VAT ${removed} — sprawdź ręcznie.`
      : denied
        ? `Odmowa rejestracji VAT ${denied} — sprawdź ręcznie.`
        : "W wykazie VAT jako niezarejestrowany — może być firma zwolniona z VAT.",
    ...common,
  }
}
