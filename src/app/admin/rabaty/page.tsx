import {
  createPriceList,
  deletePriceList,
  updatePriceList,
} from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { adminListPriceLists } from "@/lib/admin"

export const dynamic = "force-dynamic"

export default async function AdminDiscountsPage() {
  const priceLists = await adminListPriceLists()

  return (
    <div className="flex flex-col gap-lg">
      <Typography variant="body2" className="text-muted-foreground">
        Cennik rabatowy to nazwany rabat procentowy od ceny bazowej. Przypisz go
        klientowi w zakładce <strong>Klienci</strong> — od tej chwili widzi on
        swoje ceny po zalogowaniu.
      </Typography>

      {/* Rabaty się obecnie sumują — do decyzji właściciela, patrz lib/pricing.ts. */}
      <div className="border border-border bg-[#f0efeb] p-md">
        <Typography variant="body2" as="p">
          <strong>Uwaga: rabaty się sumują.</strong> Rabat z cennika łączy się z
          rabatem progowym od wartości zamówienia (5–30%).
        </Typography>
        <Typography variant="body2" as="p" className="mt-2xs text-muted-foreground">
          Przykład: klient z rabatem 40% przy zamówieniu za 2 500 zł netto w
          cenach bazowych płaci 1 200 zł — czyli 52% rabatu, nie 40%. Zanim
          przypiszesz rabaty, ustal, czy tak ma być.
        </Typography>
      </div>

      {/* Nowy cennik */}
      <form
        action={createPriceList}
        className="flex flex-wrap items-end gap-md border border-border bg-background p-md"
      >
        <div className="flex flex-col gap-2xs">
          <label htmlFor="new-name" className="text-caption text-muted-foreground">
            Nazwa
          </label>
          <input
            id="new-name"
            name="name"
            required
            maxLength={80}
            placeholder="np. Stali klienci"
            className="border border-border bg-background px-sm py-2xs text-body2"
          />
        </div>
        <div className="flex flex-col gap-2xs">
          <label htmlFor="new-pct" className="text-caption text-muted-foreground">
            Rabat %
          </label>
          <input
            id="new-pct"
            name="discountPct"
            required
            inputMode="decimal"
            placeholder="40"
            className="w-24 border border-border bg-background px-sm py-2xs text-body2"
          />
        </div>
        <Button type="submit" size="sm">
          Dodaj cennik
        </Button>
      </form>

      {priceLists.length === 0 ? (
        <Typography variant="body2" className="text-muted-foreground">
          Brak cenników. Dodaj pierwszy powyżej.
        </Typography>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-body2">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-sm pr-md font-medium text-muted-foreground">
                  Nazwa
                </th>
                <th className="py-sm pr-md font-medium text-muted-foreground">
                  Rabat %
                </th>
                <th className="py-sm pr-md font-medium text-muted-foreground">
                  Klienci
                </th>
                <th className="py-sm font-medium text-muted-foreground">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {priceLists.map((pl) => (
                <tr key={pl.id} className="border-b border-border align-middle">
                  <td className="py-sm pr-md">
                    <input
                      form={`edit-${pl.id}`}
                      name="name"
                      defaultValue={pl.name}
                      required
                      maxLength={80}
                      aria-label="Nazwa cennika"
                      className="w-full min-w-40 border border-border bg-background px-sm py-2xs"
                    />
                  </td>
                  <td className="py-sm pr-md">
                    <input
                      form={`edit-${pl.id}`}
                      name="discountPct"
                      defaultValue={String(pl.discountPct)}
                      required
                      inputMode="decimal"
                      aria-label="Rabat procentowy"
                      className="w-20 border border-border bg-background px-sm py-2xs"
                    />
                  </td>
                  <td className="py-sm pr-md text-muted-foreground">
                    {pl.customerCount}
                  </td>
                  <td className="py-sm">
                    <div className="flex gap-xs">
                      <form id={`edit-${pl.id}`} action={updatePriceList}>
                        <input
                          type="hidden"
                          name="priceListId"
                          value={pl.id}
                        />
                        <Button type="submit" size="sm" variant="outline">
                          Zapisz
                        </Button>
                      </form>
                      <form action={deletePriceList}>
                        <input
                          type="hidden"
                          name="priceListId"
                          value={pl.id}
                        />
                        <Button type="submit" size="sm" variant="outline">
                          Usuń
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {priceLists.some((pl) => pl.customerCount > 0) && (
        <Typography variant="caption" className="text-muted-foreground">
          Usunięcie cennika nie kasuje kont — przypisani klienci wracają do cen
          bazowych (bez rabatu).
        </Typography>
      )}
    </div>
  )
}
