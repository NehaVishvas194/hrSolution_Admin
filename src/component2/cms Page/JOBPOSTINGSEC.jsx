// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { baseUrl } from '../../features/Api/BaseUrl';
// import { baseurlImage } from '../../features/Imageurl';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box } from '@mui/material';
// import { toast } from 'react-toastify';
// export default function JOBPOSTINGSEC() {
//     const [data, setData] = useState({ Heading: '', Description: '', phone_no: '' });
//     const [formData, setFormData] = useState({ Heading: '', Description: '', logo: null });
//     const userID = localStorage.getItem('id');
//     const [open, setOpen] = useState(false);
//     useEffect(() => {
//         getData();
//     }, []);
//     const getData = async () => {
//         try {
//             const response = await axios.get(`${baseUrl}get_cms_need_any_job_section/${userID}`);
//             setData(response.data.Details);
//         } catch (error) {
//             console.error('Error fetching data:', error.response.data);
//         }
//     };
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setFormData({ ...formData, logo: file });
//     };

//     const handleApi = async () => {
//         const formDataObj = new FormData();
//         formDataObj.append('Heading', formData.Heading);
//         formDataObj.append('Description', formData.Description);
//         formDataObj.append('logo', formData.logo);
//         try {
//             const response = await axios.post(`${baseUrl}cms_need_any_job_section/${userID}`, formDataObj, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log('Response:', response.data);
//             getData();
//             setOpen(false);
//             toast.success(response.data.message)
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     };
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     return (
//         <div>
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
//                             name='Heading'
//                             label='Heading'
//                             variant='outlined'
//                         />
//                         <TextField
//                             id='outlined-basic'
//                             style={{ width: '100%' }}
//                             onChange={handleChange}
//                             name='Description'
//                             label='Description'
//                             variant='outlined'
//                             margin='normal'
//                         />
//                         <input
//                             type='file'
//                             onChange={handleFileChange}
//                             name='logo'
//                             margin='normal'
//                         />
//                         <Button
//                             variant='contained'
//                             onClick={handleApi}
//                             style={{ backgroundColor: '#2b6166', color: '#ffffff', marginTop: '20px' }}>
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
//                             <TableCell>Logo</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         <TableRow key={userID}>
//                             <TableCell>{data.Heading}</TableCell>
//                             <TableCell>{data.Description}</TableCell>
//                             <TableCell>
//                                 <img src={`${baseurlImage}/${data.logo}`} alt='Logo' style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
//                             </TableCell>
//                         </TableRow>
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { baseurlImage } from "../../features/Imageurl";
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
import { toast } from "react-toastify";

export default function JOBPOSTINGSEC() {
  const [data, setData] = useState({ Heading: "", Description: "", logo: "" });
  const [formData, setFormData] = useState({
    Heading: "",
    Description: "",
    logo: null,
  });
  const userID = localStorage.getItem("id");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}get_cms_need_any_job_section_admin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data.Details[0]);
    } catch (error) {
      // console.error('Error fetching data:', error.response.data);
      toast.error(error.response.data.message || "Error fetching data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, logo: file }));
  };

  const handleApi = async (id) => {
    const formDataObj = new FormData();
    formDataObj.append("Heading", formData.Heading);
    formDataObj.append("Description", formData.Description);
    formDataObj.append("logo", formData.logo);
    try {
      const response = await axios.post(
        `${baseUrl}cms_need_any_job_section/${id}`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      getData();
      setOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleOpen = () => {
    setFormData({
      _id: data._id,
      Heading: data.Heading || "",
      Description: data.Description || "",
      logo: null, // Reset logo file as it's not needed here
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
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
              name="Heading"
              label="Heading"
              variant="outlined"
              value={formData.Heading}
            />
            <TextField
              id="outlined-basic"
              style={{ width: "100%" }}
              onChange={handleChange}
              name="Description"
              label="Description"
              variant="outlined"
              margin="normal"
              value={formData.Description}
            />
            <input
              type="file"
              onChange={handleFileChange}
              name="logo"
              margin="normal"
            />
            <Button
              variant="contained"
              onClick={() => handleApi(formData._id)}
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
              <TableCell>Logo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{data.Heading}</TableCell>
              <TableCell>{data.Description}</TableCell>
              <TableCell>
                {data.logo && (
                  <img
                    src={`${baseurlImage}/${data.logo}`}
                    alt="Logo"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
