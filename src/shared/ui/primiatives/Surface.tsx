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
  fullHeight = false,
}: {
  children: ReactNode
  className?: string
  elevation?: Elevation
  hover?: Hover
  fullHeight?: boolean
}) {
  return (
    <div
      className={clsx(
        "bg-surface text-fg rounded-lg",
        elevationMap[elevation],
        "transition-shadow duration-normal ease-smooth",

        hover === "lift" && "hover:shadow-lg",

        /* 👇 full page surface */
        fullHeight &&  "min-h-[calc(100vh-var(--header-h)-(2*var(--container-py)))]",

        className
      )}
    >
      {children}
    </div>
  )
}
