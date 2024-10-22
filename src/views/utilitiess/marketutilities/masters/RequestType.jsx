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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';

const columns = [
  { id: 'requestTypeId', label: 'Request Type ID', minWidth: 120 },
  { id: 'requestTypeName', label: 'Request Type Name', minWidth: 180 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'createdBy', label: 'Created By', minWidth: 150 },
  { id: 'updatedBy', label: 'Updated By', minWidth: 150 },
  { id: 'insertedDate', label: 'Inserted Date', minWidth: 180 },
  { id: 'updatedDate', label: 'Updated Date', minWidth: 180 },
  { id: 'edit', label: 'Edit', minWidth: 80 },
  { id: 'delete', label: 'Delete', minWidth: 80 },
];

const RequestType = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [selectedRequestType, setSelectedRequestType] = useState({
    requestTypeId: 0,
    requestTypeName: '',
    description: '',
  });

  useEffect(() => {
    fetchRequestTypes();
  }, [page, rowsPerPage]);

  const fetchRequestTypes = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/requesttype/v1/getAllRequestTypeByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
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
        requestTypeId: item.requestTypeId,
        requestTypeName: item.requestTypeName,
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
      console.error('Failed to fetch request types:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (mode, requestType = {}) => {
    setDialogMode(mode);
    setSelectedRequestType(requestType);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedRequestType({ requestTypeId: 0, requestTypeName: '', description: '' });
  };

  const handleSave = async () => {
    if (dialogMode === 'add') {
      await handleAddRequestType();
    } else {
      await handleEditRequestType();
    }
  };

  const handleAddRequestType = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const newRequestType = {
        requestTypeName: selectedRequestType.requestTypeName,
        description: selectedRequestType.description,
        createdBy: {
          fullName: user.fullName || user.userName,
          mobileNumber: user.mobileNumber,
          userId: user.userId,
          userName: user.userName,
        },
      };

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/requesttype/v1/createRequestType`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newRequestType),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to add request type:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchRequestTypes();
      handleDialogClose();
    } catch (error) {
      setError(error.message);
      console.error('Failed to add request type:', error);
    }
  };

  const handleEditRequestType = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const updatedRequestType = {
        requestTypeId: selectedRequestType.requestTypeId,
        requestTypeName: selectedRequestType.requestTypeName,
        description: selectedRequestType.description,
        updatedBy: {
          fullName: user.fullName || user.userName,
          mobileNumber: user.mobileNumber,
          userId: user.userId,
          userName: user.userName,
        },
      };

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/requesttype/v1/updateRequestType`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedRequestType),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to edit request type:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchRequestTypes();
      handleDialogClose();
    } catch (error) {
      setError(error.message);
      console.error('Failed to edit request type:', error);
    }
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm('Are you sure you want to delete this request type?');
    if (!userConfirmed) return;

    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/requesttype/v1/deleteRequestTypeById/${id}`,
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
        console.error('Failed to delete request type:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchRequestTypes();
    } catch (error) {
      setError(error.message);
      console.error('Failed to delete request type:', error);
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 5 }}>
      <Button
        variant="contained"
        sx={{ margin: '10px' }}
        onClick={() => handleOpenDialog('add')}
      >
        + ADD REQUEST TYPE
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.requestTypeId}>
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
                          <IconButton onClick={() => handleDelete(row.requestTypeId)} color="secondary">
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

      {/* Dialog for Adding/Editing Request Type */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogMode === 'add' ? 'Add Request Type' : 'Edit Request Type'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Request Type Name"
            type="text"
            fullWidth
            variant="outlined"
            value={selectedRequestType.requestTypeName}
            onChange={(e) => setSelectedRequestType({ ...selectedRequestType, requestTypeName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={selectedRequestType.description}
            onChange={(e) => setSelectedRequestType({ ...selectedRequestType, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {dialogMode === 'add' ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default RequestType;
