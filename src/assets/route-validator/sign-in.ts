import { z } from 'zod';

export const searchSchema = z.object({
  redirectTo: z.string().optional(),
});
