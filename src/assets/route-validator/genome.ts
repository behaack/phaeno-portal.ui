import { z } from 'zod';

export const searchSchema = z.object({
  subject: z.enum(['transcript', 'fasta', 'natural-language']).default('transcript'),
  sampleid:  z.string().uuid().default('00000000-0000-0000-0000-000000000000'),
  pageno: z.coerce.number().int().min(1).default(1),
  search: z.string().optional(),
  cursorid: z.coerce.number().nullable().optional(),
  cursorvalue: z.string().optional(),
  direction: z.enum(['next', 'prev']).default('next'),
  hasadditional: z.coerce.boolean().optional(),
});
