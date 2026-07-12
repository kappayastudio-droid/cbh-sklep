"use client"

import { CartProvider } from "@/lib/cart/cart-context"

/** Klienckie providery opakowujące całą aplikację (koszyk itd.). */
export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
