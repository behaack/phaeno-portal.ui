import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { PModalForm, PTextInput } from '@/components/_index';

export interface IProps {
  onGenerateSecretKey: (secretKeyName: string) => void;
  onEditSecretKey: (id: string, secretKeyName: string) => void;
}

export interface IHandles {
  add: () => void;
  edit: (id: string, secretKeyName: string) => void;
}

const ApiKeyAddEdit = forwardRef<IHandles, IProps>((props, ref) => {
  const type = useRef<'add' | 'edit'>('add');
  const idRef = useRef<string>('');
  const originalValue = useRef<string>('');
  const [opened, setOpened] = useState<boolean>(false);
  const [secretKeyName, setSecretKeyName] = useState<string>('');

  useImperativeHandle(ref, () => ({
    add() {
      type.current = 'add';
      setSecretKeyName('');
      setOpened(true);
    },
    edit(id: string, secretKeyName: string) {
      type.current = 'edit';
      setSecretKeyName(secretKeyName);
      idRef.current = id;
      originalValue.current = secretKeyName;
      setOpened(true);
    },
  }));

  const submitHndl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type.current === 'add') {
      props.onGenerateSecretKey(secretKeyName);
    } else {
      props.onEditSecretKey(idRef.current, secretKeyName);
    }
    setOpened(false);
  };

  return (
    <PModalForm
      title={type.current === 'add' ? 'Generate Secret Key' : 'Rename Secret Key'}
      opened={opened}
      onClose={() => setOpened(false)}
      size="md"
      actionBtnLabel={type.current === 'add' ? 'Create Secret Key' : 'Rename Secret Key'}
      onSubmit={(e) => submitHndl(e)}
      disableSubmit={secretKeyName.length === 0 || originalValue.current === secretKeyName}
    >
      <div>
        <PTextInput
          label="Secret Key Name"
          placeholder="Secret Key Name"
          maxLength={50}
          value={secretKeyName}
          onChange={(e) => setSecretKeyName(e.currentTarget.value)}
        />
      </div>
    </PModalForm>
  );
});

export default ApiKeyAddEdit;
