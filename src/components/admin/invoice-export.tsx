"use client"

import * as React from "react"
import { Download } from "lucide-react"

import type { AdminOrder } from "@/lib/admin"
import { formatDate } from "@/lib/format"

/**
 * Eksport danych do faktur — opłacone zamówienia, jeden wiersz na pozycję
 * (ceny netto; VAT 23%). CSV ze średnikiem + BOM (Excel PL). Do archiwum /
 * pomocniczo przy wystawianiu faktur w programie księgowym.
 */
export function InvoiceExport({ orders }: { orders: AdminOrder[] }) {
  const [done, setDone] = React.useState(false)
  const paid = orders.filter((o) => o.status === "paid")

  function cell(v: string | number) {
    return `"${String(v ?? "").replace(/"/g, '""')}"`
  }
  function zl(grosze: number) {
    return (grosze / 100).toFixed(2).replace(".", ",")
  }

  function download() {
    const header = [
      "Zamówienie",
      "Data",
      "Nabywca",
      "NIP",
      "Adres",
      "Pozycja",
      "Ilość",
      "Cena netto",
      "Wartość netto",
      "Stawka VAT",
    ]
    const rows: string[] = []
    for (const o of paid) {
      const addr = [
        o.addr?.line1,
        o.addr?.line2,
        o.addr ? `${o.addr.postalCode} ${o.addr.city}` : "",
      ]
        .filter(Boolean)
        .join(", ")
      for (const it of o.items) {
        rows.push(
          [
            o.id.slice(0, 8),
            formatDate(o.createdAt),
            o.customerCompany ?? "",
            o.nip ?? "",
            addr,
            it.name,
            it.qty,
            zl(it.unitPriceNet),
            zl(it.unitPriceNet * it.qty),
            "23%",
          ]
            .map(cell)
            .join(";")
        )
      }
    }
    const csv = "﻿" + [header.map(cell).join(";"), ...rows].join("\r\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "faktury-dane.csv"
    a.click()
    URL.revokeObjectURL(url)
    setDone(true)
    window.setTimeout(() => setDone(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={download}
      disabled={paid.length === 0}
      className="inline-flex w-fit items-center gap-2xs rounded-md border border-border bg-background px-md py-2 text-body2 font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-40"
    >
      <Download className="size-4" aria-hidden />
      {done ? "Pobrano" : `Dane do faktur (CSV) · ${paid.length}`}
    </button>
  )
}
