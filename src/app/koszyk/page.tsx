"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { PageBanner } from "@/components/layout/page-banner"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { useCart } from "@/lib/cart/cart-context"
import { formatPriceNet } from "@/lib/format"

export default function CartPage() {
  const { items, count, hydrated, setQty, removeItem, clear } = useCart()

  const priced = items.filter((i) => typeof i.unitPriceNet === "number")
  const subtotalNet = priced.reduce(
    (sum, i) => sum + (i.unitPriceNet ?? 0) * i.qty,
    0
  )
  const allPriced = priced.length === items.length

  return (
    <>
      <PageBanner
        title="Koszyk"
        image="/banner-koszyk.jpg"
        crumbs={[
          { href: "/", label: "Strona główna" },
          { label: "Koszyk" },
        ]}
      />
      <Section surface="background" className="lg:!pt-10">
        {!hydrated ? null : items.length === 0 ? (
          // Pusty koszyk — blok z text-center (bez flexa, więc tekst się nie zwija)
          <div className="mx-auto w-full max-w-[28rem] py-xl text-center">
            <span className="mx-auto mb-md grid size-14 place-items-center rounded-full bg-surface-2 text-muted-foreground">
              <ShoppingBag className="size-6" aria-hidden />
            </span>
            <Typography variant="h5" as="h2" className="mb-sm">
              Twój koszyk jest pusty
            </Typography>
            <Typography variant="body2" className="mb-lg text-muted-foreground">
              Dodaj produkty z katalogu, aby złożyć zamówienie hurtowe.
            </Typography>
            <Button size="lg" render={<Link href="/sklep" />}>
              Przejdź do sklepu
            </Button>
          </div>
        ) : (
          <div className="grid gap-xl lg:grid-cols-[1fr_20rem]">
            {/* Lista pozycji */}
            <div className="flex flex-col">
              <div className="mb-md flex items-center justify-between">
                <Typography variant="body2" className="text-muted-foreground">
                  {count} {count === 1 ? "sztuka" : "sztuk"} w koszyku
                </Typography>
                <button
                  type="button"
                  onClick={clear}
                  className="text-caption text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
                >
                  Wyczyść koszyk
                </button>
              </div>

              <ul className="divide-y divide-border border-y border-border">
                {items.map((item) => (
                  <li
                    key={`${item.productSlug}::${item.variantValue ?? ""}`}
                    className="flex gap-md py-md"
                  >
                    <Link
                      href={`/produkty/${item.productSlug}`}
                      className="relative size-20 shrink-0 overflow-hidden rounded-none bg-white"
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-contain p-2xs"
                        />
                      )}
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col gap-2xs">
                      <Link
                        href={`/produkty/${item.productSlug}`}
                        className="text-body2 font-medium text-foreground transition-colors hover:text-muted-foreground"
                      >
                        {item.name}
                      </Link>
                      {item.variantValue && (
                        <span className="text-caption text-muted-foreground">
                          {item.variantValue}
                        </span>
                      )}
                      <span className="text-caption text-muted-foreground">
                        {typeof item.unitPriceNet === "number"
                          ? `${formatPriceNet(item.unitPriceNet)} netto / szt.`
                          : "Cena widoczna po zalogowaniu"}
                      </span>
                      {typeof item.unitPriceNet === "number" && item.qty > 1 && (
                        <span className="text-caption font-medium text-foreground">
                          Razem: {formatPriceNet(item.unitPriceNet * item.qty)}
                        </span>
                      )}
                    </div>

                    {/* Ilość + usuń */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        type="button"
                        aria-label="Usuń z koszyka"
                        onClick={() =>
                          removeItem(item.productSlug, item.variantValue)
                        }
                        className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>

                      <div className="flex items-center gap-2xs rounded-full border border-border">
                        <button
                          type="button"
                          aria-label="Zmniejsz ilość"
                          onClick={() =>
                            setQty(
                              item.productSlug,
                              item.variantValue,
                              item.qty - 1
                            )
                          }
                          className="grid size-8 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
                        >
                          <Minus className="size-3.5" aria-hidden />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-body2 tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Zwiększ ilość"
                          onClick={() =>
                            setQty(
                              item.productSlug,
                              item.variantValue,
                              item.qty + 1
                            )
                          }
                          className="grid size-8 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
                        >
                          <Plus className="size-3.5" aria-hidden />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Podsumowanie */}
            <aside className="h-fit rounded-lg border border-border bg-surface-1 p-lg">
              <Typography variant="subtitle1" as="h2" className="mb-md font-semibold">
                Podsumowanie
              </Typography>
              <div className="flex justify-between border-b border-border pb-sm text-body2">
                <span className="text-muted-foreground">Liczba sztuk</span>
                <span className="tabular-nums">{count}</span>
              </div>
              {priced.length > 0 ? (
                <>
                  <div className="mt-sm flex items-baseline justify-between">
                    <span className="text-body2 text-muted-foreground">
                      Suma netto{!allPriced && " (pozycje z ceną)"}
                    </span>
                    <span className="text-h6 font-semibold tabular-nums">
                      {formatPriceNet(subtotalNet)}
                    </span>
                  </div>
                  <p className="mt-md text-caption text-muted-foreground">
                    Płatność online i faktura zostaną dodane wkrótce — zamówienie
                    przyjmiemy i potwierdzimy mailowo.
                  </p>
                  <Button
                    size="lg"
                    className="mt-md w-full"
                    render={<Link href="/zamowienie" />}
                  >
                    Przejdź do zamówienia
                  </Button>
                </>
              ) : (
                <>
                  <p className="mt-md text-caption text-muted-foreground">
                    Ceny hurtowe zobaczysz po zalogowaniu na zatwierdzone konto B2B.
                  </p>
                  <Button
                    size="lg"
                    className="mt-md w-full"
                    render={<Link href="/login" />}
                  >
                    Zaloguj się, aby zamówić
                  </Button>
                </>
              )}
            </aside>
          </div>
        )}
      </Section>
    </>
  )
}
