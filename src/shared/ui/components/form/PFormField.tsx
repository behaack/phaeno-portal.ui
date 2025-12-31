import type { ReactNode } from "react";
import clsx from "clsx";
import { Stack } from "@/shared/ui/primiatives";

export interface PFormFieldProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function PFormField({
  label,
  description,
  error,
  required,
  children,
}: PFormFieldProps) {
  return (
    <Stack gap="gap-1">
      {label && (
        <label className="text-sm font-medium text-fg">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {description && (
        <div className="text-xs text-fg-muted">{description}</div>
      )}

      {children}

      {error && (
        <div className={clsx("text-xs", "text-error")}>
          {error}
        </div>
      )}
    </Stack>
  );
}
