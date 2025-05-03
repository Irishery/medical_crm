import FormItem from '../../../..//src/shared/FormItem'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { schema } from './print-schema'
import { Input } from '@mui/material'
import { Button } from '@mui/material'

type Props = {}

const Print = (props: Props) => {
    const form = useForm({ resolver: zodResolver(schema) })

    const onSubmit = (data: Record<string, string>) => {}

    return (
        <div>
            <FormProvider {...form}>
                <form
                    id="new_appointment_form"
                    className="flex h-full flex-col gap-10"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-2 gap-5">
                        <FormItem name="document_type">
                            <label htmlFor="document_type">Тип документа</label>
                            <Input {...form.register('document_type')} />
                        </FormItem>

                        <FormItem name="name">
                            <label htmlFor="name">ФИО</label>
                            <Input {...form.register('name')} />
                        </FormItem>

                        <FormItem name="phone">
                            <label htmlFor="phone">Номер телефона</label>
                            <Input type="tel" {...form.register('phone')} />
                        </FormItem>

                        <FormItem name="examination">
                            <label htmlFor="examination">
                                Вид обследования
                            </label>
                            <Input {...form.register('examination')} />
                        </FormItem>

                        <FormItem name="diagnosis">
                            <label htmlFor="diagnosis">Диагноз</label>
                            <Input {...form.register('diagnosis')} />
                        </FormItem>

                        <FormItem name="date">
                            <label htmlFor="date">Дата</label>
                            <Input {...form.register('date')} />
                        </FormItem>

                        <FormItem name="doctor_phone">
                            <label htmlFor="doctor_phone">Контакты врача</label>
                            <Input {...form.register('doctor_phone')} />
                        </FormItem>

                        <FormItem name="time">
                            <label htmlFor="time">Время</label>
                            <Input {...form.register('time')} />
                        </FormItem>
                    </div>
                </form>
            </FormProvider>

            <div className="flex justify-end">
                <Button form="new_appointment_form" type="submit">
                    Распечатать
                </Button>
            </div>
        </div>
    )
}

export default Print
