import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton, CircularProgress, Card, CardContent, Typography, Grid, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Tune } from '@mui/icons-material';
import maleImage from '../../../../../assets/images/Male-removebg-preview.png';
import femaleImage from '../../../../../assets/images/Female-removebg-preview.png';
import axios from 'axios';
import FamilyMemberCard from './FamilyMemberCard';
import MemberDetailsDialog from './MemberDetailsDialog';
import FamilyTreeDialog from './FamilyTreeDialog';
import RootFamilyTreeDialog from './RootFamilyTreeDialog';

const FamilyTree = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [openFamilyTreeDialog, setOpenFamilyTreeDialog] = useState(false);
    const [openRootFamilyTreeDialog, setOpenRootFamilyTreeDialog] = useState(false);
    const [selectedMemberDetails, setSelectedMemberDetails] = useState(null);
    const [selectedFamilyTree, setSelectedFamilyTree] = useState(null);
    const [selectedRootFamilyTree, setSelectedRootFamilyTree] = useState(null);
    const [loading, setLoading] = useState(false);

    // Filter states
    const [openFilterDialog, setOpenFilterDialog] = useState(false);
    const [filterType, setFilterType] = useState('gotra'); // 'gotra' or 'city'
    const [filterValue, setFilterValue] = useState('');

     // Dynamic options for gotras and cities
     const [gotras, setGotras] = useState([]);
     const [cities, setCities] = useState([]);

      // Fetch available gotras and cities when the filter dialog opens
    const fetchGotrasAndCities = async () => {
      try {
          const user = JSON.parse(sessionStorage.getItem('user'));
          const accessToken = user?.accessToken || '';
          const gotraResponse = await axios.get('https://executivetracking.cloudjiffy.net/Mahaasabha/gotra/v1/getAllGotraByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10', {
              headers: { Authorization: `Bearer ${accessToken}` }
          });
          const cityResponse = await axios.get('https://executivetracking.cloudjiffy.net/Mahaasabha/city/v1/getAllCityByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10', {
              headers: { Authorization: `Bearer ${accessToken}` }
          });
          
            // Check if response data is an array before setting state
            if (Array.isArray(gotraResponse.data.content)) {
              setGotras(gotraResponse.data.content);
          } else {
              console.error('Gotra response is not an array:', gotraResponse.data);
              setGotras([]); // Reset to empty array if not valid
          }

          if (Array.isArray(cityResponse.data.content)) {
              setCities(cityResponse.data.content);
          } else {
              console.error('City response is not an array:', cityResponse.data);
              setCities([]); // Reset to empty array if not valid
          }
          
      } catch (err) {
          console.error('Failed to fetch gotras or cities', err);
      }
  };

  useEffect(() => {
    if (openFilterDialog) {
        fetchGotrasAndCities();
    }
}, [openFilterDialog]);

    const fetchSearchResults = async (query) => {
        setLoading(true);
        setError('');
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const accessToken = user?.accessToken || '';
            const response = await axios.get(`https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/findMembershipByFullName?fullName=${query}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setSearchResults(response.data || []);
        } catch (err) {
            setError('Failed to fetch results');
        }
        setLoading(false);
    };

    // Fetch filtered results based on selected filter type and value
    const fetchFilteredResults = async () => {
      setLoading(true);
      setError('');
      try {
          const user = JSON.parse(sessionStorage.getItem('user'));
          const accessToken = user?.accessToken || '';
          const response = await axios.get(`https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/findMembershipByFullNameAndFilter?city=Bengaluru&fullName=rao&gothra=KAUSHIKA`, {
              headers: { Authorization: `Bearer ${accessToken}` },
              params: { type: filterType, value: filterValue }
          });
          setSearchResults(response.data || []);
      } catch (err) {
          setError('Failed to fetch filtered results');
      }
      setLoading(false);
      setOpenFilterDialog(false); // Close the dialog after fetching
  };

  const handleFilterSubmit = (event) => {
      event.preventDefault();
      fetchFilteredResults();
  };

    const fetchFamilyTreeData = async (membershipCode) => {
        setLoading(true);
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const accessToken = user?.accessToken || '';
            const response = await axios.get(`https://executivetracking.cloudjiffy.net/MahaasabhaMember/membership/v1/findMembershipAssociationByMembershipCode/{membershipCode}?membershipCode=${membershipCode}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setSelectedFamilyTree(response.data);
            setOpenFamilyTreeDialog(true);
        } catch (err) {
            setError('Failed to fetch family tree data');
        }
        setLoading(false);
    };

    const fetchRootFamilyTreeData = async (membershipCode) => {
        setLoading(true);
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const accessToken = user?.accessToken || '';
            const response = await axios.get(`https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/findRootFamilyTreeByMembershipCode/${membershipCode}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setSelectedRootFamilyTree(response.data);
            setOpenRootFamilyTreeDialog(true);
        } catch (err) {
            setError('Failed to fetch root family tree data');
        }
        setLoading(false);
    };

    const fetchMemberDetails = async (membershipCode) => {
        setLoading(true);
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const accessToken = user?.accessToken || '';
            const response = await axios.get(`https://executivetracking.cloudjiffy.net/MahaasabhaMember/membership/v1/findMembershipAssociationByMembershipCode/{membershipCode}?membershipCode=${membershipCode}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setSelectedMemberDetails(response.data);
            setOpenDialog(true);
        } catch (err) {
            setError('Failed to fetch member details');
        }
        setLoading(false);
    };

    const renderFamilyTree = (member) => (
        <div>
            <div>{member.fullName}</div>
            {/* Additional rendering logic for family tree */}
        </div>
    );

    const renderRootFamilyTree = (member) => (
        <div>
            <div>{member.fullName}</div>
            {/* Additional rendering logic for root family tree */}
        </div>
    );

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            fetchSearchResults(searchQuery);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <form onSubmit={(e) => { e.preventDefault(); fetchSearchResults(searchQuery); }} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <TextField
                    placeholder="Search a FullName"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '70%' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => fetchSearchResults(searchQuery)} color="primary">
                                    <SearchIcon />
                                </IconButton>
                                <IconButton color="primary" onClick={() => setOpenFilterDialog(true)}>
                                    <Tune />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
            {loading && <CircularProgress style={{ marginTop: '20px' }} />}
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={3} style={{ padding: '10px' }}>
                {searchResults.map((member) => (
                    <Grid item xs={12} sm={6} md={4} key={member.membershipCode}>
                        <FamilyMemberCard member={member} 
                            onViewDetails={() => fetchMemberDetails(member.membershipCode)} 
                            onViewFamilyTree={() => fetchFamilyTreeData(member.membershipCode)} 
                            onViewRootFamilyTree={() => fetchRootFamilyTreeData(member.membershipCode)} />
                    </Grid>
                ))}
            </Grid>

            {/* Dialogs for displaying details */}
            <MemberDetailsDialog open={openDialog} onClose={() => setOpenDialog(false)} selectedMemberDetails={selectedMemberDetails} fetchMemberDetails={fetchMemberDetails} />
            <FamilyTreeDialog open={openFamilyTreeDialog} onClose={() => setOpenFamilyTreeDialog(false)} selectedFamilyTree={selectedFamilyTree} />
            <RootFamilyTreeDialog open={openRootFamilyTreeDialog} onClose={() => setOpenRootFamilyTreeDialog(false)} selectedRootFamilyTree={selectedRootFamilyTree} />



             {/* Filter Dialog */}
             <Dialog open={openFilterDialog} onClose={() => setOpenFilterDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Filter Members</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleFilterSubmit}>
                        <div>
                            <label>
                                <input 
                                    type="radio" 
                                    value="gotra" 
                                    checked={filterType === 'gotra'} 
                                    onChange={() => setFilterType('gotra')} 
                                />
                                Gotra
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    value="city" 
                                    checked={filterType === 'city'} 
                                    onChange={() => setFilterType('city')} 
                                />
                                City
                            </label>
                        </div>

                        {/* Dropdown for Gotras or Cities */}
                        {filterType === 'gotra' ? (
                            <TextField
                                select
                                label=""
                                variant="outlined"
                                fullWidth
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                                SelectProps={{
                                    native: true,
                                }}
                                style={{ marginTop: '10px' }}
                            >
                                <option value="">-- Select Gotra --</option>
                                {gotras.map((gotra) => (
                                    <option key={gotra.gotraId} value={gotra.gotraName}>{gotra.gotraName}</option>
                                ))}
                            </TextField>
                        ) : (
                            <TextField
                                select
                                label=""
                                variant="outlined"
                                fullWidth
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                                SelectProps={{
                                    native: true,
                                }}
                                style={{ marginTop: '10px' }}
                            >
                                <option value="">-- Select City --</option>
                                {cities.map((city) => (
                                    <option key={city.cityId} value={city.cityName}>{city.cityName}</option>
                                ))}
                            </TextField>
                        )}

                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                            Apply Filter
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FamilyTree;