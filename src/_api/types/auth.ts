// src/_api/types/auth.ts

export type SignInRequest = {
  email: string
  password: string
  rememberMe?: boolean
}

// Matches C# ESignInState with JsonStringEnumConverter
export enum ESignInState {
  Authenticated = "Authenticated",
  TwoFactorRequired = "TwoFactorRequired",
}

// Matches C# ETwoFactorMethod
export enum ETwoFactorMethod {
  OutOfBandCode = 1,
  Totp = 2,
}

export type SignInAuthenticated = {
  state: ESignInState.Authenticated
  accessToken: string
  refreshToken: string
  expiresInSeconds: number
}

export type SignInTwoFactorRequired = {
  state: ESignInState.TwoFactorRequired
  method: ETwoFactorMethod
  loginChallengeId: string // Guid serialized as string
}

export type SignInResponse = SignInAuthenticated | SignInTwoFactorRequired

export type TwoFactorVerifyRequest = {
  loginChallengeId: string
  code: string
  rememberDevice: boolean
}

export type TwoFactorResendRequest = {
  loginChallengeId: string
}

export type AuthTokens = Pick<SignInAuthenticated, "accessToken" | "refreshToken" | "expiresInSeconds">


