import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"

import { useVerifyTwoFactorMutation } from "@/api/hooks/auth.hooks"
import { getApiErrorMessage } from "@/api/core/getApiErrorMessage"
import { ETwoFactorMethod } from "@/api/types/auth"

import { RHFTextInput } from "@/_shared/ui/components/form/rhf/RHFTextInput"
import { RHFCheckbox } from "@/_shared/ui/components/form/rhf/RHFCheckbox"
import { PButton } from "@/_shared/ui/components/inputs/PButton"
import { Surface } from "@/_shared/ui/primiatives/Surface"

import { handleSignInResult } from "@/features/auth/utils/handleSignInResult"
import { Route as TwoFactorRoute } from "@/routes/auth/two-factor"

const schema = z.object({
  code: z.string().min(4, "Enter the code").max(12, "Invalid code"),
  rememberDevice: z.boolean(),
})

type FormValues = z.infer<typeof schema>

export function TwoFactorPage() {
  const navigate = useNavigate()
  const verify = useVerifyTwoFactorMutation()

  // ✅ typed + validated search params
  const { loginChallengeId, method } = TwoFactorRoute.useSearch()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: "", rememberDevice: false },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root")

    if (!loginChallengeId) {
      form.setError("root", { type: "server", message: "Missing login challenge. Please sign in again." })
      return
    }

    try {
      const res = await verify.mutateAsync({
        loginChallengeId,
        code: values.code.trim(),
        rememberDevice: values.rememberDevice,
      })
      await handleSignInResult(res, navigate)
      navigate({ to: "/app" })      
    } catch (err) {
      form.setError("root", { type: "server", message: getApiErrorMessage(err) })
      form.setValue("code", "")
    }
  })

  const rootError = form.formState.errors.root?.message

  const methodLabel =
    method === ETwoFactorMethod.OutOfBandCode ? "email" : "authenticator app"

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-bg text-fg">
      <Surface className="w-full max-w-md p-6" elevation="md">
        <h1 className="text-2xl font-semibold">Two-factor verification</h1>
        <p className="mt-2 text-sm opacity-80">Enter the code from your {methodLabel}.</p>

        {rootError ? (
          <div className="mt-4 rounded-[var(--radius-md)] border border-[oklch(var(--error)/0.25)] bg-[oklch(var(--error)/0.10)] px-3 py-2 text-sm">
            {rootError}
          </div>
        ) : null}

        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <RHFTextInput
              name="code"
              label="Verification code"
              autoComplete="one-time-code"
              inputMode="numeric"
            />

            <RHFCheckbox name="rememberDevice" label="Remember this device" />

            <PButton type="submit" loading={verify.isPending} disabled={verify.isPending} fullWidth>
              Verify
            </PButton>
          </form>
        </FormProvider>
      </Surface>
    </div>
  )
}
