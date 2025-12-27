import { useEffect, useMemo, useState } from 'react';
import { IconInfoCircle, IconPassword } from '@tabler/icons-react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Alert, Button, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IPasswordRecovery, passwordRecoverySchema } from '@/assets/forms/passwordRecovery';
import { beforeLoadAuth } from '@/assets/route-guard';
import { searchSchema } from '@/assets/route-validator/password-recovery-step2';
import { AuthContentContainer, PTextInput } from '@/components/_index';
import { PasswordRecoveryStep2ErrorBoundary } from '@/components/errorBoundries/PasswordRecoveryStep2';
import { useDatabase } from '@/hooks/useDatabase';
import { Route as Step3Route } from '@/routes/auth/password-recovery/step-3';

export const Route = createFileRoute('/auth/password-recovery/step-2')({
  component: PasswordRecoveryStep2,
  validateSearch: (search) => searchSchema.parse(search),
  errorComponent: PasswordRecoveryStep2ErrorBoundary,
  beforeLoad: beforeLoadAuth,
});

function PasswordRecoveryStep2() {
  const navigate = useNavigate();
  const db = useDatabase();
  const [lockout, setLockout] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { email, question } = Route.useSearch();

  const form = useForm({
    mode: 'controlled',
    validateInputOnBlur: true,
    initialValues: {
      email: '',
      passwordResetAnswer: '',
    },
    validate: passwordRecoverySchema,
  });

  useEffect(() => {
    form.setFieldValue('email', email);
  }, [email]);

  const buttonClickHndl = () => {
    submitRecoveryAnswer();
  };

  const submitRecoveryAnswer = () => {
    db.httpPost<string, IPasswordRecovery>('auth/PasswordResetAnswer', form.values, true).then(
      (response) => {
        if (response.success) {
          navigate({
            to: Step3Route.to,
            replace: true,
          });
        } else if (response.statusCode === 403) {
          // @ts-ignore
          if (response.error?.response?.data.lockout) {
            setErrorMsg(
              'You are locked out due to excessive failed attempts to answer the recover question. Please contact Phaeno support for assistance.'
            );
            setLockout(true);
          } else {
            setErrorMsg('That is an incorrect answer to the question.');
            form.setFieldValue('passwordResetAnswer', '');
          }
        } else {
          setErrorMsg('Something went wrong. Try again later.');
        }
      }
    );
  };

  const disableButton = useMemo(() => {
    return !form.isValid('passwordResetAnswer');
  }, [form.values]);

  const pageContent = (
    <div>
      <div className="flex justify-center">
        <div className="font-bold text-lg">Step 2 of 3</div>
      </div>
      {errorMsg ? <div className="text-red-600 text-sm text-center mt-2">{errorMsg}</div> : null}

      <PTextInput
        name={form.key('passwordResetAnswer')}
        label="Password Recover Question"
        placeholder="Answer"
        description={question}
        {...form.getInputProps('passwordResetAnswer')}
      />
      <div className="mt-3">
        <Button fullWidth onClick={buttonClickHndl} disabled={disableButton}>
          Submit
        </Button>
      </div>

      <Divider my="xs" mb={20} />
    </div>
  );

  const lockoutContent = (
    <Alert
      mt={10}
      mb={12}
      variant="light"
      color="red"
      radius="md"
      title="You have been locked out"
      icon={<IconInfoCircle />}
    >
      <div className="font-bold text-red-500">{errorMsg}</div>
    </Alert>
  );

  return (
    <AuthContentContainer>
      <div className="flex items-center gap-2">
        <IconPassword />
        <h1 className="m-0 py-1 font-bold text-2xl">Recover Password</h1>
      </div>

      {lockout ? lockoutContent : pageContent}

      <div className="flex flex-row justify-center">
        <div className="flex flex-row justify-center">
          <Link to="/auth/signin">Return to Sign-In</Link>
        </div>
      </div>
    </AuthContentContainer>
  );
}
