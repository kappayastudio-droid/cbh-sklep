"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

function configured() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function login(formData: FormData) {
  const email = String(formData.get("identifier") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!configured()) {
    redirect(
      "/login?error=" +
        encodeURIComponent("Logowanie będzie dostępne po konfiguracji bazy.")
    )
  }
  if (!email || !password) {
    redirect("/login?error=" + encodeURIComponent("Podaj e-mail i hasło."))
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(
      "/login?error=" + encodeURIComponent("Nieprawidłowy e-mail lub hasło.")
    )
  }

  redirect("/")
}
