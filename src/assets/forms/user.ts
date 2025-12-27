import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { IUser } from '../interfaces/_index';

const userSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z
    .string()
    .nonempty({ message: 'Email is required.' })
    .email({ message: 'Must be a valid email format.' }),
  firstName: z
    .string()
    .nonempty({ message: 'First name is required.' })
    .max(60, { message: 'May not exceed 60 characters.' }),
  lastName: z
    .string()
    .nonempty({ message: 'Last name is required' })
    .max(60, { message: 'May not exceed 60 characters.' }),
  isAdmin: z.boolean(),
  isSetup: z.boolean(),
  rowVersion: z.string(),
});

export const userFormSchema = (values: IUser) => {
  const errors = zodResolver(userSchema)(values as unknown as Record<string, unknown>);
  return errors as Record<keyof IUser, string | undefined>;
};
