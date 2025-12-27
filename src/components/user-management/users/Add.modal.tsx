import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { IconUser } from '@tabler/icons-react';
import { NIL } from 'uuid';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { userFormSchema } from '@/assets/forms/user';
import { IUser } from '@/assets/interfaces/_index';
import { PModalForm } from '@/components/_index';
import { utilities } from '@/compostables/utilities';
import { useDatabase } from '@/hooks/useDatabase';
import { useEntityStore } from '@/stores/entityStore';
import Form from './Form';

export interface IProps {}

export interface IHandles {
  add: (organizationId: string) => void;
}

const AddUser = forwardRef<IHandles, IProps>((_props, ref) => {
  const database = useDatabase();
  const [errorMessage, setErrorMessage] = useState('');
  const entityStore = useEntityStore();
  const [open, modalHandlers] = useDisclosure(false);
  const form = useForm<IUser>({
    mode: 'controlled',
    validateInputOnBlur: true,
    initialValues: {
      id: '',
      organizationId: '',
      email: '',
      firstName: '',
      lastName: '',
      isAdmin: false,
      isSetup: false,
      rowVersion: NIL,
    },
    validate: userFormSchema,
  });

  useImperativeHandle(ref, () => ({
    add(organizationId: string) {
      initialize(organizationId);
    },
  }));

  const initialize = (organizationId: string) => {
    setErrorMessage('');
    form.setFieldValue('id', NIL);
    form.setFieldValue('organizationId', organizationId);
    form.setFieldValue('email', '');
    form.setFieldValue('firstName', '');
    form.setFieldValue('lastName', '');
    form.setFieldValue('isAdmin', false);
    modalHandlers.open();
  };

  const submitHndl = (user: IUser) => {
    database.httpPost<IUser, IUser>('users', user, true).then((response) => {
      if (response.success) {
        if (response.data) {
          let list: IUser[] = [...entityStore.userPagedList.list, response.data];
          list = utilities().multiSort(list, { organizationName: 'asc' });
          const newPagedList = {
            ...entityStore.userPagedList,
            list,
          };
          entityStore.setUserPagedList(newPagedList);
        }
        modalHandlers.close();
      } else if (response.statusCode === 409) {
        setErrorMessage('Email is already in use.');
      }
    });
  };

  const disableSubmit = useMemo(() => {
    return !form.isDirty() || !form.isValid();
  }, [form.values]);

  return (
    <PModalForm
      title="Add User"
      icon={<IconUser size={21} />}
      errorMessage={errorMessage}
      disableSubmit={disableSubmit}
      opened={open}
      onClose={() => modalHandlers.close()}
      onSubmit={form.onSubmit((values) => submitHndl(values))}
      size="lg"
    >
      <Form form={form} mode="add" />
    </PModalForm>
  );
});

export default AddUser;
