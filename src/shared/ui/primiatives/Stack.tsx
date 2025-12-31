import type { ReactNode } from "react";
import clsx from "clsx";

type Gap =
  | "gap-1"
  | "gap-2"
  | "gap-3"
  | "gap-4"
  | "gap-6"
  | "gap-8";

export function Stack({
  children,
  gap = "gap-4",
  className,
}: {
  children: ReactNode;
  gap?: Gap;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-col", gap, className)}>
      {children}
    </div>
  );
}
