import { UserAccount } from "@/api/types/account";
import { ETwoFactorDeliveryChannel, ETwoFactorMethod } from "@/api/types/enums";
import { KeyValueItem, KeyValueList } from "@/shared/ui/components/compound/KeyValueList";

interface Props {
  account: UserAccount;
  onManage?: () => void;
}

export function TwoFactorSettings({ account, onManage }: Props) {
  const tf = account.twoFactor;

  const enabled = tf.twoFactorMethod !== ETwoFactorMethod.None;

  const items: KeyValueItem[] = [
    {
      label: "Two-factor authentication",
      value: (
        <span className={enabled ? "text-emerald-700" : "text-gray-600"}>
          {enabled ? "Enabled" : "Disabled"}
        </span>
      ),
      labelAction: onManage ? manageButton(onManage) : undefined,
    },
    {
      label: "Method",
      value: formatMethod(tf.twoFactorMethod),
    },
    {
      label: "Delivery channel",
      value:
        tf.twoFactorMethod === ETwoFactorMethod.OutOfBandCode
          ? formatDeliveryChannel(tf.twoFactorDeliveryChannel)
          : "—",
    },
    {
      label: "Destination",
      value:
        tf.twoFactorMethod === ETwoFactorMethod.OutOfBandCode
          ? tf.deliveryHint ?? "—"
          : "—",
    },
  ];

  return <KeyValueList items={items} />;
}

/* -------------------------------- helpers -------------------------------- */

function manageButton(onClick: () => void) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs font-medium text-blue-600 hover:underline"
    >
      Manage
    </button>
  );
}

function formatMethod(method: ETwoFactorMethod): string {
  switch (method) {
    case ETwoFactorMethod.None:
      return "Off";
    case ETwoFactorMethod.OutOfBandCode:
      return "One-time code";
    case ETwoFactorMethod.Totp:
      return "Authenticator app";
    case ETwoFactorMethod.Push:
      return "Push (not enabled)";
    case ETwoFactorMethod.WebAuthn:
      return "Passkey (not enabled)";
    default:
      return "Unknown";
  }
}

function formatDeliveryChannel(
  channel?: ETwoFactorDeliveryChannel
): string {
  switch (channel) {
    case ETwoFactorDeliveryChannel.Email:
      return "Email";
    case ETwoFactorDeliveryChannel.Sms:
      return "SMS";
    default:
      return "—";
  }
}
