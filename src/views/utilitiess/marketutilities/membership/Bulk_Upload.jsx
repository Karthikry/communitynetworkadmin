import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, useTheme
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { format } from 'date-fns';

const columns = [
  { id: 'membershipId', label: 'ID', minWidth: 120 },
  { id: 'applicationNumber', label: 'Application Number', minWidth: 180 },
  { id: 'membershipCode', label: 'Membership Code', minWidth: 180 },
  { id: 'referanceMembershipCode', label: 'Reference Membership Code', minWidth: 200 },
  { id: 'isAlive', label: 'Is Alive', minWidth: 120 },
  { id: 'fullName', label: 'Full Name', minWidth: 200 },
  { id: 'dob', label: 'Date of Birth', minWidth: 160 },
  { id: 'age', label: 'Age', minWidth: 120 },
  { id: 'bloodGroup', label: 'Blood Group', minWidth: 150 },
  { id: 'mobileNumber', label: 'Mobile Number', minWidth: 180 },
  { id: 'alternativeMobileNumber', label: 'Alternative Mobile Number', minWidth: 200 },
  { id: 'gothra', label: 'Gothra', minWidth: 150 },
  { id: 'emailId', label: 'Email ID', minWidth: 200 },
  { id: 'gender', label: 'Gender', minWidth: 120 },
  { id: 'isMarried', label: 'Is Married', minWidth: 160 },
  { id: 'femaleFamilyRefMembershipCode', label: 'Female Family Ref Membership Code', minWidth: 200 },
  { id: 'occupation', label: 'Occupation', minWidth: 180 },
  { id: 'qualification', label: 'Qualification', minWidth: 180 },
  { id: 'address', label: 'Address', minWidth: 250 },
  { id: 'city', label: 'City', minWidth: 150 },
  { id: 'country', label: 'Country', minWidth: 150 },
  { id: 'edit', label: 'Edit', align: 'center', minWidth: 120 },
  { id: 'delete', label: 'Delete', align: 'center', minWidth: 120 }
];

const Bulk_Upload = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [familyData, setFamilyData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState({});
  const [uploadMessage, setUploadMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState(''); 

  const fetchFamilyData = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/getAllMembershipByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setFamilyData(data.content || []);
      setTotalElements(data.totalElements || 0);
    } catch (error) {
      setError(error.message);
      console.error('Failed to fetch family data:', error);
    }
  };

  const handleEditClick = (member) => {
    setCurrentMember(member);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (membershipId) => {
    try {
      window.confirm('Are you sure you want to delete');
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/deleteMembershipById/${membershipId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      await fetchFamilyData(); // Refresh data after deletion
      setDeleteMessage('Member successfully deleted.'); // Set success message after deletion
    } catch (error) {
      console.error('Failed to delete member:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/updateMembership`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(currentMember),
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      setEditDialogOpen(false);
      await fetchFamilyData(); // Refresh data after editing
    } catch (error) {
      console.error('Failed to update member:', error);
    }
  };

  const handleBulkUploadClick = () => {
    setOpen(true);
    setUploadMessage('');
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadFile = async () => {
    if (!selectedFile) return;

    const user = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = user?.accessToken || '';

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/membershipBulkUploadFile?userId=2`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      await fetchFamilyData(); 
      setOpen(false);
      setSelectedFile(null);
      setUploadMessage('Data has been successfully updated!');
      window.alert('Data has been successfully updated!');
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  useEffect(() => {
    fetchFamilyData();
  }, [page, rowsPerPage]);

  return (
    <MainCard title="Membership Details">
      <Grid container spacing={gridSpacing} justifyContent="flex-end">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleBulkUploadClick}>
            Bulk Upload
          </Button>
        </Grid>
      </Grid>
      
      {uploadMessage && <div style={{ color: 'green', marginTop: theme.spacing(2) }}>{uploadMessage}</div>}
      {deleteMessage && <div style={{ color: 'green', marginTop: theme.spacing(2) }}>{deleteMessage}</div>}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Upload file</DialogTitle>
        <DialogContent>
          <Button variant="contained" component="label">
            Upload
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {selectedFile ? <span>{selectedFile.name}</span> : <span>No file selected</span>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleUploadFile} color="primary">Upload</Button>
        </DialogActions>
      </Dialog>

      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: theme.spacing(2) }}>
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: 600, fontSize: 14 }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/* import { format } from 'date-fns'; // Optional: If you're using date-fns for more complex formatting */}

<TableBody>
  {familyData.length > 0 ? (
    familyData.map((row) => (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.membershipId}>
        {columns.map((column) => {
          const value = row[column.id];

          if (column.id === 'edit') {
            return (
              <TableCell key={column.id} align={column.align}>
                <Button variant="outlined" color="primary" onClick={() => handleEditClick(row)}>Edit</Button>
              </TableCell>
            );
          }
          if (column.id === 'delete') {
            return (
              <TableCell key={column.id} align={column.align}>
                <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(row.membershipId)}>Delete</Button>
              </TableCell>
            );
          }

          // Explicitly handle 'isAlive' field
          if (column.id === 'isAlive') {
            return (
              <TableCell key={column.id} align={column.align} style={{ padding: '16px 24px' }}>
                {value === true ? 'Yes' : value === false ? 'No' : 'Not Available'}
              </TableCell>
            );
          }

          // Handle Date Formatting for 'dob' field
          if (column.id === 'dob') {
            // Check if the value is a valid date and format
            const formattedDate = value ? format(new Date(value), 'MM/dd/yyyy') : 'Not Available';
            return (
              <TableCell key={column.id} align={column.align} style={{ padding: '16px 24px' }}>
                {formattedDate}
              </TableCell>
            );
          }

          // Display 'Not Available' for other undefined or null values
          const displayValue = value || 'Not Available';
          
          return (
            <TableCell key={column.id} align={column.align} style={{ padding: '16px 24px' }}>
              {typeof displayValue === 'boolean' ? (displayValue ? 'Yes' : 'No') : displayValue}
            </TableCell>
          );
        })}
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={columns.length} align="center">No data available</TableCell>
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
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
        />
      </Paper>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Member Details</DialogTitle>
        <DialogContent>
          {columns
            .filter((column) => column.id !== 'membershipId' && column.id !== 'applicationNumber' && column.id !== 'edit' && column.id !== 'delete')
            .map((column) => (
              <TextField
                key={column.id}
                label={column.label}
                fullWidth
                value={currentMember[column.id] || ''}
                onChange={(e) => setCurrentMember({ ...currentMember, [column.id]: e.target.value })}
                margin="normal"
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default Bulk_Upload;
