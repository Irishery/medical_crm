import React, { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Print from './Print'
import { useState } from 'react'
import useDoctor from '../useDoctor'
import moment from 'moment'

type Props = {}

const Consultation = () => {
    return <div></div>
}

const rows = [
    { full_name: 'full_name', date: 'date', time: 'time' },
    { full_name: 'full_name', date: 'date', time: 'time' },
    { full_name: 'full_name', date: 'date', time: 'time' },
    { full_name: 'full_name', date: 'date', time: 'time' },
]

const fetchAppointments = async (id: number) => {
    const currentMonth = moment().format('YYYY-MM')
    const response = await fetch(
        `http://127.0.0.1:8000/schedules/${id}/${currentMonth}`
    )
    return response.json()
}

const Consultations = (props: Props) => {
    const [appointments, setAppointments] = useState([])
    const doctor = useDoctor()
    useEffect(() => {
        if (!doctor) return

        fetchAppointments(doctor.id).then((data) => {
            setAppointments(data)
        })
    }, [doctor])

    const now = Date.now()
    const pastAppointments = appointments.filter(
        (appointment) => new Date(appointment.date_time) < now
    )
    const futureAppointments = appointments.filter(
        (appointment) => new Date(appointment.date_time) >= now
    )

    return (
        <div>
            <h2 className="mb-8 text-left text-3xl font-bold">
                Консультации в этом месяце
            </h2>

            <div className="grid grid-cols-2 gap-5">
                <div>
                    <h3 className="mb-5 text-left">Прошедшие консультации</h3>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ФИО</TableCell>
                                    <TableCell>Время</TableCell>
                                    <TableCell>Дата</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pastAppointments.map((row) => (
                                    <TableRow key={row.date_time}>
                                        <TableCell>
                                            {row.patient.full_name}
                                        </TableCell>
                                        <TableCell>
                                            {moment(row.date_time).format(
                                                'hh:mm'
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {moment(row.date_time).format(
                                                'DD.MM'
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div>
                    <h3 className="mb-5 text-left">Предстоящие консультации</h3>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ФИО</TableCell>
                                    <TableCell>Время</TableCell>
                                    <TableCell>Дата</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {futureAppointments.map((row) => (
                                    <TableRow key={row.date_time}>
                                        <TableCell>
                                            {row.patient.full_name}
                                        </TableCell>
                                        <TableCell>
                                            {moment(row.date_time).format(
                                                'hh:mm'
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {moment(row.date_time).format(
                                                'MM.DD'
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <h2 className="mb-8 mt-10 text-left text-3xl font-bold">Печать</h2>
            <Print />
            <div className="pb-10" />
        </div>
    )
}

export default Consultations
