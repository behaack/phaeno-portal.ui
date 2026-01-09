// import type { SignInResult, SignInTwoFactor, SignInTokens } from "./auth"

// export function isTwoFactorResult(x: SignInResult): x is SignInTwoFactor {
//   return "requiresTwoFactor" in x && x.requiresTwoFactor === true
// }

// export function isTokenResult(x: SignInResult): x is SignInTokens {
//   return "accessToken" in x && "refreshToken" in x
// }

export function isPhaenoEmployee(roles: string[] | undefined | null) {
  if (!roles?.length) return false
  return roles.includes("phaeno-admin") || roles.includes("phaeno-user")
}
