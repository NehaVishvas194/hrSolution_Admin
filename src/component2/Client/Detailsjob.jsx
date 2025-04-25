
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { baseurlImage } from '../../features/Imageurl'
export default function Detailsjob() {
    const location = useLocation();
    const datauser = location.state?.data;
    console.log(datauser)
    return (
        <div className="container main_container">
            <div className='d-flex justify-content-between mb-3'>
                <div>
                    <TextField id="outlined-basic" label="Search...." variant="outlined" />
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Experience</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Job-Seeker Status</TableCell>
                            <TableCell>Candidate Status</TableCell>
                            <TableCell>Resume</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datauser && datauser.length > 0 && datauser.map((item, index) => {
                            console.log(item)
                            return (
                                <TableRow key={index}>
                                    <TableCell>{item.first_Name} {item.last_Name}</TableCell>
                                    <TableCell>{item.user_Email}</TableCell>
                                    <TableCell>{item.phone_no}</TableCell>
                                    <TableCell>{item.Total_experience} Yr</TableCell>
                                    <TableCell>{item.city}</TableCell>
                                    <TableCell>{item.gender}</TableCell>
                                    <TableCell>{item.jobSeeker_status === 1 ? (<p className='text-secondary pt-2'>Pending</p>) : (item.jobSeeker_status === 2 ? (<p className='text-success'>Interview Schedule</p>) : (item.jobSeeker_status === 3 ? (<p className='text-success'>Imterview Complited</p>) : (item.jobSeeker_status === 4 ? (<p className='text-success'>Shortlisted</p>) : (item.jobSeeker_status === 5 ? (<p className='text-danger'>Rejected</p>) : ("df")))))}</TableCell>
                                    <TableCell>{item.candidateStatus === 0 ? (<p>Closed </p>) : (item.candidateStatus === 1 ? (<p>Active</p>) : (item.candidateStatus === 2 ? (<p>Screened</p>) : ("")))}</TableCell>
                                    <TableCell>
                                        <a href={`${baseurlImage}${item.resume}`} target="_blank" rel="noopener noreferrer">
                                            View Resume
                                        </a>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
