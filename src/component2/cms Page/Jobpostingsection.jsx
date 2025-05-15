// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { baseUrl } from '../../features/Api/BaseUrl'
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
// export default function Jobpostingsection() {
//     const [data, setData] = useState([])
//     const [data1, setData1] = useState([])
//     useEffect(() => {
//         handledata()
//     }, [])
//     const userid = localStorage.getItem("id")
//     const handledata = () => {
//         axios.get(`${baseUrl}getJobs_posted_procedure_section1/${userid}`).then((response) => {
//             console.log(response.data.Details)
//             setData(response.data.Details)
//         }).catch((error) => {
//             console.log(error.response.data)
//         })
//     }

//     const handlechange = (e)=>{
//         const {name,value}=e.target
// setData1({...data1,[name]:value})
//     }

// const handleapi = () =>{
//     axios.post(`${baseUrl}cms_job_posting_section1/${userid}`,{
//         Heading:data.Heading , Description:data.Description
//     }).then((response)=>{
//         console.log(response.data)
//     }).catch((error)=>{
//         console.log(error.response.data)
//     })
// }

//     return (
//         <>
//             <div className='d-flex justify-content-around mx-2'>
//                 <div className='col mt-2 mb-3'>
//                     <TextField id="outlined-basic" style={{ width: '50%' }} onChange={handlechange} name='heading' label="Heading" variant="outlined" />
//                 </div>
//                 <div className='col mt-2 mb-3'>
//                     <TextField id="outlined-basic" style={{ width: '50%' }} onChange={handlechange} name='description' label="Description" variant="outlined" />
//                 </div>
//                 <div>
//                     <div>
//                         <Button variant="contained" onClick={handleapi} style={{ backgroundColor: "#2b6166", color: "#ffffff" }}>
//                             Add Staff
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Heading</TableCell>
//                             <TableCell>Description</TableCell>
//                             <TableCell>Update Status</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>

//                         <TableRow >
//                             <TableCell>{data.Heading}</TableCell>
//                             <TableCell>{data.Description}</TableCell>
//                             <TableCell>{data.phone_no}</TableCell>
//                         </TableRow>

//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </>
//     )
// }import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { baseUrl } from '../../features/Api/BaseUrl';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

// export default function Jobpostingsection() {
//     const [data, setData] = useState({ Heading: '', Description: '', phone_no: '' });
//     const [data1, setData1] = useState({ heading: '', description: '' });

//     // Fetch job posting data when the component mounts
//     useEffect(() => {
//         fetchData();
//     }, []);

//     const userid = localStorage.getItem('id');

//     // Function to fetch data from API
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`${baseUrl}getJobs_posted_procedure_section1/${userid}`);
//             console.log(response.data.Details);
//             setData(response.data.Details);
//         } catch (error) {
//             console.error('Error fetching data:', error.response.data);
//         }
//     };

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData1((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     // Function to post data to API
//     const handleApi = async () => {
//         try {
//             const response = await axios.post(`${baseUrl}cms_job_posting_section1/${userid}`, {
//                 Heading: data1.heading,
//                 Description: data1.description,
//             });
//             console.log(response.data);
//             // Fetch the updated data
//             fetchData();
//         } catch (error) {
//             console.error('Error posting data:', error.response.data);
//         }
//     };

//     return (
//         <>
//             <div className='d-flex justify-content-around mx-2'>
//                 <div className='col mt-2 mb-3'>
//                     <TextField
//                         id='outlined-basic'
//                         style={{ width: '50%' }}
//                         onChange={handleChange}
//                         name='heading'
//                         label='Heading'
//                         variant='outlined'
//                     />
//                 </div>
//                 <div className='col mt-2 mb-3'>
//                     <TextField
//                         id='outlined-basic'
//                         style={{ width: '50%' }}
//                         onChange={handleChange}
//                         name='description'
//                         label='Description'
//                         variant='outlined'
//                     />
//                 </div>
//                 <div>
//                     <Button variant='contained' className='me-3' onClick={handleApi} style={{ backgroundColor: '#2b6166', color: '#ffffff' }}>
//                         Add
//                     </Button>
//                 </div>
//             </div>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Heading</TableCell>
//                             <TableCell>Description</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         <TableRow key={userid}>
//                             <TableCell>{data.Heading}</TableCell>
//                             <TableCell>{data.Description}</TableCell>
//                         </TableRow>
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </>
//     );
// }

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { baseUrl } from '../../features/Api/BaseUrl';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// export default function Jobpostingsection() {
//     const [data, setData] = useState({ Heading: '', Description: '', phone_no: '' });
//     const [data1, setData1] = useState({ heading: '', description: '' });
//     const [open, setOpen] = useState(false); // State to control modal open/close
//     const userid = localStorage.getItem('id');
//     useEffect(() => {
//         fetchData();
//     }, []);
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`${baseUrl}getJobs_posted_procedure_section1/${userid}`);
//             console.log(response.data.Details);
//             setData(response.data.Details);
//             toast.success(response.data.message)
//         } catch (error) {
//             toast.error('Error fetching data:', error.response.data);
//         }
//     };
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData1((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };
//     const handleApi = async () => {
//         try {
//             const response = await axios.post(`${baseUrl}cms_job_posting_section1/${userid}`, {
//                 Heading: data1.heading,
//                 Description: data1.description,
//             });
//             console.log(response.data);
//             fetchData();
//             setOpen(false);
//         } catch (error) {
//             console.error('Error posting data:', error.response.data);
//         }
//     }
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     return (
//         <>
//             <Button variant='contained' className='me-3 mb-3' onClick={handleOpen} style={{ backgroundColor: '#2b6166', color: '#ffffff' }}>
//                 Update
//             </Button>
//             <Modal open={open} onClose={handleClose}>
//                 <Box
//                     sx={{
//                         position: 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         width: 400,
//                         bgcolor: 'background.paper',
//                         border: '2px solid #000',
//                         boxShadow: 24,
//                         p: 4,
//                     }}
//                 >
//                     <div className='d-flex flex-column'>
//                         <TextField
//                             id='outlined-basic'
//                             style={{ width: '100%' }}
//                             onChange={handleChange}
//                             name='heading'
//                             label='Heading'
//                             variant='outlined'
//                         />
//                         <TextField
//                             id='outlined-basic'
//                             style={{ width: '100%' }}
//                             onChange={handleChange}
//                             name='description'
//                             label='Description'
//                             variant='outlined'
//                             margin='normal'
//                         />
//                         <Button
//                             variant='contained'
//                             onClick={handleApi}
//                             style={{ backgroundColor: '#2b6166', color: '#ffffff', marginTop: '20px' }}
//                         >
//                             Submit
//                         </Button>
//                     </div>
//                 </Box>
//             </Modal>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Heading</TableCell>
//                             <TableCell>Description</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         <TableRow key={userid}>
//                             <TableCell>{data.Heading}</TableCell>
//                             <TableCell>{data.Description}</TableCell>
//                         </TableRow>
//                     </TableBody>
//                 </Table>
//                 <ToastContainer />
//             </TableContainer>
//         </>
//     );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

export default function Jobpostingsection() {
  const [data, setData] = useState({ Heading: "", Description: "" });
  const [data1, setData1] = useState({ heading: "", description: "" });
  const [open, setOpen] = useState(false); // State to control modal open/close
  const userid = localStorage.getItem("id");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getJobs_posted_procedure_section1_admin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.Details);
      setData(response.data.Details[0]);
      // toast.success(response.data.message);
    } catch (error) {
      toast.error("Error fetching data:", error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApi = async (id) => {
    try {
      const response = await axios.post(
        `${baseUrl}cms_job_posting_section1/${id}`,
        {
          Heading: data1.heading,
          Description: data1.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      fetchData();
      setOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleOpen = () => {
    setData1({
      _id: data._id,
      heading: data.Heading || "",
      description: data.Description || "",
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="container main_container">
        <Button
          variant="contained"
          className="me-3 mb-3"
          onClick={handleOpen}
          style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
        >
          Update
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              overflow: "auto",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <div className="d-flex flex-column gap-2">
              <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="heading"
                label="Heading"
                variant="outlined"
                value={data1.heading}
              />
              <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="description"
                label="Description"
                variant="outlined"
                margin="normal"
                value={data1.description}
              />
              <Button
                variant="contained"
                onClick={() => handleApi(data1._id)}
                style={{
                  backgroundColor: "#2b6166",
                  color: "#ffffff",
                  marginTop: "10px",
                }}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Modal>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Heading</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{data.Heading}</TableCell>
                <TableCell>{data.Description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <ToastContainer />
        </TableContainer>
      </div>
    </>
  );
}
