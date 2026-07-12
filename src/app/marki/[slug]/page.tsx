import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BrandProducts } from "@/components/brand-products"
import { PageBanner } from "@/components/layout/page-banner"
import { Section } from "@/components/ui/section"
import { getBrands, getListingPrices, getProductsByBrand } from "@/lib/catalog"
import { getSession } from "@/lib/auth"

type PageProps = {
  params: Promise<{ slug: string }>
}

// Dedykowane bannery marek (public/); reszta używa domyślnego /banner-hair.jpg.
const BRAND_BANNER: Record<string, string> = {
  "6-zero": "/banner-6zero.jpg",
  "color-clean": "/banner-colorclean.jpg",
  chenice: "/banner-chenice.jpg",
}

export async function generateStaticParams() {
  return (await getBrands()).map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const brand = (await getBrands()).find((b) => b.slug === slug)
  if (!brand) return { title: "Marka nie znaleziona" }
  return { title: `${brand.name} — CBH Polska` }
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params
  const brand = (await getBrands()).find((b) => b.slug === slug)
  if (!brand) notFound()

  const products = await getProductsByBrand(slug)
  const session = await getSession()
  const canSeePrices = session.isApproved
  const prices = canSeePrices ? await getListingPrices(products) : {}

  return (
    <>
      <PageBanner
        title={brand.name}
        image={BRAND_BANNER[slug]}
        crumbs={[
          { href: "/", label: "Strona główna" },
          { href: "/sklep", label: "Sklep" },
          { label: brand.name },
        ]}
      />
      <Section surface="background" className="lg:!pt-10">
        <BrandProducts
          products={products}
          prices={prices}
          isAuthenticated={canSeePrices}
        />
      </Section>
    </>
  )
}
