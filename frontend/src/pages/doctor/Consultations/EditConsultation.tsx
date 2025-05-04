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
import { Input, Modal, TextareaAutosize, TextField } from '@mui/material'
import { Button } from '@mui/material'
import PrintButton from './PrintButton'
import { PatientInputForm } from '@/shared/PatientInput'
import { toast } from 'mui-sonner'
import { createConsultation } from '@/api/createConsultation'
import DatePickerForm from '@/shared/DatePickerForm'

type Props = {
    handleSubmit?: (data: z.infer<typeof schema>) => void
} & Partial<UseFormProps>

const Form = ({ handleSubmit, ...props }: Props) => {
    const form = useForm({ resolver: zodResolver(schema) })
    const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
        handleSubmit?.(data)
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
                    <h2 className="text-left text-2xl">
                        Информация о пациенте
                    </h2>
                    <div className="grid grid-cols-2 gap-5">
                        <FormItem name="name">
                            <label htmlFor="name">ФИО</label>
                            <PatientInputForm name="name" />
                        </FormItem>

                        <FormItem name="gender">
                            <label htmlFor="gender">Пол</label>
                            <Input {...form.register('gender')} />
                        </FormItem>

                        <FormItem name="birth_date">
                            <label htmlFor="birth_date">Дата Рождения</label>
                            <DatePickerForm name="birth_date" />
                        </FormItem>

                        <FormItem name="phone">
                            <label htmlFor="phone">Номер телефона</label>
                            <Input type="tel" {...form.register('phone')} />
                        </FormItem>

                        <FormItem name="email">
                            <label htmlFor="email">Email</label>
                            <Input {...form.register('email')} />
                        </FormItem>
                    </div>

                    <h2 className="text-left text-2xl">Информация о приеме</h2>
                    <div className="grid grid-cols-2 gap-5">
                        <FormItem name="diagnosis">
                            <label htmlFor="diagnosis">Диагноз</label>
                            <TextField {...form.register('diagnosis')} />
                        </FormItem>

                        <FormItem name="icd">
                            <label htmlFor="icd">ICD-10</label>
                            <TextField {...form.register('icd')} />
                        </FormItem>

                        <FormItem name="symptoms">
                            <label htmlFor="symptoms">Симптомы</label>
                            <TextareaAutosize
                                className="min-h-20 resize-none"
                                {...form.register('symptoms')}
                            />
                        </FormItem>

                        <FormItem name="recommendations">
                            <label htmlFor="recommendations">
                                Рекомендации
                            </label>
                            <TextareaAutosize
                                className="min-h-20 resize-none"
                                {...form.register('recommendations')}
                            />
                        </FormItem>
                    </div>
                </form>

                <div className="mt-5 flex justify-end">
                    <PrintButton template={() => 'Форма для печати'} />
                    <Button type="submit" form="consultation">
                        Сохранить консультацию
                    </Button>
                </div>
            </FormProvider>
        </div>
    )
}

const CreateConsultation = () => {
    const handleSubmit = async (data: z.infer<typeof schema>) => {
        try {
            await createConsultation({
                date_time: new Date().toISOString(),
                diagnosis: data.diagnosis,
                patient_review: data.symptoms,
                treatment: data.recommendations,
                doctor_notes: data.recommendations,
            })
            toast.success('Консультация создана')
        } catch (e) {
            toast.error('Не удалось создать консультацию')
        }
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
                    <CreateConsultation />
                </div>
            </Modal>
        </>
    )
}

const EditConsultation = () => {}

export { EditConsultation, CreateConsultation, CreateConsultationModal }
