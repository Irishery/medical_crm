import React, { ComponentProps, useEffect, useState } from 'react'
import { Box, Button, Modal, TextareaAutosize } from '@mui/material'
import {
    Controller,
    FormProvider,
    SubmitHandler,
    useForm,
    useFormState,
} from 'react-hook-form'
import { Input } from '@mui/material'
import FormItem from '@/shared/FormItem'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'
import { fetchAdmin } from '@/api/fetchAdmin'
import { editAdmin } from '@/api/editAdmin'
import { z } from 'zod'
import { toast } from 'mui-sonner'

const EditButton = (props: ComponentProps<typeof Button>) => {
    return (
        <Button {...props} variant="text" className="edit-button">
            Редактировать
        </Button>
    )
}
const EditContent = ({ id }: { id: number }) => {
    const form = useForm({ resolver: zodResolver(schema) })
    const { errors } = useFormState(form)

    useEffect(() => {
        if (!id) return

        fetchAdmin(id).then((data) => {
            form.reset({
                full_name: data.full_name,
                phone_number: data.contact_info,
            })
        })
    }, [id])

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
        try {
            await editAdmin(id, data)
            toast.success('Данные обновлены')
        } catch (e) {
            toast.error('Не удалось изменить данные')
        }
    }

    return (
        <div className="h-4/6 w-4/6 overflow-scroll rounded-md bg-white px-5 py-6 shadow-md">
            <div className="flex h-full flex-col gap-10">
                <h3 className="text-left text-lg">Редактирование</h3>
                <FormProvider {...form}>
                    <form
                        id="edit"
                        className="flex h-full flex-col gap-10"
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit(onSubmit)()
                        }}
                    >
                        <div className="grid grid-cols-2 gap-5">
                            <FormItem name="full_name">
                                <label htmlFor="full_name">ФИО</label>
                                <Input {...form.register('full_name')} />
                            </FormItem>

                            <FormItem name="phone_number">
                                <label htmlFor="phone_number">
                                    Номер телефона
                                </label>
                                <Input {...form.register('phone_number')} />
                            </FormItem>
                        </div>
                    </form>
                </FormProvider>

                <div className="flex justify-between">
                    <Button type="button">Профиль</Button>
                    <Button variant="contained" form="edit" type="submit">
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    )
}
const Edit = ({ id }: { id: number }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <EditButton onClick={() => setOpen((o) => !o)} />
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                className="flex items-center justify-center"
            >
                <EditContent id={id} />
            </Modal>
        </>
    )
}

export default Edit
