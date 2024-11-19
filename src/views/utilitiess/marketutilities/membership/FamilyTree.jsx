import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { Tree, TreeNode } from 'react-organizational-chart';
import maleImage from '../../../../assets/images/Male-removebg-preview.png'; // Update with your image path
import femaleImage from '../../../../assets/images/Female-removebg-preview.png';

// Helper component for each family member's card
const FamilyMemberCard = ({ member }) => (
  <Card style={{
    backgroundColor: member.isAlive ? '#90EE90' : '#ee6b6e',
    margin: '10px',
    minWidth: '150px',
    textAlign: 'center',
  }}>
    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
      <img
        src={member.gender === "MALE" ? maleImage : femaleImage}
        alt={member.gender === "MALE" ? 'Male' : 'Female'}
        style={{ width: 30, height: 30, marginBottom: '5px' }}
      />
      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
        {member.fullName}
      </Typography>
      <Typography variant="body2">
        {member.relationship}
      </Typography>
    </CardContent>
  </Card>
);

const FamilyTree = () => {
  const [familyData, setFamilyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const accessToken = user?.accessToken || '';

        const response = await axios.get(
          'https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/findRootFamilyTreeByMembershipCode/1A',
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setFamilyData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <CircularProgress />;
  if (!familyData) return <Typography>No data available</Typography>;

  const renderFamilyTree = (member) => (
    <TreeNode label={<FamilyMemberCard member={member} />}>
      {/* Render Spouses */}
      {member.spouseMemberships && member.spouseMemberships.map((spouse, index) => (
        <TreeNode key={`spouse-${index}`} label={<FamilyMemberCard member={spouse} />} />
      ))}
      
      {/* Render Children */}
      {member.childrenMemberships && member.childrenMemberships.map((child, index) => (
        <TreeNode key={`child-${index}`} label={<FamilyMemberCard member={child} />}>
          {renderFamilyTree(child)}
        </TreeNode>
      ))}
    </TreeNode>
  );

  return (
    <Box textAlign="center" m={2}>
      {/* Render the main family tree */}
      <Tree
        lineWidth="2px"
        lineColor="green"
        lineBorderRadius="10px"
        label={<FamilyMemberCard member={familyData} />}
      >
        {renderFamilyTree(familyData)}
      </Tree>
    </Box>
  );
};

export default FamilyTree;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
// import { Tree, TreeNode } from 'react-organizational-chart';
// import maleImage from '../../../../assets/images/Male-removebg-preview.png';  // Update with your image path
// import femaleImage from '../../../../assets/images/Female-removebg-preview.png';

// // Helper component for each family member's card
// const FamilyMemberCard = ({ member }) => (
//   <Card style={{
//     backgroundColor: member.isAlive ? '#90EE90' : '#ee6b6e',
//     margin: '10px',
//     minWidth: '150px',
//     textAlign: 'center',
//   }}>
//     <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
//       <img
//         src={member.gender === "MALE" ? maleImage : femaleImage}
//         alt={member.gender === "MALE" ? 'Male' : 'Female'}
//         style={{ width: 30, height: 30, marginBottom: '5px' }}
//       />
//       <Typography variant="body1" style={{ fontWeight: 'bold' }}>
//         {member.fullName}
//       </Typography>
//       <Typography variant="body2">
//         {member.relationship} {/* Add relationship status such as "Son", "Daughter" */}
//       </Typography>
//     </CardContent>
//   </Card>
// );

// const FamilyTree = () => {
//   const [familyData, setFamilyData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const user = JSON.parse(sessionStorage.getItem('user'));
//         const accessToken = user?.accessToken || '';

//         const response = await axios.get(
//           'https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/findRootFamilyTreeByMembershipCode/1A',
//           {
//             headers: {
//               'Authorization': `Bearer ${accessToken}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//         setFamilyData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <CircularProgress />;
//   if (!familyData) return <Typography>No data available</Typography>;

//   const renderFamilyTree = (member) => (
//     // <TreeNode label={<FamilyMemberCard member={member} />}>
//       {/* Spouse */}
//       {member.spouseDto && member.spouseDto.map((spouse, index) => (
//         <TreeNode key={`spouse-${index}`} label={<FamilyMemberCard member={spouse} />} />
//       ))}
      
//       {/* Children */}
//       {member.childrenDto && member.childrenDto.map((child, index) => (
//         <TreeNode key={`child-${index}`} label={<FamilyMemberCard member={child} />}>
//           {/* Child's Spouse */}
//           {child.spouseDto && child.spouseDto.map((childSpouse, spouseIndex) => (
//             <TreeNode key={`child-spouse-${spouseIndex}`} label={<FamilyMemberCard member={childSpouse} />} />
//           ))}
//           {/* Grandchildren */}
//           {child.childrenDto && child.childrenDto.map((grandChild, grandChildIndex) => (
//             <TreeNode key={`grandchild-${grandChildIndex}`} label={<FamilyMemberCard member={grandChild} />} />
//           ))}
//         </TreeNode>
//       ))}
//     // </TreeNode>
//   );

//   return (
//     <Box textAlign="center" m={2}>
//       {/* Render the main family tree */}
//       <Tree
//         lineWidth="2px"
//         lineColor="green"
//         lineBorderRadius="10px"
//         label={<FamilyMemberCard member={familyData} />}
//       >
//         {renderFamilyTree(familyData)}
//       </Tree>
//     </Box>
//   );
// };

// export default FamilyTree;




