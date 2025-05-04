import { dateSchema, fullnameSchema, phoneSchema } from '@/shared/patterns'
import { z } from 'zod'

export const schema = z.object({
    full_name: fullnameSchema,
    speciality: z.string(),
    phone_number: phoneSchema,
})
