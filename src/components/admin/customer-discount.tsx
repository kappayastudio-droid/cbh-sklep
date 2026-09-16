"use client"

import * as React from "react"

import { setCustomerPriceList } from "@/app/admin/actions"
import type { AdminPriceList } from "@/lib/admin"

/**
 * Wybór cennika rabatowego dla klienta. Zapisuje od razu po zmianie —
 * bez osobnego przycisku, żeby ustawienie rabatów na liście klientów
 * było jednym kliknięciem.
 */
export function CustomerDiscount({
  profileId,
  priceListId,
  priceLists,
}: {
  profileId: string
  priceListId: string | null
  priceLists: AdminPriceList[]
}) {
  const formRef = React.useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={setCustomerPriceList}>
      <input type="hidden" name="profileId" value={profileId} />
      <select
        name="priceListId"
        defaultValue={priceListId ?? ""}
        onChange={() => formRef.current?.requestSubmit()}
        aria-label="Rabat klienta"
        className="border border-border bg-background px-sm py-2xs text-body2 text-foreground"
      >
        <option value="">Bez rabatu</option>
        {priceLists.map((pl) => (
          <option key={pl.id} value={pl.id}>
            {pl.name} — {pl.discountPct}%
          </option>
        ))}
      </select>
    </form>
  )
}
