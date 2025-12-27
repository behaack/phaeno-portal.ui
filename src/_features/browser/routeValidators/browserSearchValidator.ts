import { z } from 'zod';

export const browserSearchValidator = z.object({
  subject: z.enum(['transcript', 'fasta', 'natural-language']).default('transcript'),
  sampleid:  z.string().uuid().default('00000000-0000-0000-0000-000000000000'),
  pageno: z.coerce.number().int().min(1).default(1),
  q: z.string().optional(),
  cursor: z.string().optional()
});
