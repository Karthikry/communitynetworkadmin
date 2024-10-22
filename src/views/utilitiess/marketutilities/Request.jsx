import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';

const columns = [
  { id: 'requestID', label: 'Request ID', minWidth: 120 },
  { id: 'requestName', label: 'Request Name', minWidth: 180 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 120 }, // This needs to be added if your API returns status
  { id: 'insertedDate', label: 'Inserted Date', minWidth: 180 },
  { id: 'acceptedBy', label: 'Accepted By', minWidth: 180 }, // This needs to be added if your API returns acceptedBy
  { id: 'updatedBy', label: 'Updated By', minWidth: 180 },
  { id: 'requestedByUserName', label: 'Requested By User Name', minWidth: 200 },
  { id: 'requestTypeName', label: 'Request Type Name', minWidth: 200 }
];

const RequestTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  // Fetch data here
  useEffect(() => {
    const fetchData = async () => {
      try {
         // Retrieve the user token from session storage
         const user = JSON.parse(sessionStorage.getItem('user'));
         const accessToken = user?.accessToken || '';
 
         const response = await fetch(
           `https://executivetracking.cloudjiffy.net/Mahaasabha/requesttype/v1/getAllRequestTypeByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10`,
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

        // Assuming the API response has the same structure as provided in the Swagger response
        setRows(data.content || []); // Use 'content' to set the rows or an empty array if not available
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 5 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{row.requestID || 'Not Available'}</TableCell>
                    <TableCell>{row.requestName || 'Not Available'}</TableCell>
                    <TableCell>{row.description || 'Not Available'}</TableCell>
                    <TableCell>{row.status || 'Not Available'}</TableCell> {/* Assuming you have this field */}
                    <TableCell>{row.insertedDate || 'Not Available'}</TableCell>
                    <TableCell>{row.acceptedBy?.fullName || 'Not Available'}</TableCell> {/* Assuming acceptedBy is an object */}
                    <TableCell>{row.updatedBy?.fullName || 'Not Available'}</TableCell> {/* Assuming updatedBy is an object */}
                    <TableCell>{row.requestedByUserName || 'Not Available'}</TableCell>
                    <TableCell>{row.requestTypeName || 'Not Available'}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align='center' sx={{ padding: 20 }}>
                  No rows available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RequestTable;
