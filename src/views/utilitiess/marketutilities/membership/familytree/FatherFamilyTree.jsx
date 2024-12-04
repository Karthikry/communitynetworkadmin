
import React, { useState, useEffect } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ManOutlined, Woman2Outlined } from "@mui/icons-material";
import axios from "axios";
import maleImage from '../../../../../assets/images/Male-removebg-preview.png';
import femaleImage from '../../../../../assets/images/Female-removebg-preview.png';

const FatherFamilyTree = ({ membershipCode }) => {
  const [familyTreeData, setFamilyTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFamilyTree = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const accessToken = user?.accessToken || "";
        const headers = {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get(
          `https://executivetracking.cloudjiffy.net/Mahaasabha/membership/v1/findFatherRootFamilyTreeByMembershipCode/${membershipCode}`,
          { headers }
        );
        setFamilyTreeData(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          console.error(
            "No data found for the provided membership code:",
            membershipCode
          );
          setError("No family tree data found.");
        } else {
          console.error("Error fetching family tree data:", error);
          setError("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyTree();
  }, [membershipCode]);

  const renderFamilyTree = (data) => {
    if (!data) return null;

    const renderTreeNodes = (node, relationship = "Self") => {
      if (!node) return null;

      const genderIcon = <img
      src={node.gender === 'MALE' ? maleImage : femaleImage}
      alt={node.gender === 'MALE' ? 'Male' : 'Female'}
      style={{ width: 50, height: 50 }}
    />
      const backgroundColor = node.isAlive ? "lightgreen" : "lightcoral";

      // Determine relationship for this node
      const relationshipDisplay =
        node.relationships?.length > 0
          ? node.relationships[0].relationshipName
          : relationship;

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
              <Typography variant="body2" color="textSecondary">
                ({relationshipDisplay})
              </Typography>
            </Box>
          }
        >
          {/* Render spouse */}
          {node.spouseMemberships?.map((spouse) =>
            renderTreeNodes(spouse, "Spouse")
          )}
          {/* Render children */}
          {node.childrenMemberships?.map((child) =>
            renderTreeNodes(child, "Child")
          )}
        </TreeNode>
      );
    };

    return (
      <Tree lineWidth="2px" lineColor="green" lineBorderRadius="10px">
        {renderTreeNodes(data)}
      </Tree>
    );
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && familyTreeData ? (
        renderFamilyTree(familyTreeData[0])
      ) : (
        <Typography>No data found</Typography>
      )}
    </Box>
  );
};

export default FatherFamilyTree;
