import { Table, TableBody, TableCell, Paper, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from '../../features/Api/BaseUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
export default function Fourthtab() {
  const [data, setData] = useState({
    Hazard_and_other_allowance: "",
    transport_allowance: "",
    rent_allowance: "",
    Basic_pay: ""
  });
  const [error, setError] = useState({});
  const [inpres, setInpres] = useState("");

  const loginApproved = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handlevalidate = () => {
    handleapi();
  };

  const handleapi = () => {
    const data1 = {
      total_Allowance: parseInt(data.total_Allowance),
      Basic_pay: parseInt(data.Basic_pay),
    }
    axios.post(`${baseUrl}net_salary`, data1,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        
    },
    })
      .then((response) => {
        console.log(response.data.data);
        setInpres(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleclick = () => {
    handlevalidate(data);
  };

  const handlekey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  }

  return (
    <>
      <div className="container">
        <div className="row align-items-start my-3">
          <div className="col-md-4">
            <TextField
              className="w-100"
              label="Total Allowance "
              name="total_Allowance"
              type="text"
              autoComplete="off"
              onChange={loginApproved}
              size="normal"
              onKeyPress={handlekey}
            />
            <p className="text-danger">{error.Hazard_and_other_allowance}</p>
          </div>

          <div className="col-md-4">
            <TextField
              className="w-100"
              label="Basic Salary"
              name="Basic_pay"
              type="text"
              error={!!error.Basic_pay}
              autoComplete="off"
              onChange={loginApproved}
              size="normal"
              onKeyPress={handlekey}
            />
            <p className="text-danger">{error.Basic_pay}</p>
          </div>
          <div className="col-md-4">
            <button
              className="py-3 btn btn-primary w-100"
              onClick={handleclick}
            >
              Calculate
            </button>
          </div>
        </div>
        {inpres.length === 0 ? "":(<> <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Basic Salary</TableCell>
                <TableCell>Total Allowance</TableCell>
                <TableCell>Gross Salary</TableCell>
                <TableCell>Nassit %</TableCell>
                <TableCell>Non Taxable Pay</TableCell>
                <TableCell> Taxable Pay</TableCell>
                <TableCell>Paye</TableCell>
                <TableCell>Total Deduction</TableCell>
                <TableCell> Net Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{inpres.Basic_pay}</TableCell>
                <TableCell>{inpres.total_Allowance}</TableCell>
                <TableCell>{inpres.gross_salary}</TableCell>
                <TableCell>{inpres.nassit}</TableCell>
                <TableCell>{inpres.non_taxable_pay}</TableCell>
                <TableCell>{inpres.taxable_pay}</TableCell>
                <TableCell>{inpres.PAYE}</TableCell>
                <TableCell>{inpres.total_deduction}</TableCell>
                <TableCell>{inpres.net_Salary}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer></>)}
        
        <ToastContainer />
      </div>
    </>
  );
}
