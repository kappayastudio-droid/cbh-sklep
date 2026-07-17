"use client"

import * as React from "react"
import { Check, Copy, Package } from "lucide-react"

import { formatKg } from "@/lib/shipping-weight"

type Props = {
  orderRef: string
  recipientName: string | null
  company: string | null
  line1: string
  line2: string | null
  postalCode: string
  city: string
  phone: string | null
  email: string
  weightGrams: number
}

/** Karta „Wysyłka DPD" — dane do przepisania + szacowana waga + przycisk Kopiuj. */
export function OrderShipping(p: Props) {
  const [copied, setCopied] = React.useState(false)

  const lines = [
    p.recipientName,
    p.company,
    p.line1,
    p.line2,
    `${p.postalCode} ${p.city}`.trim(),
    p.phone ? `tel. ${p.phone}` : null,
    p.email,
    `Waga: ${formatKg(p.weightGrams)}`,
    `Zam. #${p.orderRef}`,
  ].filter(Boolean)

  function copy() {
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mt-sm rounded-md border border-border bg-background p-sm">
      <div className="mb-xs flex items-center justify-between gap-sm">
        <span className="inline-flex items-center gap-2xs text-caption font-medium text-foreground">
          <Package className="size-3.5" aria-hidden />
          Wysyłka DPD
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

      <div className="flex flex-wrap items-baseline justify-between gap-sm">
        <address className="not-italic text-body2 leading-relaxed text-muted-foreground">
          {p.recipientName && (
            <div className="text-foreground">{p.recipientName}</div>
          )}
          {p.company && <div>{p.company}</div>}
          <div>{p.line1}</div>
          {p.line2 && <div>{p.line2}</div>}
          <div>
            {p.postalCode} {p.city}
          </div>
          {p.phone && <div>tel. {p.phone}</div>}
          <div>{p.email}</div>
        </address>
        <div className="text-right">
          <div className="text-caption text-muted-foreground">
            Szac. waga paczki
          </div>
          <div className="text-h6 font-semibold tabular-nums">
            {formatKg(p.weightGrams)}
          </div>
        </div>
      </div>
    </div>
  )
}
