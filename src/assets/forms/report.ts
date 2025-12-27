import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export interface IReport {
  jobName: string
  h5adPath: string;
  outFile: string;
}

export const reportSchema = z.object({
  jobName: z.string().min(1, { message: "Job Name is required." }).max(150, {message: "Job Name may not exceed 150 characters."}),

  h5adPath: z.string().min(1, { message: "H5AD path is required." }),

  outFile: z.string().min(1, { message: "Out file name is required." }),
})

export const reportFormSchema: (
  values: IReport
) => Record<keyof IReport, string | undefined> = (values) => {
  const errors = zodResolver(reportSchema)(
    values as unknown as Record<string, unknown>
  );

  return errors as Record<keyof IReport, string | undefined>;
};

