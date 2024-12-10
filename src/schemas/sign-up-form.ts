import { z } from 'zod'

// Zod validation schema
export const registrationSchema = z
  .object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    address: z.object({
      street: z.string().min(1, 'Street is required'),
      number: z.string().min(1, 'Number is required'),
      neighborhood: z.string().min(1, 'Neighborhood is required'),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(2, 'State is required'),
      cep: z.string().regex(/^\d{5}-\d{3}$/, 'Invalid CEP format'),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegistrationForm = z.infer<typeof registrationSchema>
