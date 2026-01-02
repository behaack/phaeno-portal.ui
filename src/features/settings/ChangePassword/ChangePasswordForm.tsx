import { RHFTextInput, RHFPasswordInput } from "@/shared/ui/components/form";
import { Stack } from "@/shared/ui/primiatives";
import { FormProvider, useForm } from "react-hook-form";
import { changePasswordSchema } from "./schema/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PButton } from "@/shared/ui/components";
import { ChangePassword } from "@/api/types/account";

export function ChangePasswordForm() {
  const form = useForm<ChangePassword>({
    mode: "onBlur",
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
  });

  const submitHndl = (data: ChangePassword) => {
    console.log(data)
  }
  
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitHndl)}>
        <Stack gap="gap-2">
          <RHFPasswordInput
            name="currentPassword"
            label="Current password"
            placeholder="Current password"
            required
          />

          <RHFPasswordInput
            name="newPassword"
            label="New password"
            placeholder="New password"
            description="Must contain at least one alpha character, one number and one special character."
            required
          />

          <RHFPasswordInput
            name="confirmPassword"
            label="Confirm new password"
            placeholder="Confirm new password"
            required
          />
        </Stack>
        <div className="flex justify-end gap-2 mt-5 text-right">
          <PButton disabled={!form.formState.isDirty} onClick={() => form.reset()} color="red" type="reset" >Reset Form</PButton>
          <PButton disabled={!form.formState.isValid} type="submit" >Change Password</PButton>
        </div>
      </form>    
    </FormProvider>
  );
}