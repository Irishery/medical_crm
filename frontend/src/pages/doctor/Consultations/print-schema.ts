import {
    dateSchema,
    fullnameSchema,
    phoneSchema,
    selectInputSchema,
    timeSchema,
} from '../../../shared/patterns'
import { z } from 'zod'

export const schema = z.object({
    document_type: z.string(),
    name: selectInputSchema,
    phone: phoneSchema,
    examination: z.string(),
    diagnosis: z.string(),
    date: dateSchema,
    doctor_phone: phoneSchema,
    time: timeSchema,
})
