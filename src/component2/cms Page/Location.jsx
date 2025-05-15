// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { baseUrl } from '../../features/Api/BaseUrl';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// export default function Location() {
//     const [data, setData] = useState([]);
//     const [data1, setData1] = useState({ heading: '', description: '' });
//     const [open, setOpen] = useState(false); // State to control modal open/close
//     const userid = localStorage.getItem('id');
//     useEffect(() => {
//         fetchData();
//     }, []);
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`${baseUrl}getcms_headquarter/${userid}`);
//             console.log(response.data.Details);
//             setData(response.data.Details);
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
//             const response = await axios.post(`${baseUrl}cmsHeadquarter/${userid}`, {
//                 company_address:data1.company_address,
//                 location:data1.location,
//             });
//             console.log(response.data);
//             fetchData();
//             setOpen(false);
//         } catch (error) {
//             console.error('Error posting data:', error.response.data);
//         }
//     };
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
//                     <h5 className='my-3 text-center'>Add Address</h5>
//                     <div className='d-flex flex-column'>
//                         <TextField
//                             id='outlined-basic'
//                             style={{ width: '100%' }}
//                             onChange={handleChange}
//                             name='company_address'
//                             label='Headquater Name'
//                             variant='outlined'
//                         />
//                         <TextField
//                             id='outlined-basic'
//                             style={{ width: '100%' }}
//                             onChange={handleChange}
//                             name='location'
//                             label='Location'
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
//                             <TableCell>Company Address </TableCell>
//                             <TableCell>Location Headquarter </TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         <TableRow>
//                             <TableCell>{data.company_address}</TableCell>
//                             <TableCell>{data.location}</TableCell>
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

export default function Location() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({ company_address: "", location: "" });
  const [open, setOpen] = useState(false); // State to control modal open/close
  const userid = localStorage.getItem("id");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}getcms_headquarter_admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.Details);
      setData(response.data.Details[0]);
    } catch (error) {
      // toast.error('Error fetching data:', error.response.data);
      toast.error(error.response.data.message || "Error fetching data:");
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
        `${baseUrl}cmsHeadquarter/${id}`,
        {
          company_address: data1.company_address,
          location: data1.location,
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
      toast.error(error.response.data.message || "Error posting data");
    }
  };

  const handleOpen = () => {
    // Populate the form fields with the existing data when opening the modal
    setData1({
      _id: data._id,
      company_address: data.company_address || "",
      location: data.location || "",
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
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h5 className="mb-4 text-center">Add Address</h5>
            <div className="d-flex flex-column gap-2">
              <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="company_address"
                label="Headquarter Name"
                variant="outlined"
                value={data1.company_address}
              />
              <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="location"
                label="Location"
                variant="outlined"
                margin="normal"
                value={data1.location}
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
                <TableCell>Company Address</TableCell>
                <TableCell>Location Headquarter</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{data.company_address}</TableCell>
                <TableCell>{data.location}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <ToastContainer />
        </TableContainer>
      </div>
    </>
  );
}
