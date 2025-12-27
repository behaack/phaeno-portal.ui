import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { IconKey } from '@tabler/icons-react';
import { Button, Divider } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ECodeProvider } from '@/assets/enums/_index';
import { PModalDialog } from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';
import { useAuthStore } from '@/stores/authStore';
import ChangeAutoSignOffSettings from './ChangeAutoSignOffSettings';
import ChangePassword, { IHandles as IPasswordHndls } from './ChangePassword.modal';
import ChangeTfaSettings from './ChangeTfaSettings';

const SecuritySettings = forwardRef<IHandles, IProps>((_props, ref) => {
  const db = useDatabase();
  const authStore = useAuthStore();
  const changePasswordFrm = useRef<IPasswordHndls>(null);
  const [opened, setOpened] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    open() {
      intializeForm();
    },
  }));

  const intializeForm = () => {
    setOpened(true);
  };

  const chgTfaProviderHndl = (codeProvider: ECodeProvider) => {
    const data = {
      userId: authStore.authToken?.userId,
      codeProvider,
    };

    db.httpPost<any, any>('auth/ChangeTfaCodeProvider', data, true).then((response) => {
      if (response.success) {
        const successMsg = `TFA source provider changed to ${codeProvider === ECodeProvider.EmailCode ? 'Email' : 'Google Authenticator'}`;
        notifications.show({
          color: 'green',
          title: 'Success',
          message: successMsg,
        });
        authStore.setDefaultCodeProvider(codeProvider);
      }
    });
  };

  const changePasswordHndl = () => {
    changePasswordFrm.current?.open();
  };

  return (
    <PModalDialog
      title="Security Settings"
      icon={<IconKey size={22} />}
      opened={opened}
      onClose={() => setOpened(false)}
      size="lg"
    >
      <div className="p-3">
        <ChangePassword ref={changePasswordFrm} />
        <div className="font-bold pb-3">Password</div>
        <Button fullWidth onClick={changePasswordHndl}>
          Change Password...
        </Button>
        <Divider my={20} />
        <ChangeTfaSettings
          userId={authStore.authToken?.userId || ''}
          currentCodeProvider={authStore.authToken?.codeProvider}
          onCodeProviderChange={chgTfaProviderHndl}
        />
        <Divider my={20} />
        <ChangeAutoSignOffSettings />
      </div>
    </PModalDialog>
  );
});

export default SecuritySettings;

export interface IProps {}

export interface IHandles {
  open: () => void;
}
