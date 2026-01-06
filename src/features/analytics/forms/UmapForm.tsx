import z from "zod"
import { RHFNumberInput, RHFTextInput } from "@/shared/ui/components/form"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PModalBody } from "@/shared/ui/modals/Parts/PModalBody"
import { PModalFormFooter } from "@/shared/ui/modals/Parts/PModalFormFooter"
import { useCreateUmapJobMutation } from "@/api/hooks/job-pipeline.hooks"

const schema = z.object({
  jobName: z.string().min(1),
  h5adPath: z.string().min(1),
  nNeighbors: z.number().min(2).max(200),
  minDist: z.number().min(0).max(1),
})

type FormValues = z.infer<typeof schema>

export interface IProps {
  onClose: () => void
}

export default function Fields({ onClose }: IProps) {
  const jobMutation = useCreateUmapJobMutation()

  const form = useForm<FormValues>({    
    resolver: zodResolver(schema),
    defaultValues: {
      jobName: "",
      h5adPath: "",
      nNeighbors: 15,
      minDist: 0.1,
    },
  })  

  const submitHandle = (data: FormValues) => {
    jobMutation.mutateAsync(data);
    onClose()
  }

  return (
    <FormProvider {...form}>
      <PModalBody>
        <form onSubmit={form.handleSubmit(submitHandle)}>
          <div className="pt-3 px-5 space-y-3">
            <RHFTextInput name="jobName" label="Job Name" />
            <RHFTextInput name="h5adPath" label="h5ad File Path" />
            <RHFNumberInput name="nNeighbors" label="n-Neighbors" min={2} max={200} />
            <RHFNumberInput name="minDist" label="min-Dist" min={0} max={1} step={0.1} />
          </div>
          <PModalFormFooter onClose={() => {}} />
      </form>
     </PModalBody>
    </FormProvider>    
  )
}
