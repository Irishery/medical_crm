import React, { ComponentProps, useState } from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import AsyncSelect from 'react-select/async'

type Props = {}

const fetchDoctors = async (inputValue: string) => {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/doctors/?search=${inputValue}`
        )
        const data = await response.json()
        return data.map((doctor: any) => ({
            label: `${doctor.full_name} | ${doctor.speciality}`,
            value: doctor.id,
        }))
    } catch (error) {
        console.error('Error fetching doctors:', error)
        return []
    }
}

const DoctorInput = (props: ComponentProps<typeof AsyncSelect>) => {
    return (
        <AsyncSelect
            cacheOptions
            loadOptions={fetchDoctors}
            defaultOptions
            {...props}
        />
    )
}

const DoctorInputForm = (
    props: ComponentProps<typeof AsyncSelect> | { name: string }
) => {
    const form = useFormContext()

    return (
        <Controller
            control={form.control}
            name={props.name || 'doctor_name'}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <DoctorInput
                    onChange={(value) => {
                        onChange(value)
                    }}
                    onBlur={onBlur}
                    value={value}
                />
            )}
        />
    )
}

export { DoctorInput, DoctorInputForm }
