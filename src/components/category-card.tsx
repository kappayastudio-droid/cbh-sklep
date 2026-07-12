import Image from "next/image"
import Link from "next/link"

import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

export type CategoryCardProps = {
  href: string
  image: string
  imageAlt: string
  name: string
  productCount: number
  className?: string
}

export function CategoryCard({
  href,
  image,
  imageAlt,
  name,
  productCount,
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn("group block", className)}
      aria-label={`${name} — ${productCount} produktów`}
    >
      {/* Zdjęcie */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-none bg-surface-2">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Podpis — pod zdjęciem */}
      <div className="mt-sm">
        <Typography
          variant="subtitle1"
          as="h3"
          className="font-semibold text-foreground transition-colors group-hover:text-muted-foreground"
        >
          {name}
        </Typography>
        <Typography variant="caption" className="text-muted-foreground">
          {productCount} produktów
        </Typography>
      </div>
    </Link>
  )
}
