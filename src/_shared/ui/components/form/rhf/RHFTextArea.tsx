import { useFormContext } from "react-hook-form";
import { PTextArea, type PTextAreaProps } from "@/_shared/ui/components/inputs";
import { PFormField } from "../PFormField";

interface PRHFTextAreaProps extends PTextAreaProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
}

export function RHFTextArea({
  name,
  label,
  description,
  required,
  ...inputProps
}: PRHFTextAreaProps) {
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
      <PTextArea {...register(name)} {...inputProps} />
    </PFormField>
  );
}
