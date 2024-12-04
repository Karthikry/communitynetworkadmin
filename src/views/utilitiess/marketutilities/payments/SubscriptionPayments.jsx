// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Alert,
//   Box,
//   Pagination,
//   Button,
// } from '@mui/material';
// import axios from 'axios';

// const SubscriptionPayment = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [pageNumber, setPageNumber] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   const pageSize = 9; // Number of items per page

//   // API call to fetch subscription payments
//   const fetchSubscriptions = async (page) => {
//     setLoading(true);
//     setError('');
//     try {
//       const user = JSON.parse(sessionStorage.getItem('user'));
//       const accessToken = user?.accessToken || '';

//       const response = await axios.get(
//         `https://executivetracking.cloudjiffy.net/Mahaasabha/subscription/v1/getAllSubscriptionsByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${pageSize}`,
//         {
//           headers: {
//             'Content-type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       setSubscriptions(response.data.content || []);
//       setTotalPages(response.data.totalPages || 1);
//     } catch (err) {
//       console.error('Error fetching subscription data:', err);
//       setError('Failed to fetch subscription payments.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data when the component mounts or the page number changes
//   useEffect(() => {
//     fetchSubscriptions(pageNumber);
//   }, [pageNumber]);

//   // Handle page change
//   const handlePageChange = (event, value) => {
//     setPageNumber(value - 1); // MUI Pagination is 1-indexed, API is 0-indexed
//   };

//   const fetchPaymentDetails = async (subscriptionId) => {
//     try {
//       const user = JSON.parse(sessionStorage.getItem('user'));
//       const accessToken = user?.accessToken || '';
  
//       const response = await fetch(
//         `https://executivetracking.cloudjiffy.net/MahaasabhaMember/subscription/v1/getAllPaymentsBySubscriptionId/{subscriptionId}?subscriptionId=${subscriptionId}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
  
//       if (!response.ok) throw new Error('Failed to fetch payment details');
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching payment details:', error);
//       return [];
//     }
//   };

//   const handleShowPayments = async (subscriptionId) => {
//     const data = await fetchPaymentDetails(subscriptionId);
//     setPayments(data);
//     setShowPayments(true); // Switch to showing payments
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Subscription Payments
//       </Typography>

//       {loading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
//           <CircularProgress />
//         </Box>
//       )}

//       {error && (
//         <Alert severity="error" sx={{ marginBottom: 4 }}>
//           {error}
//         </Alert>
//       )}

//       <Grid container spacing={3}>
//         {!loading && !error && subscriptions.length === 0 && (
//           <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
//             No subscription payments found.
//           </Typography>
//         )}

//         {subscriptions.map((subscription) => (
//           <Grid item xs={12} sm={6} md={4} key={subscription.subscriptionId}>
//             <Card variant="outlined">
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Member: {subscription.mahaasabhaMemberDto.userName}
//                 </Typography>
//                 <Typography>
//                   <strong>Subscription ID:</strong> {subscription.subscriptionId}
//                 </Typography>
//                 <Typography>
//                   <strong>Mobile Number:</strong>{' '}
//                   {subscription.mahaasabhaMemberDto.mobileNumber || 'N/A'}
//                 </Typography>
//                 <Typography>
//                   <strong>Status:</strong> {subscription.status}
//                 </Typography>
//                 <Typography>
//                   <strong>Start Date:</strong>{' '}
//                   {new Date(subscription.startDate).toLocaleDateString()}
//                 </Typography>
//                 <Typography>
//                   <strong>End Date:</strong>{' '}
//                   {new Date(subscription.endDate).toLocaleDateString()}
//                 </Typography>
//                 <Button
//                       variant="contained"
//                       color="primary"
//                       size="small"
//                       style={{ marginTop: '16px' }}
//                       onClick={() => handleShowPayments(subscription.id)}
//                     >
//                       Show Payment Details
//                     </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {!loading && totalPages > 1 && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
//           <Pagination
//             count={totalPages}
//             page={pageNumber + 1}
//             onChange={handlePageChange}
//             color="primary"
//           />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default SubscriptionPayment;


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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import axios from 'axios';

const SubscriptionPayment = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [payments, setPayments] = useState([]);
  const [showPayments, setShowPayments] = useState(false);

  const pageSize = 9; // Number of items per page

  // API call to fetch subscription payments
  const fetchSubscriptions = async (page) => {
    setLoading(true);
    setError('');
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await axios.get(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/subscription/v1/getAllSubscriptionsByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${pageSize}`,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSubscriptions(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching subscription data:', err);
      setError('Failed to fetch subscription payments.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts or the page number changes
  useEffect(() => {
    fetchSubscriptions(pageNumber);
  }, [pageNumber]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPageNumber(value - 1); // MUI Pagination is 1-indexed, API is 0-indexed
  };

  const fetchPaymentDetails = async (subscriptionId) => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await axios.get(
        `https://executivetracking.cloudjiffy.net/MahaasabhaMember/subscription/v1/getAllPaymentsBySubscriptionId/{subscriptionId}?subscriptionId=${subscriptionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching payment details:', error);
      return [];
    }
  };

  const handleShowPayments = async (subscriptionId) => {
    const data = await fetchPaymentDetails(subscriptionId);
    setPayments(data);
    setShowPayments(true); // Switch to showing payments
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Subscriptions 
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
        {!loading && !error && subscriptions.length === 0 && (
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            No subscription payments found.
          </Typography>
        )}

        {subscriptions.map((subscription) => (
          <Grid item xs={12} sm={6} md={4} key={subscription.subscriptionId}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Member: {subscription.mahaasabhaMemberDto.userName}
                </Typography>
                <Typography>
                  <strong>Subscription ID:</strong> {subscription.subscriptionId}
                </Typography>
                <Typography>
                  <strong>Mobile Number:</strong>{' '}
                  {subscription.mahaasabhaMemberDto.mobileNumber || 'N/A'}
                </Typography>
                <Typography>
                  <strong>Status:</strong> {subscription.status}
                </Typography>
                <Typography>
                  <strong>Start Date:</strong>{' '}
                  {new Date(subscription.startDate).toLocaleDateString()}
                </Typography>
                <Typography>
                  <strong>End Date:</strong>{' '}
                  {new Date(subscription.endDate).toLocaleDateString()}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginTop: '16px' }}
                  onClick={() => handleShowPayments(subscription.subscriptionId)}
                >
                  Show Payment Details
                </Button>
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

      {/* Dialog to Show Payment Details */}
      <Dialog open={showPayments} onClose={() => setShowPayments(false)} fullWidth maxWidth="sm">
        <DialogTitle>Payment Details</DialogTitle>
        <DialogContent>
          {payments.length === 0 ? (
            <Typography>No payment details available.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Payment ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.paymentId}>
                      <TableCell>{payment.paymentid}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{payment.paymentMethod}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPayments(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscriptionPayment;
