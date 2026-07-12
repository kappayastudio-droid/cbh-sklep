"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

function configured() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  )
}

/** Krok 1: wyślij link resetujący na e-mail. */
export async function requestReset(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()

  if (!configured()) {
    redirect(
      "/reset-hasla?error=" +
        encodeURIComponent("Reset hasła będzie dostępny po konfiguracji bazy.")
    )
  }
  if (!email) {
    redirect(
      "/reset-hasla?error=" + encodeURIComponent("Podaj adres e-mail.")
    )
  }

  const supabase = await createClient()
  // Nie ujawniamy, czy konto istnieje — zawsze pokazujemy ten sam komunikat.
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl()}/reset-hasla/potwierdz`,
  })

  redirect("/reset-hasla?sent=1")
}

/** Krok 3: ustaw nowe hasło (sesja pochodzi z linku recovery). */
export async function updatePassword(formData: FormData) {
  const password = String(formData.get("password") ?? "")
  const confirm = String(formData.get("confirm") ?? "")

  if (password.length < 8) {
    redirect(
      "/reset-hasla/nowe-haslo?error=" +
        encodeURIComponent("Hasło musi mieć co najmniej 8 znaków.")
    )
  }
  if (password !== confirm) {
    redirect(
      "/reset-hasla/nowe-haslo?error=" +
        encodeURIComponent("Hasła nie są takie same.")
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect(
      "/reset-hasla?error=" +
        encodeURIComponent(
          "Link wygasł lub jest nieprawidłowy. Poproś o nowy link."
        )
    )
  }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) {
    redirect(
      "/reset-hasla/nowe-haslo?error=" +
        encodeURIComponent("Nie udało się zmienić hasła. Spróbuj ponownie.")
    )
  }

  // Wyloguj i poproś o zalogowanie nowym hasłem.
  await supabase.auth.signOut()
  redirect("/login?reset=1")
}
