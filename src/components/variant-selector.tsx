"use client"

import * as React from "react"
import { Check, X } from "lucide-react"

import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import type { ProductVariant } from "@/lib/products"

type VariantSelectorProps = {
  /** Nazwa atrybutu wariantu, np. "Kolor" albo "Pojemność". */
  attribute: string
  variants: ProductVariant[]
  className?: string
}

/**
 * Wybór wariantu produktu (np. odcień farby, pojemność).
 * Zgodnie z ustaleniami: można zaznaczyć KILKA wariantów naraz oraz wyczyścić wybór.
 * Warianty niedostępne w magazynie są ukryte (nie pokazujemy ilości).
 */
export function VariantSelector({
  attribute,
  variants,
  className,
}: VariantSelectorProps) {
  const available = React.useMemo(
    () => variants.filter((v) => v.inStock),
    [variants]
  )
  const [selected, setSelected] = React.useState<string[]>([])

  if (available.length === 0) return null

  const label = attribute || "Wariant"

  function toggle(value: string) {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    )
  }

  return (
    <div className={cn("flex flex-col gap-sm", className)}>
      <div className="flex items-center justify-between gap-md">
        <Typography variant="subtitle2" as="h2" className="font-medium">
          {label}
          {selected.length > 0 && (
            <span className="ml-2xs text-muted-foreground">
              · wybrano {selected.length}
            </span>
          )}
        </Typography>

        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => setSelected([])}
            className="inline-flex items-center gap-2xs text-caption font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-3.5" aria-hidden />
            Wyczyść wybór
          </button>
        )}
      </div>

      <div
        role="group"
        aria-label={label}
        className="flex max-h-72 flex-wrap gap-xs overflow-y-auto pr-2xs"
      >
        {available.map((v) => {
          const isSelected = selected.includes(v.value)
          return (
            <button
              key={v.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(v.value)}
              className={cn(
                "inline-flex items-center gap-2xs rounded-full border px-md py-xs text-caption font-medium transition-colors",
                isSelected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:border-foreground/40 hover:bg-muted"
              )}
            >
              {isSelected && <Check className="size-3.5" aria-hidden />}
              {v.value}
            </button>
          )
        })}
      </div>
    </div>
  )
}
