import { ETwoFactorDeliveryChannel } from "@/api/types/enums";
import { PTextInput } from "@/shared/ui/components";

export type OobDestinationValue = {
  channel: ETwoFactorDeliveryChannel | null;
  smsNumber?: string;
};

interface Props {
  value: OobDestinationValue;
  accountEmail: string;
  onChange: (value: OobDestinationValue) => void;
}

export function OobDestinationPicker({
  value,
  accountEmail,
  onChange,
}: Props) {
  const channel = value.channel;

  return (
    <div className="rounded-xl border p-4 space-y-3 text-sm">
      <div className="font-medium">Delivery destination</div>

      {/* Channel selection */}
      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex items-start gap-3">
          <input
            type="radio"
            checked={channel === ETwoFactorDeliveryChannel.Email}
            onChange={() =>
              onChange({
                channel: ETwoFactorDeliveryChannel.Email,
                smsNumber: undefined,
              })
            }
          />
          <div className="mt-[-4px]">
            <div className="font-medium">Email</div>
            <div className="text-sm text-gray-600">
              Send codes to your account email
            </div>
          </div>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="radio"
            checked={channel === ETwoFactorDeliveryChannel.Sms}
            onChange={() =>
              onChange({
                channel: ETwoFactorDeliveryChannel.Sms,
                smsNumber: value.smsNumber ?? "",
              })
            }
          />
          <div className="mt-[-4px]">
            <div className="font-medium">SMS</div>
            <div className="text-sm text-gray-600">
              Send codes to your mobile phone
            </div>
          </div>
        </label>
      </div>

      {/* Destination */}
      {channel === ETwoFactorDeliveryChannel.Email ? (
        <PTextInput          
          label="Email Address (read only)"
          variant="filled"
          value={`Uses account email: ${maskEmail(accountEmail)}`}
          readOnly={true}
        />        
      ) : null}

      {channel === ETwoFactorDeliveryChannel.Sms ? (
        <PTextInput
          label="SMS Number"
          placeholder="e.g. +1 555 123 4567"
          value={value.smsNumber ?? ""}
          onChange={(e) =>
            onChange({
              channel: ETwoFactorDeliveryChannel.Sms,
              smsNumber: e.target.value,
            })
          }
        />
      ) : null}
    </div>
  );
}

/* UI-only masking (server still owns real masking rules) */
function maskEmail(email: string) {
  const at = email.indexOf("@");
  if (at <= 1) return "***";
  return `${email[0]}***${email.slice(at)}`;
}
