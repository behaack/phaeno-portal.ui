import z from "zod";
import { RHFPasswordInput } from "@/shared/ui/components/form";
import { Stack } from "@/shared/ui/primiatives";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PButton } from "@/shared/ui/components";
import { ChangePassword } from "@/api/types/account";
import { useChangePassword } from "@/api/hooks/account.hooks";
import { notifications } from "@mantine/notifications";

const schema = z.object({
  currentPassword: z
    .string()
    .nonempty({ message: 'Password required.' }),
  newPassword: z
    .string()
    .nonempty({ message: 'New password required.' })
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(25, { message: 'Password may not exceed 25 characters.' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-[\]{}|\\:;'",.<>/~`]).+$/, {
      message:
        'Must contain at least one alpha character, one number and one special character.',
    }),
  confirmPassword:  z.string()
})
.superRefine(({ confirmPassword, newPassword }, ctx) => {
  if (confirmPassword !== newPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'Must match the new password.',
      path: ['confirmPassword'],
    });
  }
})


type FormValues = z.infer<typeof schema>

export function ChangePasswordForm() {
  const mutation = useChangePassword()

  const form = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
  });

  const submitHndl = async (data: FormValues) => {
    const req: ChangePassword = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    }
    notifications.show({
      color: 'green',
      title: 'Success',
      message: 'Your password was successfully changed.'
    })
    await mutation.mutateAsync(req)
    form.reset()
  }

  const error = getErrorMessage(mutation.error)
  
  return (
    <FormProvider {...form}>
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-4">
          {error}
        </div>
      ) : null}            
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

function getErrorMessage(err: unknown): string | null {
  if (!err) return null
  if (typeof err === "string") return err
  if (err instanceof Error) return err.message
  
  
  const anyErr = err as any
  return (
    anyErr?.response?.data?.message ||
    anyErr?.response?.data?.error?.message ||
    anyErr?.error.message ||
    null
  )
}