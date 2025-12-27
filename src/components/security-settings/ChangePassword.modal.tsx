import { forwardRef, useImperativeHandle, useState } from 'react';
import { IconPassword } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { changePasswordSchema, IChangePasswordForm } from '@/assets/forms/changePassword';
import { PModalForm, PPasswordInput } from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';

export interface IProps {}

export interface IHandles {
  open: () => void;
}

const ChangePassword = forwardRef<IHandles, IProps>((_props, ref) => {
  const [opened, setOpened] = useState<boolean>(false);
  const db = useDatabase();
  const [errorMsg, setErrorMsg] = useState('');

  const form = useForm({
    mode: 'controlled',
    validateInputOnBlur: true,
    initialValues: {
      password: '',
      newPassword: '',
      passwordConfirm: '',
    },
    validate: changePasswordSchema,
  });

  useImperativeHandle(ref, () => ({
    open() {
      setOpened(true);
    },
  }));

  const passwordChgSubmitHndl = (frmData: IChangePasswordForm) => {
    const data = {
      currentPassword: frmData.password,
      newPassword: frmData.newPassword,
    };
    db.httpPost<null, any>('auth/changePassword', data, true).then((response) => {
      if (response.success) {
        notifications.show({
          color: 'green',
          title: 'Success',
          message: 'Your password was successfully changed.',
        });
        form.reset();
        setErrorMsg('');
        setOpened(false);
      } else if (response.statusCode === 401) {
        setErrorMsg('Your current password was not valid.');
      } else {
        setErrorMsg('Unexpected error. Try again later.');
      }
    });
  };

  return (
    <PModalForm
      title="Change Password"
      opened={opened}
      icon={<IconPassword />}
      onClose={() => setOpened(false)}
      onSubmit={form.onSubmit((values) => passwordChgSubmitHndl(values))}
      disableSubmit={!form.isValid()}
      size="lg"
    >
      <div>
        <div className="font-bold">Change Password</div>
        <div className="text-red-600 text-center text-sm">{errorMsg}</div>
        <PPasswordInput
          label="Current Password"
          placeholder="Current Password"
          withAsterisk
          maxLength={100}
          leftSection={<IconPassword size="1.2rem" />}
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <PPasswordInput
          label="New Password"
          placeholder="New Password"
          withAsterisk
          maxLength={25}
          key={form.key('newPassword')}
          {...form.getInputProps('newPassword')}
          description="Between 8 and 25 characters with at least 1 each of the following: alpha, numeric & non-alpha-numeric."
        />

        <PPasswordInput
          label="Confirm New Password"
          placeholder="Confirm New Password"
          withAsterisk
          key={form.key('passwordConfirm')}
          {...form.getInputProps('passwordConfirm')}
        />
      </div>
    </PModalForm>
  );
});

export default ChangePassword;
