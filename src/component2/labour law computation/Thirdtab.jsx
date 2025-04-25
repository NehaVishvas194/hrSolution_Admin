import { Table, TableBody, TableCell, TableContainer, Paper, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { baseUrl } from '../../features/Api/BaseUrl'
import { ToastContainer, toast } from 'react-toastify'

export default function Thirdtab() {

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
    axios.post(`${baseUrl}Overtime`, {
      Basic_pay: parseInt(data.Basic_pay),
      OT_Hours_weekday: parseInt(data.OT_Hours_weekday),
      OT_Hours_weekend: parseInt(data.OT_Hours_weekend)
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
      <div className='container'>
        <div className="row align-items-center">
          <div className="col-md-3">
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
          <div className="col-md-3">
            <div className='mb-3'>
              <TextField
                className="mb-1 mt-3 w-100 "
                label="OT Week Days"
                name="OT_Hours_weekday"
                type="text"
                error={false}
                autoComplete="off"
                onKeyPress={handlekey12}
                onChange={loginApproved}
                size="normal"
              ></TextField>
              <p className='text-danger'>{error.OT_Hours_weekday}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className='mb-3'>
              <TextField
                className="mb-1 mt-3 w-100 "
                label="OT Week End Days"
                name="OT_Hours_weekend"
                type="text"
                error={false}
                autoComplete="off"
                onKeyPress={handlekey12}
                onChange={loginApproved}
                size="normal"
              ></TextField>
              <p className='text-danger'>{error.OT_Hours_weekend}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div>
              <button className='py-3 btn btn-primary w-100' onClick={handleclickapi}>Calculate</button>
            </div>
          </div>
        </div>
      </div>
      {inpres.length === 0 ? "": (<><TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Current Basic Salary</TableCell>
              <TableCell>Basic Salary Per Day</TableCell>
              <TableCell>Basic Salary Per Hour</TableCell>
              <TableCell>OT Hours Weekday</TableCell>
              <TableCell>OT Hours Weekend  </TableCell>
              <TableCell>OT Computation On Weekday</TableCell>
              <TableCell>OT Computation On Weekend</TableCell>
              <TableCell>Overtime Computation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow >
              <TableCell className=''>{inpres.Basic_pay}</TableCell>
              <TableCell>{inpres.Basic_pay_per_day}</TableCell>
              <TableCell>{inpres.Basic_pay_per_Hour}</TableCell>
              <TableCell>{inpres.OT_Hours_weekday === null || undefined ? 0 : inpres.OT_Hours_weekday}</TableCell>
              <TableCell>{inpres.OT_Hours_weekend === null || undefined ? 0 : inpres.OT_Hours_weekend}</TableCell>
              <TableCell>{inpres.OT_computation_on_weekday}</TableCell>
              <TableCell>{inpres.OT_computation_on_weekend}</TableCell>
              <TableCell>{inpres.total_overTime}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer></>)}
       
      <ToastContainer />
    </>
  )
}
