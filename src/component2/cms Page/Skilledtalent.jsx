 
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box } from '@mui/material';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { baseUrl } from '../../features/Api/BaseUrl';
import { ToastContainer, toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function Skilledtalent() {
    const [datauser, setDatauser] = useState([]);
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [jobtitle, setJobtitle] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const postData = () => {
        const data = {
            jobTitle: title,
            skill_Name: username
        };
        axios.post(`${baseUrl}addJob_skills`, data,{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
              
          },
          })
            .then(response => {
                console.log(response);
                toast.success(response.data.message);
                closeModal();
                getdata();
            })
            .catch(error => {
                
                toast.error(error.response.data.message);
                alert(error.response.data)
            });
    };

    const getdata = () => {
        axios.get(`${baseUrl}alljobSkills_admin`,{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
              
          },
          })
            .then(response => {
                console.log(response.data.details);
                setDatauser(response.data.details);
            })
            .catch(error => {
                // console.log(error.response.data);
                toast.error(error.response.data.message);
            });
    };

    // const getJobTitles = () => {
    //     axios.get(`${baseUrl}alljobTitle`)
    //         .then(response => {
    //             setJobtitle(response.data.details);
    //         })
    //         .catch(error => {
    //             console.log(error.response.data);
    //         });
    // };
    const getJobTitles = () => {
        axios.get(`${baseUrl}all_main_jobTitle`,{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
              
          },
          })
            .then(response => {
                setJobtitle(response.data.details);
            })
            .catch(error => {
                // console.log(error.response.data);
                toast.error(error.response.data.message);
            });
    };

    useEffect(() => {
        getdata();
        getJobTitles();
    }, []);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const filterData = datauser.filter(item => {
        const skillName = item.jobSkilss ? item.jobSkilss.toLowerCase() : '';
        const jobTitle = item.jobTitle ? item.jobTitle.toLowerCase() : '';
        return skillName.includes(query.toLowerCase()) || jobTitle.includes(query.toLowerCase());
    });

    // const handleDelete = (id) => {
    //             axios.delete(`${baseUrl}deletejobskill/${id}`)
    //                 .then(response => {
    //                     getdata();
    //                     toast.success(response.data.message);
    //                 })
    //                 .catch(error => {
    //                     console.log(error.response.data.message);
    //                 });
    //         };
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${baseUrl}deletejobskill/${id}`)
                    .then(response => {
                        getdata();
                        toast.success(response.data.message);
                    })
                    .catch(error => {
                        // console.log(error.response.data.message);
                        toast.error(error.response.data.message);
                    });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    return (
        <div className="content">
    
        <div className="content">
        <div className="row">
              <div className="col-md-12">
                <h4 className="page-title">Skilled Title</h4>
              </div>
            </div>
        <div className="container main_container">
            <div className='d-flex justify-content-between mb-3'>
                <div>
                    <TextField id="outlined-size-small" size="small" onChange={handleChange} value={query} label="Search..." variant="outlined" />
                </div>
                <div>
                    <Button variant="contained" className="global_button" onClick={openModal}>Add Skill</Button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr. No.</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Skill Name</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterData && filterData.length > 0 && filterData.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.jobTitle}</TableCell>
                                    <TableCell>{item.jobSkilss}</TableCell>
                                    <TableCell><div className='d-flex'>
                                        <DeleteForeverIcon className='text-danger' onClick={() => handleDelete(item._id)}  style={{cursor:"pointer"}} />
                                    </div></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="add-modal-title"
                aria-describedby="add-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <p id="add-modal-title" className="fs-3 text-center fw-normal pb-3 mb-3">Add Skills</p>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Job Title</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            label="Job Title"
                            id="demo-simple-select"
                            name='jobTitle'
                            onChange={(e) => setTitle(e.target.value)}
                        >
                            {jobtitle && jobtitle.length > 0 && jobtitle.map((item) => (
                                <MenuItem key={item._id} value={item.Main_jobTitle}>{item.Main_jobTitle}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Skill Name" name='skill_Name' variant="outlined" className='my-3' fullWidth onChange={(e) => setUsername(e.target.value)} />
                    <div className="text-center">
                        <Button variant="contained" onClick={postData}>Submit</Button>
                    </div>
                </Box>
            </Modal>
            <ToastContainer />
        </div>
        </div>
        </div>
    );
}
