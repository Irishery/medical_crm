import { dateSchema, fullnameSchema, phoneSchema } from '@/shared/patterns'
import { z } from 'zod'

export const schema = z.object({
    full_name: fullnameSchema,
    phone_number: phoneSchema,
})
