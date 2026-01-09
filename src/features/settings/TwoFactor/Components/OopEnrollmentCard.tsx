import { useOobConfirm, useOobStart } from "@/api/hooks/account.hooks";
import { ETwoFactorDeliveryChannel } from "@/api/types/enums";
import { authSession } from "@/auth/auth.session";
import { PButton, PPasswordInput, PPinInput, PTextInput } from "@/shared/ui/components";
import { useMemo, useState } from "react";

export interface IProp {
  onClose: () => void
}

export function OopEnrollmentCard({ onClose }: IProp) {
  const account = authSession.getUser()
  const oobStart = useOobStart()
  const oobConfirm = useOobConfirm()
  const [step, setStep] = useState<number>(1)
  const [password, setPassword] = useState<string>("")
  const [code, setCode] = useState<string>("") 
  const [challengeId, setChallengeId] = useState<string>("")
  const [deliveryHint, setDeliveryHint] = useState<string>("")

  const maskedFallback = useMemo(() => {
    const email = account?.email
    return email ? maskEmail(email) : "your email"
  }, [account?.email])  
  
  const sendCode = async () => {
    try {
      const res = await oobStart.mutateAsync({
        password,
        channel: ETwoFactorDeliveryChannel.Email,
        smsNumber: null,
      })

      setChallengeId(res.challengeId)
      setDeliveryHint(res.deliveryHint || maskedFallback)
      setStep(2)
    } catch {
      // errors are already in oobStart.error
    }
  }

  const confirmCode = async () => {
    try {
      await oobConfirm.mutateAsync({ challengeId, code })
      onClose()
    } catch {
      // errors are already in oobConfirm.error
    }
  }    

  const step1 = (
    <div>
      <PPasswordInput 
        label="Current Password" 
        placeholder="Password"
        value={password} 
        onChange={(e) => setPassword(e.currentTarget.value)} 
      />
      <div className="text-right mt-5">
        <PButton 
          onClick={sendCode} 
          disabled={!password.length} 
          color="black"
        >
          Send Code
        </PButton>
      </div>    
    </div>
  )

  const step2 = (
    <div>
      <p className="text-sm mb-3 text-gray-600"><b>Step 2:</b> Check you email for 6-digit code, then confirm it here.</p>
      <image />
      <PTextInput 
        value={code} 
        onChange={(e) => setCode(e.currentTarget.value)} 
        type="number" 
        maxLength={6} 
        size="sm" 
      />
      <div className="text-right mt-5">
        <PButton 
          px={30} 
          onClick={confirmCode} 
          disabled={code.length<6}
        >
          Finish
        </PButton>
      </div>
    </div>
  )

  const startError = getErrorMessage(oobStart.error)
  const confirmError = getErrorMessage(oobConfirm.error)    
    
  return (
    <div>
      <p className="text-sm mb-3 text-gray-600">
        {`Send a 6-digit code to ${maskEmail(account?.email!)}, then confirm it.`}
      </p>   

      {startError || confirmError ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-5">
          {startError}
          {confirmError}
        </div>
      ) : null}   
                 
      {(step===1) && step1 }
      {(step===2) && step2 }
    </div>
  )
}

function maskEmail(email: string) {
  const at = email.indexOf("@");
  if (at <= 1) return "***";
  return `${email[0]}***${email.slice(at)}`;
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