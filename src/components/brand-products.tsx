"use client"

import * as React from "react"

import { ProductCard } from "@/components/product-card"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products"

/** Lista produktów marki z filtrowaniem po podkategoriach (chipy). */
export function BrandProducts({
  products,
  prices = {},
  isAuthenticated = false,
}: {
  products: Product[]
  prices?: Record<string, string>
  isAuthenticated?: boolean
}) {
  // Zbierz unikalne podkategorie występujące wśród produktów tej marki (z licznikiem).
  const subcategories = React.useMemo(() => {
    const map = new Map<string, { name: string; slug: string; count: number }>()
    for (const p of products) {
      for (const c of p.categories) {
        const entry = map.get(c.slug)
        if (entry) entry.count += 1
        else map.set(c.slug, { name: c.name, slug: c.slug, count: 1 })
      }
    }
    return [...map.values()].sort((a, b) => b.count - a.count)
  }, [products])

  const [active, setActive] = React.useState<string | null>(null)

  const filtered = React.useMemo(
    () =>
      active
        ? products.filter((p) => p.categories.some((c) => c.slug === active))
        : products,
    [products, active]
  )

  return (
    <>
      {/* Filtry — pokazuj tylko gdy jest z czego wybierać */}
      {subcategories.length > 1 && (
        <div
          role="group"
          aria-label="Filtruj po kategorii"
          className="mb-lg flex flex-wrap gap-xs"
        >
          <FilterChip
            active={active === null}
            onClick={() => setActive(null)}
            label="Wszystkie"
            count={products.length}
          />
          {subcategories.map((c) => (
            <FilterChip
              key={c.slug}
              active={active === c.slug}
              onClick={() => setActive(c.slug)}
              label={c.name}
              count={c.count}
            />
          ))}
        </div>
      )}

      <Typography variant="body2" className="mb-lg text-muted-foreground">
        {filtered.length}{" "}
        {filtered.length === 1 ? "produkt" : "produktów"}
      </Typography>

      <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard
            key={p.slug}
            href={`/produkty/${p.slug}`}
            image={p.image}
            imageAlt={p.name}
            name={p.name}
            shortDescription={p.shortDescription}
            price={prices[p.slug] ?? ""}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </>
  )
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2xs rounded-full border px-sm py-2xs text-[13px] transition-colors",
        active
          ? "border-[#787169] bg-[#787169] text-white"
          : "border-border bg-background text-foreground/80 hover:border-[#787169]/50 hover:text-foreground"
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "text-caption",
          active ? "text-white/70" : "text-muted-foreground"
        )}
      >
        {count}
      </span>
    </button>
  )
}
