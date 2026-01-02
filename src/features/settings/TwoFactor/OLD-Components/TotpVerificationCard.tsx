import React, { useEffect, useState } from "react";

// If your API can return this, you're golden.
export type TotpEnrollResult = {
  enrollmentId: string;
  otpauthUri: string;
  qrPngBase64?: string; // preferred (server-generated PNG)
  secret?: string;      // optional fallback display
};

type Props = {
  /** Step 1: request enrollment (returns enrollmentId + QR info) */
  enroll: () => Promise<TotpEnrollResult>;

  /** Step 2: confirm enrollment with 6-digit code */
  confirm: (args: { enrollmentId: string; code: string }) => Promise<void>;

  onSuccess?: () => void;
};

export function TotpVerificationCard({ enroll, confirm, onSuccess }: Props) {
  const [enrollment, setEnrollment] = useState<TotpEnrollResult | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEnroll() {
    setBusy(true);
    setError(null);
    setEnrollment(null);
    setQrDataUrl(null);
    setCode("");

    try {
      const res = await enroll();
      setEnrollment(res);

      // If server provides a QR image, use it.
      if (res.qrPngBase64) {
        setQrDataUrl(`data:image/png;base64,${res.qrPngBase64}`);
        return;
      }

      // Otherwise generate QR in browser from otpauthUri (optional dependency)
      if (res.otpauthUri) {
        await tryGenerateQr(res.otpauthUri, setQrDataUrl);
      }
    } catch (e: any) {
      setError(e?.message ?? "Failed to generate TOTP enrollment.");
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

  // Auto-start enrollment on first render (optional; remove if you want manual)
  useEffect(() => {
    // comment this out if you prefer a button-driven flow
    handleEnroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-xl border p-4 space-y-3 text-sm">
      <div className="font-medium">Authenticator app (TOTP)</div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!enrollment ? (
        <div className="text-sm text-gray-600">
          Generating QR code…
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-600">
            Scan this QR code in your authenticator app, then enter the 6-digit code to verify.
          </div>

          {/* QR */}
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="TOTP QR Code"
              className="h-44 w-44 rounded-md border"
            />
          ) : (
            <div className="rounded-md border bg-gray-50 p-3 text-sm">
              QR could not be rendered. Use this OTPAuth URI:
              <div className="mt-2 break-all font-mono text-xs">
                {enrollment.otpauthUri}
              </div>
            </div>
          )}

          {/* Optional secret display */}
          {enrollment.secret ? (
            <div className="text-xs text-gray-600">
              Secret (manual entry):{" "}
              <span className="font-mono">{enrollment.secret}</span>
            </div>
          ) : null}

          {/* Code input */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">6-digit code</label>
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
              Verify
            </button>

            <button
              type="button"
              onClick={handleEnroll}
              disabled={busy}
              className="rounded-md border px-3 py-2 text-sm disabled:opacity-60"
            >
              Regenerate QR
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Optional: generate QR in-browser from otpauthUri.
 * This avoids forcing you to always return qrPngBase64 from the API.
 *
 * If you don't want any extra deps, just remove this and return qrPngBase64 from server.
 */
async function tryGenerateQr(
  otpauthUri: string,
  setQrDataUrl: (v: string) => void
) {
  try {
    // Install: pnpm add qrcode
    //const QRCode = await import("qrcode");
    //const url = await QRCode.toDataURL(otpauthUri, { margin: 1, scale: 6 });
    //setQrDataUrl(url);
    setQrDataUrl("")
  } catch {
    // no-op: component will fall back to showing otpauthUri
  }
}
