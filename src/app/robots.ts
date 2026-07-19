import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Strefy prywatne / transakcyjne — poza indeksem.
      disallow: [
        "/admin",
        "/konto",
        "/koszyk",
        "/zamowienie",
        "/login",
        "/rejestracja",
        "/reset-hasla",
        "/api/",
        "/design-system",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
