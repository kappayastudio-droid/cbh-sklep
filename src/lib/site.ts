/** Bazowy adres serwisu (kanoniczne URL-e, sitemap, OG). Sterowany env. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cbh-sklep.vercel.app"

export const SITE_NAME = "CBH Polska"
export const SITE_DESCRIPTION =
  "Hurtownia kosmetyków fryzjerskich B2B — Chenice, 6 Zero, Color Clean. Ceny hurtowe dla zatwierdzonych klientów, płatności online, szybka wysyłka."
