"use client"

import * as React from "react"
import Link from "next/link"
import { Check, ChevronDown, Minus, Plus, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { useCart } from "@/lib/cart/cart-context"
import { UNAVAILABLE_LABEL } from "@/lib/availability"
import { formatPriceNet } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { ProductVariant } from "@/lib/products"

/**
 * Powyżej tego progu (np. farby: kilkadziesiąt odcieni) rezygnujemy z pola
 * select na rzecz przewijanej listy przycisków. Poniżej — pojemności/rozmiary
 * i drobne zestawy kolorów — pokazujemy jako select box.
 */
const SELECT_MAX = 12

type ProductPurchaseProps = {
  attribute: string
  variants: ProductVariant[]
  productSlug: string
  productName: string
  productImage: string
  /** UUID nośnika ceny dla produktu bez wariantów. */
  priceVariantId?: string
  /** Ceny netto (grosze) per UUID wariantu — tylko dla zatwierdzonych klientów. */
  prices?: Record<string, number>
  /** Aktywne promocje per UUID wariantu: rabat % i cena sprzed promocji. */
  promos?: Record<string, { pct: number; beforeNet: number }>
  /** Wybór wariantu i zakup dostępne wyłącznie dla zalogowanych klientów B2B. */
  isAuthenticated?: boolean
  /** Stan magazynowy wariantu „default" (produkt bez wariantów). */
  priceVariantInStock?: boolean
}

/**
 * Sekcja zakupu na stronie produktu.
 * - Niezalogowani: brak wyboru wariantu — tylko zachęta do logowania.
 * - Zalogowani z małą liczbą wariantów: select box (domyślnie pierwszy) + stepper ilości.
 * - Zalogowani, farby (dużo odcieni): przewijana lista przycisków, bez domyślnego wyboru.
 */
export function ProductPurchase({
  attribute,
  variants,
  productSlug,
  productName,
  productImage,
  priceVariantId,
  prices = {},
  promos = {},
  isAuthenticated = false,
  priceVariantInStock,
}: ProductPurchaseProps) {
  const { addItem } = useCart()
  const available = React.useMemo(
    () => variants.filter((v) => v.inStock),
    [variants]
  )
  const hasVariants = available.length > 0
  // Select box dla małych zestawów; lista przycisków dla farb (wiele odcieni).
  const useSelect = hasVariants && available.length <= SELECT_MAX

  // W trybie select box domyślnie wybieramy pierwszy wariant (jak na referencji).
  const [selected, setSelected] = React.useState<string | null>(
    useSelect ? (available[0]?.value ?? null) : null
  )
  const [qty, setQty] = React.useState(1)
  const [justAdded, setJustAdded] = React.useState(false)

  const selectedVariant = available.find((v) => v.value === selected)
  const currentVariantId = hasVariants ? selectedVariant?.id : priceVariantId
  const currentPriceNet = currentVariantId ? prices[currentVariantId] : undefined
  const currentPromo = currentVariantId ? promos[currentVariantId] : undefined

  // Gość — bez wyboru pojemności, tylko bramka logowania.
  if (!isAuthenticated) {
    return (
      <div className="mt-lg flex flex-col gap-sm">
        <Button
          size="lg"
          className="h-12 gap-2xs text-[14px] sm:w-auto sm:self-start sm:px-lg"
          render={<Link href="/login" />}
        >
          <ShoppingBag className="size-4" aria-hidden />
          Zaloguj się, aby kupić
        </Button>
        <p className="text-[14px] text-muted-foreground">
          Ceny hurtowe i zamówienia widoczne po zalogowaniu na konto B2B.
        </p>
      </div>
    )
  }

  // Brak na stanie: dla produktu z wariantami żaden nie jest dostępny,
  // dla produktu bez wariantów — jego wariant „default" jest wyłączony.
  const inStock = hasVariants
    ? available.length > 0
    : priceVariantInStock !== false
  const canAddToCart = inStock && (!hasVariants || selected !== null)

  function handleAdd() {
    if (!canAddToCart) return
    addItem(
      {
        productSlug,
        variantValue: hasVariants ? selected : null,
        name: productName,
        image: productImage,
        unitPriceNet:
          typeof currentPriceNet === "number" ? currentPriceNet : undefined,
      },
      qty
    )
    setJustAdded(true)
    setQty(1)
    window.setTimeout(() => setJustAdded(false), 2500)
  }

  return (
    <div className="mt-lg flex flex-col gap-lg">
      {/* Wybór wariantu — select box (małe zestawy) lub lista przycisków (farby) */}
      {useSelect ? (
        <div className="flex flex-col gap-sm">
          <label
            htmlFor="variant-select"
            className="text-subtitle2 font-medium text-foreground"
          >
            {attribute || "Wariant"}
          </label>
          <div className="relative w-full sm:max-w-[18rem]">
            <select
              id="variant-select"
              value={selected ?? ""}
              onChange={(e) => {
                setSelected(e.target.value)
                setJustAdded(false)
              }}
              className="h-12 w-full appearance-none rounded-none border border-border bg-background pl-md pr-10 text-body2 text-foreground outline-none transition-colors focus-visible:border-foreground"
            >
              {available.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.value}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-md top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
          </div>
        </div>
      ) : (
        hasVariants && (
          <div className="flex flex-col gap-sm">
            <Typography variant="subtitle2" as="h2" className="font-medium">
              {attribute || "Wariant"}
            </Typography>
            <div
              role="radiogroup"
              aria-label={attribute || "Wariant"}
              className="flex max-h-72 flex-col gap-xs overflow-y-auto pr-2xs"
            >
              {available.map((v) => {
                const isSelected = selected === v.value
                return (
                  <button
                    key={v.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setSelected(v.value)
                      setJustAdded(false)
                    }}
                    className={cn(
                      "flex w-full items-center gap-2xs rounded-md border px-md py-sm text-left text-caption font-medium transition-colors",
                      isSelected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-foreground hover:border-foreground/40 hover:bg-muted"
                    )}
                  >
                    {isSelected && (
                      <Check className="size-3.5 shrink-0" aria-hidden />
                    )}
                    <span>{v.value}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      )}

      {/* Pojedyncza cena — wybranego wariantu lub produktu bez wariantów */}
      {typeof currentPriceNet === "number" && currentPriceNet > 0 ? (
        <div className="flex flex-wrap items-baseline gap-sm">
          <Typography
            variant="h5"
            as="p"
            className="font-semibold text-foreground"
          >
            {formatPriceNet(currentPriceNet)}{" "}
            <span className="text-caption font-normal text-muted-foreground">
              netto / szt.
            </span>
          </Typography>
          {currentPromo && currentPromo.beforeNet > currentPriceNet && (
            <>
              <span className="text-body2 text-muted-foreground line-through">
                {formatPriceNet(currentPromo.beforeNet)}
              </span>
              <span className="rounded-full bg-[#8c3f2a] px-2 py-0.5 text-caption font-medium text-white">
                −{Math.round(currentPromo.pct)}%
              </span>
            </>
          )}
        </div>
      ) : (
        canAddToCart && (
          <p className="text-[14px] text-muted-foreground">Cena na zapytanie</p>
        )
      )}

      {/* Ilość + „Dodaj do koszyka" — pasek; na małym mobile jeden pod drugim */}
      <div className="flex flex-col items-stretch gap-sm sm:flex-row">
        <Button
          size="lg"
          type="button"
          onClick={handleAdd}
          disabled={!canAddToCart}
          className="h-12 w-full gap-2xs bg-primary text-base text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground sm:w-auto sm:flex-1 sm:px-lg"
        >
          {inStock ? (
            <>
              <ShoppingBag className="size-4" aria-hidden />
              Dodaj do koszyka
            </>
          ) : (
            UNAVAILABLE_LABEL
          )}
        </Button>

        <div className="flex h-12 w-full items-center justify-between border border-border sm:w-auto sm:justify-start">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Zmniejsz ilość"
            className="grid h-full w-11 place-items-center text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus className="size-4" aria-hidden />
          </button>
          <span
            className="w-9 text-center text-body2 font-medium tabular-nums"
            aria-live="polite"
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Zwiększ ilość"
            className="grid h-full w-11 place-items-center text-foreground transition-colors hover:bg-muted"
          >
            <Plus className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      {!inStock && (
        <p className="text-[14px] text-muted-foreground">
          Tego produktu chwilowo nie ma w magazynie. Napisz do nas, a damy znać,
          gdy wróci na stan.
        </p>
      )}

      {justAdded ? (
        <p className="inline-flex items-center gap-2xs text-[14px] text-[#787169]">
          <Check className="size-4" aria-hidden />
          Dodano do koszyka.{" "}
          <Link href="/koszyk" className="font-medium underline underline-offset-2">
            Przejdź do koszyka
          </Link>
        </p>
      ) : (
        hasVariants &&
        !selected && (
          <p className="text-[14px] text-muted-foreground">
            Wybierz {attribute ? attribute.toLowerCase() : "wariant"}, aby dodać
            do koszyka.
          </p>
        )
      )}
    </div>
  )
}
