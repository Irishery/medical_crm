import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function DoctorPatients() {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await fetch("http://127.0.0.1:8000/doctor/patients");
            const data = await response.json();
            setPatients(data);
        };
        fetchPatients();
    }, []);

    return (
        <div>
            <h2>Мои пациенты</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ФИО</TableCell>
                        <TableCell>Контакты</TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((patient) => (
                        <TableRow key={patient.id}>
                            <TableCell>{patient.full_name}</TableCell>
                            <TableCell>{patient.contact_info}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => navigate(`/doctor/patients/${patient.id}/medical-card`)}
                                >
                                    Мед. карта
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DoctorPatients;
