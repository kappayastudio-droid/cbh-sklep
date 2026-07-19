import type { Metadata } from "next"
import Link from "next/link"
import { Home, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"

export const metadata: Metadata = {
  title: "Nie znaleziono strony (404) — CBH Polska",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <Section surface="background">
      <div className="mx-auto flex w-full max-w-[34rem] flex-col items-center py-2xl text-center">
        <span className="mb-md font-serif text-[96px] leading-none tracking-tight text-[#787169]">
          404
        </span>
        <Typography variant="h4" as="h1" className="mb-sm">
          Nie znaleźliśmy tej strony
        </Typography>
        <Typography variant="body1" className="mb-xl text-muted-foreground">
          Strona mogła zostać przeniesiona lub usunięta, a produkt — zmienić
          adres. Sprawdź pisownię albo wróć do sklepu.
        </Typography>
        <div className="flex flex-col gap-sm sm:flex-row">
          <Button size="lg" render={<Link href="/" />}>
            <Home className="size-4" aria-hidden />
            Strona główna
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/sklep" />}>
            <Search className="size-4" aria-hidden />
            Przeglądaj sklep
          </Button>
        </div>
      </div>
    </Section>
  )
}
