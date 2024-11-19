import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { fetchBanner, addBanner, deleteBanner, getAdvertiseById, updatedAdvertise } from 'views/API/BannerApi';
import { BaseUrl } from 'BaseUrl';
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Box, Button, Dialog, DialogActions, DialogTitle, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { DeleteForever, Edit } from '@mui/icons-material';

const columns = [
  { id: 'advertisementId', label: 'ID' },
  { id: 'advertisementName', label: 'Name', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 100 },
  { id: 'file', label: 'File' },
  { id: 'createdBy', label: 'Created By', align: 'right' },
  { id: 'updatedBy', label: 'Updated By', align: 'right' },
  { id: 'insertedDate', label: 'Inserted Date', align: 'right' },
  { id: 'updatedDate', label: 'Updated Date', align: 'right' },
  { id: 'actions', label: 'Actions', align: 'right' }
];

const Banner = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [advertisement, setAdvertisement] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userdata, setUserData] = useState({
    advertisementName: '',
    description: '',
    fileName: ''
  });
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState('');
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [advertisementId, setAdvertisementId] = useState(null);
  const inputRef = useRef(null);

  // Retrieve the user token from session storage
  const user = JSON.parse(sessionStorage.getItem('user'));
  const accessToken = user?.accessToken || '';

  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  };

  const ImageUrl = `https://executivetracking.cloudjiffy.net/Mahaasabha/file/downloadFile/?filePath=`;

  // Fetch all banners
  const FetchData = async () => {
    try {
      const res = await fetchBanner(headers); // Include headers in the request
      const fetchedData = res.data.content;

      if (fetchedData) {
        const tableData = fetchedData.map((p) => ({
          advertisementId: p.advertisementId,
          advertisementName: p.advertisementName,
          description: p.description,
          file:
            p.filePath === null ? (
              'NO IMAGE FOUND'
            ) : (
              <img src={ImageUrl + p.filePath} alt={p.fileName} style={{ width: 100, height: 50 }} />
            ),
          insertedDate: moment(p.insertedDate).format('L'),
          updatedDate: moment(p.updatedDate).format('L'),
          createdBy: p.createdBy ? p.createdBy.userName : 'No User',
          updatedBy: p.updatedBy ? p.updatedBy.userName : 'No User'
        }));
        setAdvertisement(tableData);
      } else {
        setAdvertisement([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    FetchData();
  }, [refreshTrigger]);

  // Handle file upload
  const onFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setFileError('Please select a file');
      return;
    }
    const data = new FormData();
    data.append('file', selectedFile);

    try {
      const res = await axios.post(`https://executivetracking.cloudjiffy.net/Mahaasabha/file/uploadFile`, data, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      });
      setFileName(res.data.fileName);
      setUserData({ ...userdata, fileName: res.data.fileName });
      setFileError('');
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Add or update advertisement
  const postData = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    try {
      // File upload logic
      if (selectedFile && !editMode) {
        const data = new FormData();
        data.append('file', selectedFile);
  
        const uploadRes = await axios.post(
          'https://executivetracking.cloudjiffy.net/Mahaasabha/file/uploadFile',
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        const uploadedFileName = uploadRes.data.fileName;
        setFileName(uploadedFileName);
        userdata.fileName = uploadedFileName; // Set fileName in the form data
      }
  
      if (editMode) {
        const updatedData = {
          ...userdata,
          advertisementId,
          updatedBy: { userId: user.userId },
        };
        await updatedAdvertise(updatedData, headers);
      } else {
        await addBanner(userdata, headers);
      }
  
      setUserData({ advertisementName: '', description: '', fileName: '' });
      setSelectedFile(null); // Clear file selection
      inputRef.current.value = null; // Reset file input
      setRefreshTrigger((prev) => !prev); // Refresh the table
      setOpen(false);
    } catch (error) {
      console.error('Error saving advertisement:', error);
    }
  };
  


  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
      setFileError(''); // Clear any previous errors
    }
  };
  

  const validateForm = () => {
    const newErrors = {};
  
    if (!userdata.advertisementName || userdata.advertisementName.trim() === '') {
      newErrors.advertisementName = 'Enter the Advertisement name';
    }
  
    if (!userdata.description || userdata.description.trim() === '') {
      newErrors.description = 'Enter the description';
    }
  
    if (!fileName && !editMode) {
      newErrors.fileName = 'Please upload a file';
    }
  
    return newErrors;
  };
  

  const changeHandler = (e) => {
    setUserData({
      ...userdata,
      [e.target.name]: e.target.value,
      createdBy: { userId: user.userId }
    });

    setErrors({
      ...errors,
      [e.target.name]: null
    });
  };

  // Add new banner
  const handleAddBanner = () => {
    setEditMode(false);
    setUserData({
      advertisementName: '',
      description: '',
      fileName: ''
    });
    setOpen(true);
  };

  // Edit banner
  const handleEdit = async (advertisementId) => {
    setEditMode(true);
    setOpen(true);
    try {
      const res = await getAdvertiseById(advertisementId, headers); // Pass headers for access token
      const det = res.data;

      setAdvertisementId(det.advertisementId);
      setUserData({
        advertisementName: det.advertisementName,
        description: det.description,
        fileName: det.fileName
      });
    } catch (error) {
      console.error('Error fetching advertisement details:', error);
    }
  };

  // Delete banner
  const handleDelete = async (advertisementId) => {
    try {
      await deleteBanner(advertisementId, headers); // Pass headers for access token
      FetchData();
    } catch (error) {
      console.error('Error deleting advertisement:', error);
    }
  };

  return (
    <MainCard
      title={
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Banner</span>
          <Button
            variant="contained"
            color="primary"
            sx={{ display: 'flex', alignItems: 'center', fontSize: '15px' }}
            onClick={handleAddBanner}
          >
            Add
            <AddIcon sx={{ color: '#fff' }} />
          </Button>
        </Box>
      }
    >
      <Grid container spacing={gridSpacing}></Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: 600, fontSize: 15 }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {advertisement.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.advertisementId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(row.advertisementId)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.advertisementId)}>
                      <DeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={advertisement.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
        />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
  <DialogTitle sx={{ fontSize: '16px' }}>
    {editMode ? 'Edit Advertisement' : 'Add Advertisement'}
  </DialogTitle>
  <Box component="form" onSubmit={postData} noValidate sx={{ p: 3 }}>
    <Grid container spacing={2}>
      {/* Advertisement Name Field */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Advertisement Name"
          name="advertisementName"
          value={userdata.advertisementName}
          onChange={changeHandler}
          error={!!errors.advertisementName}
          helperText={errors.advertisementName}
        />
      </Grid>
      {/* Description Field */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={userdata.description}
          onChange={changeHandler}
          error={!!errors.description}
          helperText={errors.description}
          multiline
          rows={3}
        />
      </Grid>
      {/* File Name and Upload Field */}
      <Grid item xs={12}>
        <TextField
          margin="normal"
          fullWidth
          id="fileName"
          label="File Name"
          name="fileName"
          autoComplete="fileName"
          value={fileName}
          disabled
          helperText={fileError || 'Please upload a valid file'}
          error={!!fileError}
          InputProps={{
            endAdornment: (
              <Button variant="contained" color="primary" onClick={onFileUpload}>
                Upload
              </Button>
            )
          }}
        />
        <input type="file" onChange={onFileChange} ref={inputRef} style={{ marginTop: 20 }} />
      </Grid>
    </Grid>
    {/* Dialog Actions */}
    <DialogActions>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </DialogActions>
  </Box>
</Dialog>



      
    </MainCard>
  );
};

export default Banner;
