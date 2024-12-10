import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  address: z.object({
    street: z.string(),
    number: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    cep: z.string(),
  }),
})

export const userWithoutPasswordSchema = userSchema.omit({
  password: true,
  confirmPassword: true,
})

export type User = z.infer<typeof userSchema>
export type UserWithoutPassword = z.infer<typeof userWithoutPasswordSchema>
