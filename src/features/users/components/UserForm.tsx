import { RHFTextInput } from "@/shared/ui/components/form";
import { TFormMode } from "@/shared/types/TFormMode";
import { RHFSwitch } from "@/shared/ui/components/form/rhf";
import { Stack } from "@/shared/ui/primiatives";

export interface IProps {
  formMode: TFormMode
}

export function UserForm({formMode}: IProps) {
  return (
    <Stack gap="gap-3">
      <RHFTextInput
        name="firstName"
        label="First name"
        placeholder="First name"
        required
      />

      <RHFTextInput
        name="lastName"
        label="Last name"
        placeholder="Last name"
        required
      />

      <RHFTextInput
        name="email"
        label="Email"
        placeholder="Email address"
        disabled={formMode === "edit"}
        required
      />

      <RHFSwitch
        name="isAdmin"
        label="Administrator"
      />
    </Stack>
  );
}
