"use server"

import { redirect } from "next/navigation"

import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"

function configured() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
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

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Metadata trafia do triggera handle_new_user → tabela profiles.
      data: {
        company_name: String(formData.get("company") ?? ""),
        nip: String(formData.get("nip") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        first_name: String(formData.get("firstName") ?? ""),
        last_name: String(formData.get("lastName") ?? ""),
      },
    },
  })

  // Zapis adresu domyślnego z rejestracji (przez klienta admina — użytkownik
  // nie ma jeszcze sesji, a trigger nie obsługuje adresów).
  const line1 = String(formData.get("address1") ?? "").trim()
  const city = String(formData.get("city") ?? "").trim()
  const postalCode = String(formData.get("postalCode") ?? "").trim()
  if (!error && data.user && (line1 || city || postalCode)) {
    try {
      const admin = createAdminClient()
      await admin.from("addresses").insert({
        profile_id: data.user.id,
        line1,
        line2: String(formData.get("address2") ?? "").trim() || null,
        city,
        postal_code: postalCode,
        country: "PL",
        is_default: true,
      })
    } catch {
      // Brak zapisu adresu nie może blokować rejestracji.
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

  redirect("/rejestracja?success=1")
}
