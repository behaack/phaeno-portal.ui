import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RHFTextInput } from "@/_shared/ui/components/form/rhf"

const schema = z.object({
  jobName: z.string().min(1),
  h5adPath: z.string().min(1),
})

type FormValues = z.infer<typeof schema>

export default function SummaryForm({ onSubmit }: { onSubmit: (v: FormValues) => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      jobName: "",
      h5adPath: "",
    },
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <RHFTextInput name="jobName" label="Job Name" />
        <RHFTextInput name="h5adPath" label="h5ad File Path" />
      </form>
    </FormProvider>
  )
}
