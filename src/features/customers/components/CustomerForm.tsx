import { RHFTextInput } from "@/shared/ui/components/form";
import { TFormMode } from "@/shared/types/TFormMode";
import { Stack } from "@/shared/ui/primiatives";

export interface IProps {
  formMode: TFormMode
}

export function CustomerForm({formMode}: IProps) {
  return (
    <Stack gap="gap-3">
      <RHFTextInput
        name="organizationName"
        label="Customer name"
        placeholder="Customer name"
        maxLength={250}
        required
      />

      <RHFTextInput
        name="street1"
        label="Street"
        placeholder="Street"
        maxLength={100}
        required
      />

      <RHFTextInput
        name="street2"
        label="Unit, suite, etc."
        placeholder="Unit, Suite, etc."
        maxLength={100}
      />

      <RHFTextInput
        name="city"
        label="City"
        placeholder="City"
        maxLength={100}
        required
      />

      <RHFTextInput
        name="state"
        label="State | Region"
        placeholder="State | Region"
        maxLength={100}
        required
      />

      <RHFTextInput
        name="postalCode"
        label="Postal code"
        placeholder="Postal code"
        maxLength={25}        
        required
      />

      <RHFTextInput
        name="countryCode"
        label="Country code"
        placeholder="Country code"
        maxLength={2}                
        required
      />                        
    </Stack>
  );
}
