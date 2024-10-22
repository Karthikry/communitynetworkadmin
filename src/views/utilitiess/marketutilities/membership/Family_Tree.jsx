import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

// Import images
import maleImage from '../../../../assets/images/Male-removebg-preview.png';  // Update with your image path
import femaleImage from '../../../../assets/images/Female-removebg-preview.png';  // Update with your image path

const FamilyTree = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API integration for fetching data based on search query
  const fetchSearchResults = async (query) => {
    setLoading(true);
    setError('');
    try {
      // Retrieve the user token from session storage
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accessToken = user?.accessToken || '';

      const response = await fetch(
        `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/findMembershipByFullName?fullName=${query}`,
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

      // Assuming the response contains an array of family members
      if (data && data.length > 0) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      setError('Failed to fetch results');
    }
    setLoading(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      fetchSearchResults(searchQuery);
    }
  };

  // Function to render each family member's details with conditional styling and icons
  const renderMemberCard = (member) => {
    const fullName = member.fullName || 'N/A';
    const dob = member.dob || 'N/A';
    const membershipCode = member.membershipCode || 'N/A';
    const femaleFamilyRefMembershipCode = member.femaleFamilyRefMembershipCode || 'N/A'; // For female members
    const status = member.isAlive ? 'Alive' : 'Deceased';
    const married = member.isMarried ? 'Yes' : 'No';
    const isMale = member.gender === 'MALE'; // Assuming gender is provided as 'MALE' or 'FEMALE'

    // Conditional styling based on alive or deceased status
    const cardStyle = {
      backgroundColor: member.isAlive ? 'lightgreen' : 'lightcoral',
    };

    return (
      <Grid item xs={12} sm={6} md={4} key={member.membershipCode}>
        <Card style={{ ...cardStyle, marginBottom: '20px' }}>
          <CardContent>
            {/* Gender-based image at the top */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <img
                src={isMale ? maleImage : femaleImage}
                alt={isMale ? 'Male' : 'Female'}
                style={{ width: 50, height: 50 }}
              />
            </div>

            <Typography variant="h5">{fullName}</Typography>
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {dob}
            </Typography>
            <Typography variant="body1">
              <strong>Membership Code:</strong> {membershipCode}
            </Typography>
            <Typography variant="body1">
              {/* Show femaleFamilyRefMembershipCode if the member is female */}
              <strong>Reference Membership Code:</strong>{' '}
              {isMale ? 'N/A' : femaleFamilyRefMembershipCode}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {status}
            </Typography>
            <Typography variant="body1">
              <strong>Married:</strong> {married}
            </Typography>

            {/* Adding the buttons with white background */}
            <div style={{ display: 'flex', justifyContent: 'start', gap: 7, marginTop: '15px' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: 'white', color: 'blue', border: '1px solid blue' }}
                onClick={() => console.log('View Family clicked')}
              >
                VIEW FAMILY
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: 'white', color: 'purple', border: '1px solid purple' }}
                onClick={() => console.log('Personal Info clicked')}
              >
                PERSONAL INFO
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          placeholder="Search a FullName"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '70%' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} color="primary">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>

      {loading && <CircularProgress style={{ display: 'block', margin: 'auto' }} />}

      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

      {!loading && searchResults.length === 0 && <div style={{ textAlign: 'center' }}>No data available</div>}

      <Grid container spacing={3}>
        {searchResults.map((member) => renderMemberCard(member))}
      </Grid>
    </div>
  );
};

export default FamilyTree;
