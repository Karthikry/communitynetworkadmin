import React, { useState, useEffect } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const columns = [
  { id: 'countryId', label: 'ID', minWidth: 50 },
  { id: 'countryName', label: 'Country Name', minWidth: 150 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'createdBy', label: 'Created By', minWidth: 150 },
  { id: 'updatedBy', label: 'Updated By', minWidth: 150 },
  { id: 'insertedDate', label: 'Inserted Date', minWidth: 180 },
  { id: 'updatedDate', label: 'Updated Date', minWidth: 180 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
];

const Country = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [selectedCountry, setSelectedCountry] = useState({
    countryId: 0,
    countryName: '',
    description: '',
  });

  useEffect(() => {
    fetchCountries();
  }, [page, rowsPerPage]);

  const fetchCountries = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/country/v1/getAllCountryByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
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
      const mappedData = data.content.map((item) => ({
        countryId: item.countryId,
        countryName: item.countryName,
        description: item.description,
        createdBy: item.createdBy.fullName || item.createdBy.userName,
        updatedBy: item.updatedBy.fullName || item.updatedBy.userName,
        insertedDate: new Date(item.insertedDate).toLocaleDateString(),
        updatedDate: new Date(item.updatedDate).toLocaleDateString(),
      }));

      setRows(mappedData);
      setTotalCount(data.totalElements);
    } catch (error) {
      setError(error.message);
      console.error('Failed to fetch countries:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (mode, country = {}) => {
    setDialogMode(mode);
    setSelectedCountry(country);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedCountry({ countryId: 0, countryName: '', description: '' });
  };

  const handleSave = async () => {
    if (dialogMode === 'add') {
      await handleAddCountry();
    } else {
      await handleEditCountry();
    }
  };

  const handleAddCountry = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      const accessToken = user?.accessToken || '';

      const newCountry = {
        countryName: selectedCountry.countryName,
        description: selectedCountry.description,
        createdBy: {
          fullName: user.fullName || user.userName,
          mobileNumber: user.mobileNumber,
          userId: user.userId,
          userName: user.userName,
        },
      };

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/country/v1/createCountry`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newCountry),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to add country:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchCountries();
      handleDialogClose();
    } catch (error) {
      setError(error.message);
      console.error('Failed to add country:', error);
    }
  };

  const handleEditCountry = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      const accessToken = user?.accessToken || '';

      const updatedCountry = {
        countryId: selectedCountry.countryId,
        countryName: selectedCountry.countryName,
        description: selectedCountry.description,
        updatedBy: {
          fullName: user.fullName || user.userName,
          mobileNumber: user.mobileNumber,
          userId: user.userId,
          userName: user.userName,
        },
      };

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/country/v1/updateCountry`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedCountry),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to edit country:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchCountries();
      handleDialogClose();
    } catch (error) {
      setError(error.message);
      console.error('Failed to edit country:', error);
    }
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm('Are you sure you want to delete this city?');
    if (!userConfirmed) return;
  
    try {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      const accessToken = user?.accessToken || '';
  
      console.log('Deleting city with ID:', id); // Added log
  
      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/country/v1/deleteCountryById/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete city:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }
  
      console.log('Delete successful:', await response.json()); // Log the delete success response
  
      fetchCountries(); // Re-fetch cities after deletion
    } catch (error) {
      setError(error.message);
      console.error('Failed to delete city:', error); // Added error log
    }
  };
  

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 5 }}>
      <Button
        variant="contained"
        sx={{ margin: '10px' }}
        onClick={() => handleOpenDialog('add')}
      >
        + ADD COUNTRY
      </Button>
      {error && <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>}
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.countryId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {column.id === 'actions' ? (
                          <>
                            <IconButton onClick={() => handleOpenDialog('edit', row)} color='primary'>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row.countryId)} color='secondary'>
                              <DeleteIcon />
                            </IconButton>
                          </>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogMode === 'add' ? 'Add Country' : 'Edit Country'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="countryName"
            label="Country Name"
            fullWidth
            value={selectedCountry.countryName}
            onChange={(e) => setSelectedCountry({ ...selectedCountry, countryName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            value={selectedCountry.description}
            onChange={(e) => setSelectedCountry({ ...selectedCountry, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {dialogMode === 'add' ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Country;
