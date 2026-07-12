import * as React from "react"

/**
 * Wrapper dla treści dokumentów prawnych (regulamin, polityka prywatności).
 * Stylowanie typografii przez warianty potomków — czysty, semantyczny markup w stronach.
 */
export function LegalArticle({ children }: { children: React.ReactNode }) {
  return (
    <article
      className="mx-auto max-w-[52rem] text-body1 leading-relaxed text-foreground/85
        [&_h2]:mb-md [&_h2]:mt-2xl [&_h2]:text-h5 [&_h2]:font-semibold [&_h2]:text-foreground first:[&_h2]:mt-0
        [&_h3]:mb-xs [&_h3]:mt-lg [&_h3]:text-subtitle1 [&_h3]:font-semibold [&_h3]:text-foreground
        [&_p]:mb-md
        [&_ul]:mb-md [&_ul]:list-disc [&_ul]:space-y-2xs [&_ul]:pl-lg
        [&_a]:font-medium [&_a]:text-[#787169] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#5f594f]
        [&_address]:not-italic
        [&_.overflow-x-auto]:my-md
        [&_table]:w-full [&_table]:border-collapse [&_table]:text-body2
        [&_th]:border [&_th]:border-border [&_th]:bg-surface-2 [&_th]:p-sm [&_th]:text-left [&_th]:font-semibold
        [&_td]:border [&_td]:border-border [&_td]:p-sm [&_td]:align-top"
    >
      {children}
    </article>
  )
}
