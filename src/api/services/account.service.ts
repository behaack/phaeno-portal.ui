import { PasswordRecoveryConfirmRequest } from './../types/account';
import { api } from "../core/api-call";
import type { 
  ConfirmOobEnrollmentRequest,
  ConfirmTotpEnrollmentRequest,
  PasswordRecoveryStartRequest,
  StartOobEnrollmentRequest,
  StartOobEnrollmentResponse,
  StartTotpEnrollmentRequest,
  StartTotpEnrollmentResponse,
  TwoFactorConfiguredResponse, 
  UserAccount 
} from "../types/account";

export const accountService = {
  me: () => api.get<UserAccount>("/account/me"),

  passwordRecoveryStart: (body: PasswordRecoveryStartRequest) => 
    api.post<null, PasswordRecoveryStartRequest>(
      "/account/password-request-reset",
      body
    ),

  passwordRecoveryConfirm: (body: PasswordRecoveryConfirmRequest) => 
    api.post<null, PasswordRecoveryConfirmRequest>(
      "/account/password-confirm-reset",
      body
    ),
  
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
