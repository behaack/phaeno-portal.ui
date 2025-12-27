import { UseFormReturnType } from '@mantine/form';
import { TextInput } from '@mantine/core';
import { MasterJobFormValues } from '@/assets/forms/masterJobSchema';

interface IReportFormProps {
  form: UseFormReturnType<MasterJobFormValues>;
}

export default function SummaryForm ({ form }: IReportFormProps) {
  return (
    <div>
      <TextInput
        label="Job Name"
        placeholder="Job Name"
        maxLength={150}
        key={form.key('summary.jobName')}
        {...form.getInputProps('summary.jobName')}
      />

      <TextInput
        label="h5ad File Path"
        placeholder="h5ad File Path"
        maxLength={150}
        key={form.key('summary.h5adPath')}
        {...form.getInputProps('summary.h5adPath')}
      />
  </div>         
  )
};
