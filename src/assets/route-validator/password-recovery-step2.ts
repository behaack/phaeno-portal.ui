import { z } from 'zod';

export const searchSchema = z.object({
  email: z.string().email(),
  question: z.string(),
});
