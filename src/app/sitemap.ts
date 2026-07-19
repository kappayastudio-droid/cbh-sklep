import type { MetadataRoute } from "next"

import { getBrands, getCategories, getVisibleProducts } from "@/lib/catalog"
import { SITE_URL } from "@/lib/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, brands] = await Promise.all([
    getVisibleProducts(),
    getCategories(),
    getBrands(),
  ])

  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/sklep`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/promocje`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/regulamin`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/polityka-prywatnosci`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/kategorie/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${SITE_URL}/marki/${b.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/produkty/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...brandPages, ...productPages]
}
