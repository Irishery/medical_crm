import React, { ComponentProps, useState } from 'react'
import { Box, Button, Modal } from '@mui/material'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Input } from '@mui/material'
import FormItem from '../../../shared/FormItem'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'
import { z } from 'zod'
import { createPatient } from './api'

const NewPatientButton = (props: ComponentProps<typeof Button>) => {
    return (
        <Button variant="contained" {...props}>
            Новый пациент
        </Button>
    )
}
const NewPatientContent = () => {
    const form = useForm({ resolver: zodResolver(schema) })

    const onSubmit = (data: z.infer<typeof schema>) => {
        createPatient(data)
    }

    return (
        <div className="h-96 w-96 rounded-md bg-white px-5 py-6 shadow-md">
            <div className="flex h-full flex-col gap-10">
                <h3 className="text-left text-lg">Новый пациент</h3>
                <FormProvider {...form}>
                    <form
                        id="new_patient_form"
                        className="flex h-full flex-col gap-10"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormItem name="full_name">
                            <label htmlFor="full_name">ФИО</label>
                            <Input {...form.register('full_name')} />
                        </FormItem>

                        <FormItem name="contact_info">
                            <label htmlFor="contact_info">Номер телефона</label>
                            <Input
                                type="tel"
                                {...form.register('contact_info')}
                            />
                        </FormItem>
                    </form>
                </FormProvider>

                <div className="flex justify-end">
                    <Button form="new_patient_form" type="submit">
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    )
}

const NewPatient = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <NewPatientButton onClick={() => setOpen((o) => !o)} />
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                className="flex items-center justify-center"
            >
                <NewPatientContent />
            </Modal>
        </>
    )
}

export default NewPatient
