import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import maleImage from '../../../../../assets/images/Male-removebg-preview.png';
import femaleImage from '../../../../../assets/images/Female-removebg-preview.png';

const MemberDetailsDialog = ({ open, onClose, selectedMemberDetails, fetchMemberDetails }) => (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Personal Details</DialogTitle>
        <DialogContent>
            {selectedMemberDetails ? (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img
                            src={selectedMemberDetails.gender === 'MALE' ? maleImage : femaleImage}
                            alt={selectedMemberDetails.gender === 'MALE' ? 'Male' : 'Female'}
                            style={{ width: 50, height: 50 }}
                        />
                        <Typography
                            variant="h5"
                            style={{
                                backgroundColor: selectedMemberDetails.isAlive ? 'lightgreen' : 'lightpink',
                                padding: '5px',
                                borderRadius: '5px',
                                marginLeft: '10px'
                            }}
                        >
                            {selectedMemberDetails.fullName}
                        </Typography>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <Typography variant="h6" color="primary">Parents</Typography>
                        {selectedMemberDetails.parentsDTO && selectedMemberDetails.parentsDTO.length > 0 ? (
                            selectedMemberDetails.parentsDTO.map((parent) => (
                                <div key={parent.membershipId} style={{ marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <img
                                            src={parent.gender === 'MALE' ? maleImage : femaleImage}
                                            alt={parent.gender === 'MALE' ? 'Male' : 'Female'}
                                            style={{ width: 50, height: 50 }}
                                        />
                                        <Button onClick={() => fetchMemberDetails(parent.membershipCode)}>
                                            <Typography
                                                variant="body1"
                                                style={{
                                                    backgroundColor: parent.isAlive ? 'lightgreen' : 'lightpink',
                                                    padding: '5px',
                                                    borderRadius: '5px',
                                                    marginLeft: '10px'
                                                }}
                                            >
                                                {parent.fullName}
                                            </Typography>
                                        </Button>
                                    </div>
                                    {parent.spouses && parent.spouses.length > 0 && parent.spouses.map((spouse) => (
                                        <div key={spouse.membershipId} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                            <img
                                                src={spouse.gender === 'MALE' ? maleImage : femaleImage}
                                                alt={spouse.gender === 'MALE' ? 'Male' : 'Female'}
                                                style={{ width: 50, height: 50 }}
                                            />
                                            <Button onClick={() => fetchMemberDetails(spouse.membershipCode)}>
                                                <Typography
                                                    variant="body1"
                                                    style={{
                                                        backgroundColor: spouse.isAlive ? 'lightgreen' : 'lightpink',
                                                        padding: '5px',
                                                        borderRadius: '5px',
                                                        marginLeft: '10px'
                                                    }}
                                                >
                                                    {spouse.fullName}
                                                </Typography>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">No parents data found.</Typography>
                        )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <Typography variant="h6" color="primary">Siblings</Typography>
                        {selectedMemberDetails.siblingsDto && selectedMemberDetails.siblingsDto.length > 0 ? (
                            selectedMemberDetails.siblingsDto.map((sibling) => (
                                <div key={sibling.membershipId} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <img
                                        src={sibling.gender === 'MALE' ? maleImage : femaleImage}
                                        alt={sibling.gender === 'MALE' ? 'Male' : 'Female'}
                                        style={{ width: 50, height: 50 }}
                                    />
                                    <Button onClick={() => fetchMemberDetails(sibling.membershipCode)}>
                                        <Typography
                                            variant="body1"
                                            style={{
                                                backgroundColor: sibling.isAlive ? 'lightgreen' : 'lightpink',
                                                padding: '5px',
                                                borderRadius: '5px',
                                                marginLeft: '10px'
                                            }}
                                        >
                                            {sibling.fullName}
                                        </Typography>
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">No siblings data found.</Typography>
                        )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <Typography variant="h6" color="primary">Spouse</Typography>
                        {selectedMemberDetails.spouseDto && selectedMemberDetails.spouseDto.length > 0 ? (
                            selectedMemberDetails.spouseDto.map((spouse) => (
                                <div key={spouse.membershipId} style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={spouse.gender === 'MALE' ? maleImage : femaleImage}
                                        alt={spouse.gender === 'MALE' ? 'Male' : 'Female'}
                                        style={{ width: 50, height: 50 }}
                                    />
                                    <Button onClick={() => fetchMemberDetails(spouse.membershipCode)}>
                                        <Typography
                                            variant="body1"
                                            style={{
                                                backgroundColor: spouse.isAlive ? 'lightgreen' : 'lightpink',
                                                padding: '5px',
                                                borderRadius: '5px',
                                                marginLeft: '10px'
                                            }}
                                        >
                                            {spouse.fullName}
                                        </Typography>
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">No spouse data found.</Typography>
                        )}
                    </div>

                    <div>
                        <Typography variant="h6" color="primary">Children</Typography>
                        {selectedMemberDetails.childrenDto && selectedMemberDetails.childrenDto.length > 0 ? (
                            selectedMemberDetails.childrenDto.map((child) => (
                                <div key={child.membershipId} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <img
                                        src={child.gender === 'MALE' ? maleImage : femaleImage}
                                        alt={child.gender === 'MALE' ? 'Male' : 'Female'}
                                        style={{ width: 50, height: 50 }}
                                    />
                                    <Button onClick={() => fetchMemberDetails(child.membershipCode)}>
                                        <Typography
                                            variant="body1"
                                            style={{
                                                backgroundColor: child.isAlive ? 'lightgreen' : 'lightpink',
                                                padding: '5px',
                                                borderRadius: '5px',
                                                marginLeft: '10px'
                                            }}
                                        >
                                            {child.fullName}
                                        </Typography>
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">No children data found.</Typography>
                        )}
                    </div>
                </div>
            ) : (
                <Typography>Loading details...</Typography>
            )}
        </DialogContent>
    </Dialog>
);

export default MemberDetailsDialog;