import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wkrótce otwarcie — CBH Polska",
  robots: { index: false, follow: false },
}

export default function ComingSoonPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "40px",
        textAlign: "center",
        background: "linear-gradient(135deg, #6e6860 0%, #847d75 100%)",
        color: "#fff",
        fontFamily:
          "-apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-white.svg" alt="CBH Polska" style={{ height: 56 }} />
      <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0 }}>
        Trwają prace nad sklepem
      </h1>
      <p style={{ fontSize: 17, opacity: 0.9, maxWidth: 460, lineHeight: 1.6 }}>
        Przygotowujemy dla Was hurtownię CBH Polska. Wkrótce otwarcie — zapraszamy
        niebawem.
      </p>
      <p style={{ fontSize: 14, opacity: 0.75 }}>
        Kontakt: chenice@list.pl · +48 601 715 751
      </p>
    </div>
  )
}
