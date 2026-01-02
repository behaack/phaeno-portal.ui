import { api } from "../core/api-call";
import type { 
  ConfirmOobEnrollmentRequest,
  ConfirmTotpEnrollmentRequest,
  StartOobEnrollmentRequest,
  StartOobEnrollmentResponse,
  StartTotpEnrollmentRequest,
  StartTotpEnrollmentResponse,
  TwoFactorConfiguredResponse, 
  UserAccount 
} from "../types/account";

export const accountService = {
  me: () => api.get<UserAccount>("/account/me"),
  
  totpStart: (body: StartTotpEnrollmentRequest) =>
    api.post<StartTotpEnrollmentResponse, StartTotpEnrollmentRequest>(
      "/account/totp-start",
      body
    ),

  totpConfirm: (body: ConfirmTotpEnrollmentRequest) =>
    api.post<TwoFactorConfiguredResponse, ConfirmTotpEnrollmentRequest>(
      "/account/totp-confirm",
      body
    ),

  oobStart: (body: StartOobEnrollmentRequest) =>
    api.post<StartOobEnrollmentResponse, StartOobEnrollmentRequest>(
      "/account/oob-start",
      body
    ),

  oobConfirm: (body: ConfirmOobEnrollmentRequest) =>
    api.post<TwoFactorConfiguredResponse, ConfirmOobEnrollmentRequest>(
      "/account/oob-confirm",
      body
    ),
};
