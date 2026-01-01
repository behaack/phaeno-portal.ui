import { Group, Stack } from "@mantine/core";
import { RHFCheckbox, RHFTextInput } from "@/shared/ui/components/form";
import { TFormMode } from "@/shared/types/TFormMode";

export interface IProps {
  formMode: TFormMode
}

export function UserForm({formMode}: IProps) {
  return (
    <Stack gap="md">
      <RHFTextInput
        name="firstName"
        label="First name"
        placeholder="Jane"
        required
      />

      <RHFTextInput
        name="lastName"
        label="Last name"
        placeholder="Doe"
        required
      />

      <RHFTextInput
        name="email"
        label="Email"
        placeholder="jane@email.com"
        disabled={formMode === "edit"}
        required
      />

      <RHFCheckbox 
        name="isAdmin"
        label="Administrator"
      />
    </Stack>
  );
}
