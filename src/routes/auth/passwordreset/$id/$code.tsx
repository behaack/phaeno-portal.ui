import { useEffect, useState } from 'react';
import { IconPassword } from '@tabler/icons-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IPasswordResetForm, passwordResetSchema } from '@/assets/forms/passwordReset';
import { beforeLoadAuth } from '@/assets/route-guard';
import { AuthContentContainer, PPasswordInput } from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';
import z from 'zod';

export const Route = createFileRoute('/auth/passwordreset/$id/$code')({
  component: PasswordReset,
  params: {
    parse: (raw) => ({
      id: z.string().parse(raw.id),
      code: z.string().parse(raw.code),
    }),
    stringify: ({ id, code }) => ({
      id: String(id),
      code: String(code),
    }),
  },
  beforeLoad: beforeLoadAuth,
});

function PasswordReset() {
  const db = useDatabase();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { id, code } = Route.useParams();
  const form = useForm({
    mode: 'controlled',
    validateInputOnBlur: true,
    initialValues: {
      userId: '',
      passwordResetToken: '',
      password: '',
      passwordConfirm: '',
    },
    validate: passwordResetSchema,
  });

  useEffect(() => {
    form.setFieldValue('userId', id);
    form.setFieldValue('passwordResetToken', code);
  }, [id, code]);

  const submitHndl = (data: IPasswordResetForm) => {
    db.httpPost<null, IPasswordResetForm>('auth/ResetPassword', data, true).then((response) => {
      if (response.success) {
        notifications.show({
          color: 'green',
          title: 'Success',
          message: 'Your password has been reset. You may now log in with your new password',
        });
        navigate({
          to: '/auth/signin',
        });
      } else if (response.statusCode === 400) {
        setErrorMsg(
          'The recover token has expired. Get a new code by restarting the password recovery process.'
        );
      }
    });
  };

  return (
    <AuthContentContainer>
      <div className="flex items-center gap-2">
        <IconPassword />
        <h1 className="m-0 py-1 font-bold text-2xl">Reset Password</h1>
      </div>
      <form onSubmit={form.onSubmit((values) => submitHndl(values))}>
        <div className="text-red-600 text-center text-sm">{errorMsg}</div>
        <PPasswordInput
          description="Between 8 and 25 characters with at least 1 of the following: alpha, numeric & non-alpha-numeric."
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
        <div className="flex justify-end">
          <Button type="submit">Reset Password</Button>
        </div>
      </form>
    </AuthContentContainer>
  );
}
