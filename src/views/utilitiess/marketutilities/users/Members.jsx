import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';

const columns = [
  { id: 'memberId', label: 'Member ID', minWidth: 80 },
  { id: 'fullName', label: 'Full Name', minWidth: 150 },
  { id: 'userName', label: 'User Name', minWidth: 150 },
  { id: 'gender', label: 'Gender', minWidth: 100 },
  { id: 'mobileNumber', label: 'Mobile Number', minWidth: 150 },
  { id: 'mailId', label: 'Mail ID', minWidth: 200 },
  { id: 'profilePicPath', label: 'Profile Pic', minWidth: 150 },
  { id: 'insertedDate', label: 'Inserted Date', minWidth: 150 },
  { id: 'updatedDate', label: 'Updated Date', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 120 },
  { id: 'edit', label: 'Edit', minWidth: 80 },
  { id: 'delete', label: 'Delete', minWidth: 80 },
];

const Members = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [open, setOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    fullName: '',
    userName: '',
    gender: '',
    mobileNumber: '',
    mailId: '',
    profilePicPath: '',
    status: 'Inactive',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMembers = async (page, rowsPerPage) => {
    setLoading(true); // Set loading to true before fetching
    try {

        // Retrieve the user token from session storage
        const user = JSON.parse(sessionStorage.getItem('user'));
        const accessToken = user?.accessToken || '';

        const response = await fetch(
          `https://executivetracking.cloudjiffy.net/Mahaasabha/member/v1/getAllMembersByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );



      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRows(data.content); // Adjust based on the actual structure of your API response
      setTotalElements(data.totalElements); // Set the total elements for pagination
    } catch (error) {
      setError('Failed to fetch members: ' + error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchMembers(page, rowsPerPage); // Fetch members when component mounts or when page or rowsPerPage changes
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update page state
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value); // Update rows per page
    setPage(0); // Reset to first page
  };

  const handleEdit = (id) => {
    console.log(`Edit clicked for ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete clicked for ID: ${id}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('YOUR_API_CREATE_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const createdMember = await response.json();
      setRows((prevRows) => [...prevRows, createdMember]); // Update the table with new member
      handleClose(); // Close the dialog
      setTotalElements((prevTotal) => prevTotal + 1); // Update total elements count
    } catch (error) {
      console.error('Error creating member:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show an error message if fetching fails
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 5 }}>
      <Button
        variant="contained"
        sx={{ margin: '10px' }}
        onClick={handleClickOpen}
      >
        + ADD MEMBER
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="fullName"
            label="Full Name"
            type="text"
            fullWidth
            variant="standard"
            value={newMember.fullName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="userName"
            label="User Name"
            type="text"
            fullWidth
            variant="standard"
            value={newMember.userName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="gender"
            label="Gender"
            type="text"
            fullWidth
            variant="standard"
            value={newMember.gender}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="mobileNumber"
            label="Mobile Number"
            type="text"
            fullWidth
            variant="standard"
            value={newMember.mobileNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="mailId"
            label="Mail ID"
            type="email"
            fullWidth
            variant="standard"
            value={newMember.mailId}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="profilePicPath"
            label="Profile Pic Path"
            type="text"
            fullWidth
            variant="standard"
            value={newMember.profilePicPath}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Member</Button>
        </DialogActions>
      </Dialog>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.memberId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'edit') {
                      return (
                        <TableCell key={column.id} align="left">
                          <IconButton onClick={() => handleEdit(row.memberId)} color="primary">
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      );
                    }
                    if (column.id === 'delete') {
                      return (
                        <TableCell key={column.id} align="left">
                          <IconButton onClick={() => handleDelete(row.memberId)} color="secondary">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      );
                    }
                    // Format date columns
                    if (column.id === 'insertedDate' || column.id === 'updatedDate') {
                      return (
                        <TableCell key={column.id} align="left">
                          {formatDate(value)}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align="left">
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Members;
