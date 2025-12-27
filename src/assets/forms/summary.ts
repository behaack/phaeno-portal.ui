import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export interface ISummary {
  jobName: string;
  h5adPath: string;
}

export const summarySchema = z.object({
  jobName: z.string().min(1, { message: "Job Name is required." }).max(150, {message: "Job Name may not exceed 150 characters."}),
  h5adPath: z.string().min(1, { message: "H5AD path is required." }),
})


export const summaryFormSchema: (
  values: ISummary
) => Record<keyof ISummary, string | undefined> = (values) => {
  const errors = zodResolver(summarySchema)(
    values as unknown as Record<string, unknown>
  );

  return errors as Record<keyof ISummary, string | undefined>;
};