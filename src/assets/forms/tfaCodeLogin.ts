import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export interface ITfaCodeLoginSchema {
  deviceId: string;
  email: string;
  password: string;
  tfaCode: string;
  rememberMe: boolean;
}

export const TfaCodeLoginSchema = zodResolver(
  z.object({
    deviceId: z.string(),
    email: z
      .string()
      .nonempty({ message: 'Email s required.' })
      .email({ message: 'Must be a valid email format.' }),
    password: z.string().nonempty({ message: 'Password is required' }),
    tfaCode: z.string().nonempty({ message: 'Code is required' }),
    rememberMe: z.boolean(),
  })
);
