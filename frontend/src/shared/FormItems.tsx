import React from 'react'
import type { ComponentProps } from 'react'
import { useFormContext, useFormState } from 'react-hook-form'
import { Input } from '@mui/material'
import { phonePattern, getErrorMessage } from './patterns'
import ErrorMessage from './ErrorMessage'
type Props = {}

export const PhoneInput = (props: ComponentProps<'input'>) => {
    const form = useFormContext()

    return (
        <>
            <label htmlFor="phone">Номер телефона</label>
            <Input
                id="phone"
                defaultValue="89506004433"
                {...(form.register('phone'),
                {
                    required: true,
                    pattern: /[A-Za-z]{3}/,
                })}
            />
        </>
    )
}
