import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'

type Props = {
    name?: string
}

const DatePickerForm = ({ name = 'date' }: Props) => {
    const form = useFormContext()

    return (
        <Controller
            control={form.control}
            name={name}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <DatePicker
                    format="DD.MM.YYYY"
                    onChange={(value) => {
                        onChange(value?.format('DD.MM.YYYY') || null)
                    }}
                    onBlur={onBlur}
                    value={value ? dayjs(value, 'DD.MM.YYYY') : null}
                />
            )}
        />
    )
}

export default DatePickerForm
