import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Plus } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { ProductPurchase } from "@/components/product-purchase"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import {
  getListingPrices,
  getProductBySlug,
  getRelatedProducts,
  getVariantPrices,
  getVisibleProducts,
} from "@/lib/catalog"
import { getSession } from "@/lib/auth"
import { SITE_URL } from "@/lib/site"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return (await getVisibleProducts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Produkt nie znaleziony" }
  return {
    title: `${product.name} — CBH Polska`,
    description: product.shortDescription || product.name,
    alternates: { canonical: `/produkty/${product.slug}` },
    openGraph: {
      type: "website",
      title: product.name,
      description: product.shortDescription || undefined,
      url: `/produkty/${product.slug}`,
      images: product.image ? [{ url: product.image }] : undefined,
    },
  }
}

/** Rozwijana sekcja (accordion) — działa bez JS dzięki natywnemu <details>. */
function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  return (
    <details open={defaultOpen} className="group border-b border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between py-md text-subtitle2 font-medium uppercase tracking-wide text-foreground [&::-webkit-details-marker]:hidden">
        {title}
        <Plus
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45"
          aria-hidden
        />
      </summary>
      <div className="pb-md text-body2 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </details>
  )
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const related = await getRelatedProducts(slug)

  // Ceny/zakup tylko dla zatwierdzonego klienta B2B (reguła domenowa).
  const session = await getSession()
  const canSeePrices = session.isApproved

  const variantIds = product.variants.length
    ? product.variants.map((v) => v.id).filter((id): id is string => Boolean(id))
    : product.priceVariantId
      ? [product.priceVariantId]
      : []
  const priceMap = canSeePrices ? await getVariantPrices(variantIds) : {}
  const relatedPrices = canSeePrices ? await getListingPrices(related) : {}

  // Dane strukturalne produktu (bez ceny — ceny są tylko dla zalogowanych B2B).
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image
      ? [product.image.startsWith("http") ? product.image : SITE_URL + product.image]
      : undefined,
    description: product.shortDescription || product.name,
    ...(product.brand
      ? { brand: { "@type": "Brand", name: product.brand } }
      : {}),
    category: product.category,
    sku: product.slug,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <Section surface="background" innerClassName="flex flex-col gap-lg">
        {/* Breadcrumbs — powrót do strony głównej / kategorii */}
        <nav aria-label="Ścieżka nawigacji">
          <ol className="flex flex-wrap items-center gap-2xs text-caption text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Strona główna
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden />
            <li>
              <Link
                href="/sklep"
                className="transition-colors hover:text-foreground"
              >
                Sklep
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden />
            <li>
              <Link
                href={`/kategorie/${product.categorySlug}`}
                className="transition-colors hover:text-foreground"
              >
                {product.category}
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden />
            <li aria-current="page" className="text-foreground">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Układ: duże zdjęcie po lewej, treść po prawej */}
        <div className="grid grid-cols-1 gap-xl lg:grid-cols-[3fr_2fr] lg:gap-2xl">
          <div className="relative aspect-square overflow-hidden rounded-none bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-contain p-lg lg:p-xl"
            />
          </div>

          <div className="flex flex-col">
            {/* Kategoria */}
            <Link
              href={`/kategorie/${product.categorySlug}`}
              className="mb-sm text-overline uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              {product.category}
            </Link>

            {/* Tytuł */}
            <Typography variant="h4" as="h1" className="leading-tight">
              {product.name}
            </Typography>

            {/* Pojedynczy znacznik marki */}
            {product.brand && (
              <span className="mt-sm inline-flex w-fit items-center rounded-full bg-surface-2 px-3 py-1 text-caption font-medium text-foreground">
                {product.brand}
              </span>
            )}

            {product.shortDescription && (
              <Typography
                variant="body1"
                className="mt-md text-muted-foreground"
              >
                {product.shortDescription}
              </Typography>
            )}

            {/* Wybór wariantu + zakup — tylko dla zalogowanych (reguła B2B) */}
            <ProductPurchase
              attribute={product.variantAttribute}
              variants={product.variants}
              productSlug={product.slug}
              productName={product.name}
              productImage={product.image}
              priceVariantId={product.priceVariantId}
              prices={priceMap}
              isAuthenticated={canSeePrices}
            />

            {/* Rozwijane sekcje */}
            <div className="mt-xl border-t border-border">
              {product.description && (
                <Accordion title="Opis produktu" defaultOpen>
                  <div
                    className="[&_a]:text-foreground [&_a]:underline [&_li]:ml-md [&_li]:list-disc [&_p]:mb-sm [&_strong]:text-foreground [&_ul]:mb-sm [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2xs"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </Accordion>
              )}

              <Accordion title="Dostawa i płatność">
                <p className="mb-sm">
                  Wysyłka realizowana w 1–2 dni robocze. Płatności online przez
                  Przelewy24 (BLIK, przelew, karta) — dostępne po zalogowaniu na
                  konto B2B.
                </p>
                <p>
                  Do każdego zamówienia wystawiamy fakturę VAT wysyłaną
                  automatycznie na adres e-mail.
                </p>
              </Accordion>

              <Accordion title="Zwroty i reklamacje">
                <p>
                  Reklamacje i zwroty rozpatrujemy zgodnie z warunkami współpracy
                  hurtowej. W razie pytań skontaktuj się z opiekunem handlowym.
                </p>
              </Accordion>
            </div>
          </div>
        </div>
      </Section>

      {/* Zobacz też */}
      {related.length > 0 && (
        <Section surface="background">
          <header className="mb-xl">
            <Typography variant="h4" as="h2">
              Zobacz też
            </Typography>
          </header>
          <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
            {related.slice(0, 4).map((p) => (
              <ProductCard
                key={p.slug}
                href={`/produkty/${p.slug}`}
                image={p.image}
                imageAlt={p.name}
                name={p.name}
                shortDescription={p.shortDescription}
                price={relatedPrices[p.slug] ?? ""}
                isAuthenticated={canSeePrices}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
