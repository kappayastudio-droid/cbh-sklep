import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Odświeża sesję Supabase przy każdym żądaniu (wymagane przez @supabase/ssr).
 * Jeśli env nie jest jeszcze skonfigurowane, robi no-op — strona działa dalej
 * na statycznym katalogu, dopóki nie podłączymy Supabase.
 *
 * Zwraca też `isAuthenticated`, żeby middleware mógł osłonić ścieżki zakupowe
 * bez drugiego odpytania Supabase.
 */
export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    return { response: NextResponse.next({ request }), isAuthenticated: false }
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // NIE wstawiać logiki między createServerClient a getUser — psuje odświeżanie tokenu.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { response: supabaseResponse, isAuthenticated: Boolean(user) }
}
