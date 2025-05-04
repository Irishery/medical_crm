import { dateSchema, fullnameSchema, phoneSchema } from '@/shared/patterns'
import { z } from 'zod'

export const schema = z.object({
    full_name: fullnameSchema,
    birth_date: dateSchema,
    email: z.string().email(),
    speciality: z.string(),
    phone_number: phoneSchema,
})
