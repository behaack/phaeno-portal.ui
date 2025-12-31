import type { ReactNode } from "react"
import clsx from "clsx"

type Elevation = "sm" | "md" | "lg"
type Hover = "none" | "lift"

const elevationMap: Record<Elevation, string> = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
}

export function Surface({
  children,
  className,
  elevation = "md",
  hover = "none",
}: {
  children: ReactNode
  className?: string
  elevation?: Elevation
  hover?: Hover
}) {
  return (
    <div
      className={clsx(
        "bg-surface text-fg rounded-lg",
        elevationMap[elevation],
        "transition-shadow duration-normal ease-smooth",
        hover === "lift" && "hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  )
}
