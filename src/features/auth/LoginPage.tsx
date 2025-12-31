import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"

import { useSignInMutation } from "@/api/hooks/auth.hooks"
import { getApiErrorMessage } from "@/api/core/getApiErrorMessage"

import { RHFTextInput } from "@/shared/ui/components/form/rhf/RHFTextInput"
import { RHFPasswordInput } from "@/shared/ui/components/form/rhf/RHFPasswordInput"
import { PButton } from "@/shared/ui/components/inputs/PButton"

import { handleSignInResult } from "@/features/auth/utils/handleSignInResult"
import { Surface } from "@/shared/ui/primiatives/Surface"

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const navigate = useNavigate()
  const signIn = useSignInMutation()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root")

    try {
      const res = await signIn.mutateAsync(values)
      await handleSignInResult(res, navigate)
      navigate({ to: "/app" })
    } catch (err) {
      form.setError("root", { type: "server", message: getApiErrorMessage(err) })
      form.setValue("password", "")
    }
  })

  const rootError = form.formState.errors.root?.message

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 text-fg">
      <Surface className="w-full max-w-md p-6" elevation="md">
        <h1 className="text-2xl font-semibold">Sign in</h1>

        {rootError ? (
          <div className="mt-4 rounded-[var(--radius-md)] border border-[oklch(var(--error)/0.25)] bg-[oklch(var(--error)/0.10)] px-3 py-2 text-sm">
            {rootError}
          </div>
        ) : null}

        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <RHFTextInput name="email" label="Email" autoComplete="email" />
            <RHFPasswordInput name="password" label="Password" autoComplete="current-password" />

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm underline opacity-80 hover:opacity-100"
                onClick={() => navigate({ to: "/auth/forgot-password" })}
              >
                Forgot password?
              </button>
            </div>

            <PButton type="submit" fullWidth loading={signIn.isPending} disabled={signIn.isPending}>
              Sign in
            </PButton>
          </form>
        </FormProvider>
      </Surface>
    </div>
  )
}
