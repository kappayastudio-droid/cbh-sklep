"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, Clock, Menu, Search, ShoppingBag, Truck } from "lucide-react"
import * as React from "react"

import { logout } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Typography } from "@/components/ui/typography"
import { useCart } from "@/lib/cart/cart-context"
import { cn } from "@/lib/utils"
import type { Category } from "@/lib/products"

/** Ikona koszyka z plakietką liczby sztuk (aktualizowana na żywo). */
function CartButton() {
  const { count, hydrated } = useCart()
  return (
    <Link
      href="/koszyk"
      aria-label={`Koszyk${hydrated && count > 0 ? `, ${count} szt.` : ""}`}
      className="relative grid size-9 place-items-center rounded-md text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
    >
      <ShoppingBag className="size-5" aria-hidden />
      {hydrated && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid min-w-[1.1rem] place-items-center rounded-full bg-[#787169] px-1 text-[11px] font-semibold leading-tight text-white">
          {count}
        </span>
      )}
    </Link>
  )
}

// Linki obok rozwijanych kategorii (promocje + marki).
const navLinks = [
  { href: "/promocje", label: "Promocje" },
  { href: "/marki/chenice", label: "Chenice" },
  { href: "/marki/color-clean", label: "Color Clean" },
  { href: "/marki/6-zero", label: "6 Zero" },
] as const

/** Rozwijane menu z pełną listą kategorii (hover na desktopie + klik/klawiatura). */
function CategoriesMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2xs text-[13px] font-normal text-foreground/60 transition-colors hover:text-foreground aria-expanded:text-foreground"
      >
        Kategorie
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        // pt-sm tworzy „mostek" najazdu — brak dziury między przyciskiem a panelem
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-sm">
          <div
            role="menu"
            className="grid w-[min(92vw,34rem)] grid-cols-2 gap-2xs rounded-lg border border-border bg-background p-sm shadow-lg"
          >
            {categories.map((c) => (
              <Link
                key={c.slug}
                role="menuitem"
                href={`/kategorie/${c.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-md rounded-md px-sm py-xs text-body2 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                <span>{c.name}</span>
                <span className="text-caption text-muted-foreground">{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function TopNav({
  className,
  isAuthenticated = false,
  isAdmin = false,
  categories = [],
}: {
  className?: string
  isAuthenticated?: boolean
  isAdmin?: boolean
  email?: string | null
  categories?: Category[]
}) {
  const router = useRouter()
  const headerRef = React.useRef<HTMLElement>(null)
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  // Publikuj realną wysokość nagłówka jako --nav-h, by hero mógł ją odjąć
  // od wysokości ekranu (nagłówek jest wielorzędowy i zawija kategorie).
  React.useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const update = () =>
      document.documentElement.style.setProperty("--nav-h", `${el.offsetHeight}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function handleSearch(event: React.FormEvent) {
    event.preventDefault()
    const q = query.trim()
    router.push(q ? `/sklep?q=${encodeURIComponent(q)}` : "/sklep")
    setOpen(false)
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-[#fdfcfa]",
        className
      )}
    >
      {/* Pasek użytkowy — czarne tło */}
      <div className="hidden bg-black text-white md:block">
        <div className="section-x mx-auto flex h-9 max-w-[var(--container-content)] items-center justify-center gap-lg text-caption">
          <span className="inline-flex items-center gap-sm">
            <Truck className="size-3.5" aria-hidden />
            Darmowa dostawa
          </span>
          <span className="inline-flex items-center gap-sm">
            <Clock className="size-3.5" aria-hidden />
            Wysyłka w 1 dzień roboczy
          </span>
        </div>
      </div>

      {/* Główny rząd — logo · wyszukiwarka · konto */}
      <div className="section-x mx-auto flex h-16 max-w-[var(--container-content)] items-center justify-between gap-lg md:grid md:h-20 md:grid-cols-[auto_1fr_auto]">
        {/* Brand */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="CBH Polska — strona główna"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-black.svg"
            alt="CBH Polska"
            className="h-9 w-auto md:h-10"
          />
        </Link>

        {/* Wyszukiwarka — na środku */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="hidden w-full md:mx-auto md:flex md:w-2/3 md:min-w-0"
        >
          <div className="relative flex w-full items-center">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj..."
              aria-label="Szukaj produktów"
              className="h-11 w-full appearance-none rounded-lg border border-border bg-background pl-md pr-14 text-body2 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            />
            <button
              type="submit"
              aria-label="Szukaj"
              className="absolute right-1.5 grid size-8 place-items-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/80"
            >
              <Search className="size-4" />
            </button>
          </div>
        </form>

        {/* Prawy klaster: konto (desktop) · koszyk + menu (mobile) */}
        <div className="flex items-center gap-sm md:justify-self-end">
          {/* Konto — desktop */}
          <div className="hidden shrink-0 items-center gap-sm md:flex">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    render={<Link href="/admin/ceny" />}
                  >
                    Panel
                  </Button>
                )}
                <Button variant="ghost" size="sm" render={<Link href="/konto" />}>
                  Konto
                </Button>
                <CartButton />
                <form action={logout}>
                  <Button type="submit" variant="ghost" size="sm">
                    Wyloguj
                  </Button>
                </form>
              </>
            ) : (
              <>
                <CartButton />
                <Button variant="ghost" size="sm" render={<Link href="/login" />}>
                  Zaloguj się
                </Button>
                <Button size="sm" render={<Link href="/rejestracja" />}>
                  Zarejestruj
                </Button>
              </>
            )}
          </div>

        {/* Koszyk + menu — mobile */}
        <div className="flex items-center gap-sm md:hidden">
          <CartButton />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Otwórz menu"
                className="md:hidden"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[340px]">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex max-h-[100dvh] flex-col gap-lg overflow-y-auto px-md pb-2xl pt-lg">
              {/* Wyszukiwarka mobilna */}
              <form onSubmit={handleSearch} role="search" className="relative flex items-center">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Szukaj..."
                  aria-label="Szukaj produktów"
                  className="h-11 w-full appearance-none rounded-lg border border-border bg-background pl-md pr-14 text-body2 outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
                />
                <button
                  type="submit"
                  aria-label="Szukaj"
                  className="absolute right-1.5 grid size-8 place-items-center rounded-md bg-primary text-primary-foreground"
                >
                  <Search className="size-4" />
                </button>
              </form>

              {/* Konto / Panel — u góry, zawsze dostępne (bez przewijania) */}
              <div className="flex flex-col gap-sm">
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Button
                        variant="outline"
                        size="lg"
                        render={
                          <Link href="/admin/ceny" onClick={() => setOpen(false)} />
                        }
                      >
                        Panel
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="lg"
                      render={<Link href="/konto" onClick={() => setOpen(false)} />}
                    >
                      Moje konto
                    </Button>
                    <form action={logout}>
                      <Button
                        type="submit"
                        variant="outline"
                        size="lg"
                        className="w-full"
                      >
                        Wyloguj
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="lg"
                      render={<Link href="/login" onClick={() => setOpen(false)} />}
                    >
                      Zaloguj się
                    </Button>
                    <Button
                      size="lg"
                      render={
                        <Link href="/rejestracja" onClick={() => setOpen(false)} />
                      }
                    >
                      Zarejestruj
                    </Button>
                  </>
                )}
              </div>

              {/* Kategorie */}
              <nav className="flex flex-col gap-sm" aria-label="Kategorie">
                <Link
                  href="/sklep"
                  onClick={() => setOpen(false)}
                  className="text-h6 text-foreground"
                >
                  Sklep
                </Link>
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/kategorie/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="text-subtitle1 text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                ))}

                <span className="mt-sm h-px bg-border" aria-hidden />
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-subtitle1 text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        </div>
        </div>
      </div>

      {/* Nawigacja — wyśrodkowana pod głównym rzędem; kategorie ukryte w dropdownie */}
      <nav
        className="hidden border-t border-border/40 lg:block"
        aria-label="Nawigacja główna"
      >
        <div className="section-x mx-auto flex max-w-[var(--container-content)] items-center justify-center gap-10 py-sm">
          <CategoriesMenu categories={categories} />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-normal text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
