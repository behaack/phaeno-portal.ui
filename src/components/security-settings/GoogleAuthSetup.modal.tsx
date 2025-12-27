import '@/styles/google-auth.scss';

import { forwardRef, useImperativeHandle, useState } from 'react';
import { IconBrandGoogle, IconSend } from '@tabler/icons-react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useClipboard, useTimeout } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { PModalForm, PPinInput } from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';

export interface IGoogleAuthQbr {
  barcode: string;
  setupCode: string;
}

export interface ICodeVerificationResult {
  success: boolean;
  message: string;
}

export interface IProps {
  userId: string;
  qbr: IGoogleAuthQbr | null | undefined;
  onChange: () => void;
}

export interface IHandles {
  open: () => void;
}

const GoogleAuthSetup = forwardRef<IHandles, IProps>((props, ref) => {
  const { userId, qbr, onChange }: IProps = props;
  const db = useDatabase();
  const clipboard = useClipboard();
  const [opened, setOpened] = useState<boolean>(false);
  const [tooltipLabel, setTooltipLabel] = useState<string>('Copy code to clipboard');
  const { start } = useTimeout(() => setTooltipLabel('Copy code to clipboard'), 500);
  const [tfaCode, setTfaCode] = useState<string>('');
  const [tfaCodeValid, setTfaCodeValid] = useState<boolean>(false);
  const [codeVerificationResult, setCodeVerificationResult] =
    useState<ICodeVerificationResult | null>(null);

  useImperativeHandle(ref, () => ({
    open() {
      setTfaCode('');
      setTfaCodeValid(false);
      setCodeVerificationResult(null);
      setOpened(true);
    },
  }));

  const validateGATfaCodeHndl = () => {
    const data = {
      userId,
      tfaCode,
    };
    db.httpPost<any, any>('auth/TfaGoogleAuthVerifyTest', data, true).then((response) => {
      if (response.success) {
        setTfaCodeValid(true);
        const result: ICodeVerificationResult = {
          success: true,
          message: 'Code is valid.',
        };
        setCodeVerificationResult(result);
      } else {
        const result: ICodeVerificationResult = {
          success: false,
          message: 'Code is not valid. You may want to try again.',
        };
        setCodeVerificationResult(result);
        setTfaCode('');
      }
    });
  };

  const onSubmitHndl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange();
    setOpened(false);
  };

  const copyToClipboard = (code: string | undefined) => {
    if (code) {
      setTooltipLabel('Code copied to clipboard');
      clipboard.copy(code);
      notifications.show({
        color: 'green',
        title: 'Copied',
        message: 'Code was copied to clipboard.',
      });
      start();
    }
  };

  return (
    <PModalForm
      title="Google Authentication Set-up"
      icon={<IconBrandGoogle size={22} />}
      opened={opened}
      onClose={() => setOpened(false)}
      onSubmit={onSubmitHndl}
      disableSubmit={!codeVerificationResult?.success}
      size="lg"
    >
      <div className="google-auth-module">
        <div className="qbr-container">
          <div className="step-label">Step 1: Scan the QBR or copy and paste the code</div>
          <div className="image-container">
            <img src={qbr?.barcode} alt="Google Auth QBR Code" />
            <div className="code-container">
              <div className="code-label">Code: Click to copy</div>
              <Tooltip label={tooltipLabel}>
                <a onClick={() => copyToClipboard(qbr?.setupCode)} href="#">
                  <div className="code">{qbr?.setupCode}</div>
                </a>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="verification-container">
          <div className="step-label">Step 2: Verify your code then save your changes.</div>
          <div className="pin-input-container">
            <PPinInput
              value={tfaCode}
              onChange={(value) => setTfaCode(value)}
              size="sm"
              length={6}
              label="TFA Code"
              hint="Submit TFA Code to verify it is working"
              disabled={tfaCodeValid}
              placeholder="#"
              type="number"
            />
            <ActionIcon
              ml={5}
              mb={13}
              radius="xs"
              size="lg"
              onClick={validateGATfaCodeHndl}
              disabled={tfaCode.length < 6 || tfaCodeValid}
            >
              <IconSend size="20px" />
            </ActionIcon>
          </div>
          <div className="verification-result">
            {codeVerificationResult === null ? (
              <span>&nbsp;</span>
            ) : (
              <span
                className={`${codeVerificationResult.success ? 'text-black' : 'text-red-600'} `}
              >
                {codeVerificationResult.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </PModalForm>
  );
});

export default GoogleAuthSetup;
