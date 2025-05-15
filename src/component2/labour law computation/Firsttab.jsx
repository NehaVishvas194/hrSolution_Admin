// import { Table, TableBody, TableCell, Paper, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { baseUrl } from '../../features/Api/BaseUrl';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { ToastContainer, toast } from 'react-toastify';

// export default function Firsttab() {

//   const [data, setData] = useState({});
//   const [error, setError] = useState({});
//   const [inpres, setInpres] = useState({});

//   const loginApproved = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const handlevalidate = () => {

//     handleapi();
//   };

//   const handleapi = () => {
//     axios
//       .post(`${baseUrl}calculate_EOSB`, data)
//       .then((response) => {
//         console.log(response.data.data);
//         setInpres(response.data.data);
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//       });
//   };

//   const handleclick = () => {
//     handlevalidate(data);
//   };

//   const handlekey = (e) => {
//     if (e.charCode < 48 || e.charCode > 57) {
//       e.preventDefault();
//     }
//   }

//   return (
//     <>
//       <div className='container'>
//         <div className='row mb-3'>
//           <div className='col-12 col-md-4 mb-3'>
//             <TextField
//               className='w-100'
//               label='Contract Start Date'
//               name='contract_start_Date'
//               type='date'
//               autoComplete='off'
//               onChange={loginApproved}
//               size='normal'
//               InputLabelProps={{ shrink: true }}
//             />
//           </div>
//           <div className='col-12 col-md-4 mb-3'>
//             <TextField
//               className='w-100'
//               label='Employment End Date'
//               name='Employment_end_Date'
//               type='date'
//               autoComplete='off'
//               onChange={loginApproved}
//               size='normal'
//               InputLabelProps={{ shrink: true }}
//             />
//           </div>
//           <div className='col-12 col-md-4 mb-3'>
//             <TextField
//               className='w-100'
//               label='EOSB Days Per Year'
//               name='EOSB_days_per_year'
//               type='text'
//               autoComplete='off'
//               onChange={loginApproved}
//               size='normal'
//               onKeyPress={handlekey}
//             />
//           </div>
//         </div>
//         <div className='row mb-3'>
      
//           <div className='col-12 col-md-4 mb-3'>
//             <TextField
//               className='w-100'
//               label='Basic Salary'
//               name='Basic_pay'
//               type='text'
//               error={!!error.Basic_pay}
//               autoComplete='off'
//               onChange={loginApproved}
//               size='normal'
//               onKeyPress={handlekey}
//             />
//           </div>
//           <div className='col-12 col-md-4 mb-5  d-flex align-items-end'>
//             <button
//               className='w-50 px-4 py-2 btn btn-primary mt-1'
//               // style={{ height: 'fit-content' }}
//               onClick={handleclick}
//             >
//               Calculate
//             </button>
//           </div>
//         </div>
        
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Contract Start Date </TableCell>
//                 <TableCell>Èmployment End Date </TableCell>
//                 <TableCell>Year Served</TableCell>
//                 <TableCell>End of Service Benefit Days Per Year</TableCell>
//                 <TableCell>Basic Salary</TableCell>
//                 <TableCell>Gross EOSB</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell>{inpres.contract_start_Date}</TableCell>
//                 <TableCell>{inpres.Employment_end_Date}</TableCell>
//                 {/* <TableCell>{inpres.payment_for_unutilized_leave_days}</TableCell> */}
//                 <TableCell>{inpres.year_served}</TableCell>
//                 <TableCell>{inpres.EOSB_days_per_year}</TableCell>
//                 <TableCell>{inpres.Basic_salary}</TableCell>
//                 <TableCell>{inpres.Gross_EOSB}</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <ToastContainer />
//       </div>
//     </>
//   );
// }
import { Table, TableBody, TableCell, Paper, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from '../../features/Api/BaseUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Firsttab() {

  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [inpres, setInpres] = useState("");

  const loginApproved = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handlevalidate = () => {
    const { contract_start_Date, Employment_end_Date } = data;

    let validationErrors = {};

    if (!contract_start_Date || !Employment_end_Date) {
      validationErrors.date = "Both dates are required.";
    } else if (new Date(contract_start_Date) >= new Date(Employment_end_Date)) {
      validationErrors.date = "Employment End Date must be after Contract Start Date.";
    }

    if (Object.keys(validationErrors).length === 0) {
      handleapi();
    } else {
      setError(validationErrors);
      toast.error(validationErrors.date);
    }
  };

  const handleapi = () => {
    axios
      .post(`${baseUrl}calculate_EOSB`, data,{
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
    handlevalidate();
  };

  const handlekey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  }

  return (
    <>
      <div className='container'>
        <div className='row my-3 align-items-center'>
          <div className='col-md-6 col-sm-4 mb-3'>
            <TextField
              className='w-100'
              label='Contract Start Date'
              name='contract_start_Date'
              type='date'
              autoComplete='off'
              onChange={loginApproved}
              size='normal'
              InputLabelProps={{ shrink: true }}
              error={!!error.date}
              helperText={error.date && "Invalid date range"}
            />
          </div>
          <div className='col-md-6  col-sm-4 mb-3'>
            <TextField
              className='w-100'
              label='Employment End Date'
              name='Employment_end_Date'
              type='date'
              autoComplete='off'
              onChange={loginApproved}
              size='normal'
              InputLabelProps={{ shrink: true }}
              error={!!error.date}
              helperText={error.date && "Invalid date range"}
            />
          </div>
          <div className='col-md-6 col-sm-4 mb-3'>
            <TextField
              className='w-100'
              label='EOSB Days Per Year'
              name='EOSB_days_per_year'
              type='text'
              autoComplete='off'
              onChange={loginApproved}
              size='normal'
              onKeyPress={handlekey}
            />
          </div>
          <div className='col-md-6  col-sm-4 mb-3'>
            <TextField
              className='w-100'
              label='Basic Salary'
              name='Basic_pay'
              type='text'
              error={!!error.Basic_pay}
              autoComplete='off'
              onChange={loginApproved}
              size='normal'
              onKeyPress={handlekey}
            />
          </div>
        </div>
       
          
          <div className='col-md-6 col-sm-4 mb-4'>
            <button
              className='py-3 btn btn-primary w-100'
              onClick={handleclick}
            >
              Calculate
            </button>
          </div>
       
       {inpres.length === 0 ? "" :(<><TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contract Start Date </TableCell>
                <TableCell>Employment End Date </TableCell>
                <TableCell>Year Served</TableCell>
                <TableCell>End of Service Benefit Days Per Year</TableCell>
                <TableCell>Basic Salary</TableCell>
                <TableCell>Gross EOSB</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{inpres.contract_start_Date}</TableCell>
                <TableCell>{inpres.Employment_end_Date}</TableCell>
                <TableCell>{inpres.year_served}</TableCell>
                <TableCell>{inpres.EOSB_days_per_year}</TableCell>
                <TableCell>{inpres.Basic_salary}</TableCell>
                <TableCell>{inpres.Gross_EOSB}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer></>)}
         
        <ToastContainer />
      </div>
    </>
  );
}
