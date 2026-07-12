import { Section } from "@/components/ui/section"
import { Typography, type TypographyVariant } from "@/components/ui/typography"

const typeSpecs: { variant: TypographyVariant; weight: string; size: string; sample: string }[] = [
  { variant: "h1", weight: "Light 300", size: "clamp(40 → 96px)", sample: "Headline 1 — ąęłńóśźż" },
  { variant: "h2", weight: "Light 300", size: "clamp(32 → 60px)", sample: "Headline 2" },
  { variant: "h3", weight: "Regular 400", size: "clamp(28 → 48px)", sample: "Headline 3" },
  { variant: "h4", weight: "Regular 400", size: "clamp(24 → 34px)", sample: "Headline 4" },
  { variant: "h5", weight: "Regular 400", size: "24px", sample: "Headline 5" },
  { variant: "h6", weight: "Medium 500", size: "20px", sample: "Headline 6" },
  { variant: "subtitle1", weight: "Regular 400", size: "16px", sample: "Subtitle 1 — sekcje, karty produktu" },
  { variant: "subtitle2", weight: "Medium 500", size: "14px", sample: "Subtitle 2 — meta / etykiety" },
  { variant: "body1", weight: "Regular 400", size: "16px", sample: "Body 1 — domyślny tekst akapitu. Sprzedaż hurtowa wymaga jasnej komunikacji warunków handlowych." },
  { variant: "body2", weight: "Regular 400", size: "14px", sample: "Body 2 — drobniejszy tekst, opisy w karcie produktu, formularze." },
  { variant: "button", weight: "Medium 500", size: "14px", sample: "Add to Cart" },
  { variant: "caption", weight: "Regular 400", size: "12px", sample: "Caption — sygnatury, drobne informacje, daty" },
  { variant: "overline", weight: "Regular 400", size: "10px", sample: "Overline label" },
]

const spacingScale = [
  { name: "2xs", px: 2, rem: "0.125rem" },
  { name: "xs", px: 4, rem: "0.25rem" },
  { name: "sm", px: 8, rem: "0.5rem" },
  { name: "md", px: 16, rem: "1rem" },
  { name: "lg", px: 32, rem: "2rem" },
  { name: "xl", px: 64, rem: "4rem" },
  { name: "2xl", px: 128, rem: "8rem" },
  { name: "3xl", px: 256, rem: "16rem" },
]

const colorHierarchy = [
  { token: "background", label: "Background", role: "Tło całej strony (najjaśniejsza warstwa)", className: "bg-background border" },
  { token: "surface-1", label: "Surface 1", role: "Karty, panele na tle background", className: "bg-surface-1 border" },
  { token: "surface-2", label: "Surface 2", role: "Zagłębione panele wewnątrz kart", className: "bg-surface-2 border" },
  { token: "surface-3", label: "Surface 3", role: "Wyróżnione obszary, code blocks", className: "bg-surface-3 border" },
  { token: "foreground", label: "Foreground", role: "Główny kolor tekstu", className: "bg-foreground" },
  { token: "muted-foreground", label: "Muted FG", role: "Drugorzędny tekst, meta", className: "bg-muted-foreground" },
  { token: "border", label: "Border", role: "Linie podziału, obramowania", className: "bg-border" },
  { token: "brand", label: "Brand", role: "Akcent marki (ciepłe złoto/champagne)", className: "bg-brand" },
  { token: "destructive", label: "Destructive", role: "Błędy, akcje destrukcyjne", className: "bg-destructive" },
]

export default function DesignSystemPage() {
  return (
    <>
      <Section as="header" surface="background">
        <Typography variant="overline" className="text-muted-foreground mb-sm block">
          Design system / cbh-sklep
        </Typography>
        <Typography variant="h1" as="h1" className="mb-md max-w-3xl">
          System wizualny B2B sklepu
        </Typography>
        <Typography variant="subtitle1" className="text-muted-foreground max-w-2xl">
          Spójna hierarchia kolorów, skala spacingu w potęgach 2, oraz responsywna typografia
          Material Design 2 — wszystko skaluje się tym samym rytmem mobile → desktop.
        </Typography>
      </Section>

      {/* COLORS */}
      <Section surface="surface-1">
        <Typography variant="overline" className="text-muted-foreground mb-xs block">
          01 / Kolory
        </Typography>
        <Typography variant="h3" className="mb-sm">
          Hierarchia powierzchni
        </Typography>
        <Typography variant="body1" className="text-muted-foreground mb-lg max-w-2xl">
          Warstwowanie inspirowane stronami premium (np. keanis.co.uk): subtelne różnice między
          kolejnymi powierzchniami. Surface 1 leży na background, Surface 2 wewnątrz Surface 1, itd.
        </Typography>

        <div className="grid gap-md grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {colorHierarchy.map((c) => (
            <div key={c.token} className="flex items-center gap-md rounded-md border p-sm bg-background">
              <div className={`size-16 shrink-0 rounded-md ${c.className}`} aria-hidden />
              <div className="min-w-0">
                <Typography variant="subtitle2">{c.label}</Typography>
                <Typography variant="caption" className="text-muted-foreground font-mono block">
                  --{c.token}
                </Typography>
                <Typography variant="caption" className="text-muted-foreground">
                  {c.role}
                </Typography>
              </div>
            </div>
          ))}
        </div>

        {/* Surface hierarchy demo — zagnieżdżenie */}
        <div className="mt-xl rounded-lg bg-background p-md border">
          <Typography variant="caption" className="text-muted-foreground font-mono mb-sm block">
            background
          </Typography>
          <div className="rounded-md bg-surface-1 p-md">
            <Typography variant="caption" className="text-muted-foreground font-mono mb-sm block">
              surface-1
            </Typography>
            <div className="rounded-md bg-surface-2 p-md">
              <Typography variant="caption" className="text-muted-foreground font-mono mb-sm block">
                surface-2
              </Typography>
              <div className="rounded-md bg-surface-3 p-md">
                <Typography variant="caption" className="text-muted-foreground font-mono">
                  surface-3 (najgłębsza warstwa)
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SPACING */}
      <Section surface="background">
        <Typography variant="overline" className="text-muted-foreground mb-xs block">
          02 / Spacing
        </Typography>
        <Typography variant="h3" className="mb-sm">
          Skala spacingu — potęgi 2
        </Typography>
        <Typography variant="body1" className="text-muted-foreground mb-lg max-w-2xl">
          Każdy poziom jest dwukrotnością poprzedniego: 2 → 4 → 8 → 16 → 32 → 64 → 128 → 256 px.
          Działa ze wszystkimi utility'kami Tailwinda: <code className="font-mono text-sm">p-md</code>,{" "}
          <code className="font-mono text-sm">gap-lg</code>,{" "}
          <code className="font-mono text-sm">space-y-xl</code> itd.
        </Typography>

        <div className="space-y-sm">
          {spacingScale.map((s) => (
            <div key={s.name} className="grid grid-cols-[80px_120px_1fr] items-center gap-md">
              <Typography variant="subtitle2" className="font-mono">{s.name}</Typography>
              <Typography variant="caption" className="text-muted-foreground font-mono">
                {s.px}px / {s.rem}
              </Typography>
              <div className="h-4 bg-brand rounded-sm" style={{ width: `${s.px}px`, maxWidth: "100%" }} />
            </div>
          ))}
        </div>
      </Section>

      {/* TYPOGRAPHY */}
      <Section surface="surface-1">
        <Typography variant="overline" className="text-muted-foreground mb-xs block">
          03 / Typography
        </Typography>
        <Typography variant="h3" className="mb-sm">
          Material Design 2 — type scale
        </Typography>
        <Typography variant="body1" className="text-muted-foreground mb-lg max-w-2xl">
          Nagłówki h1-h4 skalują się płynnie przez <code className="font-mono text-sm">clamp()</code> —
          przewęź okno przeglądarki żeby zobaczyć efekt. Body / caption pozostają stałe (czytelność).
        </Typography>

        <div className="space-y-lg">
          {typeSpecs.map((row) => (
            <div key={row.variant} className="grid gap-sm md:grid-cols-[200px_1fr]">
              <dl className="text-muted-foreground space-y-2xs">
                <dt className="text-caption font-mono uppercase tracking-wider">{row.variant}</dt>
                <dd className="text-caption">{row.weight}</dd>
                <dd className="text-caption font-mono">{row.size}</dd>
              </dl>
              <Typography variant={row.variant}>{row.sample}</Typography>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION PATTERN */}
      <Section surface="background">
        <Typography variant="overline" className="text-muted-foreground mb-xs block">
          04 / Section pattern
        </Typography>
        <Typography variant="h3" className="mb-sm">
          Jednolity rytm sekcji
        </Typography>
        <Typography variant="body1" className="text-muted-foreground mb-lg max-w-2xl">
          Każda sekcja na tej stronie używa komponentu <code className="font-mono text-sm">{"<Section>"}</code> —
          ma identyczny padding poziomy (24px mobile → 64px desktop) i pionowy (48px → 128px),
          skalujący się płynnie przez clamp(). Surface = warstwowanie tła.
        </Typography>

        <div className="rounded-lg bg-surface-2 p-md">
          <Typography variant="subtitle2" className="mb-sm">Użycie</Typography>
          <pre className="bg-surface-3 rounded-md p-md text-sm font-mono overflow-x-auto">
{`import { Section } from "@/components/ui/section"

<Section surface="surface-1" container="content">
  <h2 className="text-h2">Tytuł sekcji</h2>
  <p className="text-body1">Treść z automatycznym rytmem.</p>
</Section>

// Props:
//   surface:   background | surface-1 | surface-2 | surface-3 | brand
//   container: content (1120px) | narrow (672px) | full
//   as:        domyślnie <section>, można nadpisać (np. "header")`}
          </pre>
        </div>
      </Section>

      {/* FOOTER / BRAND */}
      <Section surface="brand">
        <Typography variant="h4" className="mb-sm">
          Brand surface
        </Typography>
        <Typography variant="body1" className="opacity-90">
          Ciepły akcent dla call-to-action sekcji, banerów promocyjnych, footera.
        </Typography>
      </Section>
    </>
  )
}
