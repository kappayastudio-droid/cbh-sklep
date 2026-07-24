import { NextResponse, type NextRequest } from "next/server"

import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  // Tryb „w budowie": MAINTENANCE_MODE=true → wszyscy widzą stronę /wkrotce,
  // oprócz osób z linkiem podglądu (?preview=<MAINTENANCE_BYPASS> → cookie).
  if (process.env.MAINTENANCE_MODE === "true") {
    const { pathname, searchParams } = request.nextUrl
    const bypassToken = process.env.MAINTENANCE_BYPASS || ""
    const hasBypassCookie = request.cookies.get("cbh-preview")?.value === "1"

    // Link podglądu: ?preview=TOKEN → ustaw cookie i wróć na czysty URL.
    if (bypassToken && searchParams.get("preview") === bypassToken) {
      const url = request.nextUrl.clone()
      url.searchParams.delete("preview")
      const res = NextResponse.redirect(url)
      res.cookies.set("cbh-preview", "1", {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      })
      return res
    }

    const allowed =
      pathname === "/wkrotce" ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next")

    if (!allowed && !hasBypassCookie) {
      const url = request.nextUrl.clone()
      url.pathname = "/wkrotce"
      url.search = ""
      return NextResponse.rewrite(url)
    }
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Wszystkie ścieżki poza statykami i obrazami — tam sesja nie jest potrzebna.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)",
  ],
}
