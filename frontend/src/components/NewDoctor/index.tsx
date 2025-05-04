import { createDoctor } from '@/api/createDoctor'
import { createUser } from '@/api/createUser'

import FormItem from '@/shared/FormItem'
import { fullnameSchema, phoneSchema } from '@/shared/patterns'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Button } from '@mui/material'
import { toast } from 'mui-sonner'
import { useState } from 'react'
import {
    UseFormProps,
    useForm,
    SubmitHandler,
    FormProvider,
} from 'react-hook-form'
import { z } from 'zod'

const doctorSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(5),
    full_name: fullnameSchema,
    speciality: z.string(),
    contact_info: phoneSchema,
})

type Props = Record<string, any>

const DoctorForm = (props: Props) => {
    const form = useForm({ resolver: zodResolver(doctorSchema) })

    const onSubmit: SubmitHandler<z.infer<typeof doctorSchema>> = async (
        data
    ) => {
        try {
            await createUser({
                role: 'doctor',
                username: data.username,
                password: data.password,
            })

            await createDoctor({
                username: data.username,
                full_name: data.full_name,
                contact_info: data.contact_info,
                speciality: data.speciality,
            })
            toast.success('Новый доктор создан: ' + data.full_name)
        } catch (e) {
            const message = typeof e?.message === 'string' ? e.message : ''
            toast.error('Ошибка при попытке создать врача: ' + message)
        }
    }

    return (
        <div>
            <FormProvider {...form}>
                <form
                    id="new_doctor"
                    className="flex h-full flex-col gap-10"
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit(onSubmit)()
                    }}
                >
                    <div className="grid grid-cols-2 gap-5">
                        <FormItem name="username">
                            <label htmlFor="username">Username</label>
                            <Input {...form.register('username')} />
                        </FormItem>

                        <FormItem name="password">
                            <label htmlFor="password">Пароль</label>
                            <Input {...form.register('password')} />
                        </FormItem>

                        <FormItem name="full_name">
                            <label htmlFor="full_name">ФИО</label>
                            <Input {...form.register('full_name')} />
                        </FormItem>

                        <FormItem name="speciality">
                            <label htmlFor="speciality">Специализация</label>
                            <Input {...form.register('speciality')} />
                        </FormItem>

                        <FormItem name="contact_info">
                            <label htmlFor="contact_info">Номер телефона</label>
                            <Input {...form.register('contact_info')} />
                        </FormItem>
                    </div>
                </form>
            </FormProvider>

            <div className="flex justify-end">
                <Button form="new_doctor" type="submit">
                    Добавить
                </Button>
            </div>
        </div>
    )
}

export default DoctorForm
