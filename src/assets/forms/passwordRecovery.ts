import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export interface IPasswordRecovery {
  email: string;
  passwordResetAnswer: string;
}

export const passwordRecoverySchema = zodResolver(
  z.object({
    email: z
      .string()
      .nonempty({ message: 'Email is required.' })
      .email({ message: 'Must be a valid email format.' }),
    passwordResetAnswer: z
      .string()
      .nonempty({ message: 'Answer is required' })
      .max(100, { message: 'Answer may not exeed 100 characters.' }),
  })
);
