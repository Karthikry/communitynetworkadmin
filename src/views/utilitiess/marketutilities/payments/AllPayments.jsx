import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Pagination,
} from '@mui/material';
import axios from 'axios';

const AllPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 9; // Number of items per page

  // API call to fetch payments
  const fetchPayments = async (page) => {
    setLoading(true);
    setError('');
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await axios.get(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/subscription/v1/getAllPaymentsByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${pageSize}`,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setPayments(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching payment data:', err);
      setError('Failed to fetch payments.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts or the page number changes
  useEffect(() => {
    fetchPayments(pageNumber);
  }, [pageNumber]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPageNumber(value - 1); // MUI Pagination is 1-indexed, API is 0-indexed
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        All Payments
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ marginBottom: 4 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {!loading && !error && payments.length === 0 && (
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            No payments found.
          </Typography>
        )}

        {payments.map((payment) => (
          <Grid item xs={12} sm={6} md={4} key={payment.paymentid}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payment ID: {payment.paymentid}
                </Typography>
                <Typography>
                  <strong>Amount:</strong> ₹{payment.amount.toFixed(2)}
                </Typography>
                <Typography>
                  <strong>Payment Date:</strong>{' '}
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </Typography>
                <Typography>
                  <strong>Payment Method:</strong> {payment.paymentMethod}
                </Typography>
                <Typography>
                  <strong>Status:</strong> {payment.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!loading && totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Pagination
            count={totalPages}
            page={pageNumber + 1}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default AllPayments;
