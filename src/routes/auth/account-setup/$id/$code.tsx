import { useEffect, useMemo, useState } from 'react';
import { IconSettings } from '@tabler/icons-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { ECodeProvider } from '@/assets/enums/_index';
import { accountSetupSchema, IAccountSetupForm } from '@/assets/forms/accountSetup';
import { beforeLoadAuth } from '@/assets/route-guard';
import { passwordResetQuestions } from '@/assets/lookupLists/_index';
import { AuthContentContainer, PPasswordInput, PSelect, PTextInput } from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';
import ChangeTfaSettings from '@/components/security-settings/ChangeTfaSettings';
import z from 'zod';

interface IEmailConfirmation {
  userId: string;
  emailConfirmationToken: string;
}

export const Route = createFileRoute('/auth/account-setup/$id/$code')({
  component: AccountSetup,
  params: {
    parse: (raw) => ({
      id: z.string().uuid().parse(raw.id),
      code: z.string().parse(raw.code),
    }),
    stringify: ({ id, code }) => ({
      id: String(id),
      code: String(code),
    }),
  },
  beforeLoad: beforeLoadAuth,
});

function AccountSetup() {
  const db = useDatabase();
  const navigate = useNavigate();
  const { id, code } = Route.useParams();
  const [errorMsg, setErrorMsg] = useState('');
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  const form = useForm({
    mode: 'controlled',
    validateInputOnBlur: true,
    initialValues: {
      id: '',
      password: '',
      passwordConfirm: '',
      passwordHintQuestion: '',
      passwordHint: '',
      codeProvider: ECodeProvider.EmailCode,
      emailConfirmationToken: '',
    },
    validate: accountSetupSchema,
  });

  useEffect(() => {
    verifyEmail();
    form.setFieldValue('id', id);
    form.setFieldValue('emailConfirmationToken', code);
  }, [id, code]);

  const verifyEmail = () => {
    const data: IEmailConfirmation = {
      userId: id,
      emailConfirmationToken: code,
    };

    db.httpPost<null, IEmailConfirmation>('auth/ConfirmUserEmail', data, true).then((response) => {
      if (response.success) {
        if (response.statusCode === 200) {
          setErrorMsg('');
          setEmailVerified(true);
          return;
        }
        if (response.statusCode === 202) {
          notifications.show({
            color: 'green',
            title: 'Success',
            message: 'Your account is already set-up.',
          });
          navigate({ to: '/auth/signin', replace: true });
        }
      } else 
        if (response.error?.status === 400) {
          setEmailVerified(false)
          setErrorMsg(
            'This invitaion has expired. Please contact your PSeq administrator for another invite.'
          );
        } else if (response.error?.status === 404) {
          setEmailVerified(false)
          setErrorMsg(
            'We did not find an active user with the Id provided. Please contact your PSeq adminsitrator.'
          );
      }
      setErrorMsg(
        'An unknown error occured. Please try again later.'
      );      
      setEmailVerified(false)
    });
  };

  const tfaChangeHndl = (codeProvider: ECodeProvider) => {
    form.setFieldValue('codeProvider', codeProvider);
  };

  const disableSubmit = useMemo(() => {
    return !form.isDirty() || !form.isValid();
  }, [form.values]);

  const submitHndl = (data: IAccountSetupForm) => {
    db.httpPost<null, IAccountSetupForm>('auth/AccountSetup', data, true).then((response) => {
      if (response.success) {
        notifications.show({
          color: 'green',
          title: 'Success',
          message: 'Your account is setp. You may now sign-in using your new password.',
        });
        navigate({ to: '/auth/signin', replace: true });
      }
    });
  };

  return (
    <AuthContentContainer>
      <div className="flex items-center gap-2 mb-8">
        <IconSettings />
        <h1 className="m-0 py-1 font-bold text-2xl">Phaeno PSeq Portal Account Set-up</h1>
      </div>
      {!emailVerified ? (
        <div className="pb-5">
          {errorMsg ? (
            <div className="text-sm text-red-500 text-center">{errorMsg}</div>
          ) : (
            <div className="text-center text-sm font-bold">Confirming your email, please wait...</div>
          )}
        </div>
      ) : (
        <form onSubmit={form.onSubmit((values) => submitHndl(values))}>
          <div className="text-sm text-red-500 text-center">{errorMsg}</div>
          <div className="font-bold">Password Set-up</div>
          <PPasswordInput
            description="Between 8 and 25 characters with at least 1 each of the following: alpha, numeric & non-alpha-numeric."
            name={form.key('password')}
            label="Password"
            placeholder="Password"
            withAsterisk
            maxLength={25}
            {...form.getInputProps('password')}
          />
          <PPasswordInput
            name={form.key('passwordConfirm')}
            label="Confirm Password"
            placeholder="Confirm Password"
            withAsterisk
            {...form.getInputProps('passwordConfirm')}
          />
          <div className="font-bold">Password Recovery Set-up</div>
          <PSelect
            name={form.key('passwordHintQuestion')}
            label="Password Recovery Question"
            placeholder="Password Recovery Question"
            data={passwordResetQuestions}
            withAsterisk
            {...form.getInputProps('passwordHintQuestion')}
          />
          <PTextInput
            name={form.key('passwordHint')}
            label="Password Recovery Answer"
            placeholder="Password Recovery Answer"
            withAsterisk
            maxLength={100}
            {...form.getInputProps('passwordHint')}
          />
          <ChangeTfaSettings
            userId={id}
            currentCodeProvider={form.values.codeProvider}
            onCodeProviderChange={tfaChangeHndl}
          />
          <div className="mt-3 flex justify-end">
            <Button 
              className={disableSubmit ? '' : 'bg-black text-white'}
              fullWidth 
              type="submit" 
              disabled={disableSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    </AuthContentContainer>
  );
}
