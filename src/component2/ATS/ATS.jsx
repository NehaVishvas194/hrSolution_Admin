import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
   Paper, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { baseUrl } from '../../features/Api/BaseUrl';
import { baseurlImage } from '../../features/Imageurl';
import { ToastContainer, toast } from 'react-toastify';

function CustomTabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function ATS() {
  const [value, setValue] = useState(0);
  const [filRevelent, setFilRevelent] = useState([]);
  const [jobhead, setJobhead] = useState('');
  const [data, setData] = useState([]);
  const [datauser, setDatauser] = useState([]);
  const [datauser1, setDatauser1] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${baseUrl}getAll_candidates?gender=Female`).then((response) => {
      setDatauser(response.data.candidates);
    }).catch((error) => {
      console.error(error);
    });
    axios.get(`${baseUrl}getAll_candidates?gender=Male`).then((response) => {
      console.log(response.data.message)
      setDatauser1(response.data.candidates);
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
    axios.get(`${baseUrl}alljobTitle`).then((response) => {
      setData(response.data.details);
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  const handleChange12 = (jobId, e) => {
    const { name, value } = e.target;
    setFilRevelent({ ...filRevelent, [name]: value });
    axios.get(`${baseUrl}get_jobseeker_profile/${jobId}?jobSeeker_status=${value}`)
    .then((response) => {
    fetchData();
    toast.success(response.data.message)
      setDatauser(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  
  const handleChangeJobhead = (e) => {
    const { name, value } = e.target;
    setJobhead({ ...jobhead, [name]: value });
    axios.get(`${baseUrl}getAll_candidates?job_Heading=${value}`)
      .then((response) => {
        setDatauser1(response.data.candidates);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleChangeJobheadwomen = (e) => {
    const { name, value } = e.target;
    setJobhead({ ...jobhead, [name]: value });

    axios.get(`${baseUrl}getAll_candidates?job_Heading=${value}`)
      .then((response) => {
        setDatauser(response.data.candidates);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleChange212 = (e) => {
    const { name, value } = e.target
    setFilRevelent({ ...filRevelent, [name]: value })
    axios.get(`${baseUrl}getAll_candidates?relevant_experience=${value}`).then((response) => {
      setDatauser1(response.data.candidates)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  }
  
  const handleChange212women =(e) =>{
    const {name,value}=e.target
    setFilRevelent({...filRevelent,[name]:value})
    axios.get(`${baseUrl}getAll_candidates?revelent_experience=${value}`).then((response)=>{
      setDatauser(response.data.candidates)
    }).catch((error)=>{
      toast.error(error.response.data.message)
    })
  }
  
  return (
    <>
     <p className='text-center my-3 fw-bold fs-3' style={{color:'#2e47cc'}}>ATS (Application Tracking System)</p>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}  aria-label="basic tabs example">
          <Tab label="Male" {...a11yProps(0)} />
          <Tab label="Female" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div>
          <div className="d-flex mb-3">
            <div className='mx-2'>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Relevant Experience</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange212}
                    value={filRevelent}
                    label="Experience"
                    name='relevant_experience'
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7+</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="mx-2">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Job Heading</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChangeJobhead}
                    value={jobhead}
                    label="Title"
                    name="job_Heading"
                  >
                    {data &&
                      data.length > 0 &&
                      data.map((item, index) => (
                        <MenuItem key={index} value={item.jobTitle}>
                          {item.jobTitle}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Job Heading</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Resume</TableCell>
                  <TableCell>Update Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datauser1 &&
                  datauser1.length > 0 &&
                  datauser1.map((item, index) => {
                    console.log(item)
                    return (
                      <>
                        <TableRow key={index}>
                          <TableCell>{item.jobId}</TableCell>
                          <TableCell>{`${item.first_Name} ${item.last_Name}`}</TableCell>
                          <TableCell>{item.candidate_email}</TableCell>
                          <TableCell>{item.phone_no}</TableCell>
                          <TableCell>{item.company_name}</TableCell>
                          <TableCell>{item.Total_experience} Yr</TableCell>
                          <TableCell>{item.job_Heading}</TableCell>
                          <TableCell>
                            {item.jobSeeker_status === 1 ? (
                              <p className="text-secondary pt-2">Pending</p>
                            ) : item.jobSeeker_status === 2 ? (
                              <p className="text-success">Interview Schedule</p>
                            ) : item.jobSeeker_status === 3 ? (
                              <p className="text-success">Assessment</p>
                            ) : item.jobSeeker_status === 4 ? (
                              <p className="text-success">HR Discussion</p>
                            ) : item.jobSeeker_status === 5 ? (
                              <p className="text-danger">Complete</p>
                            ) : item.jobSeeker_status === 6 ? (
                              <p>Shortlist</p>
                            ) : item.jobSeeker_status === 7 ? (
                              <p className="text-danger">Reject</p>
                            ) : (
                              ""
                            )}
                          </TableCell>
                          <TableCell>
                            <a href={`${baseurlImage}${item.candidate_resume}`}>
                              <p className="text-primary">view </p>
                            </a>
                          </TableCell>
                          <TableCell>
                            <FormControl>
                              <InputLabel id="demo-simple-select-label">Update Status</InputLabel>
                              <Select
                                onChange={(e) => handleChange12(item.jobId,e)}
                                label="Update Status"
                                name="job_Seeker_status"
                              >
                                <MenuItem value="2">Schedule Interview</MenuItem>
                                <MenuItem value="3">Assessment</MenuItem>
                                <MenuItem value="4">HR Discussion</MenuItem>
                                <MenuItem value="5">Complete</MenuItem>
                                <MenuItem value="6">Shortlist</MenuItem>
                                <MenuItem value="7">Reject</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      </>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>
          <div className="d-flex mb-3">
            <div className='mx-2'>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Relevant Experience</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange212women}
                    value={filRevelent}
                    label="Experience"
                    name='relevant_experience'
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7+</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="mx-2">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Job Heading</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChangeJobheadwomen}
                    value={jobhead}
                    label="Title"
                    name="job_Heading"
                  >
                    {data &&
                      data.length > 0 &&
                      data.map((item, index) => (
                        <MenuItem key={index} value={item.jobTitle}>
                          {item.jobTitle}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Job Heading</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Resume</TableCell>
                  <TableCell>Update Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datauser &&
                  datauser.length > 0 &&
                  datauser.map((item, index) => {
                    console.log(item)
                    if (item.gender === "Female") {
                      return (
                        <TableRow key={index}>
                          <TableCell>{item.jobId}</TableCell>
                          <TableCell>{`${item.first_Name} ${item.last_Name}`}</TableCell>
                          <TableCell>{item.candidate_email}</TableCell>
                          <TableCell>{item.phone_no}</TableCell>
                          <TableCell>{item.company_name}</TableCell>
                          <TableCell>{item.Total_experience} Yr</TableCell>
                          <TableCell>{item.job_Heading}</TableCell>
                          <TableCell>
                            {item.jobSeeker_status === 1 ? (
                              <p className="text-secondary pt-2">Pending</p>
                            ) : item.jobSeeker_status === 2 ? (
                              <p className="text-success">Interview Schedule</p>
                            ) : item.jobSeeker_status === 3 ? (
                              <p className="text-success">Assessment</p>
                            ) : item.jobSeeker_status === 4 ? (
                              <p className="text-success">HR Discussion</p>
                            ) : item.jobSeeker_status === 5 ? (
                              <p className="text-danger">Complete</p>
                            ) : item.jobSeeker_status === 6 ? (
                              <p>Shortlist</p>
                            ) : item.jobSeeker_status === 7 ? (
                              <p className="text-danger">Reject</p>
                            ) : (
                              ""
                            )}
                          </TableCell>
                          <TableCell>
                            <a href={`${baseurlImage}${item.candidate_resume}`}>
                              <p className="text-primary">view </p>
                            </a>
                          </TableCell>
                          <TableCell>
                            <FormControl>
                              <InputLabel id="demo-simple-select-label">Update Status</InputLabel>
                              <Select
                                onChange={(e) => handleChange12(item._id, e)}
                                label="Update Status"
                                name="job_Seeker_status"
                              >
                                <MenuItem value="schedule_Interview">Schedule Interview</MenuItem>
                                <MenuItem value="assessment">Assessment</MenuItem>
                                <MenuItem value="HR_Discussion">HR Discussion</MenuItem>
                                <MenuItem value="complete">Complete</MenuItem>
                                <MenuItem value="shortlist">Shortlist</MenuItem>
                                <MenuItem value="reject">Reject</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      );
                    } else {
                      return (
                        <>
                          <p className='text-center'>No Data Found</p>
                        </>)
                    }
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </CustomTabPanel>
      <ToastContainer />
    </Box>
    </>
  );
}
