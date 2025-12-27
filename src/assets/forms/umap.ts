import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export interface IUmap {
  jobName: string
  h5adPath: string;
  nNeighbors: number;
  minDist: number;
}

export const umapSchema = z.object({
  jobName: z.string().min(1, { message: "Job Name is required." }).max(150, {message: "Job Name may not exceed 150 characters."}),

  h5adPath: z.string().min(1, { message: "H5AD path is required." }),

  nNeighbors: z
    .number({
      required_error: "nNeighbors is required.",
      invalid_type_error: "nNeighbors must be a number.",
    })
    .int()
    .min(2, { message: "nNeighbors must be at least 2." })
    .max(200, { message: "nNeighbors must be ≤ 200." }),

  minDist: z
    .number({
      required_error: "minDist is required.",
      invalid_type_error: "minDist must be a number.",
    })
    .min(0, { message: "minDist cannot be negative." })
    .max(1, { message: "minDist must be between 0 and 1." }),
})

export const umapFormSchema: (
  values: IUmap
) => Record<keyof IUmap, string | undefined> = (values) => {
  const errors = zodResolver(umapSchema)(
    values as unknown as Record<string, unknown>
  );

  return errors as Record<keyof IUmap, string | undefined>;
};