import z from "zod";

export const organizationSchema = z.object({
  id: z.string(),
  organizationName: z.string().min(1, "First name is required").max(250, "May not exceed 250 characters."),
  organizationType: z.number(),
  street1: z.string().min(1, "Street is required").max(100, "May not exceed 100 characters."),
  street2: z.string().max(100, "May not exceed 100 characters."),
  city: z.string().min(1, "City is required").max(100, "May not exceed 100 characters."),
  state: z.string().min(1, "State is required").max(250, "May not exceed 100 characters."),
  postalCode: z.string().min(1, "Postal code is required").max(25, "May not exceed 25 characters."),
  countryCode: z.string().min(1, "Country is required").max(2, "May not exceed 2 characters."),
  rowVersion: z.any().nullable()
});

export type FormValues = z.infer<typeof organizationSchema>;