import React, { ComponentProps, useState } from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import AsyncSelect from 'react-select/async'

type Props = {}

const fetchPatients = async (inputValue: string) => {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/patients/?search=${inputValue}`
        )
        const data = await response.json()
        return data.map((patient: any) => ({
            label: patient.full_name,
            value: patient.id,
        }))
    } catch (error) {
        console.error('Error fetching patients:', error)
        return []
    }
}

const PatientInput = (props: ComponentProps<typeof AsyncSelect>) => {
    return (
        <AsyncSelect
            cacheOptions
            loadOptions={fetchPatients}
            defaultOptions
            {...props}
        />
    )
}

const PatientInputForm = (
    props: ComponentProps<typeof AsyncSelect> | { name: string }
) => {
    const form = useFormContext()

    return (
        <Controller
            control={form.control}
            name={props.name || 'patient_name'}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <PatientInput
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

export { PatientInput, PatientInputForm }
