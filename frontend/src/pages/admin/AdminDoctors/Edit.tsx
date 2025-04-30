import React, { ComponentProps, useState } from 'react'
import { Box, Button, Modal, TextareaAutosize } from '@mui/material'
import {
    Controller,
    FormProvider,
    useForm,
    useFormState,
} from 'react-hook-form'
import { Input } from '@mui/material'
import { PhoneInput } from '../../../shared/FormItems'

const EditButton = (props: ComponentProps<typeof Button>) => {
    return (
        <Button {...props} variant="text" className="edit-button">
            Редактировать
        </Button>
    )
}
const EditContent = () => {
    const form = useForm()
    const { errors } = useFormState(form)

    const onSubmit = (data: Record<string, string>) => {}

    return (
        <div className="h-96 w-96 overflow-scroll rounded-md bg-white px-5 py-6 shadow-md">
            <div className="flex h-full flex-col gap-10">
                <h3 className="text-left text-lg">Редактирование</h3>
                <FormProvider {...form}>
                    <form
                        id="new_appointment_form"
                        className="flex h-full flex-col gap-10"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">ФИО</label>
                                <Input
                                    id="name"
                                    defaultValue="ФИО"
                                    {...(form.register('name'),
                                    { required: true })}
                                />
                                {errors.exampleRequired && (
                                    <span>Это поле обязательно</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="specialization">
                                    Специализация
                                </label>
                                <Input
                                    id="specialization"
                                    defaultValue=""
                                    {...(form.register('specialization'),
                                    { required: true })}
                                />
                                {errors.phone && (
                                    <p className="error-message">
                                        Неверный номер телефона
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="date">Дата рождения</label>
                                <Input
                                    id="date"
                                    placeholder="01.12.2000"
                                    defaultValue=""
                                    {...(form.register('date'),
                                    { required: true })}
                                />
                                {errors.phone && (
                                    <p className="error-message">
                                        Неверный номер телефона
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Почта</label>
                                <Input
                                    id="email"
                                    placeholder="13:20"
                                    {...(form.register('email'),
                                    { required: true })}
                                />
                                {errors.phone && (
                                    <p className="error-message">
                                        Неверный номер телефона
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <PhoneInput />
                            </div>
                        </div>
                    </form>
                </FormProvider>

                <div className="flex justify-between">
                    <Button type="button">Профиль</Button>
                    <Button
                        variant="contained"
                        form="new_appointment_form"
                        type="submit"
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    )
}
const Edit = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <EditButton onClick={() => setOpen((o) => !o)} />
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                className="flex items-center justify-center"
            >
                <EditContent />
            </Modal>
        </>
    )
}

export default Edit
