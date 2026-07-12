"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

/** Wylogowanie — używane przez formularz w nawigacji. */
export async function logout() {
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient()
      await supabase.auth.signOut()
    } catch {
      // ignorujemy — i tak przekierujemy na stronę główną
    }
  }
  redirect("/")
}
