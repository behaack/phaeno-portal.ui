export enum EOrganizationType {
  Phaeno = 0,
  Partner = 1,
  Customer = 2,
}

export enum ETwoFactorMethod {
  None = 0,
  OutOfBandCode = 1,
  Totp = 2,
  Push = 3,     // not in use
  WebAuthn = 4  // not in use
}

export enum ETwoFactorDeliveryChannel {
  Email = 0,
  Sms = 1
}