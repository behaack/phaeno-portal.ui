import { MasterJobFormValues } from '@/assets/forms/masterJobSchema';
import { NumberInput, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

interface IReportFormProps {
  form: UseFormReturnType<MasterJobFormValues>;
}

export default function UmapForm ({ form }: IReportFormProps) {
  return (
    <div>
      <TextInput
        label="Job Name"
        placeholder="Job Name"
        maxLength={150}
        key={form.key('umap.jobName')}
        {...form.getInputProps('umap.jobName')}
      />

      <TextInput
        label="h5ad File Path"
        placeholder="h5ad File Path"
        maxLength={150}
        key={form.key('umap.h5adPath')}
        {...form.getInputProps('umap.h5adPath')}
      />

      <NumberInput
        mt="sm"
        label="n-Neighbors"
        placeholder="n-Neighbors"
        min={2}
        max={200}
        key={form.key('umap.nNeighbors')}
        {...form.getInputProps('umap.nNeighbors')}
      />   

      <NumberInput
        mt="sm"
        label="min-Dist"
        placeholder="min-Dist"
        min={0}
        max={1}
        step={0.1}
        key={form.key('umap.minDist')}
        {...form.getInputProps('umap.minDist')}
      />
  </div>         
  )
};
