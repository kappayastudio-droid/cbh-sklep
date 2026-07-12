import { PricesEditor } from "@/components/admin/prices-editor"
import { adminListCatalog } from "@/lib/admin"

export const dynamic = "force-dynamic"

export default async function AdminPricesPage() {
  const products = await adminListCatalog()
  return <PricesEditor products={products} />
}
