"use client"

import Link from "next/link"

import { placeOrder } from "@/app/zamowienie/actions"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { useCart } from "@/lib/cart/cart-context"
import { formatPriceNet } from "@/lib/format"

const inputClass =
  "h-11 w-full appearance-none rounded-lg border border-border bg-background px-md text-body2 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"

type Defaults = {
  companyName: string | null
  nip: string | null
  phone: string | null
}

export function CheckoutForm({ defaults }: { defaults: Defaults }) {
  const { items, count, hydrated } = useCart()

  if (!hydrated) return null

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[28rem] py-xl text-center">
        <Typography variant="h5" as="h2" className="mb-sm">
          Koszyk jest pusty
        </Typography>
        <Typography variant="body2" className="mb-lg text-muted-foreground">
          Dodaj produkty, zanim złożysz zamówienie.
        </Typography>
        <Button size="lg" render={<Link href="/sklep" />}>
          Przejdź do sklepu
        </Button>
      </div>
    )
  }

  const priced = items.filter((i) => typeof i.unitPriceNet === "number")
  const subtotalNet = priced.reduce(
    (sum, i) => sum + (i.unitPriceNet ?? 0) * i.qty,
    0
  )
  const itemsPayload = JSON.stringify(
    items.map((i) => ({
      slug: i.productSlug,
      variantValue: i.variantValue,
      qty: i.qty,
    }))
  )

  return (
    <form action={placeOrder} className="grid gap-xl lg:grid-cols-[1fr_20rem]">
      <input type="hidden" name="items" value={itemsPayload} />

      {/* Dane wysyłki */}
      <div className="flex flex-col gap-md">
        <Typography variant="subtitle1" as="h2" className="font-semibold">
          Adres dostawy
        </Typography>

        {(defaults.companyName || defaults.nip) && (
          <div className="rounded-lg border border-border bg-surface-1 p-md text-body2">
            <p className="font-medium">{defaults.companyName ?? "—"}</p>
            {defaults.nip && (
              <p className="text-muted-foreground">NIP: {defaults.nip}</p>
            )}
            {defaults.phone && (
              <p className="text-muted-foreground">tel. {defaults.phone}</p>
            )}
            <p className="mt-2xs text-caption text-muted-foreground">
              Dane do faktury pobierzemy z Twojego konta.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2xs">
          <label htmlFor="line1" className="text-[14px] font-medium">
            Ulica i numer <span className="text-destructive">*</span>
          </label>
          <input id="line1" name="line1" required className={inputClass} />
        </div>

        <div className="flex flex-col gap-2xs">
          <label htmlFor="line2" className="text-[14px] font-medium">
            Linia adresu 2
          </label>
          <input id="line2" name="line2" className={inputClass} />
        </div>

        <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
          <div className="flex flex-col gap-2xs">
            <label htmlFor="city" className="text-[14px] font-medium">
              Miejscowość <span className="text-destructive">*</span>
            </label>
            <input id="city" name="city" required className={inputClass} />
          </div>
          <div className="flex flex-col gap-2xs">
            <label htmlFor="postalCode" className="text-[14px] font-medium">
              Kod pocztowy <span className="text-destructive">*</span>
            </label>
            <input
              id="postalCode"
              name="postalCode"
              required
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Podsumowanie */}
      <aside className="h-fit rounded-lg border border-border bg-surface-1 p-lg">
        <Typography variant="subtitle1" as="h2" className="mb-md font-semibold">
          Twoje zamówienie
        </Typography>

        <ul className="flex flex-col gap-sm border-b border-border pb-md">
          {items.map((i) => (
            <li
              key={`${i.productSlug}::${i.variantValue ?? ""}`}
              className="flex justify-between gap-sm text-body2"
            >
              <span className="min-w-0">
                <span className="line-clamp-2">{i.name}</span>
                <span className="text-caption text-muted-foreground">
                  {i.variantValue ? `${i.variantValue} · ` : ""}
                  {i.qty} szt.
                </span>
              </span>
              <span className="shrink-0 tabular-nums">
                {typeof i.unitPriceNet === "number"
                  ? formatPriceNet(i.unitPriceNet * i.qty)
                  : "—"}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-md flex items-baseline justify-between">
          <span className="text-body2 text-muted-foreground">Suma netto</span>
          <span className="text-h6 font-semibold tabular-nums">
            {formatPriceNet(subtotalNet)}
          </span>
        </div>

        <p className="mt-sm text-caption text-muted-foreground">
          Ceny netto. Płatność online zostanie dodana wkrótce — na razie
          zamówienie trafi do realizacji, a my potwierdzimy je mailowo.
        </p>

        <Button type="submit" size="lg" className="mt-md w-full">
          Złóż zamówienie ({count} szt.)
        </Button>
      </aside>
    </form>
  )
}
