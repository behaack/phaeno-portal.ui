import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export interface IPasswordResetForm {
  userId: string;
  passwordResetToken: string;
  password: string;
}

export const passwordResetSchema = zodResolver(
  z
    .object({
      userId: z.string(),
      passwordResetToken: z.string(),
      password: z
        .string()
        .nonempty({ message: 'Password required.' })
        .min(8, { message: 'Password must be at least 8 characters long.' })
        .max(25, { message: 'Password may not exceed 25 characters.' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-[\]{}|\\:;'",.<>/~`]).+$/, {
          message:
            'Password must contact at least one alpha character, one number and one special character.',
        }),
      passwordConfirm: z
        .string()
        .nonempty({ message: 'Required' })
        .max(100, { message: 'May not exceed 100 characters' }),
    })
    .superRefine(({ passwordConfirm, password }, ctx) => {
      if (passwordConfirm !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Password and Confirm Password must match.',
          path: ['passwordConfirm'],
        });
      }
    })
);
