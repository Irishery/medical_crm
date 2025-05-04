import React, { ComponentProps, useEffect, useState } from 'react'
import { Box, Button, Modal, TextareaAutosize } from '@mui/material'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Input } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'
import FormItem from '../../../shared/FormItem'
import { z } from 'zod'
import { fetchDoctor } from '@/api/fetchDoctor'

const ProfileButton = (props: ComponentProps<typeof Button>) => {
    return (
        <Button variant="contained" {...props}>
            Профиль
        </Button>
    )
}

type MedicalCardContentProps = {
    doctorId: string
}
const ProfileContent = ({ doctorId }: MedicalCardContentProps) => {
    const [medicalCard, setMedicalCard] = useState({})
    const form = useForm({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        console.log({ doctorId })
        if (!doctorId) return

        fetchDoctor(doctorId).then((data) => {
            console.log({ data })
            form.reset({
                full_name: data.full_name,
                phone_number: data.contact_info,
                speciality: data.speciality,
                //     gender: data.gender,
                //     identity_document: data.identity_document,
                //     insurance_series_number: data.insurance_series_number,
                //     benefit_code: data.benefit_code,
                //     diseases: data.diseases,
            })
        })
    }, [doctorId])

    const handleSaveMedicalCard = async (data: z.infer<typeof schema>) => {
        try {
            const medicalCardData = { ...medicalCard, ...data }
            const response = await fetch(
                `http://127.0.0.1:8000/docotrs/${doctorId}/medical-card`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(medicalCardData),
                }
            )

            if (!response.ok) {
                const errorText = await response.text()
                console.error(`Failed to update medical card: ${errorText}`)
                throw new Error('Failed to update medical card')
            }

            const result = await response.json()
        } catch (error) {
            console.error('Error updating medical card:', error)
            alert('Ошибка при обновлении медицинской карты.')
        }
    }

    const onSubmit = (data: z.infer<typeof schema>) => {
        handleSaveMedicalCard(data)
    }

    return (
        <div className="min-h-96 w-[80%] overflow-scroll rounded-md bg-white px-5 py-6 shadow-md">
            <div className="flex h-full flex-col gap-10">
                <h3 className="text-left text-lg">Профиль</h3>
                <div className="grid grid-cols-2 gap-5">
                    <FormProvider {...form}>
                        <form
                            id="medcard"
                            className="flex h-full flex-col gap-10"
                            onSubmit={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                form.handleSubmit(onSubmit)()
                            }}
                        >
                            <FormItem name="full_name">
                                <label htmlFor="full_name">ФИО</label>
                                <Input {...form.register('full_name')} />
                            </FormItem>

                            <FormItem name="phone_number">
                                <label htmlFor="phone_number">
                                    Контактные данные
                                </label>
                                <Input {...form.register('phone_number')} />
                            </FormItem>

                            <FormItem name="speciality">
                                <label htmlFor="speciality">
                                    Специализация
                                </label>
                                <Input {...form.register('speciality')} />
                            </FormItem>
                        </form>
                    </FormProvider>
                </div>

                <div className="flex justify-end">
                    <Button form="medcard" type="submit">
                        Изменить
                    </Button>
                </div>
            </div>
        </div>
    )
}

type Props = {
    id: string
}
const Profile = (props: Props) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <ProfileButton onClick={() => setOpen((o) => !o)} />
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                className="flex items-center justify-center bg-white"
            >
                <ProfileContent doctorId={props.id} />
            </Modal>
        </>
    )
}

export default Profile
