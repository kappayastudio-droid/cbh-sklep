import { setCustomerApproval } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { adminListCustomers } from "@/lib/admin"

export const dynamic = "force-dynamic"

export default async function AdminCustomersPage() {
  const customers = await adminListCustomers()
  const pending = customers.filter((c) => !c.isApproved && c.role !== "admin")

  return (
    <div className="flex flex-col gap-lg">
      <Typography variant="body2" className="text-muted-foreground">
        {pending.length > 0
          ? `${pending.length} ${pending.length === 1 ? "konto oczekuje" : "kont oczekuje"} na zatwierdzenie.`
          : "Brak kont oczekujących na zatwierdzenie."}
      </Typography>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-body2">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-sm pr-md font-medium text-muted-foreground">E-mail</th>
              <th className="py-sm pr-md font-medium text-muted-foreground">Firma</th>
              <th className="py-sm pr-md font-medium text-muted-foreground">Status</th>
              <th className="py-sm font-medium text-muted-foreground">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-border">
                <td className="py-sm pr-md">{c.email}</td>
                <td className="py-sm pr-md text-muted-foreground">
                  {c.companyName ?? "—"}
                </td>
                <td className="py-sm pr-md">
                  {c.role === "admin" ? (
                    <span className="rounded-full bg-foreground px-2 py-0.5 text-caption text-background">
                      admin
                    </span>
                  ) : c.isApproved ? (
                    <span className="rounded-full bg-[#787169] px-2 py-0.5 text-caption text-white">
                      zatwierdzony
                    </span>
                  ) : (
                    <span className="rounded-full border border-border px-2 py-0.5 text-caption text-muted-foreground">
                      oczekuje
                    </span>
                  )}
                </td>
                <td className="py-sm">
                  {c.role !== "admin" && (
                    <form action={setCustomerApproval}>
                      <input type="hidden" name="profileId" value={c.id} />
                      <input
                        type="hidden"
                        name="approved"
                        value={c.isApproved ? "false" : "true"}
                      />
                      <Button
                        type="submit"
                        size="sm"
                        variant={c.isApproved ? "outline" : "default"}
                      >
                        {c.isApproved ? "Cofnij" : "Zatwierdź"}
                      </Button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
