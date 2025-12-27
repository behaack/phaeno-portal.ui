import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { IconUser } from '@tabler/icons-react';
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
  edit: (user: IUser) => void;
}

const EditUser = forwardRef<IHandles, IProps>((_props, ref) => {
  const database = useDatabase();
  const entityStore = useEntityStore();
  const [open, modalHandlers] = useDisclosure(false);
  const [errorMessage, setErrorMessage] = useState('');
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
      rowVersion: '',
    },
    validate: userFormSchema,
  });

  useImperativeHandle(ref, () => ({
    edit(user: IUser) {
      initialize(user);
    },
  }));

  const initialize = (user: IUser) => {
    setValues(user);
    setErrorMessage('');
    modalHandlers.open();
  };

  const setValues = (user: IUser) => {
    form.setFieldValue('id', user.id);
    form.setFieldValue('organizationId', user.organizationId);
    form.setFieldValue('firstName', user.firstName);
    form.setFieldValue('lastName', user.lastName);
    form.setFieldValue('isAdmin', user.isAdmin);
    form.setFieldValue('email', user.email);
    form.setFieldValue('isSetup', user.isSetup);
    form.setFieldValue('rowVersion', user.rowVersion);
    form.resetDirty();
  };

  const submitHndl = (user: IUser) => {
    database.httpPut<IUser, IUser>('users', user, true).then((response) => {
      if (response.success) {
        if (response.data) {
          updateStore(response.data);
          modalHandlers.close();
        }
      } else if (response.statusCode === 409) {
        //@ts-ignore
        if (response.error?.response?.data.updatedEntity) {
          //@ts-ignore
          const updatedUser = response.error?.response?.data.updatedEntity as IUser;
          setValues(updatedUser);
          updateStore(updatedUser);
          setErrorMessage(
            'This User has been changed by another user. The form has been updated with the most recent values.'
          );
        }
      }
    });
  };

  const updateStore = (user: IUser) => {
    const index = entityStore.userPagedList.list.findIndex((item) => item.id === user.id);
    let list: IUser[] = [
      ...entityStore.userPagedList.list.slice(0, index),
      user,
      ...entityStore.userPagedList.list.slice(index + 1, entityStore.userPagedList.list.length),
    ];
    list = utilities().multiSort(list, { lastName: 'asc', firstName: 'asc' });
    const newPagedList = {
      ...entityStore.userPagedList,
      list,
    };
    entityStore.setUserPagedList(newPagedList);
  };

  const disableSubmit = useMemo(() => {
    return !form.isDirty() || !form.isValid();
  }, [form.values]);

  return (
    <PModalForm
      title="Edit User"
      icon={<IconUser size={21} />}
      errorMessage={errorMessage}
      disableSubmit={disableSubmit}
      opened={open}
      size="lg"
      onClose={() => modalHandlers.close()}
      onSubmit={form.onSubmit((values) => submitHndl(values))}
    >
      <Form form={form} mode="edit" />
    </PModalForm>
  );
});
export default EditUser;
