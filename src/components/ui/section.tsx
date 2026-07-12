import * as React from "react"

import { cn } from "@/lib/utils"

type Surface = "background" | "surface-1" | "surface-2" | "surface-3" | "brand"
type Container = "content" | "narrow" | "full"

const surfaceClassMap: Record<Surface, string> = {
  background: "bg-background text-foreground",
  "surface-1": "bg-surface-1 text-foreground",
  "surface-2": "bg-surface-2 text-foreground",
  "surface-3": "bg-surface-3 text-foreground",
  brand: "bg-brand text-brand-foreground",
}

const containerClassMap: Record<Container, string> = {
  content: "container-content",
  narrow: "container-narrow",
  full: "",
}

type SectionProps = {
  surface?: Surface
  container?: Container
  as?: React.ElementType
  className?: string
  innerClassName?: string
  children?: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLElement>, "className">

export function Section({
  surface = "background",
  container = "content",
  as,
  className,
  innerClassName,
  children,
  ...props
}: SectionProps) {
  const Component = as ?? "section"
  return (
    <Component
      className={cn("section-x section-y", surfaceClassMap[surface], className)}
      {...props}
    >
      <div className={cn(containerClassMap[container], innerClassName)}>
        {children}
      </div>
    </Component>
  )
}
