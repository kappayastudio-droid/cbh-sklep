import Image from "next/image"

import { createBanner, deleteBanner, updateBanner } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { adminListBanners, listPublicImages } from "@/lib/admin"

export const dynamic = "force-dynamic"

const field =
  "w-full border border-border bg-background px-sm py-2xs text-body2 outline-none focus-visible:border-ring"

export default async function AdminBannersPage() {
  const [banners, images] = await Promise.all([
    adminListBanners(),
    listPublicImages(),
  ])

  return (
    <div className="flex flex-col gap-lg">
      <Typography variant="body2" className="text-muted-foreground">
        Banery przewijają się same co 6 sekund. Kolejność ustala pole
        „Kolejność” — mniejsza liczba jest wcześniej. Odznaczenie „Pokazuj”
        chowa baner, ale go nie kasuje.
      </Typography>

      <datalist id="obrazki">
        {images.map((src) => (
          <option key={src} value={src} />
        ))}
      </datalist>

      {banners.length === 0 && (
        <Typography variant="body2" className="text-muted-foreground">
          Brak banerów w bazie — strona główna pokazuje wersję awaryjną wpisaną
          w kodzie. Dodaj pierwszy baner poniżej.
        </Typography>
      )}

      {banners.map((b) => (
        <form
          key={b.id}
          action={updateBanner}
          className="flex flex-col gap-sm border border-border bg-background p-md"
        >
          <input type="hidden" name="bannerId" value={b.id} />

          <div className="flex flex-wrap items-start gap-md">
            <div className="relative h-24 w-40 shrink-0 overflow-hidden border border-border bg-surface-2">
              {b.image && (
                <Image
                  src={b.image}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex min-w-[16rem] flex-1 flex-col gap-2xs">
              <label className="text-caption text-muted-foreground">
                Zdjęcie — wybierz z listy albo wpisz ścieżkę
              </label>
              <input
                name="image"
                list="obrazki"
                defaultValue={b.image}
                className={field}
              />
              <label className="mt-2xs text-caption text-muted-foreground">
                Opis zdjęcia (dla czytników ekranu i Google)
              </label>
              <input name="alt" defaultValue={b.alt} className={field} />
            </div>
          </div>

          <div className="grid gap-sm sm:grid-cols-[8rem_1fr]">
            <div className="flex flex-col gap-2xs">
              <label className="text-caption text-muted-foreground">
                Etykieta
              </label>
              <input name="eyebrow" defaultValue={b.eyebrow} className={field} />
            </div>
            <div className="flex flex-col gap-2xs">
              <label className="text-caption text-muted-foreground">
                Tytuł
              </label>
              <input name="title" defaultValue={b.title} className={field} />
            </div>
          </div>

          <div className="flex flex-col gap-2xs">
            <label className="text-caption text-muted-foreground">
              Tekst pod tytułem
            </label>
            <textarea
              name="subtitle"
              rows={3}
              defaultValue={b.subtitle}
              className={field}
            />
          </div>

          <div className="grid gap-sm sm:grid-cols-2">
            <div className="flex flex-col gap-2xs">
              <label className="text-caption text-muted-foreground">
                Napis na przycisku
              </label>
              <input
                name="ctaLabel"
                defaultValue={b.ctaLabel}
                className={field}
              />
            </div>
            <div className="flex flex-col gap-2xs">
              <label className="text-caption text-muted-foreground">
                Dokąd prowadzi (np. /promocje)
              </label>
              <input
                name="ctaHref"
                defaultValue={b.ctaHref}
                className={field}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-md">
            <div className="flex flex-col gap-2xs">
              <label className="text-caption text-muted-foreground">
                Kolejność
              </label>
              <input
                name="sort"
                inputMode="numeric"
                defaultValue={String(b.sort)}
                className={`${field} w-24`}
              />
            </div>
            <label className="flex items-center gap-2xs pb-2xs text-body2">
              <input
                type="checkbox"
                name="is_published"
                defaultChecked={b.isPublished}
                className="size-4 accent-[#787169]"
              />
              Pokazuj na stronie
            </label>
            <div className="ml-auto flex gap-xs">
              <Button type="submit" size="sm">
                Zapisz
              </Button>
            </div>
          </div>
        </form>
      ))}

      {/* Usuwanie osobno — poza formularzem edycji, żeby nie dało się kliknąć przez pomyłkę */}
      {banners.length > 0 && (
        <div className="flex flex-wrap items-center gap-xs border-t border-border pt-md">
          <Typography variant="caption" className="text-muted-foreground">
            Usuń baner:
          </Typography>
          {banners.map((b) => (
            <form key={b.id} action={deleteBanner}>
              <input type="hidden" name="bannerId" value={b.id} />
              <Button type="submit" size="sm" variant="outline">
                {b.title.slice(0, 28) || "(bez tytułu)"}
              </Button>
            </form>
          ))}
        </div>
      )}

      <form
        action={createBanner}
        className="flex flex-col gap-sm border border-dashed border-border p-md"
      >
        <Typography variant="body2" className="font-medium">
          Nowy baner
        </Typography>
        <Typography variant="caption" className="text-muted-foreground">
          Dodany baner jest na początku ukryty — uzupełnij go, a potem zaznacz
          „Pokazuj na stronie”.
        </Typography>
        <input name="title" placeholder="Tytuł" className={field} required />
        <input
          name="image"
          list="obrazki"
          placeholder="Zdjęcie, np. /banner-promocje.jpg"
          className={field}
        />
        <Button type="submit" size="sm" className="w-fit">
          Dodaj baner
        </Button>
      </form>
    </div>
  )
}
