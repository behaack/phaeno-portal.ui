import React, { useState } from "react";

export type TotpEnrollResult = {
  enrollmentId: string;
  otpauthUri: string;
  qrPngBase64?: string;
  secret?: string; // optional fallback display
};

interface Props {
  enroll: () => Promise<TotpEnrollResult>;
  confirm: (args: { enrollmentId: string; code: string }) => Promise<void>;
  onSuccess?: () => void;
}

export function TotpEnrollmentCard({
  enroll,
  confirm,
  onSuccess,
}: Props) {
  const [enrollment, setEnrollment] = useState<TotpEnrollResult | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEnroll() {
    setBusy(true);
    setError(null);
    try {
      const res = await enroll();
      setEnrollment(res);
      setCode("");
    } catch (e: any) {
      setError(e?.message ?? "Failed to generate QR code.");
    } finally {
      setBusy(false);
    }
  }

  async function handleConfirm() {
    if (!enrollment) return;

    const value = code.trim();
    if (value.length < 6) {
      setError("Enter the 6-digit code from your authenticator app.");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      await confirm({ enrollmentId: enrollment.enrollmentId, code: value });
      onSuccess?.();
    } catch (e: any) {
      setError(e?.message ?? "Failed to confirm code.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border p-4 space-y-3 text-sm">
      <div className="font-medium">Authenticator app (TOTP)</div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!enrollment ? (
        <>
          <p className="text-sm text-gray-600">
            Generate a QR code, scan it with your authenticator app, then confirm
            with a 6-digit code.
          </p>

          <button
            type="button"
            onClick={handleEnroll}
            disabled={busy}
            className="rounded-md bg-black px-3 py-2 text-sm text-white disabled:opacity-60"
          >
            Generate QR code
          </button>
        </>
      ) : (
        <>
          {enrollment.qrPngBase64 ? (
            <img
              src={`data:image/png;base64,${enrollment.qrPngBase64}`}
              alt="TOTP QR Code"
              className="h-40 w-40 rounded-md border"
            />
          ) : (
            <div className="rounded-md border bg-gray-50 p-3 text-sm">
              QR code not provided. Use this OTPAuth URI:
              <div className="mt-2 break-all font-mono text-xs">
                {enrollment.otpauthUri}
              </div>
            </div>
          )}

          {enrollment.secret ? (
            <div className="text-xs text-gray-600">
              Secret (manual entry):{" "}
              <span className="font-mono">{enrollment.secret}</span>
            </div>
          ) : null}

          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Enter 6-digit code
            </label>
            <input
              className="w-full rounded-md border px-3 py-2"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={busy}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={busy}
              className="rounded-md bg-black px-3 py-2 text-sm text-white disabled:opacity-60"
            >
              Confirm
            </button>

            <button
              type="button"
              onClick={handleEnroll}
              disabled={busy}
              className="rounded-md border px-3 py-2 text-sm disabled:opacity-60"
            >
              Regenerate
            </button>
          </div>
        </>
      )}
    </div>
  );
}
