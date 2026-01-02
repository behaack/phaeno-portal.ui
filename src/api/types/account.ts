import { Role } from "@/auth/auth.roles.js"
import type { EOrganizationType, ETwoFactorDeliveryChannel, ETwoFactorMethod } from "./enums.ts"

export type UserAccount = {
  userId: string
  organizationType: EOrganizationType
  organizationId: string
  organizationName: string
  email: string
  firstName: string
  lastName: string
  isAdmin: boolean
  roles: Role[],
  twoFactor: TwoFactor
}

export type TwoFactor = {
  twoFactorMethod: ETwoFactorMethod,
  twoFactorDeliveryChannel?: ETwoFactorDeliveryChannel,
  deliveryHint?: string
}

export type ChangePassword = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// ---------- TOTP ----------
export type StartTotpEnrollmentRequest = { password: string }

export type StartTotpEnrollmentResponse = {
  enrollmentId: string
  qrPngBase64: string
}

export type ConfirmTotpEnrollmentRequest = {
  enrollmentId: string
  code: string
}

// ---------- OOB ----------
export type StartOobEnrollmentRequest = {
  password: string
  channel: ETwoFactorDeliveryChannel
  smsNumber?: string | null
}

export type StartOobEnrollmentResponse = {
  challengeId: string
  deliveryHint: string
}

export type ConfirmOobEnrollmentRequest = {
  challengeId: string
  code: string
}

// ------ Password Recovery --------

export type PasswordRecoveryStartRequest = {
  email: string
}

export type PasswordRecoveryConfirmRequest = {
  newPassword: string
  token: string
}

// ---------- shared ----------
export type TwoFactorConfiguredResponse = {
  twoFactorMethod: ETwoFactorMethod
  twoFactorDeliveryChannel?: ETwoFactorDeliveryChannel | null
  deliveryHint?: string | null
}


