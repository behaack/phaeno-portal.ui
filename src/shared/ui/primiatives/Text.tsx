import type { ReactNode } from "react";
import clsx from "clsx";

type Variant = "heading" | "subheading" | "body" | "muted";

const styles: Record<Variant, string> = {
  heading: "text-xl font-semibold text-fg",
  subheading: "text-sm font-medium text-fg",
  body: "text-sm text-fg",
  muted: "text-sm text-fg-muted",
};

export function Text({
  variant = "body",
  children,
  className,
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx(styles[variant], className)}>
      {children}
    </div>
  );
}
