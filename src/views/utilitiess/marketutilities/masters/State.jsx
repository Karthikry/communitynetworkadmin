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
  { id: 'stateId', label: 'ID', minWidth: 50 },
  { id: 'stateName', label: 'State Name', minWidth: 150 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'createdBy', label: 'Created By', minWidth: 150 },
  { id: 'updatedBy', label: 'Updated By', minWidth: 150 },
  { id: 'insertedDate', label: 'Inserted Date', minWidth: 180 },
  { id: 'updatedDate', label: 'Updated Date', minWidth: 180 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
];

const State = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [selectedState, setSelectedState] = useState({
    stateId: 0,
    stateName: '',
    description: '',
  });

  useEffect(() => {
    fetchStates();
  }, [page, rowsPerPage]);

  const fetchStates = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/state/v1/getAllStateByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
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
        stateId: item.stateId,
        stateName: item.stateName,
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
      console.error('Failed to fetch states:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (mode, state = {}) => {
    setDialogMode(mode);
    setSelectedState(state);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedState({ stateId: 0, stateName: '', description: '' });
  };

  const handleSave = async () => {
    if (dialogMode === 'add') {
      await handleAddState();
    } else {
      await handleEditState();
    }
  };

  const handleAddState = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      const accessToken = user?.accessToken || '';

      const newState = {
        stateName: selectedState.stateName,
        description: selectedState.description,
        createdBy: {
          fullName: user.fullName || user.userName,
          mobileNumber: user.mobileNumber,
          userId: user.userId,
          userName: user.userName,
        },
      };

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/state/v1/createState`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newState),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to add state:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchStates();
      handleDialogClose();
    } catch (error) {
      setError(error.message);
      console.error('Failed to add state:', error);
    }
  };

  const handleEditState = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      const accessToken = user?.accessToken || '';

      const updatedState = {
        stateId: selectedState.stateId,
        stateName: selectedState.stateName,
        description: selectedState.description,
        updatedBy: {
          fullName: user.fullName || user.userName,
          mobileNumber: user.mobileNumber,
          userId: user.userId,
          userName: user.userName,
        },
      };

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/state/v1/updateState`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedState),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to edit state:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchStates();
      handleDialogClose();
    } catch (error) {
      setError(error.message);
      console.error('Failed to edit state:', error);
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
        `https://executivetracking.cloudjiffy.net/Mahaasabha/state/v1/deleteStateById/${id}`,
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
  
      fetchStates(); // Re-fetch cities after deletion
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
        + ADD STATE
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.stateId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {column.id === 'actions' ? (
                          <>
                            <IconButton onClick={() => handleOpenDialog('edit', row)} color='primary'>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row.stateId)} color='secondary'>
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
        rowsPerPageOptions={[10, 25, 50,100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogMode === 'add' ? 'Add State' : 'Edit State'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="stateName"
            label="State Name"
            fullWidth
            value={selectedState.stateName}
            onChange={(e) => setSelectedState({ ...selectedState, stateName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            value={selectedState.description}
            onChange={(e) => setSelectedState({ ...selectedState, description: e.target.value })}
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

export default State;
