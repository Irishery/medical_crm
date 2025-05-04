import { INVALID, z } from 'zod'

export const phonePattern = /^\+7\d{10}$/
export const datePattern =
    /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/
export const timePattern = /^([01]?\d|2[0-3]):([0-5]\d)$/
export const fullnamePattern = /^[а-яА-ЯёЁ]+\s+[а-яА-ЯёЁ]+\s+[а-яА-ЯёЁ]+$/
export const genderPattern = /^[МЖ]$/
export const passportPattern = /^\d{4}\s\d{6}$/
export const polisPattern = /^(?:\d{4}\s?\d{6}|\d{16})$/

export const phoneSchema = z
    .string()
    .refine((value) => value.match(phonePattern), 'INVALID_PHONE')
export const dateSchema = z
    .string()
    .refine((value) => value.match(datePattern), 'INVALID_DATE')
export const timeSchema = z
    .string()
    .refine((value) => value.match(timePattern), 'INVALID_TIME')
export const fullnameSchema = z
    .string()
    .refine((value) => value.match(fullnamePattern), 'INVALID_FIO')
export const genderSchema = z
    .string()
    .refine((value) => value.match(genderPattern), 'INVALID_GENDER')
export const passportSchema = z
    .string()
    .refine((value) => value.match(passportPattern), 'INVALID_PASSPORT')
export const polisSchema = z
    .string()
    .refine((value) => value.match(polisPattern), 'INVALID_POLIS')
export const selectInputSchema = z.object({
    value: z.number(),
    label: z.string(),
})

const errorMessages = {
    INVALID_PHONE: {
        ru: 'Неверный формат телефона. Пример: +79005553331',
    },
    INVALID_DATE: {
        ru: 'Неверный формат даты. Пример: 19.12.2000',
    },
    INVALID_TIME: {
        ru: 'Неверный формат времени. Пример: 15:50',
    },
    INVALID_FIO: {
        ru: 'Неверный формат ФИО. Пример: Фамилия Имя Отчество',
    },
    INVALID_GENDER: {
        ru: 'Неверный формат пола. М или Ж',
    },
    INVALID_PASSPORT: {
        ru: 'Неверный формат паспорта. Серия и номер через пробел',
    },
    INVALID_POLIS: {
        ru: 'Полис должен быть в новом или старом формате. Пример: 1234 567890 или 1234567890123456',
    },
} as const

export const getErrorMessage = (code: string | undefined): string => {
    // @ts-expect-error blabla
    return errorMessages[code]?.ru || code
}
