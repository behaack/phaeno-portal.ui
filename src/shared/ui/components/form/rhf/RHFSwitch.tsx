import { Controller, useFormContext } from "react-hook-form";
import { PSwitch, PSwitchProps } from "../../inputs";

export interface RHFSwitchProps
  extends Omit<PSwitchProps, "checked" | "onChange"> {
  name: string;
}

export function RHFSwitch({ name, ...props }: RHFSwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <PSwitch
          {...props}
          checked={field.value ?? false}
          onChange={(event) => field.onChange(event.currentTarget.checked)}
        />
      )}
    />
  );
}
