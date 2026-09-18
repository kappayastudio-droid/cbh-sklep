"use client"

import * as React from "react"

import { nipFieldError } from "@/lib/nip"

const inputClass =
  "h-11 w-full appearance-none rounded-lg border border-border bg-background px-md text-body2 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"

/**
 * Pole NIP z natychmiastową kontrolą sumy kontrolnej — bez sieci i bez
 * czekania na wysłanie formularza. Komunikat pokazujemy dopiero po wyjściu
 * z pola: podpowiadanie w trakcie pisania oznaczałoby błąd przy każdej cyfrze.
 */
export function NipField() {
  const [value, setValue] = React.useState("")
  const [touched, setTouched] = React.useState(false)

  const error = touched ? nipFieldError(value) : null

  return (
    <div className="flex flex-col gap-2xs">
      <label htmlFor="nip" className="text-[14px] font-medium text-foreground">
        NIP
        <span className="ml-0.5 text-destructive">*</span>
      </label>
      <input
        id="nip"
        name="nip"
        type="text"
        required
        inputMode="numeric"
        autoComplete="off"
        placeholder="np. 777-113-48-77"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "nip-error" : "nip-hint"}
        className={`${inputClass} ${error ? "border-destructive" : ""}`}
      />
      {error ? (
        <p id="nip-error" role="alert" className="text-caption text-destructive">
          {error}
        </p>
      ) : (
        <p id="nip-hint" className="text-caption text-muted-foreground">
          Sklep prowadzi sprzedaż wyłącznie dla firm i salonów.
        </p>
      )}
    </div>
  )
}
