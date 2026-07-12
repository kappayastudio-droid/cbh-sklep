import { createClient } from "@/lib/supabase/server"

export type SessionInfo = {
  isAuthenticated: boolean
  isApproved: boolean
  isAdmin: boolean
  email: string | null
}

const EMPTY: SessionInfo = {
  isAuthenticated: false,
  isApproved: false,
  isAdmin: false,
  email: null,
}

/**
 * Zwraca stan sesji dla Server Components / akcji.
 * Bez skonfigurowanego Supabase (lub przy błędzie) zwraca stan „niezalogowany" —
 * nigdy nie rzuca, więc strona działa na statycznym katalogu przed podłączeniem bazy.
 */
export async function getSession(): Promise<SessionInfo> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return EMPTY
  }
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return EMPTY

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_approved, role")
      .eq("id", user.id)
      .maybeSingle()

    return {
      isAuthenticated: true,
      isApproved: Boolean(profile?.is_approved),
      isAdmin: profile?.role === "admin",
      email: user.email ?? null,
    }
  } catch {
    return EMPTY
  }
}
