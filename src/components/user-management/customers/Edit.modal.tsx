import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { IconBuilding } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { organizationSchema } from '@/assets/forms/organization';
import { IOrganization } from '@/assets/interfaces/_index';
import { PModalForm } from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';
import { useEntityStore } from '@/stores/entityStore';
import Form from './Form';

export interface IProps {}

export interface IHandles {
  edit: (customer: IOrganization) => void;
}

const EditCustomer = forwardRef<IHandles, IProps>((_props, ref) => {
  const database = useDatabase();
  const entityStore = useEntityStore();
  const [open, modalHandlers] = useDisclosure(false);
  const [errorMessage, setErrorMessage] = useState('');
  const form = useForm({
    mode: 'controlled',
    validateInputOnBlur: true,
    initialValues: {
      id: '',
      organizationType: 0,
      organizationName: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      postalCode: '',
      countryCode: '',
      rowVersion: '',
    },
    validate: organizationSchema,
  });

  useImperativeHandle(ref, () => ({
    edit(customer: IOrganization) {
      initialize(customer);
    },
  }));

  const initialize = (customer: IOrganization) => {
    setValues(customer);
    setErrorMessage('');
    modalHandlers.open();
  };

  const setValues = (customer: IOrganization) => {
    form.setFieldValue('id', customer.id);
    form.setFieldValue('organizationType', customer.organizationType);
    form.setFieldValue('organizationName', customer.organizationName);
    form.setFieldValue('street1', customer.street1);
    form.setFieldValue('street2', customer.street2);
    form.setFieldValue('city', customer.city);
    form.setFieldValue('state', customer.state);
    form.setFieldValue('postalCode', customer.postalCode);
    form.setFieldValue('countryCode', customer.countryCode);
    form.setFieldValue('rowVersion', customer.rowVersion);
    form.resetDirty();
  };

  const submitHndl = (data: IOrganization) => {
    setErrorMessage('');
    database
      .httpPut<IOrganization, IOrganization>('organizations/customer', data, true)
      .then((response) => {
        if (response.success) {
          if (response.data) {
            entityStore.setCustomer(response.data);
            modalHandlers.close();
          }
        } else if (response.statusCode === 409) {
          //@ts-ignore
          if (response.error?.response?.data.updatedEntity) {
            //@ts-ignore
            const updatedCustomer = response.error?.response?.data.updatedEntity as IOrganization;
            setValues(updatedCustomer);
            entityStore.setCustomer(updatedCustomer);
            setErrorMessage(
              'This customer has been changed by another user. The form has been updated with the most recent values.'
            );
          }
        }
      });
  };

  const disableSubmit = useMemo(() => {
    return !form.isDirty() || !form.isValid();
  }, [form.values]);

  return (
    <PModalForm
      title="Edit Customer"
      size="lg"
      icon={<IconBuilding size={21} />}
      errorMessage={errorMessage}
      disableSubmit={disableSubmit}
      opened={open}
      onClose={() => modalHandlers.close()}
      onSubmit={form.onSubmit((values) => submitHndl(values))}
    >
      <Form form={form} />
    </PModalForm>
  );
});
export default EditCustomer;
