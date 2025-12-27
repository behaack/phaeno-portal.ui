import type { SignInResult, SignInTwoFactor, SignInTokens } from "./auth"

export function isTwoFactorResult(x: SignInResult): x is SignInTwoFactor {
  return "requiresTwoFactor" in x && x.requiresTwoFactor === true
}

export function isTokenResult(x: SignInResult): x is SignInTokens {
  return "accessToken" in x && "refreshToken" in x
}
