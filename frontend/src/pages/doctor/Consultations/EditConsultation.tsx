import FormItem from '../../../..//src/shared/FormItem'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
    UseFormProps,
} from 'react-hook-form'
import { z } from 'zod'
import { schema } from './consultation-schema'
import { Input, Modal } from '@mui/material'
import { Button } from '@mui/material'

type Props = {
    handleSubmit?: (data: z.infer<typeof schema>) => void
} & Partial<UseFormProps>

const Form = ({ handleSubmit, ...props }: Props) => {
    const form = useForm({ resolver: zodResolver(schema) })

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
        onSubmit?.(data)
    }

    return (
        <div>
            <FormProvider {...form}>
                <form
                    id="consultation"
                    className="flex h-full flex-col gap-10"
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit(onSubmit)()
                    }}
                >
                    <div className="grid grid-cols-2 gap-5">
                        <FormItem name="name">
                            <label htmlFor="name">ФИО</label>
                            <Input {...form.register('name')} />
                        </FormItem>

                        <FormItem name="gender">
                            <label htmlFor="gender">Пол</label>
                            <Input {...form.register('gender')} />
                        </FormItem>

                        <FormItem name="birth_date">
                            <label htmlFor="birth_date">Дата Рождения</label>
                            <Input {...form.register('birth_date')} />
                        </FormItem>

                        <FormItem name="phone">
                            <label htmlFor="phone">Номер телефона</label>
                            <Input {...form.register('phone')} />
                        </FormItem>

                        <FormItem name="diagnosis">
                            <label htmlFor="diagnosis">Диагноз</label>
                            <Input {...form.register('diagnosis')} />
                        </FormItem>

                        <FormItem name="icd">
                            <label htmlFor="icd">ICD-10</label>
                            <Input {...form.register('icd')} />
                        </FormItem>

                        <FormItem name="symptoms">
                            <label htmlFor="symptoms">Симптомы</label>
                            <Input {...form.register('symptoms')} />
                        </FormItem>

                        <FormItem name="email">
                            <label htmlFor="email">Email</label>
                            <Input {...form.register('email')} />
                        </FormItem>

                        <FormItem name="recommendations">
                            <label htmlFor="email">Рекомендации</label>
                            <Input {...form.register('email')} />
                        </FormItem>
                    </div>
                </form>
            </FormProvider>

            <div className="flex justify-end">
                <Button form="consultation" type="submit">
                    Распечатать
                </Button>
            </div>
        </div>
    )
}

const CreateConsultation = () => {
    const handleSubmit = (data: z.infer<typeof schema>) => {
        // POST
        console.log('create consultation', data)
    }

    return (
        <div>
            <h1 className="mb-10 text-3xl font-bold">Консультация</h1>

            <Form handleSubmit={handleSubmit}></Form>
        </div>
    )
}

const CreateConsultationModal = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button variant="contained" onClick={() => setOpen((o) => !o)}>
                Новая консультация
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                className="flex items-center justify-center"
            >
                <div className="h-4/6 overflow-auto rounded-md bg-white px-5 py-6 shadow-md">
                    {' '}
                    <CreateConsultation />
                </div>
            </Modal>
        </>
    )
}

const EditConsultation = () => {}

export { CreateConsultation, CreateConsultationModal }
