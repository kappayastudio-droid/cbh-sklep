"use client"

import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

const KEY = "cbh-cookie-consent-v1"

/**
 * Baner zgody na cookies (draft pod Google Ads/Analytics).
 * Zapisuje wybór w localStorage i emituje zdarzenie `cookie-consent`
 * (detail: "all" | "necessary") — pod przyszłe wpięcie Google Consent Mode v2.
 */
export function CookieConsent() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true)
    } catch {
      // brak dostępu do localStorage — nie pokazujemy baneru
    }
  }, [])

  function choose(value: "all" | "necessary") {
    try {
      localStorage.setItem(KEY, value)
    } catch {
      // ignorujemy
    }
    window.dispatchEvent(
      new CustomEvent("cookie-consent", { detail: value })
    )
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Informacja o plikach cookies"
      className="fixed inset-x-0 bottom-0 z-[60] px-md pb-md"
    >
      <div className="mx-auto flex w-full max-w-[var(--container-content)] flex-col gap-md rounded-lg border border-border bg-popover p-lg shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body2 text-muted-foreground">
          Używamy wyłącznie plików cookies niezbędnych do działania sklepu —
          utrzymują Twoje zalogowanie i zapamiętują tę informację. Nie
          prowadzimy analityki ani reklam. Szczegóły w{" "}
          <Link
            href="/polityka-cookies"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Polityce cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-col gap-sm sm:flex-row">
          {/* Jeden przycisk, bo nie ma tu żadnego wyboru do dokonania:
              używamy wyłącznie cookies niezbędnych, na które zgoda nie jest
              wymagana. Dwa przyciski sugerowałyby wybór, którego nie ma. */}
          <Button size="sm" onClick={() => choose("necessary")}>
            Rozumiem
          </Button>
        </div>
      </div>
    </div>
  )
}
