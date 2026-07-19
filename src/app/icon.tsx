import { ImageResponse } from "next/og"

export const size = { width: 512, height: 512 }
export const contentType = "image/png"

/** Ikona witryny (favicon) — generowana: oliwkowe tło + białe „C". */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#787169",
          color: "#ffffff",
          fontSize: 340,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        C
      </div>
    ),
    size
  )
}
