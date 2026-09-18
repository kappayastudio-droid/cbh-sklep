import { ProductCard } from "@/components/product-card"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { getListingPrices, getVisibleProducts } from "@/lib/catalog"
import { getSession } from "@/lib/auth"
import { type Product } from "@/lib/products"
import { isProductAvailable } from "@/lib/availability"

// Wybrane bestsellery (kolejność zachowana).
const BESTSELLER_SLUGS = [
  "bottox-effect-4x50-ml",
  "kerabond-maska",
  "kerabond-hydrokeratin-shampoo",
  "liposomowe-farby-do-wlosow-1-1-5-100ml",
]

export async function BestsellersSection() {
  const [all, session] = await Promise.all([getVisibleProducts(), getSession()])
  const products = BESTSELLER_SLUGS.map((slug) =>
    all.find((p) => p.slug === slug)
  ).filter((p): p is Product => Boolean(p))
  const canSeePrices = session.isApproved
  const prices = canSeePrices ? await getListingPrices(products) : {}

  return (
    <Section surface="background">
      {/* Header */}
      <header className="mb-lg">
        <Typography variant="h4" as="h2">
          Bestsellery
        </Typography>
      </header>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.slug}
            available={isProductAvailable(p)}
            href={`/produkty/${p.slug}`}
            image={p.image}
            imageAlt={p.name}
            name={p.name}
            shortDescription={p.shortDescription}
            price={prices[p.slug]?.price ?? ""}
            oldPrice={prices[p.slug]?.oldPrice}
            promoPct={prices[p.slug]?.promoPct}
            isAuthenticated={canSeePrices}
          />
        ))}
      </div>
    </Section>
  )
}
