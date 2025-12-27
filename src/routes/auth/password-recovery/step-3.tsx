import { IconInfoCircle, IconPassword } from '@tabler/icons-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Alert } from '@mantine/core';
import { beforeLoadAuth } from '@/assets/route-guard';
import { AuthContentContainer } from '@/components/_index';

export const Route = createFileRoute('/auth/password-recovery/step-3')({
  component: PasswordRecoveryStep3,
  beforeLoad: beforeLoadAuth,
});

function PasswordRecoveryStep3() {
  return (
    <AuthContentContainer>
      <div className="flex items-center gap-2">
        <IconPassword />
        <h1 className="m-0 py-1 font-bold text-2xl">Recover Password</h1>
      </div>

      <Alert
        mt={10}
        mb={20}
        variant="light"
        color="green"
        radius="md"
        title="Recovery Email Sent"
        icon={<IconInfoCircle />}
      >
        A recovery email was sent to the email address provided. Please follow the instructions in
        the email to reset your password.
      </Alert>

      <div className="flex flex-row justify-center">
        <div className="flex flex-row justify-center">
          <Link to="/auth/signin">Return to Sign-In</Link>
        </div>
      </div>
    </AuthContentContainer>
  );
}
