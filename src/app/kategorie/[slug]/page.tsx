import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import {
  getCategories,
  getListingPrices,
  getProductsByCategory,
} from "@/lib/catalog"
import { getSession } from "@/lib/auth"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = (await getCategories()).find((c) => c.slug === slug)
  if (!category) return { title: "Kategoria nie znaleziona" }
  return { title: `${category.name} — CBH Polska` }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = (await getCategories()).find((c) => c.slug === slug)
  if (!category) notFound()

  const products = await getProductsByCategory(slug)
  const session = await getSession()
  const canSeePrices = session.isApproved
  const prices = canSeePrices ? await getListingPrices(products) : {}

  return (
    <Section surface="background">
      {/* Breadcrumbs */}
      <nav aria-label="Ścieżka nawigacji" className="mb-lg">
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
            {category.name}
          </li>
        </ol>
      </nav>

      <header className="mb-xl flex flex-col gap-2xs">
        <Typography variant="h3" as="h1">
          {category.name}
        </Typography>
        <Typography variant="body2" className="text-muted-foreground">
          {products.length} produktów
        </Typography>
      </header>

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
    </Section>
  )
}
