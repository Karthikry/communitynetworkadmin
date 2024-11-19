import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import axios from 'axios';

const MemberShipReport = () => {
  const handleDownload = async () => {
    try {
      // Retrieve the user token from session storage
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await axios.get(
        'https://executivetracking.cloudjiffy.net/Mahaasabha/report/membership/excel', // Replace with your download API endpoint
        {
          responseType: 'blob', // Important to get file as a blob
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      // Create a link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf'); // Set the file name here
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <Card onClick={handleDownload} sx={{ maxWidth: 400, cursor: 'pointer', textAlign: 'center', p: 1, m: 'auto' }}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={1}>
          <GetAppIcon style={{ fontSize: 50, color: 'black' }} />
        </Box>
        <Typography variant="h5">123</Typography>
        <Typography variant="h3" color="textSecondary">
          Memberships Reports
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MemberShipReport;
