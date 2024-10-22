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
  { id: 'qualificationId', label: 'ID', minWidth: 50 },
  { id: 'qualificationName', label: 'Qualification Name', minWidth: 150 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'createdBy', label: 'Created By', minWidth: 150 },
  { id: 'updatedBy', label: 'Updated By', minWidth: 150 },
  { id: 'insertedDate', label: 'Inserted Date', minWidth: 180 },
  { id: 'updatedDate', label: 'Updated Date', minWidth: 180 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
];

const Qualification = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [selectedQualification, setSelectedQualification] = useState({
    qualificationId: 0,
    qualificationName: '',
    description: '',
    createdBy: {
      fullName: '',
      mobileNumber: '',
      userId: 0,
      userName: '',
    },
    updatedBy: {
      fullName: '',
      mobileNumber: '',
      userId: 0,
      userName: '',
    },
    insertedDate: '',
    updatedDate: '',
  });

  useEffect(() => {
    fetchQualifications();
  }, [page, rowsPerPage]);

  const fetchQualifications = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/qualification/v1/getAllQualificationByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
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
        qualificationId: item.qualificationId,
        qualificationName: item.qualificationName,
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
      console.error('Failed to fetch qualifications:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (mode, qualification = {}) => {
    setDialogMode(mode);
    setSelectedQualification(qualification);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedQualification({
      qualificationId: 0,
      qualificationName: '',
      description: '',
      createdBy: {
        fullName: '',
        mobileNumber: '',
        userId: 0,
        userName: '',
      },
      updatedBy: {
        fullName: '',
        mobileNumber: '',
        userId: 0,
        userName: '',
      },
      insertedDate: '',
      updatedDate: '',
    });
  };

  const handleSave = () => {
    if (dialogMode === 'add') {
      handleAddQualification();
    } else {
      handleEditQualification();
    }
  };

  const handleAddQualification = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      const accessToken = user?.accessToken || '';

      const newQualification = {
        qualificationName: selectedQualification.qualificationName,
        description: selectedQualification.description,
        createdBy: {
          fullName: user.fullName || user.userName,
          mobileNumber: user.mobileNumber,
          userId: user.userId,
          userName: user.userName,
        },
        updatedBy: {
          fullName: user.fullName || user.userName,
          mobileNumber: user.mobileNumber,
          userId: user.userId,
          userName: user.userName,
        },
        insertedDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      };

      console.log("Adding Qualification Payload:", newQualification);

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/qualification/v1/createQualification`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newQualification),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to add qualification:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchQualifications();
      handleDialogClose();
    } catch (error) {
      setError(error.message);
      console.error('Failed to add qualification:', error);
    }
  };

  const handleEditQualification = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      const accessToken = user?.accessToken || '';

      const updatedQualification = {
        qualificationId: selectedQualification.qualificationId,
        qualificationName: selectedQualification.qualificationName,
        description: selectedQualification.description,
        // createdBy: {
        //   fullName: selectedQualification.createdBy.fullName,
        //   mobileNumber: selectedQualification.createdBy.mobileNumber,
        //   userId: selectedQualification.createdBy.userId,
        //   userName: selectedQualification.createdBy.userName,
        // },
        // updatedBy: {
        //   fullName: user.fullName || user.userName,
        //   mobileNumber: user.mobileNumber,
        //   userId: user.userId,
        //   userName: user.userName,
        // },
        // insertedDate: selectedQualification.insertedDate,
        // updatedDate: new Date().toISOString(),
      };

      console.log("Editing Qualification Payload:", updatedQualification);

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/qualification/v1/updateQualification`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedQualification),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to edit qualification:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchQualifications();
      handleDialogClose();
    } catch (error) {
      setError(error.message);
      console.error('Failed to edit qualification:', error);
    }
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm('Are you sure you want to delete this qualification?');
    if (!userConfirmed) return;

    try {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      const accessToken = user?.accessToken || '';

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/qualification/v1/deleteQualificationById/${id}`,
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
        console.error('Failed to delete qualification:', errorData);
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchQualifications();
    } catch (error) {
      setError(error.message);
      console.error('Failed to delete qualification:', error);
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 5 }}>
      <Button
        variant="contained"
        sx={{ margin: '10px' }}
        onClick={() => handleOpenDialog('add')}
      >
        + ADD QUALIFICATION
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.qualificationId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {column.id === 'actions' ? (
                          <>
                            <IconButton onClick={() => handleOpenDialog('edit', row)} color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row.qualificationId)} color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </>
                        ) : (
                          value || 'Not Available'
                        )}
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
        <DialogTitle>{dialogMode === 'add' ? 'Add Qualification' : 'Edit Qualification'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Qualification Name"
            fullWidth
            variant="outlined"
            value={selectedQualification.qualificationName}
            onChange={(e) => setSelectedQualification({ ...selectedQualification, qualificationName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={selectedQualification.description}
            onChange={(e) => setSelectedQualification({ ...selectedQualification, description: e.target.value })}
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

export default Qualification;
