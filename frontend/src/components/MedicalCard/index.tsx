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
import FormItem from '../../shared/FormItem'
import { fetchMedicalCardData } from './fetchMedicalCardData'
import { z } from 'zod'

const MedicalCardButton = (props: ComponentProps<typeof Button>) => {
    return (
        <Button variant="contained" {...props}>
            Медкарта
        </Button>
    )
}

type MedicalCardContentProps = {
    patientId: string
}
const MedicalCardContent = ({ patientId }: MedicalCardContentProps) => {
    const [medicalCard, setMedicalCard] = useState({})
    const form = useForm({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        if (!patientId) return

        fetchMedicalCardData(patientId).then((data) => {
            setMedicalCard(data)
            form.reset({
                full_name: data.full_name,
                gender: data.gender,
                identity_document: data.identity_document,
                insurance_series_number: data.insurance_series_number,
                benefit_code: data.benefit_code,
                diseases: data.diseases,
            })
        })
    }, [patientId])

    const handleSaveMedicalCard = async (data: z.infer<typeof schema>) => {
        try {
            const medicalCardData = { ...medicalCard, ...data }
            const response = await fetch(
                `http://127.0.0.1:8000/patients/${patientId}/medical-card`,
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
                <h3 className="text-left text-lg">Медкарта</h3>
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

                            <FormItem name="gender">
                                <label htmlFor="gender">Пол</label>
                                <Input {...form.register('gender')} />
                            </FormItem>

                            <FormItem name="identity_document">
                                <label htmlFor="identity_document">
                                    Серия и номер паспорта
                                </label>
                                <Input
                                    {...form.register('identity_document')}
                                />
                            </FormItem>

                            <FormItem name="insurance_series_number">
                                <label htmlFor="insurance_series_number">
                                    Полис ОМС
                                </label>
                                <Input
                                    {...form.register(
                                        'insurance_series_number'
                                    )}
                                />
                            </FormItem>

                            <FormItem name="benefit_code">
                                <label htmlFor="benefit_code">Код Льготы</label>
                                <Input {...form.register('benefit_code')} />
                            </FormItem>

                            <FormItem name="diseases">
                                <label htmlFor="diseases">
                                    Список заболеваний
                                </label>
                                <Input {...form.register('diseases')} />
                            </FormItem>
                        </form>
                    </FormProvider>

                    <MedicalCardTable />
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

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
) {
    return { name, calories, fat, carbs, protein }
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
]

const MedicalCardTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Диагноз</TableCell>
                        <TableCell>ФИО врача</TableCell>
                        <TableCell>Дата</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.carbs}</TableCell>
                            <TableCell>{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

type Props = {
    patientId: string
}
const MedicalCard = (props: Props) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <MedicalCardButton onClick={() => setOpen((o) => !o)} />
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                className="flex items-center justify-center bg-white"
            >
                <MedicalCardContent patientId={props.patientId} />
            </Modal>
        </>
    )
}

export default MedicalCard
