import { useFormContext } from "react-hook-form";
import { PPasswordInput, type PPasswordInputProps } from "@/_shared/ui/components/inputs";
import { PFormField } from "../PFormField";

interface RHFPasswordInputProps extends PPasswordInputProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
}

export function RHFPasswordInput({
  name,
  label,
  description,
  required,
  ...inputProps
}: RHFPasswordInputProps) {
  const {
    register,
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
      <PPasswordInput {...register(name)} {...inputProps} />
    </PFormField>
  );
}
