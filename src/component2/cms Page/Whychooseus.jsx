// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { baseUrl } from '../../features/Api/BaseUrl';
// // import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box } from '@mui/material';
// // import { ToastContainer, toast } from 'react-toastify';

// // export default function Whychooseus() {
// //     const [data, setData] = useState([]);
// //     const [data1, setData1] = useState({ Heading: '', Description: '' });
// //     const [open, setOpen] = useState(false);

// //     const userid = localStorage.getItem('id');

// //     useEffect(() => {
// //         fetchData();
// //     }, []);

// //     const fetchData = async () => {
// //         try {
// //             const response = await axios.get(`${baseUrl}get_ourVission_details`);
// //             console.log(response.data.Details);
// //             setData(response.data.Details);
// //             // Set initial state of data1 with the first element of data
// //             if (response.data.Details.length > 0) {
// //                 setData1(response.data.Details[0]);
// //             }
// //         } catch (error) {
// //             toast.error('Error fetching data:', error.response.data);
// //         }
// //     };

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setData1((prevData) => ({
// //             ...prevData,
// //             [name]: value,
// //         }));
// //     };

// //     const handleApi = async () => {
// //         try {
// //             const response = await axios.post(`${baseUrl}cms_our_vission`, {
// //                 Heading: data1.Heading,
// //                 Description: data1.Description,
// //             });
// //             console.log(response.data);
// //             fetchData();
// //             setOpen(false);
// //         } catch (error) {
// //             console.error('Error posting data:', error.response.data);
// //         }
// //     };

// //     const handleOpen = () => setOpen(true);
// //     const handleClose = () => setOpen(false);

// //     return (
// //         <>
// //             <Button variant='contained' className='me-3 mb-3' onClick={handleOpen} style={{ backgroundColor: '#2b6166', color: '#ffffff' }}>
// //                 Update
// //             </Button>

// //             <Modal open={open} onClose={handleClose}>
// //                 <Box
// //                     sx={{
// //                         position: 'absolute',
// //                         top: '50%',
// //                         left: '50%',
// //                         transform: 'translate(-50%, -50%)',
// //                         width: 400,
// //                         bgcolor: 'background.paper',
// //                         border: '2px solid #000',
// //                         boxShadow: 24,
// //                         p: 4,
// //                     }}
// //                 >
// //                     <div className='d-flex flex-column'>
// //                         <TextField
// //                             id='outlined-basic'
// //                             style={{ width: '100%' }}
// //                             onChange={handleChange}
// //                             name='Heading'
// //                             label='Heading'
// //                             variant='outlined'
// //                             value={data1.Heading}
// //                         />
// //                         <TextField
// //                             id='outlined-basic'
// //                             style={{ width: '100%' }}
// //                             onChange={handleChange}
// //                             name='Description'
// //                             label='Description'
// //                             variant='outlined'
// //                             margin='normal'
// //                             value={data1.Description}
// //                         />
// //                         <Button
// //                             variant='contained'
// //                             onClick={handleApi}
// //                             style={{ backgroundColor: '#2b6166', color: '#ffffff', marginTop: '20px' }}
// //                         >
// //                             Submit
// //                         </Button>
// //                     </div>
// //                 </Box>
// //             </Modal>

// //             <TableContainer component={Paper}>
// //                 <Table>
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell>Heading</TableCell>
// //                             <TableCell>Description</TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {
// //                             data && data.length > 0 && data.map((item, index) => {
// //                                 console.log(item)
// //                                 return (
// //                                     <TableRow key={index}>
// //                                         <TableCell>{item.Heading}</TableCell>
// //                                         <TableCell>{item.Description}</TableCell>
// //                                     </TableRow>
// //                                 )
// //                             })
// //                         }
// //                     </TableBody>
// //                 </Table>
// //                 <ToastContainer />
// //             </TableContainer>
// //         </>
// //     );
// // }

// import React, { useEffect, useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import { baseUrl } from '../../features/Api/BaseUrl';

// const Whychooseus = () => {
//   const [heading, setHeading] = useState('');
//   const [description12, setDescription12] = useState('');

//   useEffect(() => {
//     getdataapi();
//   }, []);

//   const userid = localStorage.getItem('id');

//   const getdataapi = () => {
//     axios.get(`${baseUrl}getDetails_why_choose_us`)
//       .then((response) => {
//         console.log(response.data.Details);
//         setHeading(response.data.Details.Heading);
//         setDescription12(response.data.Details.Description);
//         console.log(response.data.Details.Description);
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   };
//   const handleGetData = () => {
//     const postdata = {
//       Heading: heading,
//       Description: description12,
//     };

//     axios.post(`${baseUrl}cms_why_choose_us`,postdata)
//       .then((response) => {
//         toast.success(response.data.message)

//         console.log(response.data)
//         console.log(response.data.Details.Heading);
//           setHeading(response.data.Details.Heading);
//           setDescription12(response.data.Details.Heading);
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//         // console.log(error.response.data.message);
//       });
//   };

//   const handleHeadingChange = (e) => {
//     setHeading(e.target.value);
//   };

//   const handleDescriptionChange = (event, editor) => {
//     const newData = editor.getData();
//     setDescription12(newData);
//   };

//   return (
//     <>
//       <div className="wpWrapper">
//         <div className="container-fluid ">
//           <div className='row mx-2 mt-3'>
//             <div className='col'>
//               <div className="card" >
//                 <div className="card-body">
//                   <div className="card-text">
//                     <div className="App">
//                       <p className='fs-3 fw-bold text-center mt-2'>Why Choose-Us</p>
//                       <div className="form-floating mb-3">
//                         <input type="text" className='w-100 py-2 text-dark bg-white rounded px-2 border' value={heading} placeholder='heading' name='heading' onChange={handleHeadingChange} />
//                       </div>
//                       <CKEditor
//                         editor={ClassicEditor}
//                         data={description12}
//                         onChange={handleDescriptionChange}
//                       />
//                       <div className="text-center">
//                         <button onClick={handleGetData} className='w-25 px-3 py-2 btn btn-primary mt-3'>Update</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <ToastContainer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Whychooseus;
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../features/Api/BaseUrl";

const Whychooseus = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getDetails_why_choose_us_admin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.Details);
      setHeading(response.data.Details.Heading);
      setDescription(response.data.Details.Description);
    } catch (error) {
      console.error("Error fetching data:", error.response.data.message);
      toast.error(error.response.data.message || "Error fetching data:");
    }
  };

  const handleUpdate = async () => {
    const postData = {
      Heading: heading,
      Description: description,
    };
    try {
      const response = await axios.post(
        `${baseUrl}cms_why_choose_us`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.message || "Error posting data:");
    }
  };

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleDescriptionChange = (event, editor) => {
    const newData = editor.getData();
    setDescription(newData);
  };

  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <p className="fs-3 fw-bold text-center mt-2 pb-3">Why Choose Us</p>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="w-100 py-2 text-dark bg-white rounded px-2 border"
                value={heading}
                placeholder="Heading"
                name="heading"
                onChange={handleHeadingChange}
              />
            </div>
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={handleDescriptionChange}
            />
            <div className="text-center">
              <button
                onClick={handleUpdate}
                className="w-25 px-3 py-2 btn btn-primary mt-3"
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Whychooseus;
