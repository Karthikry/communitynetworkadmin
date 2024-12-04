// import React from 'react';
// import { Card, CardContent, Typography, Box } from '@mui/material';
// import GetAppIcon from '@mui/icons-material/GetApp';
// import axios from 'axios';

// const MemberShipReport = () => {
//   const handleDownload = async () => {
//     try {
//       // Retrieve the user token from session storage
//       const user = JSON.parse(sessionStorage.getItem('user'));
//       const accessToken = user?.accessToken || '';

//       const response = await axios.get(
//         'https://executivetracking.cloudjiffy.net/Mahaasabha/report/membership/excel', // Replace with your download API endpoint
//         {
//           responseType: 'blob', // Important to get file as a blob
//           headers: {
//             'Authorization': `Bearer ${accessToken}`,
//           },
//         }
//       );

//       // Create a link to download the file
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'report.pdf'); // Set the file name here
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error('Error downloading the file:', error);
//     }
//   };

//   return (
//     <Card onClick={handleDownload} sx={{ maxWidth: 400, cursor: 'pointer', textAlign: 'center', p: 1, m: 'auto' }}>
//       <CardContent>
//         <Box display="flex" justifyContent="center" mb={1}>
//           <GetAppIcon style={{ fontSize: 50, color: 'black' }} />
//         </Box>
//         <Typography variant="h5">123</Typography>
//         <Typography variant="h3" color="textSecondary">
//           Memberships Reports
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default MemberShipReport;


import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import axios from 'axios';

const MemberShipReport = () => {
  // Function to handle Membership Reports download
  const handleMembershipDownload = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await axios.get(
        'https://executivetracking.cloudjiffy.net/Mahaasabha/report/membership/excel',
        {
          responseType: 'blob',
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'membership_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the Membership report:', error);
    }
  };

  // Function to handle Payment Reports download
  const handlePaymentDownload = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await axios.get(
        'https://executivetracking.cloudjiffy.net/Mahaasabha/report/payment/excel',
        {
          responseType: 'blob',
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'payment_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the Payment report:', error);
    }
  };

  return (
    <Grid container spacing={4}  style={{ minHeight: '100vh' }}>
      {/* Membership Reports Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          onClick={handleMembershipDownload}
          sx={{
            maxWidth: 450,
            cursor: 'pointer',
            textAlign: 'center',
            p: 3,
            m: 'auto',
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <CardContent>
          <Typography variant="h3" fontWeight="bold"  mb={2}>
              Membership Report
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
              <GetAppIcon style={{ fontSize: 60, color: 'black' }} />
            </Box>
            
          </CardContent>
        </Card>
      </Grid>

      {/* Payment Reports Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          onClick={handlePaymentDownload}
          sx={{
            maxWidth: 450,
            cursor: 'pointer',
            textAlign: 'center',
            p: 3,
            m: 'auto',
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <CardContent>
          <Typography variant="h3" fontWeight="bold" mb={2}>
              Payment Report
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
              <GetAppIcon style={{ fontSize: 60, color: 'black' }} />
            </Box>
            
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MemberShipReport;

