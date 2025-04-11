import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    Button,
    TextField,
} from '@mui/material'
import MedicalCard from './MedicalCard'
import './css/AdminPatients.css'

function AdminPatients() {
    const [patients, setPatients] = useState([])
    const [totalPatients, setTotalPatients] = useState(0)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchPatients()
    }, [page, rowsPerPage, searchTerm])

    const fetchPatients = async () => {
        try {
            const skip = page * rowsPerPage
            const response = await fetch(
                `http://127.0.0.1:8000/patients?skip=${skip}&limit=${rowsPerPage}&search=${searchTerm}`
            )
            const data = await response.json()
            if (Array.isArray(data)) {
                console.log(data)
                console.log(searchTerm)
                setPatients(data)
                setTotalPatients(data.length)
            }
        } catch (error) {
            console.error('Error fetching patients:', error)
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        setPage(0) // Reset page on new search
    }

    return (
        <div className="container">
            <h1 className="title">База пациентов</h1>
            <TextField
                variant="outlined"
                placeholder="Искать по ФИО/контактам/специализации"
                fullWidth
                className="search-bar"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Patient</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Medical Record</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((patient) => (
                        <TableRow key={patient.id}>
                            <TableCell>{patient.full_name}</TableCell>
                            <TableCell>{patient.contact_info}</TableCell>
                            <TableCell>
                                <MedicalCard patientId={patient.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={Infinity}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) =>
                    setRowsPerPage(parseInt(event.target.value, 10))
                }
            />
        </div>
    )
}

export default AdminPatients
