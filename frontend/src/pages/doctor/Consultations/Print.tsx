import FormItem from '../../../..//src/shared/FormItem'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { schema } from './print-schema'
import { Input } from '@mui/material'
import { Button } from '@mui/material'
import DatePickerForm from '@/shared/DatePickerForm'
import { PatientInputForm } from '@/shared/PatientInput'
import TimeFieldForm from '@/shared/TimeFieldForm'

type Props = {}

function printFormData(data: z.infer<typeof schema>) {
    const printContent = `
      <h1>Данные для печати</h1>
      <p><strong>ФИО пациента:</strong> ${data.name.label}</p>
      <p><strong>Контакты пациента:</strong> ${data.phone}</p>
      <p><strong>Вид обследования:</strong> ${data.examination}</p>
      <p><strong>Контакты врача:</strong> ${data.doctor_phone}</p>
      <p><strong>Дата:</strong> ${data.date}</p>
      <p><strong>Время:</strong> ${data.time}</p>
    `

    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Печать данных</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            p { margin: 5px 0; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.print()
}

const Print = (props: Props) => {
    const form = useForm({ resolver: zodResolver(schema) })

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
        printFormData(data)
    }

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
                            <PatientInputForm name="name" />
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
                            <DatePickerForm name="date" />
                        </FormItem>

                        <FormItem name="doctor_phone">
                            <label htmlFor="doctor_phone">Контакты врача</label>
                            <Input {...form.register('doctor_phone')} />
                        </FormItem>

                        <FormItem name="time">
                            <label htmlFor="time">Время</label>
                            <TimeFieldForm name="time" />
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
