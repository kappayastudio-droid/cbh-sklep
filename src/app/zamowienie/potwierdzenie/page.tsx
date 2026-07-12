"use client"

import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import * as React from "react"

import { PageBanner } from "@/components/layout/page-banner"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { useCart } from "@/lib/cart/cart-context"

export default function OrderConfirmationPage() {
  const { clear } = useCart()

  // Zamówienie złożone → czyścimy koszyk (raz, po wejściu na stronę).
  React.useEffect(() => {
    clear()
  }, [clear])

  return (
    <>
      <PageBanner
        title="Dziękujemy za zamówienie"
        image="/banner-koszyk.jpg"
        crumbs={[
          { href: "/", label: "Strona główna" },
          { label: "Potwierdzenie" },
        ]}
      />
      <Section surface="background" className="lg:!pt-10">
        <div className="mx-auto w-full max-w-[28rem] py-xl text-center">
          <span className="mx-auto mb-md grid size-14 place-items-center rounded-full bg-[#787169]/10 text-[#787169]">
            <CheckCircle2 className="size-7" aria-hidden />
          </span>
          <Typography variant="h5" as="h2" className="mb-sm">
            Zamówienie zostało złożone
          </Typography>
          <Typography variant="body2" className="mb-lg text-muted-foreground">
            Dziękujemy! Przyjęliśmy Twoje zamówienie do realizacji. Wkrótce
            potwierdzimy je mailowo. Płatność online i faktura zostaną dodane w
            kolejnym etapie.
          </Typography>
          <div className="flex flex-col items-center gap-sm sm:flex-row sm:justify-center">
            <Button size="lg" render={<Link href="/sklep" />}>
              Wróć do sklepu
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
