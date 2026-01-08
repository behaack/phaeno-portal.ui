import { usePasswordRecoveryStart } from "@/api/hooks/account.hooks";
import { PasswordRecoveryStartRequest } from "@/api/types/account";
import { PButton } from "@/shared/ui/components";
import { RHFTextInput } from "@/shared/ui/components/form";
import { Surface } from "@/shared/ui/primiatives";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
})

type FormValues = z.infer<typeof schema>

export function ForgotPasswordPage() {
  const [isSent, setIsSet] = useState(false)
  const mutation = usePasswordRecoveryStart()
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  const submitHndl = form.handleSubmit(async (values: PasswordRecoveryStartRequest) => {
    try {
      await mutation.mutateAsync(values)
      setIsSet(true)
    } catch (error) {
      console.log(error)
    }
  })

  const returntoSignIn = (
    <div className="flex items-center justify-end">
      <button
        type="button"
        className="text-sm underline opacity-80 hover:opacity-100"
        onClick={() => navigate({ to: "/auth/sign-in" })}
      >
        Return to Sign-in
      </button>
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-var(--header-h)-(2*var(--container-py)))] flex items-center justify-center p-4 text-fg">
      <Surface className="w-full max-w-md p-6" elevation="md">
        <h1 className="text-2xl font-semibold">Recover Password</h1>
        {(!isSent) ? 
          (<FormProvider {...form}>
            <p className="text-sm pt-5">Send us your email address. If we find you in our system, we'll send you a password recovery email.</p>        
            <form onSubmit={submitHndl} className="mt-6 space-y-4">
              <RHFTextInput name="email" label="Email" autoComplete="email" />
              { returntoSignIn }
              <PButton type="submit" fullWidth>
                Send
              </PButton>            
            </form>
          </FormProvider>) : (
          <div className="pt-3">
            <div className="">If your email address was found, a password recovery email was sent to that address.</div>
            { returntoSignIn }
          </div>)
        }
      </Surface>
    </div>
  )
}