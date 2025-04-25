import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../features/Api/BaseUrl'

export default function TalentPool() {

    const [data, setData] = useState([])

    const getdatay = () => {
        axios.get(`${baseUrl}getAll_candidates`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            setData(response.data.candidates)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    useEffect(() => {
        getdatay()
    }, [])

    return (
        <div>
            <p className='text-center fw-bold fs-3 my-5' style={{ color: "#000" }}>Talent Pool</p>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr. No.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Years of Experience</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Area of Specialization</TableCell>
                            <TableCell>Profile Summary</TableCell>
                            <TableCell>Handy help Rating</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data && data.length > 0 && data.map((item, index) => {
                                console.log(item)
                                return (
                                    <>
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.first_Name} {item.last_Name}</TableCell>
                                            <TableCell>{item.candidate_email}</TableCell>
                                            <TableCell>{item.phone_no}</TableCell>
                                            <TableCell>{item.Total_experience}</TableCell>
                                            <TableCell>{item.gender}</TableCell>
                                            <TableCell>{item.gender}</TableCell>
                                            <TableCell>{item.gender}</TableCell>
                                            <TableCell>{item.gender}</TableCell>
                                        </TableRow>
                                    </>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
