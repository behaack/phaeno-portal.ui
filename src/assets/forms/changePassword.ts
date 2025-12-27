import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export interface IChangePasswordForm {
  password: string;
  newPassword: string;
}

export const changePasswordSchema = zodResolver(
  z
    .object({
      password: z.string().nonempty({ message: 'Please enter you current password.' }),
      newPassword: z
        .string()
        .nonempty({ message: 'Password required.' })
        .min(8, { message: 'Password must be at least 8 characters long.' })
        .max(25, { message: 'Password may not exceed 25 characters.' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-[\]{}|\\:;'",.<>/~`]).+$/, {
          message:
            'Password must contact at least one alpha character, one number and one special character.',
        }),
      passwordConfirm: z.string(),
    })
    .superRefine(({ passwordConfirm, newPassword }, ctx) => {
      if (passwordConfirm !== newPassword) {
        ctx.addIssue({
          code: 'custom',
          message: 'New Password and Confirm New Password must match.',
          path: ['passwordConfirm'],
        });
      }
    })
);
