import { z } from 'zod'

export const SignInFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type SignInForm = z.infer<typeof SignInFormSchema>
