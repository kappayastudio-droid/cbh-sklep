import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

export type Crumb = { href?: string; label: string }

/** Wąski banner podstrony: tło ze zdjęciem, breadcrumbs + tytuł w bieli. */
export function PageBanner({
  title,
  crumbs,
  image = "/banner-hair.jpg",
  className,
  imageClassName = "object-cover",
  overlayClassName = "bg-black/55",
}: {
  title: string
  crumbs: Crumb[]
  image?: string
  /** Dodatkowe klasy sekcji (np. min-h dla wyższego banneru). */
  className?: string
  /** Klasy obrazu — np. object-position, by pokazać właściwy fragment. */
  imageClassName?: string
  /** Klasy nakładki — np. gradient zamiast pełnego przyciemnienia. */
  overlayClassName?: string
}) {
  return (
    <section
      className={cn("relative overflow-hidden bg-surface-2", className)}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className={imageClassName}
        aria-hidden
      />
      <div className={cn("absolute inset-0", overlayClassName)} aria-hidden />

      <div className="section-x relative">
        <div className="mx-auto flex max-w-[var(--container-content)] flex-col gap-sm py-xl text-white">
          <nav aria-label="Ścieżka nawigacji">
            <ol className="flex flex-wrap items-center gap-2xs text-caption text-white/80">
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center gap-2xs">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && (
                    <ChevronRight className="size-3.5" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <Typography variant="h3" as="h1">
            {title}
          </Typography>
        </div>
      </div>
    </section>
  )
}
