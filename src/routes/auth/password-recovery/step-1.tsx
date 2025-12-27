import { useMemo, useState } from 'react';
import { IconPassword } from '@tabler/icons-react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Button, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { passwordRecoverySchema } from '@/assets/forms/passwordRecovery';
import { beforeLoadAuth } from '@/assets/route-guard';
import { AuthContentContainer, PTextInput } from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';
import { Route as Step2Route } from './step-2';

export const Route = createFileRoute('/auth/password-recovery/step-1')({
  component: PasswordRecoveryStep1,
  beforeLoad: beforeLoadAuth,
});

function PasswordRecoveryStep1() {
  const navigate = useNavigate();
  const db = useDatabase();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const form = useForm({
    mode: 'controlled',
    validateInputOnBlur: true,
    initialValues: {
      email: '',
      passwordResetAnswer: '',
    },
    validate: passwordRecoverySchema,
  });

  const buttonClickHndl = () => {
    getRecoveryQuestion();
  };

  const getRecoveryQuestion = () => {
    const data = {
      email: form.values.email,
    };
    db.httpPost<string, any>('auth/PasswordResetQuestion', data, true).then((response) => {
      if (response.success) {
        if (response.data) {
          setErrorMsg('');
          navigate({
            to: Step2Route.to,
            search: {
              email: data.email,
              question: response.data,
            },
            replace: true,
          });
        }
      } else if (response.statusCode === 404) {
        setErrorMsg('Invalid email address.');
      } else {
        setErrorMsg('Something went wrong. Try again later.');
      }
    });
  };

  const disableButton = useMemo(() => {
    return !form.isValid('email');
  }, [form.values]);

  return (
    <AuthContentContainer>
      <div className="flex items-center gap-2">
        <IconPassword />
        <h1 className="m-0 py-1 font-bold text-2xl">Recover Password</h1>
      </div>

      <div>
        <div className="flex justify-center">
          <div className="font-bold text-lg">Step 1 of 3</div>
        </div>
        {errorMsg ? <div className="text-red-600 text-sm text-center mt-2">{errorMsg}</div> : null}

        <PTextInput
          name={form.key('email')}
          label="Email Address"
          placeholder="Email Address"
          {...form.getInputProps('email')}
        />

        <div className="mt-3">
          <Button fullWidth onClick={buttonClickHndl} disabled={disableButton}>
            Submit
          </Button>
        </div>
        <Divider my="xs" mb={20} />
      </div>

      <div className="flex flex-row justify-center">
        <div className="flex flex-row justify-center">
          <Link to="/auth/signin">Return to Sign-In</Link>
        </div>
      </div>
    </AuthContentContainer>
  );
}
