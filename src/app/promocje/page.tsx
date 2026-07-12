import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Tag } from "lucide-react"

import { PageBanner } from "@/components/layout/page-banner"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { getFeaturedProducts } from "@/lib/products"

export const metadata: Metadata = {
  title: "Promocje — CBH Polska",
  description:
    "Indywidualne rabaty i promocje dla klientów hurtowych B2B — widoczne po zalogowaniu.",
}

export default function PromocjePage() {
  const featured = getFeaturedProducts(8)

  return (
    <>
      <PageBanner
        title="Promocje"
        image="/banner-promocje.jpg"
        crumbs={[
          { href: "/", label: "Strona główna" },
          { label: "Promocje" },
        ]}
      />
      <Section surface="background" className="lg:!pt-10">
        <Typography variant="body2" className="mb-lg text-muted-foreground">
          Oferty specjalne dla autoryzowanych klientów hurtowych.
        </Typography>

        {/* Bramka B2B — rabaty widoczne po zalogowaniu (indywidualna polityka cenowa) */}
        <div className="flex flex-col gap-md rounded-lg border border-border bg-surface-1 p-lg">
          <span
            className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground"
            aria-hidden
          >
            <Tag className="size-5" />
          </span>
          <Typography variant="subtitle1" as="h2" className="font-semibold">
            Indywidualne rabaty B2B
          </Typography>
          <Typography variant="body2" className="text-muted-foreground">
            Każdy klient hurtowy ma własną politykę cenową i promocje dopasowane
            do współpracy. Zaloguj się na konto B2B, aby zobaczyć aktualne ceny i
            oferty specjalne.
          </Typography>
          <div className="mt-2xs flex flex-wrap gap-sm">
            <Button variant="outline" render={<Link href="/login" />}>
              Zaloguj się
            </Button>
            <Button render={<Link href="/rejestracja" />}>Załóż konto</Button>
          </div>
        </div>
      </Section>

      {/* Polecane produkty */}
      <Section surface="background">
        <header className="mb-xl flex items-center justify-between gap-md">
          <Typography variant="h4" as="h2">
            Polecane produkty
          </Typography>
          <Button
            variant="outline"
            render={<Link href="/sklep" />}
            className="gap-2xs"
          >
            Cały asortyment
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </header>

        <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard
              key={p.slug}
              href={`/produkty/${p.slug}`}
              image={p.image}
              imageAlt={p.name}
              name={p.name}
              shortDescription={p.shortDescription}
              price=""
            />
          ))}
        </div>
      </Section>
    </>
  )
}
