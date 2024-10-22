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

const columns = [
  { id: 'relationshipConstantId', label: 'ID', minWidth: 50 },
  { id: 'relationshipConstantType', label: 'Relationship Constant', minWidth: 180 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'createdBy', label: 'Created By', minWidth: 150 },
  { id: 'updatedBy', label: 'Updated By', minWidth: 150 },
  { id: 'insertedDate', label: 'Inserted Date', minWidth: 180 },
  { id: 'updatedDate', label: 'Updated Date', minWidth: 180 },
];

const Relationship = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelationships = async () => {
      try {
        // Retrieve the user token from session storage
        const user = JSON.parse(sessionStorage.getItem('user'));
        const accessToken = user?.accessToken || '';

        const response = await fetch(
          `https://executivetracking.cloudjiffy.net/Mahaasabha/relationshipconstant/v1/getAllRelationshipConstantByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
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

        // Check if data is not empty and map the content to the required fields
        const mappedData = data.content && data.content.length > 0 ? data.content.map((item) => ({
          relationshipConstantId: item.relationshipConstantId,
          relationshipConstantType: item.relationshipConstantType,
          description: item.description,
          createdBy: item.createdBy.fullName || item.createdBy.userName, // Fallback to userName if fullName is missing
          updatedBy: item.updatedBy.fullName || item.updatedBy.userName, // Fallback to userName if fullName is missing
          insertedDate: new Date(item.insertedDate).toLocaleDateString(), // Format date only
          updatedDate: new Date(item.updatedDate).toLocaleDateString(), // Format date only
        })) : [];

        setRows(mappedData);
        setTotalCount(data.totalElements);
      } catch (error) {
        setError(error.message);
        console.error('Failed to fetch relationships:', error);
      }
    };

    fetchRelationships();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (id) => {
    console.log(`Edit clicked for ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete clicked for ID: ${id}`);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 5 }}>
      <Button
        variant="contained"
        sx={{ margin: '10px' }}
        onClick={() => console.log('Add relationship constant clicked')}
      >
        + ADD RELATIONSHIP CONSTANT
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.relationshipConstantId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {column.id === 'actions' ? (
                          <>
                            <IconButton onClick={() => handleEdit(row.relationshipConstantId)} color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row.relationshipConstantId)} color="secondary">
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
    </Paper>
  );
};

export default Relationship;
