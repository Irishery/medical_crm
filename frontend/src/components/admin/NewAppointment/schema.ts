import {
    dateSchema,
    fullnameSchema,
    phoneSchema,
    selectInputSchema,
    timeSchema,
} from '../../../shared/patterns'
import { z } from 'zod'

export const schema = z.object({
    name: selectInputSchema,
    phone: phoneSchema,
    date: dateSchema,
    time: timeSchema,
    specialist_name: selectInputSchema,
    comment: z.string(),
})
