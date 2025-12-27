import { UseFormReturnType } from '@mantine/form';
import { TextInput } from '@mantine/core';
import { MasterJobFormValues } from '@/assets/forms/masterJobSchema';

interface IReportFormProps {
  form: UseFormReturnType<MasterJobFormValues>;
}

export default function ScoreForm ({ form }: IReportFormProps) {
  return (
    <div>
      <TextInput
        label="Job Name"
        placeholder="Job Name"
        maxLength={150}
        key={form.key('score.jobName')}
        {...form.getInputProps('score.jobName')}
      />

      <TextInput
        label="h5ad File Path"
        placeholder="h5ad File Path"
        maxLength={150}
        key={form.key('score.h5adPath')}
        {...form.getInputProps('score.h5adPath')}
      />
  </div>         
  )
};
