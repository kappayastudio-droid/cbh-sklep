import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Klient z kluczem SERVICE ROLE — omija RLS. WYŁĄCZNIE po stronie serwera:
 * webhooki (P24), operacje administracyjne, skrypt importu katalogu.
 * NIGDY nie importować do kodu klienckiego.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(
      "Brak NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY — skonfiguruj .env.local"
    )
  }
  return createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
