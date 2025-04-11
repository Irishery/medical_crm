import { dateSchema, phoneSchema, timeSchema } from '../../../shared/patterns'
import { z } from 'zod'

export const schema = z.object({
    name: z.string(),
    phone: phoneSchema,
})