import {
    dateSchema,
    fullnameSchema,
    genderSchema,
    phoneSchema,
    selectInputSchema,
} from '../../../shared/patterns'
import { z } from 'zod'

export const schema = z.object({
    name: selectInputSchema,
    gender: genderSchema,
    birth_date: dateSchema,
    phone: phoneSchema,
    email: z.string().email(),
    diagnosis: z.string(),
    icd: z.string(),
    symptoms: z.string(),
    recommendations: z.string(),
})
