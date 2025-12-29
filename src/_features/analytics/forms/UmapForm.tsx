import { RHFNumberInput, RHFTextInput } from "@/_shared/ui/components/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import z from "zod"

const schema = z.object({
  jobName: z.string().min(1),
  h5adPath: z.string().min(1),
  nNeighbors: z.number().min(2).max(200),
  minDist: z.number().min(0).max(1),
})

type FormValues = z.infer<typeof schema>

export default function UmapForm({ onSubmit }: { onSubmit: (v: FormValues) => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nNeighbors: 15,
      minDist: 0.1,
    },
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <RHFTextInput name="jobName" label="Job Name" />
        <RHFTextInput name="h5adPath" label="h5ad File Path" />
        <RHFNumberInput name="nNeighbors" label="n-Neighbors" />
        <RHFNumberInput name="minDist" label="min-Dist" step={0.1} />
      </form>
    </FormProvider>
  )
}
