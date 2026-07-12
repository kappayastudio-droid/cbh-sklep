"use client"

import * as React from "react"

export type CartItem = {
  productSlug: string
  /** Wartość wariantu (np. "250 ml") albo null dla produktu bez wariantów. */
  variantValue: string | null
  name: string
  image: string
  /** Cena netto w groszach w chwili dodania (jeśli była znana). */
  unitPriceNet?: number
  qty: number
}

type CartContextValue = {
  items: CartItem[]
  /** Łączna liczba sztuk (suma qty) — do plakietki w nawigacji. */
  count: number
  hydrated: boolean
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void
  removeItem: (productSlug: string, variantValue: string | null) => void
  setQty: (productSlug: string, variantValue: string | null, qty: number) => void
  clear: () => void
}

const STORAGE_KEY = "cbh-cart-v1"

const CartContext = React.createContext<CartContextValue | null>(null)

function keyOf(slug: string, variant: string | null) {
  return `${slug}::${variant ?? ""}`
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([])
  const [hydrated, setHydrated] = React.useState(false)

  // Wczytanie z localStorage po zamontowaniu (unikamy niezgodności SSR/CSR).
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {
      // uszkodzony wpis — ignorujemy
    }
    setHydrated(true)
  }, [])

  // Zapis po każdej zmianie (dopiero po hydratacji, by nie nadpisać pustym).
  React.useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // brak miejsca / tryb prywatny — pomijamy
    }
  }, [items, hydrated])

  const addItem = React.useCallback(
    (item: Omit<CartItem, "qty">, qty = 1) => {
      setItems((prev) => {
        const k = keyOf(item.productSlug, item.variantValue)
        const idx = prev.findIndex(
          (i) => keyOf(i.productSlug, i.variantValue) === k
        )
        if (idx >= 0) {
          const next = [...prev]
          next[idx] = { ...next[idx], qty: next[idx].qty + qty }
          return next
        }
        return [...prev, { ...item, qty }]
      })
    },
    []
  )

  const removeItem = React.useCallback(
    (productSlug: string, variantValue: string | null) => {
      const k = keyOf(productSlug, variantValue)
      setItems((prev) =>
        prev.filter((i) => keyOf(i.productSlug, i.variantValue) !== k)
      )
    },
    []
  )

  const setQty = React.useCallback(
    (productSlug: string, variantValue: string | null, qty: number) => {
      const k = keyOf(productSlug, variantValue)
      setItems((prev) =>
        prev
          .map((i) =>
            keyOf(i.productSlug, i.variantValue) === k
              ? { ...i, qty: Math.max(0, qty) }
              : i
          )
          .filter((i) => i.qty > 0)
      )
    },
    []
  )

  const clear = React.useCallback(() => setItems([]), [])

  const count = items.reduce((sum, i) => sum + i.qty, 0)

  const value: CartContextValue = {
    items,
    count,
    hydrated,
    addItem,
    removeItem,
    setQty,
    clear,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error("useCart musi być użyte wewnątrz <CartProvider>")
  return ctx
}
