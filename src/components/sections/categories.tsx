import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CategoryCard } from "@/components/category-card"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { getCategories, getVisibleProducts } from "@/lib/catalog"

// Dedykowane zdjęcia kategorii (public/kategorie/); reszta = zdjęcie pierwszego produktu.
const CATEGORY_HERO: Record<string, string> = {
  "ochrona-wlosow": "/kategorie/ochrona-wlosow.png",
  szampony: "/kategorie/szampony.png",
  stylizacja: "/kategorie/stylizacja.png",
  "odbudowa-wlosow": "/kategorie/odbudowa-wlosow.png",
  koloryzacja: "/kategorie/koloryzacja.png",
  "produkty-techniczne": "/kategorie/produkty-techniczne.png",
}

export async function CategoriesSection() {
  const [allCategories, products] = await Promise.all([
    getCategories(),
    getVisibleProducts(),
  ])
  const categories = allCategories.slice(0, 6).map((c) => {
    const image =
      CATEGORY_HERO[c.slug] ??
      products.find((p) => p.categories.some((pc) => pc.slug === c.slug))
        ?.image ??
      "/hero-2.png"
    return { ...c, image }
  })

  return (
    <Section surface="background" className="bg-[#fdfcfa]">
      {/* Header — title left, view all button right */}
      <header className="mb-lg flex items-center justify-between gap-md">
        <Typography variant="h4" as="h2">
          Kategorie
        </Typography>
        <Button variant="outline" render={<Link href="/sklep" />}>
          Cały asortyment
        </Button>
      </header>

      {/* Grid 3 cols desktop, 2 tablet, 1 mobile */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <CategoryCard
            key={c.slug}
            href={`/kategorie/${c.slug}`}
            image={c.image}
            imageAlt={c.name}
            name={c.name}
            productCount={c.count}
          />
        ))}
      </div>
    </Section>
  )
}
