import { useState } from 'react'
import { useTotpConfirm, useTotpStart } from '@/api/hooks/account.hooks'
import { PButton, PPasswordInput, PTextInput } from '@/shared/ui/components'

export interface IProp {
  onClose: () => void
}

export function TotpEnrollmentCard({ onClose }: IProp) {
  const totpStart = useTotpStart()
  const totpConfirm = useTotpConfirm()

  const [step, setStep] = useState<number>(1)
  const [password, setPassword] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [enrollmentId, setEnrollmentId] = useState<string>('')
  const [qrPngBase64, setQrPngBase64] = useState<string>('')

  const qrSrc = qrPngBase64 ? qrSrcFromBase64Png(qrPngBase64) : ''

  const generateQr = async () => {
    try {
      const res = await totpStart.mutateAsync({ password })
      setEnrollmentId(res.enrollmentId)
      setQrPngBase64(res.qrPngBase64)
      setStep(2)
    } catch {
      // error lives in totpStart.error
    }
  }

  const confirm = async () => {
    if (!enrollmentId) return

    try {
      await totpConfirm.mutateAsync({ enrollmentId, code })
      onClose()
    } catch {}
  }

  const resetToStep1 = () => {
    setStep(1)
    setCode('')
    setEnrollmentId('')
    setQrPngBase64('')
    totpStart.reset()
    totpConfirm.reset()
  }

  const startError = getErrorMessage(totpStart.error)
  const confirmError = getErrorMessage(totpConfirm.error)

  const step1 = (
    <div>
      <p className="text-sm mb-3 text-gray-600">
        <b>Step 1:</b> Generate a QR code
      </p>

      <PPasswordInput
        label="Current Password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />

      <div className="text-right mt-5">
        <PButton
          onClick={generateQr}
          disabled={!password.length || totpStart.isPending}
          loading={totpStart.isPending}
          color="black"
        >
          Request QR Code
        </PButton>
      </div>
    </div>
  )

  const step2 = (
    <div>
      <p className="text-sm mb-3 text-gray-600">
        <b>Step 2:</b> Scan QR code, then confirm the 6-digit code
      </p>

      {totpStart.isPending ? (
        <div className="rounded-md border p-4 text-sm text-gray-600">Generating QR code…</div>
      ) : qrSrc ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center sm:items-start">
            <img
              src={qrSrc}
              alt="Scan this QR code with your authenticator app"
              className="h-36 w-36"
            />
            <p className="mt-2 text-xs text-gray-600 max-w-52 text-center sm:text-left">
              Scan with Google Authenticator, 1Password, Authy, etc.
            </p>
          </div>

          <div className="sm:mt-4 flex flex-col items-center sm:items-start">
            <p className="text-xs text-gray-600 mb-1">Enter 6-digit code</p>
            <PTextInput
              value={code}
              onChange={(e) => setCode(e.currentTarget.value)}
              type="number"
              maxLength={6}
              size="sm"
            />
          </div>
        </div>
      ) : (
        <div className="rounded-md border p-4 text-sm text-gray-600">
          QR code unavailable. Go back and request again.
        </div>
      )}

      <div className="flex justify-end gap-2 mt-5">
        <PButton
          variant="default"
          onClick={resetToStep1}
          disabled={totpConfirm.isPending || totpStart.isPending}
        >
          Back
        </PButton>

        <PButton
          px={30}
          onClick={confirm}
          disabled={code.length < 6 || totpConfirm.isPending || !enrollmentId}
          loading={totpConfirm.isPending}
        >
          Finish
        </PButton>
      </div>
    </div>
  )

  return (
    <div>
      <p className="text-sm mb-3 text-gray-600">
        Generate a QR code, scan it with your authenticator app, then confirm with a 6-digit code.
      </p>

      {startError || confirmError ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-4">
          {startError}
          {confirmError}
        </div>
      ) : null}

      {step === 1 && step1}
      {step === 2 && step2}
    </div>
  )
}

function qrSrcFromBase64Png(b64: string) {
  if (!b64) return ''
  return b64.startsWith('data:') ? b64 : `data:image/png;base64,${b64}`
}

function getErrorMessage(err: unknown): string | null {
  if (!err) return null
  if (typeof err === 'string') return err
  if (err instanceof Error) return err.message

  const anyErr = err as any
  return (
    anyErr?.response?.data?.message ||
    anyErr?.response?.data?.error?.message ||
    anyErr?.error.message ||
    null
  )
}
