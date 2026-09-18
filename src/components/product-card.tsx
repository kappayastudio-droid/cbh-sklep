import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { UNAVAILABLE_LABEL } from "@/lib/availability"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

// Ikona użytkownika (Phosphor Icons, „user" regular) — inline SVG.
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" fill="currentColor" {...props}>
    <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z" />
  </svg>
)

export type ProductCardProps = {
  href: string
  image: string
  imageAlt: string
  name: string
  shortDescription: string
  /** Cena (string sformatowany, np. "35,00 zł"). Wyświetlana tylko gdy isAuthenticated. */
  price: string
  /** Cena sprzed promocji (przekreślona) — opcjonalnie, tylko gdy isAuthenticated. */
  oldPrice?: string
  /** Wysokość promocji w % — plakietka „−20%" obok ceny. */
  promoPct?: number
  /** Stan zalogowania użytkownika. Domyślnie false → login-gated CTA. */
  isAuthenticated?: boolean
  /** Brak na stanie → przycisk wyłączony i komunikat zamiast CTA. */
  available?: boolean
  className?: string
}

export function ProductCard({
  href,
  image,
  imageAlt,
  name,
  shortDescription,
  price,
  oldPrice,
  promoPct,
  isAuthenticated = false,
  available = true,
  className,
}: ProductCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-none bg-background",
        className
      )}
    >
      {/* Image */}
      <Link
        href={href}
        className="relative block aspect-square overflow-hidden bg-white"
        aria-label={name}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2xs p-md">
        <Link
          href={href}
          className="transition-colors hover:text-muted-foreground"
        >
          <Typography
            variant="subtitle1"
            as="h3"
            className="line-clamp-2 text-[14px] font-semibold"
          >
            {name}
          </Typography>
        </Link>

        <Typography
          variant="body2"
          className="line-clamp-2 text-[13px] text-muted-foreground"
        >
          {shortDescription}
        </Typography>

        {isAuthenticated ? (
          <>
            <div className="mt-auto flex items-baseline gap-2xs pt-sm">
              {oldPrice && (
                <span className="text-caption text-muted-foreground line-through">
                  {oldPrice}
                </span>
              )}
              <Typography variant="subtitle1" as="span" className="font-semibold">
                {price || "Cena na zapytanie"}
                {price && (
                  <span className="ml-sm text-caption font-normal text-muted-foreground">
                    netto
                  </span>
                )}
              </Typography>
              {price && promoPct ? (
                <span className="ml-xs rounded-full bg-[#8c3f2a] px-2 py-0.5 text-caption font-medium text-white">
                  −{promoPct}%
                </span>
              ) : null}
            </div>
            {available ? (
              <Button
                size="lg"
                className="mt-md w-full justify-between bg-primary font-medium text-primary-foreground hover:bg-primary/90"
                render={<Link href={href} />}
              >
                <span>Do koszyka</span>
                <ShoppingBag className="size-4" aria-hidden />
              </Button>
            ) : (
              <Button
                size="lg"
                disabled
                className="mt-md w-full justify-center font-medium"
                aria-label={`${name} — ${UNAVAILABLE_LABEL}`}
              >
                {UNAVAILABLE_LABEL}
              </Button>
            )}
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="mt-auto inline-flex items-center gap-2xs pt-sm text-[14px] font-medium text-[#787169] transition-colors hover:text-[#5f594f]"
            >
              <UserIcon className="size-4 shrink-0" aria-hidden />
              Zaloguj się, aby zobaczyć cenę
            </Link>
            {!available && (
              <p className="mt-sm text-caption text-muted-foreground">
                {UNAVAILABLE_LABEL}
              </p>
            )}
            <Button
              size="lg"
              className="mt-md w-full border-[#787169] bg-[#787169] font-medium text-white hover:bg-[#6c665f]"
              render={<Link href={href} />}
            >
              Dowiedz się więcej
            </Button>
          </>
        )}
      </div>
    </article>
  )
}
