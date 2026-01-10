import z from 'zod'

export const userSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  isAdmin: z.boolean(),
  isSetup: z.boolean(),
  rowVersion: z.any().nullable(),
})

export type UserFormValues = z.infer<typeof userSchema>
