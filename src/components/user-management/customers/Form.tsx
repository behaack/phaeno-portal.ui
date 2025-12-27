import { useEffect, useMemo } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { IOrganization } from '@/assets/interfaces/_index';
import { countryList, regionList } from '@/assets/lookupLists/_index';
import { PSelect, PTextInput } from '@/components/_index';

export interface IProps {
  form: UseFormReturnType<IOrganization>;
}

export default function PatientForm({ form }: IProps) {
  useEffect(() => {
    form.setFieldValue('state', '');
  }, [form.values.countryCode]);

  const regions = useMemo(() => {
    return form.values.countryCode ? regionList[form.values.countryCode] || [] : [];
  }, [form.values.countryCode]);

  const clearCountryCodeHndl = () => {
    form.setFieldValue('countryCode', '');
    form.setFieldValue('state', '');
  };

  const clearRegionHndl = () => {
    form.setFieldValue('state', '');
  };

  const countries = useMemo(() => {
    return countryList.sort((a, b) => a.label.localeCompare(b.label));
  }, [countryList]);

  return (
    <div>
      <PTextInput
        name={form.key('organizationName')}
        label="Customer Name"
        placeholder="Customer Name"
        withAsterisk
        maxLength={250}
        {...form.getInputProps('organizationName')}
      />
      <PSelect
        name={form.key('countryCode')}
        label="Country"
        placeholder="Country"
        withScrollArea
        clearable
        searchable
        data={countries}
        onClear={clearCountryCodeHndl}
        {...form.getInputProps('countryCode')}
      />
      <PTextInput
        name={form.key('street1')}
        label="Street"
        placeholder="Street"
        maxLength={100}
        {...form.getInputProps('street1')}
      />
      <PTextInput
        name={form.key('street2')}
        label="Suite, Unit #"
        placeholder="Suite, Unit #"
        maxLength={100}
        {...form.getInputProps('street2')}
      />
      <PTextInput
        name={form.key('city')}
        label="City"
        placeholder="City"
        maxLength={100}
        {...form.getInputProps('city')}
      />

      {regions.length ? (
        <PSelect
          name={form.key('state')}
          label="State | Region"
          placeholder="State | Region"
          withScrollArea
          clearable
          searchable
          data={regions}
          onClear={clearRegionHndl}
          {...form.getInputProps('state')}
        />
      ) : (
        <PTextInput
          name={form.key('state')}
          label="State | Region"
          placeholder="State | Region"
          maxLength={100}
          {...form.getInputProps('state')}
        />
      )}

      <PTextInput
        name={form.key('postalCode')}
        label="Postal | Zip Code"
        placeholder="Postal | Zip Code"
        maxLength={25}
        {...form.getInputProps('postalCode')}
      />
    </div>
  );
}
