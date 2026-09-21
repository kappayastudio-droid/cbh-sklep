"use client"

import * as React from "react"
import { Check, Copy, FileText } from "lucide-react"

import {
  formatAmountBare,
  formatDate,
  formatPriceNet,
  grossFromNet,
  vatFromNet,
} from "@/lib/format"
import { storedOrLegacyTotals } from "@/lib/pricing"

type Item = { name: string; qty: number; unitPriceNet: number }
type Addr = {
  line1: string
  line2: string | null
  postalCode: string
  city: string
} | null

type Props = {
  orderRef: string
  dateISO: string
  company: string | null
  nip: string | null
  /** Adres DOSTAWY — dokąd jedzie paczka. */
  line1: string
  line2: string | null
  postalCode: string
  city: string
  /** Adres NABYWCY z konta — ten należy na fakturę. */
  billingAddr: Addr
  items: Item[]
  totalNet: number
  subtotalNet: number | null
  discountNet: number | null
  shippingNet: number | null
}

/** Mały przycisk kopiujący jedną wartość — kopiuj i wklej prosto w pole. */
function CopyValue({
  value,
  label,
  display,
  className = "",
}: {
  /** Co ląduje w schowku — przy kwotach zawsze postać „1234,56". */
  value: string
  label: string
  /** Co widać na ekranie, jeśli ma się różnić od kopiowanego (np. „1 234,56 zł"). */
  display?: string
  className?: string
}) {
  const [done, setDone] = React.useState(false)
  if (!value) return <span className="text-muted-foreground">—</span>
  return (
    <button
      type="button"
      aria-label={`Kopiuj ${label}`}
      title={`Kopiuj ${label}`}
      onClick={() => {
        navigator.clipboard.writeText(value).then(
          () => {
            setDone(true)
            window.setTimeout(() => setDone(false), 1500)
          },
          () => {
            // Schowek zablokowany przez przeglądarkę — zaznacz ręcznie.
          }
        )
      }}
      className={`group inline-flex max-w-full items-center gap-2xs rounded px-1 text-left transition-colors hover:bg-muted ${className}`}
    >
      <span className="truncate">{display ?? value}</span>
      {done ? (
        <Check className="size-3 shrink-0 text-[#787169]" aria-hidden />
      ) : (
        <Copy
          className="size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      )}
    </button>
  )
}

/**
 * Karta „Dane do faktury".
 *
 * Każda wartość ma własny przycisk kopiowania — właściciel przechodzi tabem
 * po formularzu faktury w swoim programie i wkleja pole po polu, zamiast
 * kopiować jeden blok i szukać w nim po omacku.
 *
 * Kwoty do wklejania idą przez `formatAmountBare` („1234,56"), NIE przez
 * `formatPriceNet` („1 234,56 zł") — twarda spacja i symbol waluty potrafią
 * zostać odrzucone przez pole kwoty w programie księgowym.
 */
export function OrderInvoice(p: Props) {
  const [copiedAll, setCopiedAll] = React.useState(false)
  const [copiedItems, setCopiedItems] = React.useState(false)

  const subtotal = p.items.reduce((s, it) => s + it.unitPriceNet * it.qty, 0)
  const t = storedOrLegacyTotals(
    {
      subtotalNet: p.subtotalNet,
      discountNet: p.discountNet,
      shippingNet: p.shippingNet,
      totalNet: p.totalNet,
    },
    subtotal
  )
  const vat = vatFromNet(t.totalNet)
  const gross = grossFromNet(t.totalNet)

  const shipping = [p.line1, p.line2].filter(Boolean).join(", ")
  const shippingCity = `${p.postalCode} ${p.city}`.trim()
  const billing = p.billingAddr
    ? [p.billingAddr.line1, p.billingAddr.line2].filter(Boolean).join(", ")
    : ""
  const billingCity = p.billingAddr
    ? `${p.billingAddr.postalCode} ${p.billingAddr.city}`.trim()
    : ""
  const addressesDiffer =
    !!billing && (billing !== shipping || billingCity !== shippingCity)

  /** Pozycje jako TSV — jeśli siatka dokumentu przyjmie wklejenie, wchodzą naraz. */
  const itemsTsv = p.items
    .map((it) =>
      [it.name, String(it.qty), formatAmountBare(it.unitPriceNet)].join("\t")
    )
    .join("\n")

  const text = [
    `Faktura — zamówienie #${p.orderRef} (${formatDate(p.dateISO)})`,
    "",
    "Nabywca:",
    p.company || "—",
    p.nip ? `NIP: ${p.nip}` : "NIP: —",
    ...(billing ? [billing, billingCity] : [shipping, shippingCity]),
    "",
    ...(addressesDiffer ? ["Adres dostawy:", shipping, shippingCity, ""] : []),
    "Pozycje (ceny netto):",
    ...p.items.map(
      (it, i) =>
        `${i + 1}. ${it.name} — ${it.qty} × ${formatAmountBare(
          it.unitPriceNet
        )} = ${formatAmountBare(it.unitPriceNet * it.qty)}`
    ),
    "",
    `Suma netto (towary): ${formatAmountBare(t.subtotalNet)}`,
    ...(t.discountAmount > 0
      ? [`Rabat: −${formatAmountBare(t.discountAmount)}`]
      : []),
    `Dostawa: ${formatAmountBare(t.shippingNet)}`,
    `VAT 23%: ${formatAmountBare(vat)}`,
    `Do zapłaty (brutto): ${formatAmountBare(gross)}`,
  ].join("\n")

  function copyAll() {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAll(true)
      window.setTimeout(() => setCopiedAll(false), 2000)
    })
  }

  function copyItems() {
    navigator.clipboard.writeText(itemsTsv).then(() => {
      setCopiedItems(true)
      window.setTimeout(() => setCopiedItems(false), 2000)
    })
  }

  return (
    <div className="mt-sm rounded-md border border-border bg-background p-sm">
      <div className="mb-xs flex flex-wrap items-center justify-between gap-sm">
        <span className="inline-flex items-center gap-2xs text-caption font-medium text-foreground">
          <FileText className="size-3.5" aria-hidden />
          Dane do faktury
        </span>
        <div className="flex gap-xs">
          <button
            type="button"
            onClick={copyItems}
            title="Pozycje rozdzielone tabulatorem — spróbuj wkleić w siatkę dokumentu"
            className="inline-flex items-center gap-2xs rounded border border-border px-2 py-1 text-caption text-foreground transition-colors hover:bg-muted"
          >
            {copiedItems ? (
              <>
                <Check className="size-3.5" aria-hidden /> Skopiowano
              </>
            ) : (
              <>
                <Copy className="size-3.5" aria-hidden /> Pozycje (TSV)
              </>
            )}
          </button>
          <button
            type="button"
            onClick={copyAll}
            className="inline-flex items-center gap-2xs rounded border border-border px-2 py-1 text-caption text-foreground transition-colors hover:bg-muted"
          >
            {copiedAll ? (
              <>
                <Check className="size-3.5" aria-hidden /> Skopiowano
              </>
            ) : (
              <>
                <Copy className="size-3.5" aria-hidden /> Kopiuj wszystko
              </>
            )}
          </button>
        </div>
      </div>

      <p className="mb-2xs text-caption text-muted-foreground">
        Kliknij dowolną wartość, aby ją skopiować.
      </p>

      <div className="text-body2 text-muted-foreground">
        <div className="flex flex-col gap-0.5">
          <CopyValue
            value={p.company ?? ""}
            label="nazwę firmy"
            className="text-foreground"
          />
          <span className="inline-flex items-center gap-2xs">
            NIP: <CopyValue value={p.nip ?? ""} label="NIP" />
          </span>
          <CopyValue
            value={billing || shipping}
            label="ulicę nabywcy"
          />
          <CopyValue
            value={billingCity || shippingCity}
            label="kod i miasto nabywcy"
          />
        </div>

        {addressesDiffer && (
          <div className="mt-xs rounded border border-border/60 bg-surface-1 px-2 py-1">
            <p className="text-caption font-medium text-foreground">
              Adres dostawy (inny niż nabywcy)
            </p>
            <CopyValue value={shipping} label="ulicę dostawy" />
            <CopyValue value={shippingCity} label="kod i miasto dostawy" />
          </div>
        )}

        {!p.billingAddr && (
          <p className="mt-xs text-caption text-[#8c3f2a]">
            Brak adresu na koncie klienta — powyżej pokazany adres dostawy.
            Sprawdź siedzibę firmy przed wystawieniem faktury.
          </p>
        )}

        <table className="mt-sm w-full border-collapse text-caption">
          <tbody>
            {p.items.map((it, i) => (
              <tr key={i} className="border-t border-border/60">
                <td className="py-1 pr-sm text-foreground">
                  <CopyValue value={it.name} label="nazwę pozycji" />
                </td>
                <td className="py-1 text-right tabular-nums">
                  <CopyValue value={String(it.qty)} label="ilość" />
                </td>
                <td className="py-1 pl-sm text-right tabular-nums">
                  <CopyValue
                    value={formatAmountBare(it.unitPriceNet)}
                    display={formatPriceNet(it.unitPriceNet)}
                    label="cenę netto"
                  />
                </td>
                <td className="py-1 pl-sm text-right tabular-nums text-foreground">
                  {formatPriceNet(it.unitPriceNet * it.qty)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-sm flex flex-col items-end gap-0.5 border-t border-border pt-sm text-caption">
          <span>Suma netto (towary): {formatPriceNet(t.subtotalNet)}</span>
          {t.discountAmount > 0 && (
            <span>Rabat: −{formatPriceNet(t.discountAmount)}</span>
          )}
          <span>
            Dostawa:{" "}
            {t.freeShipping ? "gratis" : formatPriceNet(t.shippingNet)}
          </span>
          <span>VAT 23%: {formatPriceNet(vat)}</span>
          <span className="inline-flex items-center gap-2xs text-body2 font-semibold text-foreground">
            Brutto:{" "}
            <CopyValue
              value={formatAmountBare(gross)}
              display={formatPriceNet(gross)}
              label="kwotę brutto"
            />
          </span>
        </div>
      </div>
    </div>
  )
}
