import { useEffect, useMemo, useState } from 'react';
import { IconLogin } from '@tabler/icons-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { NIL } from 'uuid';
import { Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ECodeProvider } from '@/assets/enums/_index';
import { ITfaCodeLoginSchema, TfaCodeLoginSchema } from '@/assets/forms/tfaCodeLogin';
import { IAuthToken } from '@/assets/interfaces/_index';
import { searchSchema } from '@/assets/route-validator/sign-in';
import { AuthContentContainer, PCheckbox, PPinInput } from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';
import { useAuthStore } from '@/stores/authStore';
import { beforeLoadAuth } from '@/assets/route-guard';
import Cookies from 'js-cookie';

export const Route = createFileRoute('/auth/tfa-Code')({
  component: TfaCode,
  validateSearch: (search) => searchSchema.parse(search),
  beforeLoad: beforeLoadAuth,
});

function TfaCode() {
  const authStore = useAuthStore();
  const database = useDatabase();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>();
  const searchValues = Route.useSearch();

  const form = useForm({
    mode: 'controlled',
    validateInputOnBlur: true,
    initialValues: {
      deviceId: '',
      email: '',
      password: '',
      tfaCode: '',
      rememberMe: false,
    },
    validate: TfaCodeLoginSchema,
  });

  useEffect(() => {
    form.setFieldValue('deviceId', NIL);
    form.setFieldValue('email', authStore.authToken?.email || '');
    form.setFieldValue('password', authStore.authToken?.password || '');
  }, []);

  const tfaCodeHint = useMemo(() => {
    let hint: string = '';
    switch (authStore.authToken?.codeProvider) {
      case ECodeProvider.EmailCode:
        hint = 'We sent you an email. Enter code from email.';
        break;
      case ECodeProvider.GoogleAuth:
        hint = 'Enter code from Google Authenticator.';
        break;
      case ECodeProvider.PhoneCode:
        hint = 'We sent you a text. Enter code from the text message.';
        break;
    }
    return hint;
  }, [authStore.authToken?.codeProvider]);

  const submitHndl = (data: ITfaCodeLoginSchema) => {
    database
      .httpPost<IAuthToken, ITfaCodeLoginSchema>('auth/login', data, true)
      .then((response) => {
        if (response.success) {
          if (response.data) {
            authStore.login(response.data);
            if (data.rememberMe) {
              if (response.data.deviceId) {
                const cookieName = `tfa-${response.data.email.toLowerCase()}`;
                const cookieValue = response.data.deviceId;
                Cookies.set(cookieName, cookieValue, { expires: 30 });
              }
            }
          }
          if (searchValues.redirectTo) {
            navigate({ to: searchValues.redirectTo, replace: true})
          } else {
            navigate({ to: '/', replace: true });
          }
        } else if (response.statusCode === 403) {
          let message = 'Sign-in failed. Unrecognized sign-in credentials.';
          // @ts-ignore
          if (response.error?.response?.data.lockout) {
            message = 'To many successive sign-in failures. You have been temporarily locked out.';
          }
          setErrorMsg(message);
        }
      });
  };

  return (
    <AuthContentContainer>
      <div className="flex items-center gap-2">
        <IconLogin />
        <h1 className="m-0 py-1 font-bold text-2xl">Sign-In: One-time Tfa Code</h1>
      </div>
      <div className="text-red-600 text-center text-sm">&nbsp;{errorMsg}&nbsp;</div>
      <form onSubmit={form.onSubmit((values) => submitHndl(values))}>
        <PPinInput
          name={form.key('tfaCode')}
          label="One-time Code"
          length={6}
          oneTimeCode
          placeholder="#"
          type="number"
          hint={tfaCodeHint}
          {...form.getInputProps('tfaCode')}
        />

        <PCheckbox
          name={form.key('rememberMe')}
          label="Remember me for 30 days"
          {...form.getInputProps('rememberMe')}
          className="mt-3 mb-3"
        />

        <Group mt="sm">
          <Button
            disabled={!form.isValid()}
            rightSection={<IconLogin size="1rem" />}
            variant="filled"
            type="submit"
            fullWidth
          >
            Sign In
          </Button>
        </Group>
      </form>
    </AuthContentContainer>
  );
}
