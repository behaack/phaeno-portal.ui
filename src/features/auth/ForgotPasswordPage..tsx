import { PButton, PTextInput } from "@/shared/ui/components";
import { RHFTextInput } from "@/shared/ui/components/form";
import { Surface } from "@/shared/ui/primiatives";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
})

type FormValues = z.infer<typeof schema>

export function ForgotPasswordPage() {

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  const submitHndl = form.handleSubmit(async (values) => {

  })

  return (
    <div className="min-h-[calc(100vh-var(--header-h)-(2*var(--container-py)))] flex items-center justify-center p-4 text-fg">
      <Surface className="w-full max-w-md p-6" elevation="md">
        <h1 className="text-2xl font-semibold">Recover Password</h1>
        <p className="text-sm pt-5">Send us your email address. If we find you in our system, we'll send you a password recovery email.</p>
        <FormProvider {...form}>
          <form onSubmit={submitHndl} className="mt-6 space-y-4">
            <RHFTextInput name="email" label="Email" autoComplete="email" />
            <PButton disabled={!form.formState.isValid} type="submit" fullWidth>
              Sign in
            </PButton>            
          </form>
        </FormProvider>
      </Surface>
    </div>
  )
}