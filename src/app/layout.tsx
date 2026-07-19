import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"

import { CookieConsent } from "@/components/cookie-consent"
import { Footer } from "@/components/layout/footer"
import { TopNav } from "@/components/layout/top-nav"
import { getSession } from "@/lib/auth"
import { getCategories } from "@/lib/catalog"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site"
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
  metadataBase: new URL(SITE_URL),
  title: "CBH Polska — Hurtownia kosmetyków fryzjerskich B2B",
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "hurtownia fryzjerska",
    "kosmetyki fryzjerskie hurt",
    "Chenice",
    "6 Zero",
    "Color Clean",
    "farby do włosów hurt",
    "B2B",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "CBH Polska — Hurtownia kosmetyków fryzjerskich B2B",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "CBH Polska — Hurtownia kosmetyków fryzjerskich B2B",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}
