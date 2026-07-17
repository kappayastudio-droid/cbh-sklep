"use client"

import * as React from "react"
import { Download } from "lucide-react"

import type { AdminOrder } from "@/lib/admin"
import { formatKg } from "@/lib/shipping-weight"

/**
 * Eksport zamówień „do wysyłki" (opłacone/nowe) jako CSV — do zaimportowania
 * lub wglądu przy tworzeniu druku przewozowego DPD. Średnik + BOM (Excel PL).
 */
export function DpdExport({ orders }: { orders: AdminOrder[] }) {
  const [done, setDone] = React.useState(false)

  const toShip = orders.filter(
    (o) => o.status === "paid" || o.status === "pending"
  )

  function csvCell(v: string) {
    const s = (v ?? "").replace(/"/g, '""')
    return `"${s}"`
  }

  function download() {
    const header = [
      "Odbiorca",
      "Firma",
      "Ulica i nr",
      "Kod",
      "Miasto",
      "Telefon",
      "E-mail",
      "Waga (kg)",
      "Zamówienie",
      "Status",
    ]
    const rows = toShip.map((o) =>
      [
        o.recipientName ?? "",
        o.customerCompany ?? "",
        o.addr?.line1 ?? "",
        o.addr?.postalCode ?? "",
        o.addr?.city ?? "",
        o.phone ?? "",
        o.customerEmail,
        formatKg(o.weightGrams).replace(" kg", ""),
        o.id.slice(0, 8),
        o.status,
      ]
        .map(csvCell)
        .join(";")
    )
    const csv = "﻿" + [header.map(csvCell).join(";"), ...rows].join("\r\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "dpd-wysylki.csv"
    a.click()
    URL.revokeObjectURL(url)
    setDone(true)
    window.setTimeout(() => setDone(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={download}
      disabled={toShip.length === 0}
      className="inline-flex w-fit items-center gap-2xs rounded-md border border-border bg-background px-md py-2 text-body2 font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-40"
    >
      <Download className="size-4" aria-hidden />
      {done
        ? "Pobrano"
        : `Pobierz dane do DPD (CSV) · ${toShip.length}`}
    </button>
  )
}
