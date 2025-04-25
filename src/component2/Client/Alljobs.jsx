import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useLocation, useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { baseUrl } from '../../features/Api/BaseUrl';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ToastContainer, toast } from 'react-toastify';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

export default function Alljobs() {
    const location = useLocation();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState({})
    const [dataJobPost, setDataJobPost] = useState([]);
    const [dataJobPost12, setDataJobPost12] = useState([]);

    const handleClick = (event, jobId) => {
        setAnchorEl({ ...anchorEl, [jobId]: event.currentTarget });
    };

    const handleClose = (jobId) => {
        setAnchorEl({ ...anchorEl, [jobId]: null });
    };

    const handlefemale = (jobId) => {
        axios.get(`${baseUrl}get_Female_jobseeker_profile/${jobId}`)
            .then((response) => {
                const datauser = response.data.Details;
                navigate('/Admin/Details_jobs', { state: { data: datauser } });
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const handleother = (jobId) => {
        axios.get(`${baseUrl}get_jobseeker_profile/${jobId}`)
            .then((response) => {
                const datauser = response.data.Details;
                navigate('/Admin/Details_jobs', { state: { data: datauser } });
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    useEffect(() => {
        handlegetdata();
    }, []);

    const handlegetdata = () => {
        setDataJobPost(location?.state?.data);
        setDataJobPost12(location?.state?.suerdata);
    };

    const handleDelete = (jobId) => {
        axios.delete(`${baseUrl}deleteJob/${jobId}`)
            .then((response) => {
                handlegetdata();
                toast.success(response.data.message);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        {
                            dataJobPost && dataJobPost.length > 0 && dataJobPost.map((item, index) => {
                                return (
                                    <Card key={item.jobId} className='mb-3'>
                                        <CardContent>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <Typography variant="h5" sx={{ mb: 1.5 }} component="div" className='fw-bolder'>
                                                        {item.job_title}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls={`long-menu-${item.jobId}`}
                                                        aria-haspopup="true"
                                                        onClick={(e) => handleClick(e, item.jobId)}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id={`long-menu-${item.jobId}`}
                                                        anchorEl={anchorEl[item.jobId]}
                                                        keepMounted
                                                        open={Boolean(anchorEl[item.jobId])}
                                                        onClose={() => handleClose(item.jobId)}
                                                    >
                                                        <MenuItem className='text-success' onClick={() => handlefemale(item.jobId)}>Female</MenuItem>
                                                        <MenuItem className='text-success' onClick={() => handleother(item.jobId)}>Other</MenuItem>
                                                        <MenuItem className='text-success' onClick={() => handleDelete(item.jobId)}>Delete Job</MenuItem>
                                                    </Menu>
                                                </div>
                                            </div>
                                            <Typography variant="body2" className='fw-bold'>
                                                <ApartmentIcon />  {item.company_name}
                                                <br />
                                            </Typography>

                                            <Typography variant="body2" className='fw-bold' >
                                                <WorkOutlineIcon /> Vacancy: {item.Number_of_emp_needed}
                                                <br />
                                            </Typography>

                                            <Typography variant="body2" className='fw-bold'>
                                                <p ><LocationOnIcon /> {item.company_address}</p>

                                            </Typography>
                                            <Typography variant="" className='fw-bold'>
                                                <p className='d-flex ms-2'>{item.status === 1 ? (<p className='text-success'>Scheduled</p>) : (item.status === 2 ? (<p className='text-secondary'>Job Full Filled</p>) : (item.status === 3 ? (<p className='text-danger ms-2'>In-active</p>) : ("")))}</p>

                                            </Typography>
                                            <Typography color="text.secondary">
                                                <div className='d-flex'>
                                                    <p className='px-2 py-1 rounded mx-1' style={{ backgroundColor: "#d4d2d0" }}>{item?.salary_pay}</p>
                                                    <p className='px-2 py-1 rounded mx-1' style={{ backgroundColor: "#d4d2d0" }}>{item.job_type}</p>
                                                    <p className='px-2 py-1 rounded mx-1' style={{ backgroundColor: "#d4d2d0" }}>{item.company_address}</p>
                                                </div>
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                <div className='d-flex'>
                                                    <p className='px-2 py-1 rounded mx-1' style={{ backgroundColor: "#d4d2d0" }}>{item.company_name}</p>
                                                </div>
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                <div className='d-flex'>
                                                    <p >{item?.job_Description}</p>
                                                </div>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        }
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}
