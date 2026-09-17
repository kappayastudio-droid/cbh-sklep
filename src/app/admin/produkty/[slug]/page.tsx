import Link from "next/link"
import { notFound } from "next/navigation"

import { updateProduct } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { adminGetProduct } from "@/lib/admin"

export const dynamic = "force-dynamic"

const fieldClass =
  "w-full border border-border bg-background px-sm py-2xs text-body2 outline-none focus-visible:border-ring"

export default async function AdminProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await adminGetProduct(slug)
  if (!product) notFound()

  return (
    <div className="flex max-w-[44rem] flex-col gap-lg">
      <div className="flex flex-col gap-2xs">
        <Link
          href="/admin/ceny"
          className="text-caption text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          ← Wróć do cen i stanów
        </Link>
        <Typography variant="h5" as="h1">
          {product.name}
        </Typography>
        <Typography variant="caption" className="text-muted-foreground">
          /produkty/{product.slug} — adres nie zmienia się przy zmianie nazwy,
          więc linki i pozycja w Google zostają.
        </Typography>
      </div>

      <form action={updateProduct} className="flex flex-col gap-md">
        <input type="hidden" name="slug" value={product.slug} />

        <label className="flex flex-col gap-2xs">
          <span className="text-caption font-medium text-muted-foreground">
            Nazwa produktu
          </span>
          <input
            name="name"
            required
            maxLength={200}
            defaultValue={product.name}
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-2xs">
          <span className="text-caption font-medium text-muted-foreground">
            Krótki opis
          </span>
          <textarea
            name="shortDescription"
            rows={3}
            defaultValue={product.shortDescription}
            placeholder="Jedno–dwa zdania. Widoczne na kafelku produktu i w wynikach wyszukiwania."
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-2xs">
          <span className="text-caption font-medium text-muted-foreground">
            Pełny opis
          </span>
          <textarea
            name="description"
            rows={14}
            defaultValue={product.description}
            placeholder="Skład, sposób użycia, dla jakich włosów. Bez tego opisu zakładka „Opis produktu” w ogóle się nie pokazuje."
            className={`${fieldClass} leading-relaxed`}
          />
        </label>

        <label className="flex w-fit items-center gap-2xs text-body2">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={product.isPublished}
            className="size-4 accent-[#787169]"
          />
          Widoczny w sklepie
        </label>
        <Typography variant="caption" className="text-muted-foreground">
          Odznaczenie ukrywa produkt przed klientami, ale niczego nie kasuje —
          zamówienia z przeszłości zostają nietknięte.
        </Typography>

        <div className="flex items-center gap-sm">
          <Button type="submit">Zapisz zmiany</Button>
          <Link
            href={`/produkty/${product.slug}`}
            target="_blank"
            rel="noreferrer"
            className="text-body2 text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Podgląd w sklepie
          </Link>
        </div>
      </form>
    </div>
  )
}
