import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Button, TextField } from '@mui/material';
import "./css/AdminDoctors.css";

const DoctorDatabase = () => {
  const [doctors, setDoctors] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, [page, rowsPerPage, searchTerm]);

  const fetchDoctors = async () => {
    try {
      const skip = page * rowsPerPage;
      const response = await fetch(
        `http://127.0.0.1:8000/doctors?skip=${skip}&limit=${rowsPerPage}&search=${searchTerm}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        console.log(data);
        console.log(searchTerm);
        setDoctors(data);
        setTotalDoctors(data.length);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page on new search
  };

  return (
    <div className="container">
      <h1 className="title">База врачей</h1>
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
            <TableCell>Doctor</TableCell>
            <TableCell>Specialty</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{doctor.full_name}</TableCell>
              <TableCell>{doctor.speciality}</TableCell>
              <TableCell>
                <Button variant="text" className="edit-button">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={totalDoctors}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      />
    </div>
  );
};

export default DoctorDatabase;
