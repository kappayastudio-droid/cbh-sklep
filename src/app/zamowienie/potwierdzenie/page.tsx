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
  const { clear, hydrated } = useCart()

  // Zamówienie złożone → czyścimy koszyk.
  //
  // MUSI czekać na `hydrated`. Po płatności wracamy tu z Przelewy24 jako NOWE
  // wejście na stronę, a React uruchamia efekty od dziecka do rodzica: efekt
  // tej strony wykonałby się PRZED efektem CartProvidera, który dopiero wczytuje
  // koszyk z localStorage. Wyczyszczony koszyk byłby więc natychmiast odtworzony
  // i zapisany z powrotem — dokładnie to widać było w sklepie.
  React.useEffect(() => {
    if (!hydrated) return
    clear()
  }, [hydrated, clear])

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
            Dziękujemy! Przyjęliśmy Twoje zamówienie. Potwierdzenie wyślemy na
            Twój adres e-mail. Jeśli płatność online została zrealizowana,
            zaksięgujemy ją automatycznie po potwierdzeniu przez Przelewy24.
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
