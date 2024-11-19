import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import EcomRoutes from './EcomRoutes';
import AcademyRoutes from './AcademyRoutes';
import UpskillsRoutes from './UpSkillsRoutes';
import MarketplaceRoutes from './MarketplaceRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, AcademyRoutes, UpskillsRoutes, EcomRoutes, MarketplaceRoutes], {
  // basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;


// import React, { useState } from 'react';
// import {
//   TextField,
//   InputAdornment,
//   IconButton,
//   CircularProgress,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Box,
//   Avatar,
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { Tune } from '@mui/icons-material';
// import maleImage from '../../../../assets/images/Male-removebg-preview.png';  // Update with your image path
// import femaleImage from '../../../../assets/images/Female-removebg-preview.png';  // Update with your image path

// const FamilyTree = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openFamilyTreeDialog, setOpenFamilyTreeDialog] = useState(false);
//   const [selectedMemberDetails, setSelectedMemberDetails] = useState(null);
//   const [selectedFamilyTree, setSelectedFamilyTree] = useState(null);

//   const fetchSearchResults = async (query) => {
//     setLoading(true);
//     setError('');
//     try {
//       const user = JSON.parse(sessionStorage.getItem('user'));
//       const accessToken = user?.accessToken || '';

//       const response = await fetch(
//         `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/findMembershipByFullName?fullName=${query}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       const data = await response.json();
//       setSearchResults(data.length ? data : []);
//     } catch (err) {
//       setError('Failed to fetch results');
//     }
//     setLoading(false);
//   };

//   const fetchFamilyTreeData = async (membershipCode) => {
//     setLoading(true);
//     try {
//       const user = JSON.parse(sessionStorage.getItem('user'));
//       const accessToken = user?.accessToken || '';

//       const response = await fetch(
//         `https://executivetracking.cloudjiffy.net/MahaasabhaMember/membership/v1/findMembershipAssociationByMembershipCode/{membershipCode}?membershipCode=${membershipCode}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       const data = await response.json();
//       setSelectedFamilyTree(data);
//       setOpenFamilyTreeDialog(true);
//     } catch (err) {
//       setError('Failed to fetch family tree data');
//     }
//     setLoading(false);
//   };

//   const fetchMemberDetails = async (membershipCode) => {
//     setLoading(true);
//     try {
//       const user = JSON.parse(sessionStorage.getItem('user'));
//       const accessToken = user?.accessToken || '';

//       const response = await fetch(
//         `https://executivetracking.cloudjiffy.net/MahaasabhaMember/membership/v1/findMembershipAssociationByMembershipCode/{membershipCode}?membershipCode=${membershipCode}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       const data = await response.json();
//       setSelectedMemberDetails(data);
//       setOpenDialog(true);
//     } catch (err) {
//       setError('Failed to fetch member details');
//     }
//     setLoading(false);
//   };

//   const handleSearch = (event) => {
//     event.preventDefault();
//     if (searchQuery.trim()) {
//       fetchSearchResults(searchQuery);
//     }
//   };

//   const renderFamilyMember = (member) => (
//     <Box key={member.membershipCode} sx={{ textAlign: 'center', mb: 2 }}>
//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: member.isAlive ? 'lightgreen' : 'lightcoral',
//           padding: '8px',
//           borderRadius: '8px',
//           mb: 2,
//         }}
//       >
//         <Avatar
//           src={member.gender === 'MALE' ? maleImage : femaleImage}
//           alt={member.gender}
//           sx={{ width: 24, height: 24, mr: 1 }}
//         />
//         <Typography variant="body2"> {member.fullName}</Typography>
//       </Box>
//     </Box>
//   );

//   const renderFamilyTree = (member) => (
//     <Box sx={{ textAlign: 'center', p: 2 }}>
//       {/* Display the main member */}
//       <Typography variant="h6" gutterBottom>
//         {/* Self: {member.fullName} */}
//       </Typography>
//       {renderFamilyMember(member)}

//       {/* Display Parents */}
//       {member.parentsDTO && (
//         <Box>
//           <Typography variant="subtitle1">Parents</Typography>
//           {member.parentsDTO.map((parent) => (
//             <React.Fragment key={parent.membershipCode}>
//               {renderFamilyMember(parent)}
//               {/* Display Parent's Spouse */}
//               {parent.spouses && parent.spouses.map((spouse) => renderFamilyMember(spouse))}
//             </React.Fragment>
//           ))}
//         </Box>
//       )}

//       {/* Display Siblings */}
//       {member.siblingsDto && (
//         <Box>
//           <Typography variant="subtitle1">Siblings</Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
//             {member.siblingsDto.map((sibling) => renderFamilyMember(sibling))}
//           </Box>
//         </Box>
//       )}

//       {/* Display Spouse */}
//       {member.spouseDto && (
//         <Box>
//           <Typography variant="subtitle1">Spouse</Typography>
//           {member.spouseDto.map((spouse) => renderFamilyMember(spouse))}
//         </Box>
//       )}

//       {/* Display Children */}
//       {member.childrenDto && (
//         <Box>
//           <Typography variant="subtitle1">Children</Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
//             {member.childrenDto.map((child) => renderFamilyMember(child))}
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );

  

//   const renderMemberCard = (member) => {
//     const isMale = member.gender === 'MALE';
//     return (
//       <Grid item xs={12} sm={6} md={4} key={member.membershipCode}>
//         <Card style={{ backgroundColor: member.isAlive ? 'lightgreen' : 'lightcoral', marginBottom: '20px' }}>
//           <CardContent>
//             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
//               <img src={isMale ? maleImage : femaleImage} alt={isMale ? 'Male' : 'Female'} style={{ width: 50, height: 50 }} />
//             </div>
//             <Typography variant="h5">{member.fullName}</Typography>
//             <Typography variant="body1"><strong>Membership Code:</strong> {member.membershipCode}</Typography>
//             <div style={{ display: 'flex', justifyContent: 'start', gap: 7, marginTop: '15px' }}>
//               <Button
//                 variant="contained"
//                 style={{ backgroundColor: 'white', color: 'blue', border: '1px solid blue' }}
//                 onClick={() => fetchFamilyTreeData(member.membershipCode)}
//               >
//                 Family Tree
//               </Button>
//               <Button
//                 variant="contained"
//                 style={{ backgroundColor: 'white', color: 'purple', border: '1px solid purple' }}
//                 onClick={() => fetchMemberDetails(member.membershipCode)}
//               >
//                 Personal Text
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </Grid>
//     );
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
//         <TextField
//           placeholder="Search a FullName"
//           variant="outlined"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{ width: '70%' }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={handleSearch} color="primary">
//                   <SearchIcon />
//                 </IconButton>
//                 <IconButton color="primary">
//                   <Tune />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </form>

//       {loading && <CircularProgress style={{ display: 'block', margin: 'auto' }} />}
//       {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
//       {!loading && searchResults.length === 0 && <div style={{ textAlign: 'center' }}>No data available</div>}

//       <Grid container spacing={3}>
//         {searchResults.map((member) => renderMemberCard(member))}
//       </Grid>

//       <Dialog open={openFamilyTreeDialog} onClose={() => setOpenFamilyTreeDialog(false)} fullWidth maxWidth="md">
//         <DialogTitle>Family Tree</DialogTitle>
//         <DialogContent>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             {selectedFamilyTree ? renderFamilyTree(selectedFamilyTree) : <Typography>Loading family tree...</Typography>}
//           </Box>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Personal Details</DialogTitle>
//         <DialogContent>
//           {selectedMemberDetails ? (
//             <div>
//               {/* Additional personal details rendering logic can go here */}
//             </div>
//           ) : (
//             <Typography>Loading details...</Typography>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default FamilyTree;

