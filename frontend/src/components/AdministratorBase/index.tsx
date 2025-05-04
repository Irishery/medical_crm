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
import MedicalCard from '../../components/MedicalCard'
import EditAdmin from '../EditAdmin'

function AdministratorsDatabase() {
    const [admins, setAdmins] = useState([])
    const [totalAdmins, setTotalAdmins] = useState(0)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    console.log(admins, totalAdmins)
    useEffect(() => {
        fetchPatients()
    }, [page, rowsPerPage, searchTerm])

    const fetchPatients = async () => {
        try {
            const skip = page * rowsPerPage
            const response = await fetch(
                `http://127.0.0.1:8000/admins?skip=${skip}&limit=${rowsPerPage}&search=${searchTerm}`
            )
            const data = await response.json()
            setAdmins(data.admins)
            setTotalAdmins(data.total)
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
            <h1 className="title">База Администраторов</h1>
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
                        <TableCell>Администратор</TableCell>
                        <TableCell>Контакт</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {admins?.map((admin) => (
                        <TableRow key={admin.id}>
                            <TableCell>{admin.full_name}</TableCell>
                            <TableCell>{admin.contact_info}</TableCell>
                            <TableCell>
                                <EditAdmin id={admin.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={totalAdmins}
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

export default AdministratorsDatabase
