import { dateSchema, fullnameSchema, phoneSchema, timeSchema } from '../../../shared/patterns'
import { z } from 'zod'

export const schema = z.object({
    full_name: fullnameSchema,
    contact_info: phoneSchema,
})