import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { PageBanner } from "@/components/layout/page-banner"
import { ProductCard } from "@/components/product-card"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { getListingPrices, getVisibleProducts } from "@/lib/catalog"
import { getSession } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Sklep — CBH Polska",
  description:
    "Pełny asortyment produktów profesjonalnych. Ceny hurtowe dostępne po zalogowaniu.",
}

type PageProps = {
  searchParams: Promise<{ q?: string }>
}

/** Normalizacja pod wyszukiwanie: małe litery + spłaszczenie polskich znaków. */
const PL_MAP: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ż: "z",
  ź: "z",
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[ąćęłńóśżź]/g, (ch) => PL_MAP[ch] ?? ch)
}

export default async function ShopPage({ searchParams }: PageProps) {
  const { q } = await searchParams
  const query = (q ?? "").trim()

  let products = await getVisibleProducts()
  if (query) {
    const needle = normalize(query)
    products = products.filter(
      (p) =>
        normalize(p.name).includes(needle) ||
        normalize(p.shortDescription).includes(needle) ||
        normalize(p.category).includes(needle)
    )
  }

  const session = await getSession()
  const canSeePrices = session.isApproved
  const prices = canSeePrices ? await getListingPrices(products) : {}

  return (
    <>
      {/* Wyniki wyszukiwania: prosty heading (czarny na białym), bez banneru ze zdjęciem */}
      {query ? (
        <Section surface="background" innerClassName="flex flex-col gap-sm" className="!pb-0">
          <nav aria-label="Ścieżka nawigacji">
            <ol className="flex flex-wrap items-center gap-2xs text-caption text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Strona główna
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden />
              <li>
                <Link href="/sklep" className="transition-colors hover:text-foreground">
                  Sklep
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden />
              <li aria-current="page" className="text-foreground">
                Wyniki wyszukiwania
              </li>
            </ol>
          </nav>
          <Typography variant="h3" as="h1">
            Wyniki wyszukiwania
          </Typography>
        </Section>
      ) : (
        <PageBanner
          title="Sklep"
          crumbs={[{ href: "/", label: "Strona główna" }, { label: "Sklep" }]}
        />
      )}
      <Section surface="background" className="lg:!pt-10">
        <Typography variant="body2" className="mb-xl text-muted-foreground">
          {query ? (
            <>
              {products.length}{" "}
              {products.length === 1 ? "produkt" : "produktów"} dla „{query}”
            </>
          ) : (
            <>{products.length} produktów · ceny hurtowe po zalogowaniu</>
          )}
        </Typography>

        {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard
              key={p.slug}
              href={`/produkty/${p.slug}`}
              image={p.image}
              imageAlt={p.name}
              name={p.name}
              shortDescription={p.shortDescription}
              price={prices[p.slug] ?? ""}
              isAuthenticated={canSeePrices}
            />
          ))}
        </div>
        ) : (
          <Typography variant="body1" className="text-muted-foreground">
            Brak produktów pasujących do zapytania. Spróbuj innych słów
            kluczowych.
          </Typography>
        )}
      </Section>
    </>
  )
}
