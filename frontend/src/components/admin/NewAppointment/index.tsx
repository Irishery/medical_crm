import React, { ComponentProps, useState } from 'react'
import { Button, Modal, TextareaAutosize } from '@mui/material'
import {
    Controller,
    FormProvider,
    SubmitHandler,
    useForm,
} from 'react-hook-form'
import { Input } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'
import FormItem from '../../../shared/FormItem'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimeField } from '@mui/x-date-pickers/TimeField'
import dayjs from 'dayjs'
import { DateField } from '@mui/x-date-pickers'
import DatePickerForm from '@/shared/DatePickerForm'
import TimeFieldForm from '@/shared/TimeFieldForm'
import DoctorInput, { DoctorInputForm } from '@/shared/DoctorInput'
import { PatientInputForm } from '@/shared/PatientInput'
import { z } from 'zod'
import { createSchedule } from '@/api/createSchedule'
import { toast } from 'mui-sonner'

const NewAppointmentButton = (props: ComponentProps<typeof Button>) => {
    return (
        <Button variant="contained" {...props}>
            Новый прием
        </Button>
    )
}
const NewAppointmentContent = () => {
    const form = useForm({ resolver: zodResolver(schema) })

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
        try {
            const [day, month, year] = data.date.split('.').map(Number)
            const [hours, minutes] = data.time.split(':').map(Number)
            const dateTime = new Date(
                Date.UTC(year, month - 1, day, hours, minutes, 0, 0)
            )
            const isoString = dateTime.toISOString()

            await createSchedule({
                doctor_id: data.specialist_name.value,
                patient_id: data.name.value,
                comments: data.comment,
                date_time: isoString,
            })
            toast.success('Запись создана')
        } catch (e) {
            toast.error('Не удалось создать запись')
        }
    }

    return (
        <div className="h-4/6 w-4/6 overflow-auto rounded-md bg-white px-5 py-6 shadow-md">
            <div className="flex h-full flex-col gap-10">
                <h3 className="text-left text-lg">Новый прием</h3>
                <FormProvider {...form}>
                    <form
                        id="new_appointment_form"
                        className="flex h-full flex-col gap-10"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-5">
                            <FormItem name="name">
                                <label htmlFor="name">ФИО</label>
                                <PatientInputForm name="name" />
                            </FormItem>

                            <FormItem name="phone">
                                <label htmlFor="phone">Номер телефона</label>
                                <Input type="tel" {...form.register('phone')} />
                            </FormItem>

                            <FormItem name="date">
                                <label htmlFor="date">Дата</label>
                                <DatePickerForm name="date" />
                            </FormItem>

                            <FormItem name="time">
                                <label htmlFor="time">Время</label>
                                <TimeFieldForm name="time" />
                            </FormItem>

                            <FormItem name="specialist_name">
                                <label htmlFor="specialist_name">
                                    Фио специалиста
                                </label>
                                <DoctorInputForm name="specialist_name" />
                            </FormItem>
                            <div className="row-span-3">
                                <FormItem
                                    name="comment"
                                    className="flex h-full flex-col gap-2"
                                >
                                    <label htmlFor="comment">
                                        Комментарий администратора
                                    </label>
                                    <TextareaAutosize
                                        className="h-full flex-1 resize-none"
                                        {...form.register('comment')}
                                    />
                                </FormItem>
                            </div>
                        </div>
                    </form>
                </FormProvider>

                <div className="flex justify-end">
                    <Button form="new_appointment_form" type="submit">
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    )
}

const NewAppointment = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <NewAppointmentButton onClick={() => setOpen((o) => !o)} />
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                className="flex items-center justify-center"
            >
                <NewAppointmentContent />
            </Modal>
        </>
    )
}

export default NewAppointment
