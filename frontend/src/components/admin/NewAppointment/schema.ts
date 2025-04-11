import { dateSchema, phoneSchema, timeSchema } from '../../../shared/patterns'
import { z } from 'zod'

export const schema = z.object({
    name: z.string(),
    phone: phoneSchema,
    date: dateSchema,
    time: timeSchema,
    specialist_name: z.string(),
    comment: z.string()
})