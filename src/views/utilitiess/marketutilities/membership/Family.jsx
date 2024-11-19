// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import { useTheme } from '@mui/material/styles';
// import MainCard from 'ui-component/cards/MainCard';
// import { gridSpacing } from 'store/constant';
// import { useState, useEffect } from 'react';
// import { Modal, TextField, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// const columns = [
//   { id: 'membershipId', label: 'ID', minWidth: 120 },
//   { id: 'applicationNumber', label: 'Application Number', minWidth: 180 },
//   { id: 'membershipCode', label: 'Membership Code', minWidth: 180 },
//   { id: 'referanceMembershipCode', label: 'Reference Membership Code', minWidth: 200 },
//   { id: 'isAlive', label: 'Is Alive', minWidth: 120 },
//   { id: 'fullName', label: 'Full Name', minWidth: 200 },
//   { id: 'dob', label: 'Date of Birth', minWidth: 160 },
//   { id: 'age', label: 'Age', minWidth: 120 },
//   { id: 'bloodGroup', label: 'Blood Group', minWidth: 150 },
//   { id: 'mobileNumber', label: 'Mobile Number', minWidth: 180 },
//   { id: 'alternativeMobileNumber', label: 'Alternative Mobile Number', minWidth: 200 },
//   { id: 'gothra', label: 'Gothra', minWidth: 150 },
//   { id: 'emailId', label: 'Email ID', minWidth: 200 },
//   { id: 'gender', label: 'Gender', minWidth: 120 },
//   { id: 'isMarried', label: 'Is Married', minWidth: 160 },
//   { id: 'femaleFamilyRefMembershipCode', label: 'Female Family Ref Membership Code', minWidth: 200 },
//   { id: 'occupation', label: 'Occupation', minWidth: 180 },
//   { id: 'qualification', label: 'Qualification', minWidth: 180 },
//   { id: 'address', label: 'Address', minWidth: 250 },
//   { id: 'city', label: 'City', minWidth: 150 },
//   { id: 'country', label: 'Country', minWidth: 150 },
//   { id: 'edit', label: 'Edit', align: 'center', minWidth: 120 },
//   { id: 'delete', label: 'Delete', align: 'center', minWidth: 120 }
// ];

// const FamilyTable = () => {
//   const theme = useTheme();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [familyData, setFamilyData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [error, setError] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [editingFamily, setEditingFamily] = useState(null);
//   const [newFamily, setNewFamily] = useState({
//     fullName: '',
//     dob: '',
//     bloodGroup: '',
//     mobileNumber: '',
//     emailId: ''
//   });

//   useEffect(() => {
//     const fetchFamilyData = async () => {
//       try {
//         const user = JSON.parse(sessionStorage.getItem('user'));
//         const accessToken = user?.accessToken || '';
//         const response = await fetch(
//           `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/getAllApplicationNoMembershipByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${accessToken}`,
//             },
//           }
//         );
    
//         if (!response.ok) {
//           const errorDetails = await response.text();
//           throw new Error(`Error: ${response.status} - ${errorDetails}`);
//         }
    
//         const data = await response.json();
//         setFamilyData(data.content || []);
//         setTotalCount(data.totalElements || 0);
//       } catch (error) {
//         setError(`Failed to fetch family data: ${error.message}`);
//         console.error('Error fetching family data:', error);
//       }
//     };
    

//     fetchFamilyData();
//   }, [page, rowsPerPage]);

//   const handleAddFamily = () => {
//     setNewFamily({
//       fullName: '',
//       dob: '',
//       bloodGroup: '',
//       mobileNumber: '',
//       emailId: ''
//     });
//     setOpen(true);
//   };

//   const handleSaveFamily = async () => {
//     try {
//       const user = JSON.parse(sessionStorage.getItem('user'));
//       const accessToken = user?.accessToken || '';
//       const response = await fetch(
//         'https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/addFamily',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`,
//           },
//           body: JSON.stringify(newFamily),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }

//       setOpen(false);
//       fetchFamilyData(); // Refresh the data after adding
//     } catch (error) {
//       console.error('Failed to add family data:', error);
//     }
//   };

//   const handleEditFamily = (family) => {
//     setEditingFamily(family);
//     setOpen(true);
//   };

//   const handleUpdateFamily = async () => {
//     try {
//       const user = JSON.parse(sessionStorage.getItem('user'));
//       const accessToken = user?.accessToken || '';
//       const response = await fetch(
//         `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/updateFamily/${editingFamily.membershipId}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`,
//           },
//           body: JSON.stringify(editingFamily),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }

//       setOpen(false);
//       fetchFamilyData(); // Refresh the data after updating
//     } catch (error) {
//       console.error('Failed to update family data:', error);
//     }
//   };

//   const handleDeleteFamily = async (membershipId) => {
//     try {
//       const user = JSON.parse(sessionStorage.getItem('user'));
//       const accessToken = user?.accessToken || '';
//       const response = await fetch(
//         `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/deleteFamily/${membershipId}`,
//         {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }

//       fetchFamilyData(); // Refresh the data after deleting
//     } catch (error) {
//       console.error('Failed to delete family data:', error);
//     }
//   };

//   const getDisplayValue = (value) => {
//     if (value === null || value === undefined || value === '') {
//       return 'Not Available';
//     } else if (typeof value === 'boolean') {
//       return value ? 'Yes' : 'No';
//     } else {
//       return value;
//     }
//   };

//   return (
//     <MainCard title="Family Details">
//       <Grid container spacing={gridSpacing} justifyContent="flex-end">
//         <Grid item>
//           <Button variant="contained" color="primary" onClick={handleAddFamily}>
//             Add Family
//           </Button>
//         </Grid>
//       </Grid>
//       <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: theme.spacing(2) }}>
//         {error && <div style={{ color: 'red' }}>Error: {error}</div>}
//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: 600, fontSize: 15, padding: '16px 24px' }}>
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {familyData.map((row) => (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={row.membershipId}>
//                   {columns.map((column) => {
//                     const value = row[column.id];

//                     if (column.id === 'edit') {
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           <Button variant="outlined" color="primary" onClick={() => handleEditFamily(row)}>
//                             Edit
//                           </Button>
//                         </TableCell>
//                       );
//                     }
//                     if (column.id === 'delete') {
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           <Button variant="outlined" color="secondary" onClick={() => handleDeleteFamily(row.membershipId)}>
//                             Delete
//                           </Button>
//                         </TableCell>
//                       );
//                     }

//                     return (
//                       <TableCell key={column.id} align={column.align} style={{ padding: '16px 24px' }}>
//                         {getDisplayValue(value)}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={totalCount}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(+e.target.value);
//             setPage(0);
//           }}
//         />
//       </Paper>

//       {/* Modal for Add/Edit Family */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Paper sx={{ padding: 3, margin: 'auto', maxWidth: 600, marginTop: 10 }}>
//           <DialogTitle>{editingFamily ? 'Edit Family' : 'Add Family'}</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Full Name"
//               fullWidth
//               variant="outlined"
//               margin="normal"
//               value={editingFamily ? editingFamily.fullName : newFamily.fullName}
//               onChange={(e) =>
//                 editingFamily
//                   ? setEditingFamily({ ...editingFamily, fullName: e.target.value })
//                   : setNewFamily({ ...newFamily, fullName: e.target.value })
//               }
//             />
//             <TextField
//               label="Date of Birth"
//               fullWidth
//               variant="outlined"
//               margin="normal"
//               type="date"
//               value={editingFamily ? editingFamily.dob : newFamily.dob}
//               onChange={(e) =>
//                 editingFamily
//                   ? setEditingFamily({ ...editingFamily, dob: e.target.value })
//                   : setNewFamily({ ...newFamily, dob: e.target.value })
//               }
//             />
//             <TextField
//               label="Blood Group"
//               fullWidth
//               variant="outlined"
//               margin="normal"
//               value={editingFamily ? editingFamily.bloodGroup : newFamily.bloodGroup}
//               onChange={(e) =>
//                 editingFamily
//                   ? setEditingFamily({ ...editingFamily, bloodGroup: e.target.value })
//                   : setNewFamily({ ...newFamily, bloodGroup: e.target.value })
//               }
//             />
//             <TextField
//               label="Mobile Number"
//               fullWidth
//               variant="outlined"
//               margin="normal"
//               value={editingFamily ? editingFamily.mobileNumber : newFamily.mobileNumber}
//               onChange={(e) =>
//                 editingFamily
//                   ? setEditingFamily({ ...editingFamily, mobileNumber: e.target.value })
//                   : setNewFamily({ ...newFamily, mobileNumber: e.target.value })
//               }
//             />
//             <TextField
//               label="Email ID"
//               fullWidth
//               variant="outlined"
//               margin="normal"
//               value={editingFamily ? editingFamily.emailId : newFamily.emailId}
//               onChange={(e) =>
//                 editingFamily
//                   ? setEditingFamily({ ...editingFamily, emailId: e.target.value })
//                   : setNewFamily({ ...newFamily, emailId: e.target.value })
//               }
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpen(false)} color="secondary">
//               Cancel
//             </Button>
//             <Button
//               onClick={editingFamily ? handleUpdateFamily : handleSaveFamily}
//               color="primary"
//               variant="contained"
//             >
//               {editingFamily ? 'Update' : 'Save'}
//             </Button>
//           </DialogActions>
//         </Paper>
//       </Modal>
//     </MainCard>
//   );
// };

// export default FamilyTable;



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
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useState, useEffect } from 'react';
import { Modal, TextField, DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material';
import dayjs from 'dayjs';

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

const Family = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [familyData, setFamilyData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [editingFamily, setEditingFamily] = useState(null);
  const [selectedFamilyId, setSelectedFamilyId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchFamilyData();
  }, [page, rowsPerPage]);

  const fetchFamilyData = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';
      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/getAllApplicationNoMembershipByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error: ${response.status} - ${errorDetails}`);
      }

      const data = await response.json();
      setFamilyData(data.content || []);
      setTotalCount(data.totalElements || 0);
    } catch (error) {
      setError(`Failed to fetch family data: ${error.message}`);
      console.error('Error fetching family data:', error);
    }
  };

  const handleEditFamily = (family = {}) => {
    setIsAdding(!family.membershipId); // Determine if we are in "Add" mode or "Edit" mode
    setEditingFamily(family); // If family is empty, it opens a blank form for new entry
    setOpen(true);
  };

  const handleSaveFamily = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';
      const url = isAdding
        ? 'https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/createFamilyMembership?userId=1' // Change endpoint for "Create"
        : `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/updateFamily/${editingFamily.membershipId}`; // Update endpoint for "Edit"
      const method = isAdding ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(editingFamily),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setOpen(false);
      alert(isAdding ? 'Family record created!' : 'Family record updated!');
      fetchFamilyData(); // Refresh data after saving
    } catch (error) {
      console.error('Failed to save family data:', error);
    }
  };

  const handleDeleteFamily = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';
      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/deleteFamily/${selectedFamilyId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setConfirmDeleteOpen(false);
      fetchFamilyData(); // Refresh the data after deleting
    } catch (error) {
      console.error('Failed to delete family data:', error);
    }
  };

  const formatDate = (date) => (date ? dayjs(date).format('YYYY-MM-DD') : 'Not Available');
  const getDisplayValue = (value) => {
    if (value === true) return 'Yes';
    if (value === false) return 'No';
    if (value === null || value === undefined || value === '') return 'Not Available';
    return value;
  };

  return (
    <MainCard title="Family Details">
      <Grid container spacing={gridSpacing} justifyContent="flex-end">
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => handleEditFamily()}>
            Add Family
          </Button>
        </Grid>
      </Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: theme.spacing(2) }}>
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: 600, fontSize: 15, padding: '16px 24px' }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {familyData.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.membershipId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'edit') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Button variant="outlined" color="primary" onClick={() => handleEditFamily(row)}>
                            Edit
                          </Button>
                        </TableCell>
                      );
                    }
                    if (column.id === 'delete') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Button variant="outlined" color="secondary" onClick={() => { setSelectedFamilyId(row.membershipId); setConfirmDeleteOpen(true); }}>
                            Delete
                          </Button>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'dob' ? formatDate(value) : getDisplayValue(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={totalCount} rowsPerPage={rowsPerPage} page={page} onPageChange={(event, newPage) => setPage(newPage)} onRowsPerPageChange={(event) => setRowsPerPage(+event.target.value)} />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isAdding ? 'Add New Family Member' : 'Edit Family Details'}</DialogTitle>
        <DialogContent>
          {columns.map((column) => {
            if (['membershipId', 'applicationNumber', 'edit', 'delete'].includes(column.id)) return null;
            return (
              <TextField key={column.id} margin="dense" label={column.label} fullWidth variant="outlined" value={editingFamily?.[column.id] || ''} onChange={(e) => setEditingFamily((prev) => ({ ...prev, [column.id]: e.target.value }))} />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSaveFamily} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this family record?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleDeleteFamily} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default Family;
