import React, { useState } from "react";

export type OobStartResult = {
  challengeId: string;
  deliveryHint?: string; // masked, from server
};

interface Props {
  /** Starts the challenge (sends the code) */
  sendCode: () => Promise<OobStartResult>;

  /** Confirms the code */
  confirmCode: (args: { challengeId: string; code: string }) => Promise<void>;

  onSuccess?: () => void;
}

export function OobVerificationCard({
  sendCode,
  confirmCode,
  onSuccess,
}: Props) {
  const [challenge, setChallenge] = useState<OobStartResult | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    setBusy(true);
    setError(null);
    try {
      const res = await sendCode();
      setChallenge(res);
      setCode("");
    } catch (e: any) {
      setError(e?.message ?? "Failed to send verification code.");
    } finally {
      setBusy(false);
    }
  }

  async function handleConfirm() {
    if (!challenge) return;

    const value = code.trim();
    if (value.length < 4) {
      setError("Enter the code you received.");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      await confirmCode({ challengeId: challenge.challengeId, code: value });
      onSuccess?.();
    } catch (e: any) {
      setError(e?.message ?? "Failed to confirm code.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border p-4 space-y-3 text-sm">
      <div className="font-medium">Verify one-time code</div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!challenge ? (
        <>
          <p className="text-sm text-gray-600">
            Send a one-time verification code to confirm this delivery method.
          </p>

          <button
            type="button"
            onClick={handleSend}
            disabled={busy}
            className="rounded-md bg-black px-3 py-2 text-sm text-white disabled:opacity-60"
          >
            Send code
          </button>
        </>
      ) : (
        <>
          <div className="text-sm text-gray-700">
            Code sent to{" "}
            <span className="font-medium">
              {challenge.deliveryHint ?? "your destination"}
            </span>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Enter verification code
            </label>
            <input
              className="w-full rounded-md border px-3 py-2"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Code"
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
              onClick={handleSend}
              disabled={busy}
              className="rounded-md border px-3 py-2 text-sm disabled:opacity-60"
            >
              Resend
            </button>
          </div>
        </>
      )}
    </div>
  );
}
