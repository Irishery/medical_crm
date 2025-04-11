import { dateSchema, fullnameSchema, phoneSchema, timeSchema } from '../../../shared/patterns'
import { z } from 'zod'

export const schema = z.object({
    name: fullnameSchema,
    phone: phoneSchema,
    date: dateSchema,
    time: timeSchema,
    specialist_name: fullnameSchema,
    comment: z.string()
})