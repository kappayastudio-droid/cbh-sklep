"use client"

import * as React from "react"
import { Check, Copy, FileText } from "lucide-react"

import {
  formatDate,
  formatPriceNet,
  grossFromNet,
  vatFromNet,
} from "@/lib/format"

type Item = { name: string; qty: number; unitPriceNet: number }

type Props = {
  orderRef: string
  dateISO: string
  company: string | null
  nip: string | null
  line1: string
  line2: string | null
  postalCode: string
  city: string
  items: Item[]
  totalNet: number
}

/** Karta „Dane do faktury" — komplet do wystawienia faktury + przycisk Kopiuj. */
export function OrderInvoice(p: Props) {
  const [copied, setCopied] = React.useState(false)

  const vat = vatFromNet(p.totalNet)
  const gross = grossFromNet(p.totalNet)

  const text = [
    `Faktura — zamówienie #${p.orderRef} (${formatDate(p.dateISO)})`,
    "",
    "Nabywca:",
    p.company || "—",
    p.nip ? `NIP: ${p.nip}` : "NIP: —",
    [p.line1, p.line2].filter(Boolean).join(", "),
    `${p.postalCode} ${p.city}`.trim(),
    "",
    "Pozycje (ceny netto):",
    ...p.items.map(
      (it, i) =>
        `${i + 1}. ${it.name} — ${it.qty} × ${formatPriceNet(
          it.unitPriceNet
        )} = ${formatPriceNet(it.unitPriceNet * it.qty)}`
    ),
    "",
    `Suma netto: ${formatPriceNet(p.totalNet)}`,
    `VAT 23%: ${formatPriceNet(vat)}`,
    `Do zapłaty (brutto): ${formatPriceNet(gross)}`,
  ].join("\n")

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mt-sm rounded-md border border-border bg-background p-sm">
      <div className="mb-xs flex items-center justify-between gap-sm">
        <span className="inline-flex items-center gap-2xs text-caption font-medium text-foreground">
          <FileText className="size-3.5" aria-hidden />
          Dane do faktury
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2xs rounded border border-border px-2 py-1 text-caption text-foreground transition-colors hover:bg-muted"
        >
          {copied ? (
            <>
              <Check className="size-3.5" aria-hidden /> Skopiowano
            </>
          ) : (
            <>
              <Copy className="size-3.5" aria-hidden /> Kopiuj dane
            </>
          )}
        </button>
      </div>

      <div className="text-body2 text-muted-foreground">
        <p className="text-foreground">{p.company || "—"}</p>
        <p>NIP: {p.nip || "—"}</p>
        <p>
          {[p.line1, p.line2].filter(Boolean).join(", ")}
          {(p.line1 || p.line2) && ", "}
          {p.postalCode} {p.city}
        </p>

        <table className="mt-sm w-full border-collapse text-caption">
          <tbody>
            {p.items.map((it, i) => (
              <tr key={i} className="border-t border-border/60">
                <td className="py-1 pr-sm text-foreground">
                  {it.qty} × {it.name}
                </td>
                <td className="py-1 text-right tabular-nums">
                  {formatPriceNet(it.unitPriceNet)}
                </td>
                <td className="py-1 pl-sm text-right tabular-nums text-foreground">
                  {formatPriceNet(it.unitPriceNet * it.qty)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-sm flex flex-col items-end gap-0.5 border-t border-border pt-sm text-caption">
          <span>Netto: {formatPriceNet(p.totalNet)}</span>
          <span>VAT 23%: {formatPriceNet(vat)}</span>
          <span className="text-body2 font-semibold text-foreground">
            Brutto: {formatPriceNet(gross)}
          </span>
        </div>
      </div>
    </div>
  )
}
