"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

const s = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim()

/**
 * Aktualizacja danych konta klienta B2B. Edytowalne (standard branżowy):
 * imię, nazwisko, telefon, nazwa firmy, adres. NIE edytowalne stąd:
 * e-mail (osobny flow z weryfikacją) i NIP (identyfikator podatkowy powiązany
 * z zatwierdzeniem konta). Działa na WŁASNYM koncie (auth.uid + RLS).
 */
export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login?error=" + encodeURIComponent("Zaloguj się, aby edytować konto."))
  }

  const firstName = s(formData, "firstName")
  const lastName = s(formData, "lastName")
  const phone = s(formData, "phone")
  const company = s(formData, "company")
  const line1 = s(formData, "line1")
  const line2 = s(formData, "line2")
  const city = s(formData, "city")
  const postalCode = s(formData, "postalCode")

  // 1. Imię/nazwisko + kopia firmy/telefonu w metadanych (źródło nazwy).
  await supabase.auth.updateUser({
    data: {
      first_name: firstName,
      last_name: lastName,
      company_name: company,
      phone,
    },
  })

  // 2. profiles — firma i telefon (RLS: własny wiersz).
  await supabase
    .from("profiles")
    .update({ company_name: company || null, phone: phone || null })
    .eq("id", user.id)

  // 3. Adres domyślny — aktualizuj istniejący albo wstaw nowy.
  const { data: existing } = await supabase
    .from("addresses")
    .select("id")
    .eq("profile_id", user.id)
    .eq("is_default", true)
    .maybeSingle()

  const addr = {
    line1,
    line2: line2 || null,
    city,
    postal_code: postalCode,
    country: "PL",
    is_default: true,
  }
  if (existing) {
    await supabase.from("addresses").update(addr).eq("id", existing.id)
  } else if (line1 || city || postalCode) {
    await supabase
      .from("addresses")
      .insert({ ...addr, profile_id: user.id })
  }

  redirect("/konto?updated=1")
}
