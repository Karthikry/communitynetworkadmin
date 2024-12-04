import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tree, TreeNode } from "react-organizational-chart";
import { Box, CircularProgress, CssBaseline, Typography, IconButton } from "@mui/material";
import { ManOutlined, Woman2Outlined } from "@mui/icons-material";
import axios from "axios";

const FatherFamilyTree = () => {
  const [open, setOpen] = useState(false);
  const [familyTreeData, setFamilyTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Directly provide the membership code
  const membershipCode = "1A";


  useEffect(() => {
    const fetchFamilyTree = async () => {
      try {

        // Retrieve the user token from session storage
  const user = JSON.parse(sessionStorage.getItem('user'));
  const accessToken = user?.accessToken || '';

  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  };
        const response = await axios.get(
          `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/findRootFamilyTreeByMembershipCode/${membershipCode}`,
          { headers }
        );
        setFamilyTreeData(response.data);
      } catch (error) {
        console.error("Error fetching family tree data:", error);
        setError("Error fetching family tree data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyTree();
  }, [membershipCode]);

  const renderFamilyTree = (data) => {
    if (!data) return null;

    const renderTreeNodes = (node) => {
      if (!node) return null;

      // Icon and background color based on gender and isAlive
      const genderIcon = node.gender === "MALE" ? <ManOutlined color="primary" /> : <Woman2Outlined sx={{ color: "pink" }} />;
      const backgroundColor = node.isAlive ? "lightgreen" : "lightcoral";

      // Render spouses and children
      const spouseNodes = (node.spouseMemberships || []).map((spouse) => (
        <TreeNode
          key={spouse.membershipId}
          label={
            <Box
              sx={{
                padding: 1,
                borderRadius: 1,
                border: "1px solid #ccc",
                backgroundColor,
                display: "inline-block",
                marginLeft: 2,
              }}
            >
              {genderIcon}
              <Typography variant="body2" component="span">
                {spouse.fullName}
              </Typography>
            </Box>
          }
        />
      ));

      const childNodes = (node.childrenMemberships || []).map((child) => renderTreeNodes(child));

      return (
        <TreeNode
          key={node.membershipId}
          label={
            <Box
              sx={{
                padding: 1,
                borderRadius: 1,
                border: "1px solid #ccc",
                backgroundColor,
                display: "inline-block",
                textAlign: "center",
              }}
            >
              {genderIcon}
              <Typography variant="body1">{node.fullName}</Typography>
            </Box>
          }
        >
          {spouseNodes}
          {childNodes}
        </TreeNode>
      );
    };

    return (
      <Tree lineWidth="2px" lineColor="green" lineBorderRadius="10px">
        {renderTreeNodes(data)}
      </Tree>
    );
  };

  const goToDashboard = () => {
    navigate("/viewfamily", {
      state: {
        rowData: { membershipCode },
        familyTreeData,
        searchInput: "",
        gender: familyTreeData?.[0]?.gender || "FEMALE",
        isMarried: familyTreeData?.[0]?.isMarried || false,
      },
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
   
      <Box
        component="section"
        sx={{
          flexGrow: 1,
          transition: "margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
          marginLeft: open ? "200px" : "0",
          p: 3,
        }}
      >
        <IconButton onClick={goToDashboard}>
          <Typography variant="body1">Back to Dashboard</Typography>
        </IconButton>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {!loading && !error && familyTreeData && familyTreeData.length > 0 ? (
            renderFamilyTree(familyTreeData[0])
          ) : (
            <Typography>No data found</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FatherFamilyTree;


// import React, { useState, useEffect } from "react";
// import { Tree, TreeNode } from "react-organizational-chart";
// import { Box, CircularProgress, Typography } from "@mui/material";
// import { ManOutlined, Woman2Outlined } from "@mui/icons-material";
// import axios from "axios";

// const FatherFamilyTree = ({ membershipCode }) => {
//   const [familyTreeData, setFamilyTreeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFamilyTree = async () => {
//       try {

//         const user = JSON.parse(sessionStorage.getItem("user"));
//         const accessToken = user?.accessToken || "";
//         const headers = {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         };

//         const response = await axios.get(
//           `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/findFatherRootFamilyTreeByMembershipCode/${membershipCode}`,
//           { headers }
//         );
//         setFamilyTreeData(response.data);
//       } catch (error) {
//         if (error.response?.status === 404) {
//           console.error("No data found for the provided membership code:", membershipCode);
//           setError("No family tree data found.");
//         } else {
//           console.error("Error fetching family tree data:", error);
//           setError("An unexpected error occurred. Please try again later.");
//         }
//       } finally {
//         setLoading(false);
//       }
      
//     };

//     fetchFamilyTree();
//   }, [membershipCode]);

//   const renderFamilyTree = (data) => {
//     if (!data) return null;

//     const renderTreeNodes = (node) => {
//       if (!node) return null;

//       const genderIcon = node.gender === "MALE" ? <ManOutlined color="primary" /> : <Woman2Outlined sx={{ color: "pink" }} />;
//       const backgroundColor = node.isAlive ? "lightgreen" : "lightcoral";

//       return (
//         <TreeNode
//           key={node.membershipId}
//           label={
//             <Box
//               sx={{
//                 padding: 1,
//                 borderRadius: 1,
//                 border: "1px solid #ccc",
//                 backgroundColor,
//                 display: "inline-block",
//                 textAlign: "center",
//               }}
//             >
//               {genderIcon}
//               <Typography variant="body1">{node.fullName}</Typography>
//             </Box>
//           }
//         >
//           {(node.childrenMemberships || []).map((child) => renderTreeNodes(child))}
//         </TreeNode>
//       );
//     };

//     return (
//       <Tree lineWidth="2px" lineColor="green" lineBorderRadius="10px">
//         {renderTreeNodes(data)}
//       </Tree>
//     );
//   };

//   return (
//     <Box sx={{ textAlign: "center", mt: 4 }}>
//       {loading && <CircularProgress />}
//       {error && <Typography color="error">{error}</Typography>}
//       {!loading && !error && familyTreeData ? (
//         renderFamilyTree(familyTreeData[0])
//       ) : (
//         <Typography>No data found</Typography>
//       )}
//     </Box>
//   );
// };

// export default FatherFamilyTree;
