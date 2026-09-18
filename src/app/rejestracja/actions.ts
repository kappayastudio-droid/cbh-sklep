"use server"

import { redirect } from "next/navigation"

import { isValidNip, looksLikeForeignVat, normalizeNip } from "@/lib/nip"
import { createAdminClient } from "@/lib/supabase/admin"
import { verifyBusinessByNip } from "@/lib/verify-business"
import { createClient } from "@/lib/supabase/server"

function configured() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Konta, które po rejestracji od razu dostają rolę admina + zatwierdzenie
// (bootstrap — właściciel sklepu). Można dołożyć adresy przez env ADMIN_EMAILS
// (rozdzielone przecinkami). Porównanie bez rozróżniania wielkości liter.
const BOOTSTRAP_ADMINS = ["leon.polus@chenice.pl"]

function isBootstrapAdmin(email: string) {
  const list = [
    ...BOOTSTRAP_ADMINS,
    ...(process.env.ADMIN_EMAILS ?? "").split(","),
  ].map((e) => e.trim().toLowerCase()).filter(Boolean)
  return list.includes(email.toLowerCase())
}

export async function signup(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!configured()) {
    redirect(
      "/rejestracja?error=" +
        encodeURIComponent("Rejestracja będzie dostępna po konfiguracji bazy.")
    )
  }
  if (!email || !password) {
    redirect(
      "/rejestracja?error=" + encodeURIComponent("Podaj e-mail i hasło.")
    )
  }

  // NIP sprawdzamy ZANIM powstanie konto — to jedyne miejsce, w którym
  // cokolwiek blokuje rejestrację, i dotyczy numeru, nie człowieka.
  const rawNip = String(formData.get("nip") ?? "").trim()
  if (!rawNip) {
    redirect(
      "/rejestracja?error=" +
        encodeURIComponent("Podaj NIP — sklep prowadzi sprzedaż wyłącznie dla firm.")
    )
  }
  if (!looksLikeForeignVat(rawNip) && !isValidNip(rawNip)) {
    redirect(
      "/rejestracja?error=" +
        encodeURIComponent(
          "Ten numer NIP wygląda na niepoprawny — sprawdź, czy nie ma literówki."
        )
    )
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Metadata trafia do triggera handle_new_user → tabela profiles.
      data: {
        company_name: String(formData.get("company") ?? ""),
        nip: looksLikeForeignVat(rawNip) ? rawNip : normalizeNip(rawNip),
        phone: String(formData.get("phone") ?? ""),
        first_name: String(formData.get("firstName") ?? ""),
        last_name: String(formData.get("lastName") ?? ""),
      },
    },
  })

  // Po udanej rejestracji (przez klienta admina — użytkownik nie ma jeszcze sesji):
  // 1) zapis adresu domyślnego, 2) ewentualna promocja na admina (bootstrap).
  const line1 = String(formData.get("address1") ?? "").trim()
  const city = String(formData.get("city") ?? "").trim()
  const postalCode = String(formData.get("postalCode") ?? "").trim()
  // Czy konto zostało zatwierdzone od razu — decyduje o komunikacie dla klienta.
  let approvedNow = false

  if (!error && data.user) {
    try {
      const admin = createAdminClient()

      if (line1 || city || postalCode) {
        await admin.from("addresses").insert({
          profile_id: data.user.id,
          line1,
          line2: String(formData.get("address2") ?? "").trim() || null,
          city,
          postal_code: postalCode,
          country: "PL",
          is_default: true,
        })
      }

      if (isBootstrapAdmin(email)) {
        await admin
          .from("profiles")
          .update({ role: "admin", is_approved: true })
          .eq("id", data.user.id)
        approvedNow = true
      } else {
        // Weryfikacja firmy w wykazie VAT. Cokolwiek pójdzie nie tak —
        // konto zostaje i czeka na człowieka; rejestracja nigdy nie pada.
        const v = await verifyBusinessByNip(rawNip)
        approvedNow = v.outcome === "approved"

        await admin
          .from("profiles")
          .update({
            is_approved: v.outcome === "approved",
            verification_outcome: v.outcome,
            verification_note: v.note,
          })
          .eq("id", data.user.id)

        await admin.from("nip_verifications").insert({
          nip: looksLikeForeignVat(rawNip) ? rawNip : normalizeNip(rawNip),
          profile_id: data.user.id,
          outcome: v.outcome,
          reason: v.reason,
          note: v.note,
          status_vat: v.statusVat ?? null,
          registry_name: v.registryName ?? null,
          registry_address: v.registryAddress ?? null,
          regon: v.regon ?? null,
          request_id: v.requestId ?? null,
        })
      }
    } catch {
      // Błąd zapisu adresu/promocji nie może blokować rejestracji.
    }
  }

  if (error) {
    redirect(
      "/rejestracja?error=" +
        encodeURIComponent(
          error.message.includes("already")
            ? "Konto z tym adresem już istnieje."
            : "Nie udało się utworzyć konta. Spróbuj ponownie."
        )
    )
  }

  redirect(`/rejestracja?success=${approvedNow ? "1" : "review"}`)
}
