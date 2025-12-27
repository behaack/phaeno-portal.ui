import { UseFormReturnType } from '@mantine/form';
import { TextInput } from '@mantine/core';
import { MasterJobFormValues } from '@/assets/forms/masterJobSchema';

interface IReportFormProps {
  form: UseFormReturnType<MasterJobFormValues>;
}

export default function ReportForm ({ form }: IReportFormProps) {
  return (
    <div>
      <TextInput
        label="Job Name"
        placeholder="Job Name"
        maxLength={150}
        key={form.key('report.jobName')}
        {...form.getInputProps('report.jobName')}
      />

      <TextInput
        label="h5ad File Path"
        placeholder="h5ad File Path"
        maxLength={150}
        key={form.key('report.h5adPath')}
        {...form.getInputProps('report.h5adPath')}
      />

      <TextInput
        label="Out File Name"
        placeholder="Out File Name"
        maxLength={150}
        key={form.key('report.outFile')}
        {...form.getInputProps('report.outFile')}
      />      
  </div>         
  )
};
