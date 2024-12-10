import { z } from 'zod'

export const addressDataSchema = z.object({
  street: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
})

export type AddressData = z.infer<typeof addressDataSchema>
