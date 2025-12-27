import { z } from 'zod';

export const searchSchema = z.object({
  parentid: z.string().nullable().default(null),
});
