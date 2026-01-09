import { usePasswordRecoveryConfirm } from "@/api/hooks/account.hooks";
import { ResetPasswordRequest } from "@/api/types/account";
import { PButton } from "@/shared/ui/components";
import { RHFPasswordInput } from "@/shared/ui/components/form";
import { Surface } from "@/shared/ui/primiatives";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { Route } from "@/routes/auth/password-reset/$token"
import z from "zod";
import { notifications } from "@mantine/notifications";

const schema = z.object({
  newPassword: z
    .string()
    .nonempty({ message: 'Password required.' })
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

export function ResetPasswordPage() {
  const { token } = Route.useParams()
  const mutation = usePasswordRecoveryConfirm()
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  })

  const submitHndl = form.handleSubmit(async (values: FormValues) => {
    var res: ResetPasswordRequest = {
      newPassword: values.newPassword,
      token
    }
    try {
      await mutation.mutateAsync(res)
      notifications.show({
        radius: 'md',
        color: 'green',
        title: 'Job Status Update',
        message: 'Your password has been reset.'
      })
      navigate({
        to: "/auth/sign-in"
      })
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div className="min-h-[calc(100vh-var(--header-h)-(2*var(--container-py)))] flex items-center justify-center p-4 text-fg">
      <Surface className="w-full max-w-md p-6" elevation="md">
        <h1 className="text-2xl font-semibold">Reset Password</h1>
          <FormProvider {...form}>
            <form onSubmit={submitHndl} className="mt-6 space-y-4">
              <RHFPasswordInput 
                name="newPassword" 
                label="Password" 
                placeholder="New password"
                description="Must contain at least one alpha character, one number and one special character."
                required
              />
              <RHFPasswordInput 
                name="confirmPassword" 
                label="Confirm Password"
                placeholder="Confirm new password"
                required
              />
              <PButton type="submit" fullWidth>
                Reset
              </PButton>            
            </form>
          </FormProvider>
      </Surface>
    </div>
  )
}