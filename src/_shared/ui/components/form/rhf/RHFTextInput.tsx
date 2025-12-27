import { useFormContext } from "react-hook-form";
import { PTextInput, type PTextInputProps } from "@/_shared/ui/components/inputs";
import { PFormField } from "../PFormField";

interface RHFTextInputProps extends PTextInputProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
}

export function RHFTextInput({
  name,
  label,
  description,
  required,
  ...inputProps
}: RHFTextInputProps) {
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
      <PTextInput {...register(name)} {...inputProps} />
    </PFormField>
  );
}
