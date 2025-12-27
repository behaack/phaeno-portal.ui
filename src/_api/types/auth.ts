// src/_api/types/auth.ts

export type SignInRequest = {
  email: string
  password: string
}

export enum ETwoFactorMethod {
  OutOfBandCode = 1, // code sent to user (email/SMS)
  Totp = 2,          // authenticator app
}

/**
 * Matches your API JSON:
 *   state: "Authenticated" | "TwoFactorRequired"
 */
export enum SignInState {
  Authenticated = "Authenticated",
  TwoFactorRequired = "TwoFactorRequired",
}

export type SignInAuthenticated = {
  state: SignInState.Authenticated
  accessToken: string
  refreshToken: string
  expiresInSeconds: number
}

export type SignInTwoFactorRequired = {
  state: SignInState.TwoFactorRequired
  method: ETwoFactorMethod
  loginChallengeId: string
}

export type SignInResult = SignInAuthenticated | SignInTwoFactorRequired

export type TwoFactorVerifyRequest = {
  loginChallengeId: string
  code: string
  rememberDevice: boolean
}

export type TwoFactorResendRequest = {
  loginChallengeId: string
}
