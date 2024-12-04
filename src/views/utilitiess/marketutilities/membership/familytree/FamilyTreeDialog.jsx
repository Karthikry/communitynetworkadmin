import React from 'react';
import { Card, CardContent, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Tree, TreeNode } from 'react-organizational-chart';
// import FamilyMemberCard from './FamilyMemberCard';
import maleImage from '../../../../../assets/images/Male-removebg-preview.png';
import femaleImage from '../../../../../assets/images/Female-removebg-preview.png';

const FamilyTreeDialog = ({ open, onClose, selectedFamilyTree }) => {

  const FamilyMemberCard = ({ member }) => (
    <Card
      style={{
        backgroundColor: member.isAlive ? '#90EE90' : '#ee6b6e',
        margin: '10px',
        minWidth: '120px',
      }}
    >
      {console.log(member)}

      <CardContent style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={member.gender === 'MALE' ? maleImage : femaleImage}
          alt={member.gender === 'MALE' ? 'Male' : 'Female'}
          style={{ width: 50, height: 50 }}
        />
        <Typography variant="body1" color="white">
          {member.fullName}
        </Typography>
      </CardContent>
    </Card>
  );

  const renderFamilyTree = (member) => (
    <div>
     <TreeNode label={<FamilyMemberCard member={member} />}>
      {member.parentsDTO &&
        member.parentsDTO.map((parent, index) => (
          <TreeNode key={`parent-${index}`} label={<FamilyMemberCard member={parent} />}>
            {/* <TreeNode label={<Typography></Typography>}/> */}
            {parent.spouses &&
              parent.spouses.map((spouse, spouseIndex) => (
                <TreeNode key={`parent-spouse-${spouseIndex}`} label={<FamilyMemberCard member={spouse} />} />
              ))}
          </TreeNode>
        ))}
      {member.siblingsDto && member.siblingsDto.length > 0 && (
        <TreeNode label={<Typography variant="body1" color="primary">Siblings</Typography>}>
          {member.siblingsDto.map((sibling, siblingIndex) => (
            <TreeNode key={`sibling-${siblingIndex}`} label={<FamilyMemberCard member={sibling} />} />
          ))}
        </TreeNode>
      )}
      {member.spouseDto && member.spouseDto.length > 0 && (
        <TreeNode label={<Typography variant="body1" color="primary">Spouse</Typography>}>
          {member.spouseDto.map((spouse, spouseIndex) => (
            <TreeNode key={`spouse-${spouseIndex}`} label={<FamilyMemberCard member={spouse} />} />
          ))}
        </TreeNode>
      )}
      {member.childrenDto && member.childrenDto.length > 0 && (
        <TreeNode label={<Typography variant="body1" color="primary">Children</Typography>}>
          {member.childrenDto.map((child) => renderFamilyTree(child))}
        </TreeNode>
      )}
   </TreeNode>
    </div>
  );

  return(
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>Family Tree</DialogTitle>
        <DialogContent>
          {selectedFamilyTree && (
            <Tree
              lineWidth={'2px'}
              lineColor={'blue'}
              lineBorderRadius={'10px'}
              // label={<FamilyMemberCard member={selectedFamilyTree} />}
            >
              {renderFamilyTree(selectedFamilyTree)}
            </Tree>
          )}
        </DialogContent>
    </Dialog>

        )
}

export default FamilyTreeDialog;