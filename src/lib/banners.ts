import "server-only"

import { createClient } from "@/lib/supabase/server"

export type Banner = {
  id: string
  sort: number
  isPublished: boolean
  image: string
  alt: string
  eyebrow: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
}

/**
 * Treść awaryjna — używana, gdy baza jest niedostępna albo tabela `banners`
 * jeszcze nie istnieje (migracja 0005 nie została uruchomiona). Dzięki temu
 * strona główna nigdy nie zostaje bez banera.
 */
const FALLBACK: Banner[] = [
  {
    id: "fallback-colorclean",
    sort: 10,
    isPublished: true,
    image: "/banner-colorclean.jpg",
    alt: "Color Clean — chusteczki do usuwania koloru",
    eyebrow: "Producent",
    title:
      "Jesteśmy producentem kultowych chusteczek po koloryzacji Color Clean",
    subtitle:
      "Błyskawicznie usuwają plamy z farby ze skóry, bez szorowania i podrażnień. Z Aloe Vera i Pro-Witaminą B5, które pielęgnują skórę.",
    ctaLabel: "Zobacz Color Clean",
    ctaHref: "/produkty/color-clean-chusteczki",
  },
  {
    id: "fallback-lhc",
    sort: 20,
    isPublished: true,
    image: "/hero-lhc.png",
    alt: "LHC · liposomowe farby do włosów z wodą termalną",
    eyebrow: "Nowość",
    title: "LHC · liposomowe farby do włosów",
    subtitle:
      "Nowa generacja koloryzacji: system aktywacji liposomowej, woda termalna i olej arganowy dają trwały, lśniący kolor o niskiej zawartości amoniaku.",
    ctaLabel: "Sprawdź",
    ctaHref: "/produkty/liposomowe-farby-do-wlosow-1-1-5-100ml",
  },
  {
    id: "fallback-bottox",
    sort: 30,
    isPublished: true,
    image: "/hero-2.png",
    alt: "Bottox Effect — kuracja nawilżająca",
    eyebrow: "Kuracja nawilżająca",
    title: "Bottox Effect · głębokie nawilżenie",
    subtitle:
      "Kwas hialuronowy, kolagen i keratyna w jednym zabiegu. Włosy gładkie, błyszczące i odporniejsze na zniszczenie, bez prostowania.",
    ctaLabel: "Zobacz produkt",
    ctaHref: "/sklep",
  },
]

function mapRow(r: Record<string, unknown>): Banner {
  return {
    id: String(r.id),
    sort: Number(r.sort ?? 0),
    isPublished: Boolean(r.is_published),
    image: String(r.image ?? ""),
    alt: String(r.alt ?? ""),
    eyebrow: String(r.eyebrow ?? ""),
    title: String(r.title ?? ""),
    subtitle: String(r.subtitle ?? ""),
    ctaLabel: String(r.cta_label ?? ""),
    ctaHref: String(r.cta_href ?? ""),
  }
}

/** Opublikowane banery w kolejności — do karuzeli na stronie głównej. */
export async function getBanners(): Promise<Banner[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("banners")
      .select(
        "id, sort, is_published, image, alt, eyebrow, title, subtitle, cta_label, cta_href"
      )
      .eq("is_published", true)
      .order("sort", { ascending: true })
    if (error || !data || data.length === 0) return FALLBACK
    return data.map(mapRow)
  } catch {
    return FALLBACK
  }
}
