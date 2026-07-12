import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"

import { Footer } from "@/components/layout/footer"
import { TopNav } from "@/components/layout/top-nav"
import { getSession } from "@/lib/auth"
import { getCategories } from "@/lib/catalog"
import { Providers } from "@/app/providers"

import "./globals.css"

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "CBH Polska — Hurtownia B2B",
  description:
    "Sprzedaż hurtowa premium dla zarejestrowanych klientów B2B. Indywidualne wyceny, jasne warunki handlowe.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [session, categories] = await Promise.all([
    getSession(),
    getCategories(),
  ])
  return (
    <html
      lang="pl"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <TopNav
            isAuthenticated={session.isAuthenticated}
            isAdmin={session.isAdmin}
            email={session.email}
            categories={categories}
          />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
