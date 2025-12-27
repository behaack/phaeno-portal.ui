enum ESystemApiErrorCodes {
  Default,
  CommonDataIssue,
  AuthUserNotFound,
  AuthUserAccountSetupComplete,
  AuthUnableToCompleteAccountSetup,
  AuthEmailDidNotMatchUsersEmail,
  AuthPasswordChangeFailed,
  AuthUserWithProvidedEmailNotFound,
  AuthUserAccountNotYetSetup,
  AuthResetAnswerWasNotCorrect,
  AuthPasswordResetFailed,
  AuthInvalidConfirmationToken,
}

export default ESystemApiErrorCodes;
