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
//   const [totalElements, setTotalElements] = useState(0); // Keep track of total elements for pagination
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFamilyData = async () => {
//       try {
//         // Retrieve the user token from session storage
//         const user = JSON.parse(sessionStorage.getItem('user'));
//         const accessToken = user?.accessToken || '';

//         const response = await fetch(
//           `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/getAllMembershipByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${accessToken}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }

//         const data = await response.json();
//         setFamilyData(data.content || []); // Use an empty array if 'content' is undefined
//         setTotalElements(data.totalElements || 0); // Assuming the response contains total elements for pagination
//       } catch (error) {
//         setError(error.message);
//         console.error('Failed to fetch family data:', error);
//       }
//     };

//     fetchFamilyData();
//   }, [page, rowsPerPage]);

//   const handleAddFamily = () => {
//     console.log('Add Family button clicked');
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
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{
//                       minWidth: column.minWidth,
//                       fontWeight: 600,
//                       fontSize: 15,
//                       padding: '16px 24px',
//                     }}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {familyData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={row.membershipId}>
//                   {columns.map((column) => {
//                     const value = row[column.id];
//                     if (column.id === 'edit') {
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           <Button variant="outlined" color="primary" onClick={() => console.log('Edit:', row.membershipId)}>
//                             Edit
//                           </Button>
//                         </TableCell>
//                       );
//                     }
//                     if (column.id === 'delete') {
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           <Button variant="outlined" color="secondary" onClick={() => console.log('Delete:', row.membershipId)}>
//                             Delete
//                           </Button>
//                         </TableCell>
//                       );
//                     }

//                     // For boolean fields, display 'Yes' or 'No'
//                     if (typeof value === 'boolean') {
//                       return (
//                         <TableCell key={column.id} align={column.align} style={{ padding: '16px 24px' }}>
//                           {value ? 'Yes' : 'No'}
//                         </TableCell>
//                       );
//                     }

//                     // Default case for normal values or 'Not Available'
//                     return (
//                       <TableCell key={column.id} align={column.align} style={{ padding: '16px 24px' }}>
//                         {value !== null && value !== undefined && value !== '' ? value : 'Not Available'}
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
//           count={totalElements} // Use totalElements for pagination
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(+e.target.value);
//             setPage(0);
//           }}
//         />
//       </Paper>
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

const FamilyTable = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [familyData, setFamilyData] = useState([]);
  const [totalElements, setTotalElements] = useState(0); // Track total elements for pagination
  const [error, setError] = useState(null);

  const fetchFamilyData = async () => {
    try {
      // Retrieve the user token from session storage
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

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setFamilyData(data.content || []); // Use an empty array if 'content' is undefined
      setTotalElements(data.totalElements || 0); // Assuming the response contains total elements for pagination
    } catch (error) {
      setError(error.message);
      console.error('Failed to fetch family data:', error);
    }
  };

  useEffect(() => {
    fetchFamilyData();
  }, [page, rowsPerPage]); // Fetch data whenever page or rowsPerPage changes

  const handleAddFamily = () => {
    console.log('Add Family button clicked');
  };

  return (
    <MainCard title="Family Details">
      <Grid container spacing={gridSpacing} justifyContent="flex-end">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAddFamily}>
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
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: 600,
                      fontSize: 15,
                      padding: '16px 24px',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {familyData.length > 0 ? (
                familyData.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.membershipId}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'edit') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button variant="outlined" color="primary" onClick={() => console.log('Edit:', row.membershipId)}>
                              Edit
                            </Button>
                          </TableCell>
                        );
                      }
                      if (column.id === 'delete') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button variant="outlined" color="secondary" onClick={() => console.log('Delete:', row.membershipId)}>
                              Delete
                            </Button>
                          </TableCell>
                        );
                      }

                      // For boolean fields, display 'Yes' or 'No'
                      if (typeof value === 'boolean') {
                        return (
                          <TableCell key={column.id} align={column.align} style={{ padding: '16px 24px' }}>
                            {value ? 'Yes' : 'No'}
                          </TableCell>
                        );
                      }

                      // Default case for normal values or 'Not Available'
                      return (
                        <TableCell key={column.id} align={column.align} style={{ padding: '16px 24px' }}>
                          {value !== null && value !== undefined && value !== '' ? value : 'Not Available'}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align='center'>
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalElements} // Use totalElements for pagination
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0); // Reset to the first page when changing rows per page
          }}
        />
      </Paper>
    </MainCard>
  );
};

export default FamilyTable;
