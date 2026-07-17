import { setOrderStatus } from "@/app/admin/actions"
import { DpdExport } from "@/components/admin/dpd-export"
import { OrderShipping } from "@/components/admin/order-shipping"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { adminListOrders } from "@/lib/admin"
import {
  formatDate,
  formatPriceNet,
  ORDER_STATUSES,
  ORDER_STATUS_LABELS,
} from "@/lib/format"

export const dynamic = "force-dynamic"

export default async function AdminOrdersPage() {
  const orders = await adminListOrders()

  if (orders.length === 0) {
    return (
      <Typography variant="body2" className="text-muted-foreground">
        Brak zamówień.
      </Typography>
    )
  }

  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-wrap items-center justify-between gap-sm">
        <Typography variant="body2" className="text-muted-foreground">
          {orders.length} {orders.length === 1 ? "zamówienie" : "zamówień"}.
        </Typography>
        <DpdExport orders={orders} />
      </div>

      {orders.map((o) => (
        <article
          key={o.id}
          className="rounded-lg border border-border bg-surface-1 p-md"
        >
          <div className="flex flex-wrap items-start justify-between gap-sm">
            <div>
              <p className="text-body2 font-medium">
                {o.customerCompany || o.customerEmail}
              </p>
              <p className="text-caption text-muted-foreground">
                {o.customerEmail} · {formatDate(o.createdAt)} · #
                {o.id.slice(0, 8)}
              </p>
            </div>
            <span className="text-h6 font-semibold tabular-nums">
              {formatPriceNet(o.totalNet)}
            </span>
          </div>

          <ul className="mt-sm flex flex-col gap-2xs border-t border-border pt-sm text-body2">
            {o.items.map((it, i) => (
              <li key={i} className="flex justify-between gap-sm">
                <span className="text-muted-foreground">
                  {it.qty} × {it.name}
                </span>
                <span className="shrink-0 tabular-nums">
                  {formatPriceNet(it.unitPriceNet * it.qty)}
                </span>
              </li>
            ))}
          </ul>

          {o.addr ? (
            <OrderShipping
              orderRef={o.id.slice(0, 8)}
              recipientName={o.recipientName}
              company={o.customerCompany}
              line1={o.addr.line1}
              line2={o.addr.line2}
              postalCode={o.addr.postalCode}
              city={o.addr.city}
              phone={o.phone}
              email={o.customerEmail}
              weightGrams={o.weightGrams}
            />
          ) : (
            o.address && (
              <p className="mt-sm text-caption text-muted-foreground">
                Dostawa: {o.address}
              </p>
            )
          )}

          {/* Zmiana statusu */}
          <form
            action={setOrderStatus}
            className="mt-md flex flex-wrap items-center gap-sm"
          >
            <input type="hidden" name="orderId" value={o.id} />
            <span className="text-caption text-muted-foreground">Status:</span>
            <select
              name="status"
              defaultValue={o.status}
              className="h-9 rounded-md border border-border bg-background px-sm text-body2 outline-none focus-visible:border-ring"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {ORDER_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <Button type="submit" size="sm" variant="outline">
              Zapisz status
            </Button>
          </form>
        </article>
      ))}
    </div>
  )
}
