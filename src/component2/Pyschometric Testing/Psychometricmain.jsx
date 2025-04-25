import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box } from '@mui/material';
import { baseurlImage } from '../../features/Imageurl';
import axios from 'axios';
import { baseUrl } from '../../features/Api/BaseUrl';
import { ToastContainer, toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Psychometricmain() {
    const [datauser, setDatauser] = useState([]);
    const [username, setUsername] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [querry, setQuerry] = useState('')

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const postData = () => {
        const data123 = {

            category_name: username
        }
        axios.post(`${baseUrl}add_test_Category`, data123)
            .then(response => {
                console.log(response);
                toast.success(response.data.message);
                closeModal();
                getdata();
            })
            .catch(error => {
                console.log(error.response.data);
                toast.error(error.response.data.message);
            });
    };
    const getdata = () => {
        axios.get(`${baseUrl}getAll_psychometric_Category`).then((response) => {
            console.log(response.data.Category);
            setDatauser(response.data.Category);
        }).catch((error) => {
            console.log(error.response.data);
        });
    };
    useEffect(() => {
        getdata();
    }, []);

    const handleclick = (id) => {
        console.log(id)
        axios.delete(`${baseUrl}Delete_category/${id}`).then((response) => {
            console.log(response.data)
            getdata();
            toast.success(response.data.message);
        }).catch((error) => {
            console.log(error.response.data.message);
        });
    };
    const handlechnage = (e) => {
        setQuerry(e.target.value)
    }
    // const filterData = datauser.filter(item => {
    //     return item.username.toLowerCase().includes(querry.toLowerCase()) ||
    //         item.title.toLowerCase().includes(querry.toLowerCase()) ||
    //         item.Description.toLowerCase().includes(querry.toLowerCase())
    // })
    return (
        <div className="container main_container">
            <div className='d-flex justify-content-between mb-3'>
                <div>
                    <TextField id="outlined-size-small" size="small" onChange={handlechnage} value={querry} label="Search...." variant="outlined" />
                </div>
                <div>
                    <Button variant="contained" className="global_button" onClick={openModal}>ADD Category</Button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr. No.</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datauser && datauser.length > 0 && datauser.map((item, index) => {
                            console.log(item)
                            return (
                                <TableRow key={index + 1}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.category_name}</TableCell>
                                    <TableCell>
                                        <div className='d-flex'>
                                            <div>
                                                <DeleteForeverIcon className='text-danger' onClick={() => handleclick(item.category_id)} />
                                            </div>|
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                    <p id="modal-modal-title" className="fs-3 text-center fw-normal pb-3 mb-3">Add Category</p>
                    <TextField label="Category name" variant="outlined" className='mb-3' fullWidth onChange={(e) => setUsername(e.target.value)} />
                    <Button variant="contained" onClick={postData}>Submit</Button>
                </Box>
            </Modal>
            <ToastContainer />
        </div>
    );
}
