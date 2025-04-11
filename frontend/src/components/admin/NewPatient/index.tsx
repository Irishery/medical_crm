import React, { ComponentProps, useState } from 'react'
import { Box, Button, Modal } from '@mui/material'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Input } from '@mui/material'
import FormItem from '../../../shared/FormItem'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'

const NewPatientButton = (props: ComponentProps<typeof Button>) => {
    return (
        <Button variant="contained" {...props}>
            Новый пациент
        </Button>
    )
}
const NewPatientContent = () => {
    const form = useForm({ resolver: zodResolver(schema) })

    const onSubmit = (data: Record<string, string>) => {}

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
                        <FormItem name="name">
                            <label htmlFor="name">ФИО</label>
                            <Input {...form.register('name')} />
                        </FormItem>

                        <FormItem name="phone">
                            <label htmlFor="phone">Номер телефона</label>
                            <Input {...form.register('phone')} />
                        </FormItem>
                    </form>
                </FormProvider>

                <div className="flex justify-between">
                    <Button type="button">Медкарта</Button>
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
