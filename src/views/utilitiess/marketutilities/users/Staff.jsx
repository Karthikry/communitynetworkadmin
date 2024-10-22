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
import { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const columns = [
  { id: 'userId', label: 'User ID', minWidth: 120 },
  { id: 'fullName', label: 'Full Name', minWidth: 180 },
  { id: 'userName', label: 'User Name', minWidth: 200 },
  { id: 'mobileNumber', label: 'Mobile Number', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'roleName', label: 'Role Name', minWidth: 150 },
  { id: 'createdBy', label: 'Created By', minWidth: 150 },
  { id: 'updatedBy', label: 'Updated By', minWidth: 150 },
  { id: 'insertedDate', label: 'Inserted Date', minWidth: 180 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'edit', label: 'Edit', minWidth: 80 },
  { id: 'delete', label: 'Delete', minWidth: 80 },
];

const Staff = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      try {

          // Retrieve the user token from session storage
          const user = JSON.parse(sessionStorage.getItem('user'));
          const accessToken = user?.accessToken || '';
  
          const response = await fetch(
            `https://executivetracking.cloudjiffy.net/Mahaasabha/userprofile/v1/getAllUserProfileByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
  



        const data = await response.json();
        const formattedData = data.content.map((item) => ({
          userId: item.userId,
          fullName: item.fullName || 'N/A',
          userName: item.userName || 'N/A',
          mobileNumber: item.mobileNumber || 'N/A',
          email: item.email || 'N/A',
          roleName: item.roleDto?.roleName || 'N/A',
          createdBy: item.createdBy.userName || 'N/A',
          updatedBy: item.updatedBy.userName || 'N/A',
          insertedDate: formatDate(item.insertedDate),
          status: item.active ? 'Active' : 'Inactive',
        }));
        setRows(formattedData);
        setTotalElements(data.totalElements);
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (id) => {
    console.log(`Edit clicked for ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete clicked for ID: ${id}`);
  };

  const handleStatusToggle = (id) => {
    console.log(`Status toggled for ID: ${id}`);
    // Implement status toggle logic here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 5 }}>
      <Button
        variant="contained"
        sx={{ margin: '10px' }}
        onClick={() => console.log('Add staff clicked')}
      >
        + ADD STAFF
      </Button>
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
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.userId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'edit') {
                      return (
                        <TableCell key={column.id} align="left">
                          <IconButton onClick={() => handleEdit(row.userId)} color="primary">
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      );
                    }
                    if (column.id === 'delete') {
                      return (
                        <TableCell key={column.id} align="left">
                          <IconButton onClick={() => handleDelete(row.userId)} color="secondary">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      );
                    }
                    if (column.id === 'status') {
                      return (
                        <TableCell key={column.id} align="left">
                          <ToggleButtonGroup
                            value={row.status}
                            exclusive
                            onChange={() => handleStatusToggle(row.userId)}
                          >
                            <ToggleButton value="Inactive" sx={{ color: 'red' }}>
                              Inactive
                            </ToggleButton>
                            <ToggleButton value="Active" sx={{ color: 'green' }}>
                              Active
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {value || 'N/A'}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ padding: 20 }}>
                  No rows
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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

export default Staff;
