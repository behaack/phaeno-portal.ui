import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateReportJobMutation } from '@/api/hooks/job-pipeline.hooks'
import { RHFTextInput } from '@/shared/ui/components/form/rhf'
import { PModalBody } from '@/shared/ui/modals/Parts/PModalBody'
import { PModalFormFooter } from '@/shared/ui/modals/Parts/PModalFormFooter'

const schema = z.object({
  jobName: z.string().min(1),
  h5adPath: z.string().min(1),
  outFile: z.string().min(1),
})

type FormValues = z.infer<typeof schema>

export interface IProps {
  onClose: () => void
}

export default function ReportForm({ onClose }: IProps) {
  const jobMutation = useCreateReportJobMutation()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      jobName: '',
      h5adPath: '',
      outFile: '',
    },
  })

  const submitHandle = (data: FormValues) => {
    jobMutation.mutateAsync(data)
    onClose()
  }

  return (
    <FormProvider {...form}>
      <PModalBody>
        <form onSubmit={form.handleSubmit(submitHandle)}>
          <div className="pt-3 px-5 space-y-3">
            <RHFTextInput name="jobName" label="Job Name" />
            <RHFTextInput name="h5adPath" label="h5ad File Path" />
            <RHFTextInput name="outFile" label="Out File Name" />
          </div>
          <PModalFormFooter isDisabled={!form.formState.isValid} onClose={onClose} />
        </form>
      </PModalBody>
    </FormProvider>
  )
}
