import { Controller, useFormContext } from "react-hook-form";
import { PNumberInput, type PNumberInputProps } from "@/_shared/ui/components/inputs";
import { PFormField } from "../PFormField";

interface RHFNumberInputProps extends PNumberInputProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
}

export function RHFNumberInput({
  name,
  label,
  description,
  required,
  ...inputProps
}: RHFNumberInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <PFormField
      label={label}
      description={description}
      error={error}
      required={required}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <PNumberInput {...field} {...inputProps} />
        )}
      />
    </PFormField>
  );
}
