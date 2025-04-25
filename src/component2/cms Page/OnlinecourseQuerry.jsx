import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../features/Api/BaseUrl'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
export default function OnlinecourseQuerry() {
 
    const [data,setData]=useState([])
 
    useEffect(()=>{
        gedata()
 },[])

const gedata = ()=>{
    axios.get(`${baseUrl}all_enq_of_courses`).then((responsse)=>{
        console.log(responsse.data.all_enq)
        setData(responsse.data.all_enq)
    }).catch((error)=>{
        console.log(error.response.data)
    })
}

 return (
    <div>
    <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.first_name} {" "}{item.last_name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone_no}</TableCell>
                <TableCell>{item.message}</TableCell>
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
