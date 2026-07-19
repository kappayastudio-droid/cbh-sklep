import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Tag } from "lucide-react"

import { PageBanner } from "@/components/layout/page-banner"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { getSession } from "@/lib/auth"
import { getPromoForUser } from "@/lib/promotions"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Promocje — CBH Polska",
  description:
    "Przecenione produkty dla klientów hurtowych B2B — widoczne po zalogowaniu.",
}

export const dynamic = "force-dynamic"

export default async function PromocjePage() {
  const session = await getSession()

  let promos: Awaited<ReturnType<typeof getPromoForUser>> = []
  if (session.isApproved) {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) promos = await getPromoForUser(user.id)
  }

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
        {!session.isApproved ? (
          /* Gość / konto niezatwierdzone — bramka B2B */
          <div className="mx-auto flex w-full max-w-[34rem] flex-col items-center gap-md rounded-lg border border-border bg-surface-1 p-lg text-center">
            <span
              className="grid size-12 place-items-center rounded-full bg-brand text-brand-foreground"
              aria-hidden
            >
              <Tag className="size-5" />
            </span>
            <Typography variant="subtitle1" as="h2" className="font-semibold">
              Promocje widoczne po zalogowaniu
            </Typography>
            <Typography variant="body2" className="text-muted-foreground">
              {session.isAuthenticated
                ? "Twoje konto B2B czeka na zatwierdzenie — po akceptacji zobaczysz swoje ceny i aktualne przeceny."
                : "Każdy klient hurtowy ma własną politykę cenową. Zaloguj się na konto B2B, aby zobaczyć przecenione produkty."}
            </Typography>
            {!session.isAuthenticated && (
              <div className="mt-2xs flex flex-wrap justify-center gap-sm">
                <Button variant="outline" render={<Link href="/login" />}>
                  Zaloguj się
                </Button>
                <Button render={<Link href="/rejestracja" />}>Załóż konto</Button>
              </div>
            )}
          </div>
        ) : promos.length === 0 ? (
          /* Zatwierdzony klient, brak przecen */
          <div className="mx-auto flex w-full max-w-[34rem] flex-col items-center gap-md py-xl text-center">
            <span
              className="grid size-12 place-items-center rounded-full bg-surface-2 text-muted-foreground"
              aria-hidden
            >
              <Tag className="size-5" />
            </span>
            <Typography variant="subtitle1" as="h2" className="font-semibold">
              Brak aktualnych promocji
            </Typography>
            <Typography variant="body2" className="text-muted-foreground">
              W tej chwili nie mamy dla Ciebie przecenionych produktów. Zajrzyj
              tu później albo przeglądaj pełny asortyment.
            </Typography>
            <Button render={<Link href="/sklep" />} className="mt-2xs gap-2xs">
              Przejdź do sklepu
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        ) : (
          /* Zatwierdzony klient, są przeceny */
          <>
            <Typography variant="body2" className="mb-lg text-muted-foreground">
              Przecenione produkty dostępne na Twoim koncie
              {promos.length ? ` (${promos.length})` : ""}.
            </Typography>
            <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
              {promos.map((p) => (
                <ProductCard
                  key={p.slug}
                  href={`/produkty/${p.slug}`}
                  image={p.image}
                  imageAlt={p.name}
                  name={p.name}
                  shortDescription={p.shortDescription}
                  price={p.newPrice}
                  oldPrice={p.oldPrice}
                  isAuthenticated
                />
              ))}
            </div>
          </>
        )}
      </Section>
    </>
  )
}
