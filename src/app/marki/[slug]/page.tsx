import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BrandProducts } from "@/components/brand-products"
import { PageBanner } from "@/components/layout/page-banner"
import { Section } from "@/components/ui/section"
import { getBrands, getListingPrices, getProductsByBrand } from "@/lib/catalog"
import { getSession } from "@/lib/auth"
import { breadcrumbLd } from "@/lib/jsonld"
import { brandIntro } from "@/lib/seo-intros"
import { Typography } from "@/components/ui/typography"

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
  const intro = brandIntro(slug, brand.name)
  return {
    title: `${brand.name} — CBH Polska`,
    description: intro,
    alternates: { canonical: `/marki/${slug}` },
    openGraph: {
      type: "website",
      title: `${brand.name} — CBH Polska`,
      description: intro,
      url: `/marki/${slug}`,
    },
  }
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params
  const brand = (await getBrands()).find((b) => b.slug === slug)
  if (!brand) notFound()

  const products = await getProductsByBrand(slug)
  const session = await getSession()
  const canSeePrices = session.isApproved
  const prices = canSeePrices ? await getListingPrices(products) : {}
  const intro = brandIntro(slug, brand.name)
  const crumbsLd = breadcrumbLd([
    { name: "Strona główna", path: "/" },
    { name: "Sklep", path: "/sklep" },
    { name: brand.name, path: `/marki/${slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />
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
        <Typography
          variant="body1"
          className="mb-lg max-w-[46rem] text-muted-foreground"
        >
          {intro}
        </Typography>
        <BrandProducts
          products={products}
          prices={prices}
          isAuthenticated={canSeePrices}
        />
      </Section>
    </>
  )
}
