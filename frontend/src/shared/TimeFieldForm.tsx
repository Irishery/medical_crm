import { DateField } from '@mui/x-date-pickers'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'
import { TimeField } from '@mui/x-date-pickers/TimeField'

type Props = {
    name?: string
}

const TimeFieldForm = ({ name = 'time' }: Props) => {
    const form = useFormContext()

    return (
        <Controller
            control={form.control}
            name={name}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <TimeField
                    variant="standard"
                    format="HH:mm"
                    onChange={(value) => {
                        onChange(value?.format('HH:mm') || null)
                    }}
                    onBlur={onBlur}
                    value={value ? dayjs(value, 'HH:mm') : null}
                />
            )}
        />
    )
}

export default TimeFieldForm
