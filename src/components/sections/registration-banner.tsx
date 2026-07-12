import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"

type RegistrationBannerProps = {
  isAuthenticated?: boolean
  isApproved?: boolean
}

export function RegistrationBanner({
  isAuthenticated = false,
  isApproved = false,
}: RegistrationBannerProps) {
  let heading: string
  let subtitle: string
  let ctaLabel: string
  let ctaHref: string

  if (!isAuthenticated) {
    heading =
      "Zarejestruj się w naszym sklepie i odbierz wyjątkowy pakiet korzyści."
    subtitle = "Ciesz się atrakcyjnymi rabatami i darmowymi akcesoriami!"
    ctaLabel = "Zarejestruj się"
    ctaHref = "/rejestracja"
  } else if (isApproved) {
    heading = "Witaj ponownie w CBH Polska."
    subtitle =
      "Twoje indywidualne ceny hurtowe są aktywne. Sprawdź nowości w ofercie."
    ctaLabel = "Przejdź do sklepu"
    ctaHref = "/sklep"
  } else {
    heading = "Dziękujemy za rejestrację!"
    subtitle =
      "Twoje konto B2B czeka na zatwierdzenie — damy znać mailowo, gdy ceny hurtowe będą widoczne."
    ctaLabel = "Moje konto"
    ctaHref = "/konto"
  }

  return (
    <section
      className="section-x pb-md pt-xl"
      aria-label="Zaproszenie do rejestracji"
    >
      <div className="container-content relative overflow-hidden rounded-lg">
        {/* Background image */}
        <Image
          src="/banner-hair.jpg"
          alt=""
          fill
          sizes="(min-width: 1120px) 1120px, 100vw"
          className="object-cover"
          aria-hidden
        />

        {/* Dark overlay — silniejszy po lewej (gdzie tekst) */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"
          aria-hidden
        />

        {/* Content */}
        <div className="relative flex items-center px-lg py-xl md:px-2xl md:py-[44px]">
          <div className="w-full max-w-[28rem] text-white">
            {/* Brand mark — logo CBH Polska (białe) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-white.svg"
              alt="CBH Polska"
              className="mb-lg h-9 w-auto md:mb-xl md:h-11"
            />

            <Typography
              variant="h4"
              as="h2"
              className="mb-md text-balance leading-tight"
            >
              {heading}
            </Typography>

            <Typography variant="body2" className="mb-lg opacity-90">
              {subtitle}
            </Typography>

            <Button
              size="lg"
              className="h-12 bg-[#f0efeb] px-lg font-medium text-foreground hover:bg-[#787169] hover:text-white"
              render={<Link href={ctaHref} />}
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
