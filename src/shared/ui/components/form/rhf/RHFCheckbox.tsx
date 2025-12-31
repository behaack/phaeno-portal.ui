import { Controller, useFormContext } from "react-hook-form";
import type { ChangeEvent } from "react";
import { PCheckbox, type PCheckboxProps } from "@/shared/ui/components/inputs";
import { PFormField } from "../PFormField";

interface RHFCheckboxProps extends PCheckboxProps {
  name: string;
  label: string;
}

export function RHFCheckbox({ name, label, ...props }: RHFCheckboxProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <PFormField error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <PCheckbox
            {...props}
            label={label}
            checked={!!field.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              field.onChange(e.currentTarget.checked)
            }
          />
        )}
      />
    </PFormField>
  );
}
