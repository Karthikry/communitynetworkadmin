import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  IconButton,
  Box,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { fetchEvent, deleteEvent, getEventById, addEvent, updatedEvent } from 'views/API/EventApi';

const columns = [
  { id: 'eventId', label: 'ID' },
  { id: 'eventName', label: 'Name', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 100 },
  { id: 'file', label: 'File', minWidth: 100 },
  { id: 'createdBy', label: 'Created By', align: 'right' },
  { id: 'updatedBy', label: 'Updated By', align: 'right' },
  { id: 'insertedDate', label: 'Inserted Date', align: 'right' },
  { id: 'updatedDate', label: 'Updated Date', align: 'right' },
  { id: 'actions', label: 'Actions', align: 'right' }
];

const Event = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [events, setEvents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [userdata, setUserData] = useState({ eventName: '', description: '' });
  const [eventId, setEventId] = useState(null);
  const [errors, setErrors] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [fileError, setFileError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('user'));
  const accessToken = user?.accessToken || '';

  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const ImageUrl = `https://executivetracking.cloudjiffy.net/Mahaasabha/file/downloadFile/?filePath=`;


  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchEvent(headers);
      const fetchedData = res?.data?.content || [];
      const tableData = fetchedData.map((p) => ({
        eventId: p.eventId,
        eventName: p.eventName,
        description: p.description,
        // fileName: p.fileName,
        file: p.filePath ? <img src={ImageUrl + p.filePath} alt={p.fileName} style={{ width: 100, height: 50 }} /> : 'NO IMAGE FOUND',
        insertedDate: new Intl.DateTimeFormat('en-US').format(new Date(p.insertedDate)),
        updatedDate: new Intl.DateTimeFormat('en-US').format(new Date(p.updatedDate)),
        createdBy: p.createdBy?.userName || 'No User',
        updatedBy: p.updatedBy?.userName || 'No User'
      }));
      setEvents(tableData);
      if (page * rowsPerPage >= tableData.length) setPage(0); // Reset pagination if needed
    } catch (error) {
      console.error('Error fetching events:', error);
      setSnackbarMessage('Failed to fetch events.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }finally {
      setLoading(false);
    }
    if (loading) {
      return <CircularProgress />;
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  useEffect(() => {
    if (page * rowsPerPage >= events.length) setPage(0);
  }, [events, rowsPerPage]);
  

  const validateForm = () => {
    const newErrors = {};
    if (!userdata.eventName.trim()) newErrors.eventName = 'Enter the Event Name';
    if (!userdata.description.trim()) newErrors.description = 'Enter the Description';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };

  const handleDelete = async (id) => {
    try {
    confirm('Do you want to delete');

      await deleteEvent(id, headers);
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error('Error deleting event:', error);
      setSnackbarMessage('Failed to delete event.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleEdit = async (id) => {
    setEditMode(true);
    setOpen(true);
    try {
      const res = await getEventById(id, headers);
      const eventData = res;
  
      // Populate the form fields with the fetched event data
      setEventId(eventData.eventId);
      setUserData({
        eventName: eventData.eventName || '', // Pre-fill eventName
        description: eventData.description || '', // Pre-fill description
      });
  
      // Handle file data
      setPhotoName(eventData.fileName || '');
    } catch (error) {
      console.error('Error fetching event data:', error);
      setSnackbarMessage('Failed to fetch event details.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  

  const handleAddEvent = () => {
    setEditMode(false);
    setUserData({ eventName: '', description: '' });
    setOpen(true);
  };



  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFileError('Please select a file.');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setFileError('Only JPG, JPEG, and PNG files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size should not exceed 5MB.');
      return;
    }
    setSelectedFile(file);
    setPhotoName(file.name); // Ensure this is updated
    setFileError('');
  };
  
  


  const handleFileUpload = async () => {
    if (!selectedFile) {
      setFileError('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const res = await axios.post(
        'https://executivetracking.cloudjiffy.net/Mahaasabha/file/uploadFile',
        formData,
        {
          headers: {
            ...headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      if (res.data?.filePath) {
        console.log("hii");
        setPhotoName(res.data.filePath); // Use filePath if that's the response
        setSnackbarMessage('File uploaded successfully!');
        setSnackbarSeverity('success');
      } else {
        throw new Error('Invalid response from the server.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setSnackbarMessage('File upload failed.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };
  

  const postData = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    const payload = {
      ...userdata,
      eventId: editMode ? eventId : 0,
      fileName: photoName || '',
      createdBy: editMode ? undefined : { userId: user?.userId }, // Include for new events only
      updatedBy: editMode ? { userId: user?.userId } : undefined, // Include for updates only
      insertedDate: editMode ? undefined : new Date().toISOString(), // For new events only
      updatedDate: editMode ? new Date().toISOString() : undefined // For updates only
    };
  
    try {
      if (editMode) {
        // Update event
        await updatedEvent(eventId, payload, headers);
      } else {
        // Add new event
        await addEvent(payload, headers);
      }
  
      // Reset the form
      setUserData({ eventName: '', description: '' });
      setPhotoName('');
      inputRef.current.value = null; // Clear file input
      setRefreshTrigger((prev) => !prev); // Trigger refresh to update data
      setOpen(false); // Close the dialog
  
      // Success message
      setSnackbarMessage(editMode ? 'Event updated successfully!' : 'Event added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving event:', error);
  
      // Error message
      setSnackbarMessage('Failed to save event.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  

  return (
    <>
      <MainCard
        title={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Events</span>
            <Button
  variant="contained"
  color="primary"
  onClick={handleAddEvent}
  startIcon={<AddIcon />}
  aria-label="Add Event"
>
  Add
</Button>

          </Box>
        }
      >
        <Grid container spacing={gridSpacing}></Grid>
        {/* Event Table */}
        <Paper>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {events.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      No events found.
                    </TableCell>
                  </TableRow>
                ) : (
                  events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow hover key={row.eventId}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return <TableCell key={column.id} align={column.align}>{value}</TableCell>;
                      })}
                      <TableCell align="right">
                        <IconButton onClick={() => handleEdit(row.eventId)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(row.eventId)} color="error">
                          <DeleteForever />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={events.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Event Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editMode ? 'Edit Event' : 'Add Event'}</DialogTitle>
          <Box component="form" onSubmit={postData} p={2}>
            <TextField
              fullWidth
              label="Event Name"
              name="eventName"
              value={userdata.eventName}
              onChange={handleChange}
              error={!!errors.eventName}
              helperText={errors.eventName}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={userdata.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              margin="normal"
              multiline
              rows={4}
            />
<TextField
                margin="normal"
                fullWidth
                id="photoName"
                label="File Name"
                name="photoName"
                autoComplete="photoName"
                value={userdata.photoName}
                disabled
                helperText={errors.photoName}
                error={!!errors.photoName}
                InputProps={{
                  endAdornment: (
                    <Button variant="contained" color="primary" onClick={handleFileUpload}>
                      Upload
                    </Button>
                  )
                }}
              />
              <input type="file" onChange={onFileChange} ref={inputRef} style={{ marginTop: 20 }} />

            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {editMode ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} variant="filled">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </MainCard>
    </>
  );
};

export default Event;
