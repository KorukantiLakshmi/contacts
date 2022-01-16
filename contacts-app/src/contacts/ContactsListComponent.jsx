import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const ContactsListComponent = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleDelete = props?.handleDelete;
    const handleEditOpen = props?.handleEditOpen;
    const contactType = props?.contactType;
    const handleChange = props?.handleChange;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        setPage(0)
    }, [contactType])

    let personalList = props?.detailsList;
    let tableHeading = ["First Name", "Last Name", "Type of Contact", "Email", "Gender", "Contact Number", "Edit", "Delete"]
    return <div >
        <Tabs value={contactType} onChange={handleChange} fullWidth={true} centered className='tabs'>
            <Tab label="All" value="all" />
            <Tab label="Personal" value="personal" />
            <Tab label="Business" value="business" />
        </Tabs>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableHeading?.map((column, index) => (
                            <TableCell align="left" key={column + "-" + index}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {personalList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                        <TableRow key={row.name + "-" + index}>
                            <TableCell align="left">{row.first_name}</TableCell>
                            <TableCell align="left">{row.last_name}</TableCell>
                            <TableCell align="left">{row.type}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.gender}</TableCell>
                            <TableCell align="left">{row.contact_number}</TableCell>
                            <TableCell align="left"><EditIcon onClick={(event) => handleEditOpen(row?.id)} /></TableCell>
                            <TableCell align="left"><DeleteIcon onClick={(event) => handleDelete(row?.id)} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 50]}
            component="div"
            count={personalList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>;
}

export default ContactsListComponent;