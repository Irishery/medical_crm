import React, { useState, useEffect } from "react";
import "./css/AdminDoctors.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";

function AdminDoctors() {
  const [doctors, setDoctors] = useState([]); // Ensure it's an empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set initial rows per page
  const [totalDoctors, setTotalDoctors] = useState(0); // Store total number of doctors for pagination

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

// Fetch doctors data from the backend API with pagination and search
useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const skip = page * rowsPerPage;
      const limit = 10;
      const response = await fetch(
        `http://127.0.0.1:8000/doctors?skip=${skip}&limit=${limit}&search=${searchTerm}`
      );
      const data = await response.json();

      // Check if the data is an array and set the doctors state
      if (Array.isArray(data)) {
        setDoctors(data); // Directly set the data as doctors
        setTotalDoctors(data.length); // Set total doctors count from the length of the data array
      } else {
        console.error("Invalid data format", data);
      }
    } catch (error) {
      console.error("Error fetching doctors data:", error);
    }
  };

  fetchDoctors();
}, [searchTerm, page, rowsPerPage]); // Refetch data when searchTerm, page, or rowsPerPage changes

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to first page
  };

  return (
    <>
      <h1 className="page-title">База докторов</h1>
      <TextField
        id="search-doctor"
        label="Искать по ФИО / специализации"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ФИО</StyledTableCell>
              <StyledTableCell align="left">Специальность</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {doctors.length > 0 ? (
    doctors.map((doctor, index) => (
      <StyledTableRow key={doctor.id}>
        <StyledTableCell component="th" scope="row">
          {doctor.full_name}
        </StyledTableCell>
        <StyledTableCell align="left">{doctor.speciality}</StyledTableCell>
      </StyledTableRow>
    ))
  ) : (
    <StyledTableRow>
      <StyledTableCell colSpan={2} align="center">
        Нет докторов для отображения
      </StyledTableCell>
    </StyledTableRow>
  )}
</TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]} // Pagination options for rows per page
        component="div"
        count={totalDoctors} // Total number of rows in the data
        rowsPerPage={rowsPerPage} // Current rows per page
        page={page} // Current page index
        onPageChange={handleChangePage} // Handle page change
        onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
      />
    </>
  );
}

export default AdminDoctors;



// http://127.0.0.1:8000/doctors?skip=0&limit=10&search=${searchTerm}
