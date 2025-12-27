import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@mantine/core';
import { ECodeProvider } from '@/assets/enums/_index';
import { codeProviderList } from '@/assets/lookupLists/_index';
import DisplayEnumListItem from '@/components/DisplayEnumListItem';
import { useDatabase } from '@/hooks/useDatabase';
import GoogleAuthSetup, { IGoogleAuthQbr, IHandles } from './GoogleAuthSetup.modal';

export interface ICodeVerificationResult {
  success: boolean;
  message: string;
}

export interface IProps {
  userId: string;
  currentCodeProvider: ECodeProvider | undefined;
  onCodeProviderChange: (codeProvider: ECodeProvider) => void;
}

export default function ChangeTfaSettings({
  userId,
  currentCodeProvider,
  onCodeProviderChange,
}: IProps) {
  const db = useDatabase();
  const googleSetupForm = useRef<IHandles>(null);
  const [qbr, setQbr] = useState<IGoogleAuthQbr | null>(null);

  useEffect(() => {
    if (userId) {
      getGoogleQbr(userId);
    }
  }, [userId]);

  const getGoogleQbr = (id: string) => {
    const data = {
      userId: id,
    };
    db.httpPost<IGoogleAuthQbr, any>('auth/GenerateGoogleQRB', data, true).then((response) => {
      if (response.success) {
        if (response.data) {
          setQbr(response.data);
        }
      }
    });
  };

  const tfaChangeHndl = () => {
    if (currentCodeProvider === ECodeProvider.EmailCode) {
      googleSetupForm.current?.open();
    } else {
      onCodeProviderChange(ECodeProvider.EmailCode);
    }
  };

  const googleAuthChangeHndl = () => {
    onCodeProviderChange(ECodeProvider.GoogleAuth);
  };

  const buttonLabel = useMemo(() => {
    return currentCodeProvider === ECodeProvider.GoogleAuth
      ? 'Change to Email'
      : 'Set-up Google Authenticator...';
  }, [currentCodeProvider]);

  return (
    <div>
      <GoogleAuthSetup
        ref={googleSetupForm}
        userId={userId}
        qbr={qbr}
        onChange={googleAuthChangeHndl}
      />
      <div className="font-bold">Two-Factor Authentication (TFA) Set-up</div>
      <div className="text-xs mb-3">
        <span>You will receive TFA codes by&nbsp;</span>
        <span className="font-bold">
          <DisplayEnumListItem value={currentCodeProvider} list={codeProviderList} />
        </span>
        <span>.&nbsp;To switch to&nbsp;</span>
        <span className="font-bold">
          {currentCodeProvider === ECodeProvider.EmailCode ? (
            <DisplayEnumListItem value={ECodeProvider.GoogleAuth} list={codeProviderList} />
          ) : (
            <DisplayEnumListItem value={ECodeProvider.EmailCode} list={codeProviderList} />
          )}
        </span>
        <span>, press the button below.&nbsp;</span>
      </div>
      <Button fullWidth size="sm" onClick={tfaChangeHndl}>
        {buttonLabel}
      </Button>
    </div>
  );
}
