import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Print from './Print'

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

const Consultations = (props: Props) => {
    return (
        <div>
            <h2 className="mb-8 text-left text-3xl font-bold">Консультации</h2>

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
                                {rows.map((row) => (
                                    <TableRow key={row.date + row.time}>
                                        <TableCell>{row.full_name}</TableCell>
                                        <TableCell>{row.time}</TableCell>
                                        <TableCell>{row.date}</TableCell>
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
                                {rows.map((row) => (
                                    <TableRow key={row.date + row.time}>
                                        <TableCell>{row.full_name}</TableCell>
                                        <TableCell>{row.time}</TableCell>
                                        <TableCell>{row.date}</TableCell>
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
