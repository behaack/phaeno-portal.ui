import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export interface ILoginForm {
  deviceId: string;
  email: string;
  password: string;
}

export const loginSchema = zodResolver(
  z.object({
    deviceId: z.string(),
    email: z
      .string()
      .nonempty({ message: 'Email is required.' })
      .email({ message: 'Must be a valid email format.' }),
    password: z.string().nonempty({ message: 'Password is required' }),
  })
);
