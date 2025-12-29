import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RHFTextInput } from "@/_shared/ui/components/form/rhf"
import { PModalBody } from "@/_shared/ui/modals/Parts/PModalBody"
import { PModalFormFooter } from "@/_shared/ui/modals/Parts/PModalFormFooter"

const schema = z.object({
  jobName: z.string().min(1),
  h5adPath: z.string().min(1),
  outFileName: z.string().min(1),
})

type FormValues = z.infer<typeof schema>

export default function ReportForm({ onSubmit }: { onSubmit: (v: FormValues) => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      jobName: "",
      h5adPath: "",
      outFileName: "",
    },
  })

  return (    
    <FormProvider {...form}>
      <PModalBody>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <RHFTextInput name="jobName" label="Job Name" />
          <RHFTextInput name="h5adPath" label="h5ad File Path" />
          <RHFTextInput name="outFileName" label="Out File Name" />
          <PModalFormFooter isDisabled onClose={() => {}} />
        </form>
      </PModalBody>
    </FormProvider>
  )
}
