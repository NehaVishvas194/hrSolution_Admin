import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, Paper, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios'
import { baseUrl } from '../../features/Api/BaseUrl'
import { ToastContainer, toast } from 'react-toastify'
export default function Secondtab() {

    const [data, setData] = useState([])
    const [error, setError] = useState({})
    const [inpres, setInpres] = useState("")
    const loginApproved = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handlekey12 = (e) => {
        if (e.charCode < 46 || e.charCode > 57) {
            e.preventDefault();
        }
    }

    const handleclickapi = () => {
        handlevalidate(data)
    }

    const handlevalidate = () => {
        apihit()
    }

    const apihit = () => {

        axios.post(`${baseUrl}leave_allowence`, {
            Basic_pay: parseInt(data.Basic_pay),
            leave_allowence_percentage: parseInt(data.leave_allowence_percentage),

        },{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
              
          },
          }).then((response) => {
            console.log(response.data.data)

            setInpres(response.data.data)

        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }

    return (
        <>
            <div className='container-fluid'>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <div className='mb-3'>
                            <TextField
                                className="mb-1 mt-3 w-100 "
                                label="Basic Salary"
                                name="Basic_pay"
                                type="text"
                                error={false}
                                autoComplete="off"
                                onChange={loginApproved}
                                onKeyPress={handlekey12}
                                size="normal"
                            ></TextField>
                            <p className='text-danger'>{error.Basic_pay}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className='mb-3'>
                            <TextField
                                className="mb-1 mt-3 w-100 "
                                label="Leave Allowance Percentage"
                                name="leave_allowence_percentage"
                                type="text"
                                error={false}
                                autoComplete="off"
                                onKeyPress={handlekey12}
                                onChange={loginApproved}
                                size="normal"
                            ></TextField>
                            <p className='text-danger'>{error.leave_allowence_percentage}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <button className='btn btn-primary py-3 w-100' onClick={handleclickapi}>Calculate</button>
                        </div>
                    </div>
                </div>
            </div>
            {inpres.length === 0 ? "" :(<>  <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Basic Salary</TableCell>
                            <TableCell>Annual Basic Salary</TableCell>
                            <TableCell>Leave Allowance % As per Industry CBA</TableCell>
                            <TableCell>Annual Leave Allowance </TableCell>
                            <TableCell>Income Tax on Leave Allowance</TableCell>
                            <TableCell>Net Leave Allowance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell>{inpres.Basic_pay}</TableCell>
                            <TableCell>{inpres.annual_Basic}</TableCell>
                            <TableCell>{inpres.leave_allowence_percentage}</TableCell>
                            <TableCell>{inpres.leave_allowence}</TableCell>
                            <TableCell>{inpres?.income_tax}</TableCell>
                            <TableCell>{inpres?.net_leave_allow}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer></>)}
           
            <ToastContainer />
        </>
    )
}
