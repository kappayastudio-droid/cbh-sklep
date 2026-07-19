import { ImageResponse } from "next/og"

export const alt = "CBH Polska — Hurtownia kosmetyków fryzjerskich B2B"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Domyślny obrazek Open Graph (podgląd linku w social/komunikatorach). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#787169",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "0.04em",
          }}
        >
          CBH POLSKA
        </div>
        <div style={{ marginTop: 24, fontSize: 40, opacity: 0.92 }}>
          Hurtownia kosmetyków fryzjerskich B2B
        </div>
        <div style={{ marginTop: 16, fontSize: 28, opacity: 0.8 }}>
          Chenice · 6 Zero · Color Clean
        </div>
      </div>
    ),
    size
  )
}
