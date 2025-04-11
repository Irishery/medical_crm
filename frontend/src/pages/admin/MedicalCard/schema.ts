import { fullnameSchema, genderSchema, passportSchema, polisSchema } from '../../../shared/patterns'
import { z } from 'zod'

export const schema = z.object({
    full_name: fullnameSchema,
    gender: genderSchema,
    identity_document: passportSchema,
    insurance_series_number: polisSchema,
    benefit_code: z.string().optional(),
    diseases: z.string().optional(),
})
