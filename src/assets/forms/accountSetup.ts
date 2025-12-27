import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { ECodeProvider } from '@/assets/enums/_index';

export interface IAccountSetupForm {
  id: string;
  passwordHintQuestion: string;
  passwordHint: string;
  password: string;
  codeProvider: ECodeProvider;
  emailConfirmationToken: string;
}

export const accountSetupSchema = zodResolver(
  z
    .object({
      id: z.string(),
      passwordHintQuestion: z
        .string()
        .nonempty({ message: 'Field is required' })
        .max(100, { message: 'May not exceed 100 characters' }),
      passwordHint: z
        .string()
        .nonempty({ message: 'Field is required' })
        .max(100, { message: 'May not exceed 100 characters' }),
      password: z
        .string()
        .nonempty({ message: 'Password required.' })
        .min(8, { message: 'Password must be at least 8 characters long.' })
        .max(25, { message: 'Password may not exceed 25 characters.' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-[\]{}|\\:;'",.<>/~`]).+$/, {
          message:
            'Password must contact at least one alpha character, one number and one special character.',
        }),
      passwordConfirm: z.string(),
      codeProvider: z.number(),
      emailConfirmationToken: z.string(),
    })
    .superRefine(({ passwordConfirm, password }, ctx) => {
      if (passwordConfirm !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Must match password.',
          path: ['passwordConfirm'],
        });
      }
    })
);
