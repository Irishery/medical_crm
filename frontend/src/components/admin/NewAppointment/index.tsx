import React, { ComponentProps, useState } from 'react'
import { Button, Modal } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'
import FormItem from '../../../shared/FormItem'

const NewAppointmentButton = (props: ComponentProps<typeof Button>) => {
    return (
        <Button variant="contained" {...props}>
            Новый прием
        </Button>
    )
}
const NewAppointmentContent = () => {
    const form = useForm({ resolver: zodResolver(schema) })

    const onSubmit = (data: Record<string, string>) => {}

    return (
        <div className="h-96 w-96 overflow-scroll rounded-md bg-white px-5 py-6 shadow-md">
            <div className="flex h-full flex-col gap-10">
                <h3 className="text-left text-lg">Новый прием</h3>
                <FormProvider {...form}>
                    <form
                        id="new_appointment_form"
                        className="flex h-full flex-col gap-10"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="grid grid-cols-2 gap-5">
                            <FormItem name="name">
                                <label htmlFor="name">ФИО</label>
                                <Input {...form.register('name')} />
                            </FormItem>

                            <FormItem name="phone">
                                <label htmlFor="phone">Номер телефона</label>
                                <Input {...form.register('phone')} />
                            </FormItem>

                            <FormItem name="date">
                                <label htmlFor="date">Дата</label>
                                <Input {...form.register('date')} />
                            </FormItem>

                            <FormItem name="time">
                                <label htmlFor="time">Время</label>
                                <Input
                                    {...form.register('time')}
                                    placeholder="13:20"
                                />
                            </FormItem>

                            <FormItem name="specialist_name">
                                <label htmlFor="specialist_name">
                                    Фио специалиста
                                </label>
                                <Input {...form.register('specialist_name')} />
                            </FormItem>

                            <FormItem name="comment">
                                <label htmlFor="comment">
                                    Комментарий администратора
                                </label>
                                <Input {...form.register('comment')} />
                            </FormItem>
                        </div>
                    </form>
                </FormProvider>

                <div className="flex justify-between">
                    <Button type="button">Медкарта</Button>
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
