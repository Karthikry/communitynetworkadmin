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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const columns = [
  { id: 'gotraId', label: 'ID', minWidth: 50 },
  { id: 'gotraName', label: 'Gotra Name', minWidth: 180 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'createdBy', label: 'Created By', minWidth: 150 },
  { id: 'updatedBy', label: 'Updated By', minWidth: 150 },
  { id: 'insertedDate', label: 'Inserted Date', minWidth: 180 },
  { id: 'updatedDate', label: 'Updated Date', minWidth: 180 },
  { id: 'edit', label: 'Edit', minWidth: 80 },
  { id: 'delete', label: 'Delete', minWidth: 80 },
];

const Gotra = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [selectedGotra, setSelectedGotra] = useState({
    gotraId: 0,
    gotraName: '',
    description: '',
  });

  useEffect(() => {
    fetchGotras();
  }, [page, rowsPerPage]);

  const fetchGotras = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/gotra/v1/getAllGotraByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
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
        gotraId: item.gotraId,
        gotraName: item.gotraName,
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
      console.error('Failed to fetch gotras:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (mode, gotra = {}) => {
    setDialogMode(mode);
    setSelectedGotra(gotra);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedGotra({ gotraId: 0, gotraName: '', description: '' });
  };

  const handleSave = async () => {
    if (dialogMode === 'add') {
      await handleAddGotra();
    } else {
      await handleEditGotra();
    }
  };

  const handleAddGotra = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const newGotra = {
        gotraName: selectedGotra.gotraName,
        description: selectedGotra.description,
        createdBy: {
          fullName: user.fullName || user.userName,
          mobileNumber: user.mobileNumber,
          userId: user.userId,
          userName: user.userName,
        },
      };

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/gotra/v1/createGotra`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newGotra),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to add gotra:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchGotras();
      handleDialogClose();
    } catch (error) {
      setError(error.message);
      console.error('Failed to add gotra:', error);
    }
  };

  const handleEditGotra = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const updatedGotra = {
        gotraId: selectedGotra.gotraId,
        gotraName: selectedGotra.gotraName,
        description: selectedGotra.description,
        updatedBy: {
          fullName: user.fullName || user.userName,
          mobileNumber: user.mobileNumber,
          userId: user.userId,
          userName: user.userName,
        },
      };

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/gotra/v1/updateGotra`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedGotra),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to edit gotra:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchGotras();
      handleDialogClose();
    } catch (error) {
      setError(error.message);
      console.error('Failed to edit gotra:', error);
    }
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm('Are you sure you want to delete this gotra?');
    if (!userConfirmed) return;

    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/gotra/v1/deleteGotraById/${id}`,
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
        console.error('Failed to delete gotra:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchGotras();
    } catch (error) {
      setError(error.message);
      console.error('Failed to delete gotra:', error);
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 5 }}>
      <Button
        variant="contained"
        sx={{ margin: '10px' }}
        onClick={() => handleOpenDialog('add')}
      >
        + ADD GOTRA
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
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.gotraId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'edit') {
                      return (
                        <TableCell key={column.id} align="left">
                          <IconButton onClick={() => handleOpenDialog('edit', row)} color="primary">
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      );
                    }
                    if (column.id === 'delete') {
                      return (
                        <TableCell key={column.id} align="left">
                          <IconButton onClick={() => handleDelete(row.gotraId)} color="secondary">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {value || 'Not Available'}
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
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogMode === 'add' ? 'Add Gotra' : 'Edit Gotra'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Gotra Name"
            fullWidth
            variant="outlined"
            value={selectedGotra.gotraName}
            onChange={(e) => setSelectedGotra({ ...selectedGotra, gotraName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={selectedGotra.description}
            onChange={(e) => setSelectedGotra({ ...selectedGotra, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSave}>{dialogMode === 'add' ? 'Add' : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Gotra;
