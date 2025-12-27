import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export interface IScore {
  jobName: string;
  h5adPath: string;
}

export const scoreSchema = z.object({
  jobName: z.string().min(1, { message: "Job Name is required." }).max(150, {message: "Job Name may not exceed 150 characters."}),
  h5adPath: z.string().min(1, { message: "H5AD path is required." }),
})

export const scoreFormSchema: (
  values: IScore
) => Record<keyof IScore, string | undefined> = (values) => {
  const errors = zodResolver(scoreSchema)(
    values as unknown as Record<string, unknown>
  );

  return errors as Record<keyof IScore, string | undefined>;
};