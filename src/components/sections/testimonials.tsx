import Image from "next/image"

import { Typography } from "@/components/ui/typography"
import { Section } from "@/components/ui/section"

type Testimonial = {
  quote: string
  name: string
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    quote: "Super szybka dostawa — polecam!",
    name: "Paulina Rybsin",
    avatar: "/opinie/paulina.jpg",
  },
  {
    quote: "Wzorowa współpraca, towar zawsze na czas.",
    name: "Lucyna Mackiewicz",
    avatar: "/opinie/lucyna.jpg",
  },
  {
    quote:
      "Dobre warunki handlowe, możliwość negocjacji cen i elastyczność dostaw.",
    name: "Alicja Kempa",
    avatar: "/opinie/alicja.jpg",
  },
  {
    quote: "Profesjonalne doradztwo, klienci salonu są zachwyceni!",
    name: "Mateusz Janas",
    avatar: "/opinie/mateusz.jpg",
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function TestimonialsSection() {
  return (
    <Section surface="background">
      <header className="mb-lg">
        <Typography variant="h4" as="h2">
          Opinie
        </Typography>
      </header>

      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        {testimonials.map((t) => (
          <article
            key={t.name}
            className="rounded-md bg-surface-1 p-lg"
          >
            <blockquote className="text-body1 mb-lg">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <footer className="flex items-center gap-sm">
              {t.avatar ? (
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="size-10 shrink-0 rounded-full object-cover object-top"
                />
              ) : (
                <div
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-3"
                  aria-hidden
                >
                  <span className="text-caption font-semibold text-foreground/70">
                    {getInitials(t.name)}
                  </span>
                </div>
              )}
              <Typography
                variant="overline"
                className="text-muted-foreground"
              >
                {t.name}
              </Typography>
            </footer>
          </article>
        ))}
      </div>
    </Section>
  )
}
