import { z } from "zod"

export const phonePattern = /^\+7\d{10}$/
export const datePattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/
export const timePattern = /^([01]?\d|2[0-3]):([0-5]\d)$/

export const phoneSchema = z.string().refine((value) => value.match(phonePattern), 'INVALID_PHONE')
export const dateSchema = z.string().refine((value) => value.match(datePattern), 'INVALID_DATE')
export const timeSchema = z.string().refine((value) => value.match(timePattern), 'INVALID_TIME')

const errorMessages = {
    INVALID_PHONE: {
        ru: 'Неверный формат телефона. Пример: +79005553331'
    },
    INVALID_DATE: {
        ru: 'Неверный формат даты. Пример: 19.12.2000'
    },
    INVALID_TIME: {
        ru: 'Неверный формат времени. Пример: 15:50'
    }
} as const

export const getErrorMessage = (code: string | undefined): string => {
    // @ts-expect-error blabla
    return errorMessages[code]?.ru || code
}