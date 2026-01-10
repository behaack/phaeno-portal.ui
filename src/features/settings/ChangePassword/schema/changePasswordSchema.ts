import z from 'zod'

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is expired'),
    newPassword: z
      .string()
      .nonempty({ message: 'Password required.' })
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .max(25, { message: 'Password may not exceed 25 characters.' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-[\]{}|\\:;'",.<>/~`]).+$/, {
        message: 'Must contain at least one alpha character, one number and one special character.',
      }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Must match the new password.',
        path: ['confirmPassword'],
      })
    }
  })
