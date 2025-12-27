import { forwardRef, useImperativeHandle, useMemo } from 'react';
import { IconBuilding } from '@tabler/icons-react';
import { NIL } from 'uuid';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { EOrganizationType } from '@/assets/enums/_index';
import { organizationSchema } from '@/assets/forms/organization';
import { IOrganization } from '@/assets/interfaces/_index';
import { PModalForm } from '@/components/_index';
import Form from '@/components/user-management/customers/Form';
import { utilities } from '@/compostables/utilities';
import { useDatabase } from '@/hooks/useDatabase';
import { useEntityStore } from '@/stores/entityStore';

export interface IProps {}

export interface IHandles {
  add: () => void;
}

const AddCustomer = forwardRef<IHandles, IProps>((_props, ref) => {
  const database = useDatabase();
  const entityStore = useEntityStore();
  const [open, modalHandlers] = useDisclosure(false);
  const form = useForm({
    mode: 'controlled',
    validateInputOnBlur: true,
    initialValues: {
      id: '',
      organizationType: EOrganizationType.Customer,
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
    add() {
      initialize();
    },
  }));

  const initialize = () => {
    form.setFieldValue('id', NIL);
    form.setFieldValue('organizationType', EOrganizationType.Customer);
    form.setFieldValue('organizationName', '');
    form.setFieldValue('street1', '');
    form.setFieldValue('street2', '');
    form.setFieldValue('city', '');
    form.setFieldValue('state', '');
    form.setFieldValue('postalCode', '');
    form.setFieldValue('countryCode', '');
    form.setFieldValue('rowVersion', NIL);
    modalHandlers.open();
  };

  const submitHndl = (data: IOrganization) => {
    database
      .httpPost<IOrganization, IOrganization>('organizations/customer', data, true)
      .then((response) => {
        if (response.success) {
          if (response.data) {
            let list: IOrganization[] = [...entityStore.customerPagedList.list, response.data];
            list = utilities().multiSort(list, { organizationName: 'asc' });
            const newPagedList = {
              ...entityStore.customerPagedList,
              list,
            };
            entityStore.setCustomerPagedList(newPagedList);
          }
        }
        modalHandlers.close();
      });
  };

  const disableSubmit = useMemo(() => {
    return !form.isDirty() || !form.isValid();
  }, [form.values]);

  return (
    <PModalForm
      title="Add Customer"
      disableSubmit={disableSubmit}
      opened={open}
      size="lg"
      icon={<IconBuilding size={21} />}
      onClose={() => modalHandlers.close()}
      onSubmit={form.onSubmit((values) => submitHndl(values))}
    >
      <Form form={form} />
    </PModalForm>
  );
});
export default AddCustomer;
