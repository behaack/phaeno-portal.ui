import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export const organizationSchema = zodResolver(
  z.object({
    id: z.string(),
    organizationType: z.number(),
    organizationName: z
      .string()
      .nonempty({ message: 'Field is required.' })
      .max(300, { message: 'May not exceed 200 characters' }),
    street1: z
      .string()
      .max(100, { message: 'May not exceed 100 characters' })
      .nullish()
      .transform((value) => value || ''),
    street2: z
      .string()
      .max(100, { message: 'May not exceed 100 characters' })
      .nullish()
      .transform((value) => value || ''),
    city: z
      .string()
      .max(100, { message: 'May not exceed 100 characters' })
      .nullish()
      .transform((value) => value || ''),
    state: z
      .string()
      .max(100, { message: 'May not exceed 100 characters' })
      .nullish()
      .transform((value) => value || ''),
    postalCode: z
      .string()
      .max(25, { message: 'May not exceed 25 characters' })
      .nullish()
      .transform((value) => value || ''),
    countryCode: z
      .string()
      .max(2, { message: 'May not exceed 2 characters' })
      .nullish()
      .transform((value) => value || ''),
    rowVersion: z.string(),
  })
);
