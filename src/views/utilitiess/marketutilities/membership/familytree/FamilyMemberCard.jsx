import React, { useState } from "react";
import { Button, Card, CardContent, Grid, Typography, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import maleImage from "../../../../../assets/images/Male-removebg-preview.png";
import femaleImage from "../../../../../assets/images/Female-removebg-preview.png";
import FatherFamilyTree from "./FatherFamilyTree"; // Ensure correct import path
import RootFamilyTree from "./RootFamilyTreeDialog"; // Ensure correct import path


const FamilyMemberCard = ({ member, onViewDetails, onViewFamilyTree, onViewRootFamilyTree }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openFamilyDialog, setOpenFamilyDialog] = useState(false);

  const [dialogMembershipCode, setDialogMembershipCode] = useState("");

  const handleOpenDialog = (membershipCode) => {
    setDialogMembershipCode(membershipCode);
    console.log(membershipCode);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  

  const handleOpenHusbandDialog = (membershipCode) => {
    setDialogMembershipCode(membershipCode);
    console.log(membershipCode);
    setOpenFamilyDialog(true);
  };

  const handleCloseFamilyDialog = () => {
    setOpenFamilyDialog(false);
  };

  const isMale = member.gender === "MALE";

  return (
    <>
      <Grid item xs={12} sm={12} md={12} key={member.membershipCode}>
        <Card
          style={{
            backgroundColor: member.isAlive ? "lightgreen" : "lightcoral",
            marginBottom: "20px",
          }}
        >
          <CardContent>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
              <img
                src={isMale ? maleImage : femaleImage}
                alt={isMale ? "Male" : "Female"}
                style={{ width: 50, height: 50 }}
              />
            </div>
            <Typography variant="h5">{member.fullName}</Typography>
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {new Date(member.dob).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              <strong>Application Number:</strong> {member.applicationNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Membership Code:</strong> {member.membershipCode}
            </Typography>
            <Typography variant="body1">
              <strong>Reference Membership Code:</strong> {member.referanceMembershipCode}
            </Typography>
            <Typography variant="body1">
              <strong>Female Family Ref Membership Code:</strong> {member.femaleFamilyRefMembershipCode}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {member.isAlive ? "Alive" : "Deceased"}
            </Typography>
            <Typography variant="body1">
              <strong>Married:</strong> {member.isMarried ? "Yes" : "No"}
            </Typography>
            <Typography variant="body1">
              <strong>Age:</strong> {member.age}
            </Typography>
            <Typography variant="body1">
              <strong>Gotra:</strong> {member.gothra}
            </Typography>

            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: "15px" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "white", color: "blue", border: "1px solid blue" }}
                onClick={onViewFamilyTree}
              >
                Family Tree
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "white", color: "purple", border: "1px solid purple" }}
                onClick={onViewDetails}
              >
                Personal Text
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: "10px" }}>

            {member.gender == "MALE"  ? <Button
                variant="contained"
                style={{ backgroundColor: 'white', color: 'blue', border: '1px solid blue' }}
                onClick={() => handleOpenHusbandDialog(member.membershipCode)}
              >Root Family Tree</Button>:""}


              {member.gender === "FEMALE" && member.isMarried ? (
                <>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "white", color: "blue", border: "1px solid blue" }}
                    onClick={() => handleOpenHusbandDialog(member.membershipCode)}

                  >
                    Husband Root Family Tree
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "white", color: "purple", border: "1px solid purple" }}
                    onClick={() => handleOpenDialog(member.membershipCode)}
                  >
                    Father Root Family Tree
                  </Button>
                </>
              ) : member.gender === "FEMALE" && !member.isMarried ? (
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white", color: "purple", border: "1px solid purple" }}
                  onClick={() => handleOpenDialog(member.membershipCode)}
                >
                  Father Root Family Tree
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </Grid>


      {/* Dialog for RootFamilyTree */}
      <Dialog open={openFamilyDialog} onClose={handleCloseFamilyDialog} fullWidth maxWidth="lg">
        <DialogContent>
          <IconButton
            style={{ position: "absolute", top: 10, right: 10 }}
            onClick={handleCloseFamilyDialog}
          >
            <CloseIcon />
          </IconButton>
          <RootFamilyTree membershipCode={dialogMembershipCode} />
        </DialogContent>
      </Dialog>

      {/* Dialog for FatherFamilyTree */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="lg">
        <DialogContent>
          <IconButton
            style={{ position: "absolute", top: 10, right: 10 }}
            onClick={handleCloseDialog}
          >
            <CloseIcon />
          </IconButton>
          <FatherFamilyTree membershipCode={dialogMembershipCode} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FamilyMemberCard;
