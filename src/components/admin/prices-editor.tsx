"use client"

import * as React from "react"

import { updateVariant } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import type { AdminProduct } from "@/lib/admin"

const BRAND_ORDER = ["Chenice", "6 Zero", "Color Clean", "Inne"]

export function PricesEditor({ products }: { products: AdminProduct[] }) {
  const brands = React.useMemo(() => {
    const set = new Set(products.map((p) => p.brand))
    const ordered = BRAND_ORDER.filter((b) => set.has(b))
    return ["Wszystkie", ...ordered]
  }, [products])

  const [brand, setBrand] = React.useState("Wszystkie")
  const [query, setQuery] = React.useState("")

  const filtered = products.filter(
    (p) =>
      (brand === "Wszystkie" || p.brand === brand) &&
      (query.trim() === "" ||
        p.name.toLowerCase().includes(query.trim().toLowerCase()))
  )

  // Grupowanie po linii; linie posortowane wg liczby produktów (malejąco).
  const byLine = new Map<string, AdminProduct[]>()
  for (const p of filtered) {
    const arr = byLine.get(p.line) ?? []
    arr.push(p)
    byLine.set(p.line, arr)
  }
  const lines = [...byLine.entries()].sort((a, b) => b[1].length - a[1].length)

  return (
    <div className="flex flex-col gap-lg">
      {/* Filtry: marki + wyszukiwarka */}
      <div className="flex flex-col gap-md">
        <div className="flex flex-wrap gap-xs">
          {brands.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBrand(b)}
              className={cn(
                "border px-md py-2xs text-body2 transition-colors",
                brand === b
                  ? "border-[#787169] bg-[#787169] text-white"
                  : "border-border bg-background text-foreground/80 hover:border-[#787169]/50"
              )}
            >
              {b}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Szukaj produktu…"
          className="h-10 w-full max-w-[24rem] appearance-none border border-border bg-background px-md text-body2 outline-none focus-visible:border-ring"
        />
        <Typography variant="caption" className="text-muted-foreground">
          {filtered.length} produktów. Wpisz cenę netto (zł) i zaznacz
          dostępność, potem „Zapisz" przy wierszu.
        </Typography>
      </div>

      {/* Grupy: linie produktowe */}
      {lines.map(([line, prods]) => (
        <section key={line} className="flex flex-col gap-sm">
          <Typography
            variant="overline"
            as="h2"
            className="border-b border-border pb-2xs text-muted-foreground"
          >
            {line} · {prods.length}
          </Typography>

          {prods.map((p) => (
            <div key={p.id} className="py-2xs">
              <Typography variant="body2" className="mb-2xs font-medium">
                {p.name}
              </Typography>
              <div className="flex flex-col gap-2xs">
                {p.variants.map((v) => (
                  <form
                    key={v.id}
                    action={updateVariant}
                    className="flex flex-wrap items-center gap-sm bg-surface-1 px-md py-sm"
                  >
                    <input type="hidden" name="variantId" value={v.id} />
                    <span className="min-w-[7rem] flex-1 text-body2">
                      {v.value === "default" ? "—" : v.value}
                    </span>
                    <label className="flex items-center gap-2xs text-body2">
                      <input
                        type="text"
                        name="price"
                        inputMode="decimal"
                        defaultValue={(v.basePrice / 100).toFixed(2)}
                        className="h-9 w-24 border border-border bg-background px-sm text-right text-body2 outline-none focus-visible:border-ring"
                      />
                      <span className="text-caption text-muted-foreground">
                        zł netto
                      </span>
                    </label>
                    <label className="flex items-center gap-2xs text-body2">
                      <input
                        type="checkbox"
                        name="in_stock"
                        defaultChecked={v.inStock}
                        className="size-4 accent-[#787169]"
                      />
                      na stanie
                    </label>
                    <Button type="submit" size="sm" variant="outline">
                      Zapisz
                    </Button>
                  </form>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
