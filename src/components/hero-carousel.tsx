"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

export type Slide = {
  src: string
  alt: string
  eyebrow: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
}

/** Ile sekund stoi jeden slajd, zanim karuzela przejdzie dalej. */
const AUTOPLAY_DELAY_MS = 6000

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  // Autoprzewijanie. Świadomie nie używamy wtyczki embla-carousel-autoplay:
  // przy tym ustawieniu nie startowała, a własny licznik jest przewidywalny
  // i widać dokładnie, co go zatrzymuje.
  //  • najechanie myszą wstrzymuje (ktoś czyta) i zjechanie wznawia,
  //  • ukryta karta nie przewija w tle,
  //  • „ogranicz ruch" w systemie wyłącza ruch całkowicie.
  React.useEffect(() => {
    if (!api || slides.length < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const root = api.rootNode()
    let paused = false
    const pause = () => {
      paused = true
    }
    const resume = () => {
      paused = false
    }
    root.addEventListener("mouseenter", pause)
    root.addEventListener("mouseleave", resume)
    root.addEventListener("focusin", pause)
    root.addEventListener("focusout", resume)

    const id = window.setInterval(() => {
      if (paused || document.hidden) return
      api.scrollNext()
    }, AUTOPLAY_DELAY_MS)

    return () => {
      window.clearInterval(id)
      root.removeEventListener("mouseenter", pause)
      root.removeEventListener("mouseleave", resume)
      root.removeEventListener("focusin", pause)
      root.removeEventListener("focusout", resume)
    }
  }, [api, slides.length])

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <section
      className="relative w-full bg-background"
      aria-label="Hero"
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start", duration: 28 }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, idx) => (
            <CarouselItem
              key={slide.src + idx}
              className="basis-full pl-0"
            >
              <div className="flex flex-col md:grid md:h-[calc(100svh_-_var(--nav-h,4rem))] md:min-h-[560px] md:grid-cols-[2fr_3fr] lg:h-[calc((100svh_-_var(--nav-h,9.5rem))*0.66)] lg:min-h-[460px]">
                {/* Image — mobile top (stała wysokość), desktop right */}
                <div className="relative h-64 overflow-hidden bg-surface-2 md:order-2 md:h-auto">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={idx === 0}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>

                {/* Copy — mobile: pod zdjęciem, wyśrodkowana; desktop: po lewej */}
                <div className="bg-[#787169] md:order-1 md:flex md:items-center">
                  <div className="section-x w-full py-lg md:py-0">
                    <div className="mx-auto w-full max-w-[36rem] text-center md:mx-0 md:max-w-[34rem] md:text-left lg:max-w-[40rem]">
                      <span className="mb-md inline-block rounded-full bg-white/10 px-3 py-1.5 text-[14px] font-medium text-white">
                        {slide.eyebrow}
                      </span>

                      <h1 className="mb-md text-[28px] leading-[1.1] tracking-tight text-white md:text-[40px]">
                        {slide.title}
                      </h1>

                      <p className="mb-lg text-[14px] leading-[1.7] text-white/85 md:text-[15px]">
                        {slide.subtitle}
                      </p>

                      <Button
                        size="sm"
                        className="h-10 bg-[#f0efeb] px-md text-[14px] text-foreground hover:bg-white hover:text-foreground"
                        render={<Link href={slide.ctaHref} />}
                      >
                        {slide.ctaLabel}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Strzałki nawigacyjne — białe na ciemnym kwadratowym tle, na krawędziach */}
      <button
        type="button"
        onClick={() => api?.scrollPrev()}
        aria-label="Poprzedni slajd"
        className="absolute left-lg top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/50 md:grid"
      >
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => api?.scrollNext()}
        aria-label="Następny slajd"
        className="absolute right-lg top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/50 md:grid"
      >
        <ChevronRight className="size-5" aria-hidden />
      </button>

      {/* Nawigacja — kropki: mobile nad dolną krawędzią zdjęcia, desktop na dole kontenera */}
      <div className="pointer-events-none absolute left-0 right-0 top-[13rem] z-10 flex justify-center md:top-auto md:bottom-lg">
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1.5 backdrop-blur-md">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === current
                  ? "size-2 bg-white"
                  : "size-1.5 bg-white/50 hover:bg-white/70"
              )}
              aria-label={`Przejdź do slajdu ${i + 1}`}
              aria-current={i === current}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
