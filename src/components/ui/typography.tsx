import * as React from "react"

import { cn } from "@/lib/utils"

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline"

const variantClassMap: Record<TypographyVariant, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  h5: "text-h5",
  h6: "text-h6",
  subtitle1: "text-subtitle1",
  subtitle2: "text-subtitle2",
  body1: "text-body1",
  body2: "text-body2",
  button: "text-button",
  caption: "text-caption",
  overline: "text-overline",
}

const defaultElementMap: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "p",
  subtitle2: "p",
  body1: "p",
  body2: "p",
  button: "span",
  caption: "span",
  overline: "span",
}

type TypographyProps = {
  variant?: TypographyVariant
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLElement>, "className">

export function Typography({
  variant = "body1",
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as ?? defaultElementMap[variant]
  return (
    <Component className={cn(variantClassMap[variant], className)} {...props}>
      {children}
    </Component>
  )
}
