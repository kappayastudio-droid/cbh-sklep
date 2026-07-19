import type { MetadataRoute } from "next"

import { SITE_DESCRIPTION } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CBH Polska — Hurtownia kosmetyków fryzjerskich B2B",
    short_name: "CBH Polska",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f0efeb",
    theme_color: "#787169",
    lang: "pl",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
