// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, FormControl, InputLabel, Select, Button, Modal, Box, TextField } from '@mui/material';
// import axios from 'axios';
// import { baseUrl } from '../../features/Api/BaseUrl';
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
// export default function Psychometric() {
//   const [jobTitles, setJobTitles] = useState([]);
//   const [selectedJobTitle, setSelectedJobTitle] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [questionsAns, setQuestionsAns] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newQuestion, setNewQuestion] = useState('');
//   const [newOptions, setNewOptions] = useState([]);
//   const [index, setIndex] = useState('');
//   const [getval, setGetval] = useState([]);
//   const [option1, setOption1] = useState('');
//   const [option2, setOption2] = useState('');
//   const [option3, setOption3] = useState('');
//   const [option4, setOption4] = useState('');

//   const navigate = useNavigate();

  

 
//   // const getdatat = () => {
//   //   axios.get(`${baseUrl}getAllTest`).then((response) => {
//   //     setQuestions(response.data.Test)
//   //   }).catch((error) => {
//   //     console.log(error.response.data)
//   //   })
//   // }

//   // const handleJobTitleChange = (e) => {
//   //   const jobTitle = e.target.value
//   //   setSelectedJobTitle(jobTitle);
//   //   const postdata = { job_title: jobTitle };
//   //   axios.post(`${baseUrl}getAll_psychometric_questions`, postdata)
//   //     .then((response) => {
//   //       setQuestions(response.data?.options);
//   //       setQuestionsAns(response.data.options[0]?.questions);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching questions:', error.response.data);
//   //     });
//   // }

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setNewQuestion('');
//     setNewOptions([]);
//   };
//   // Add Question 
//   //                    Method : POST
//   //                    Parameters :question , options[] , correctAnswerIndex 
//   //                    URL : http://192.168.1.74:4102/api/psychometric_questions     
//   const handleAddQuestion = () => {
//     const datapost = {
//       // job_title: selectedJobTitle,
//       question: newQuestion,
//       correctAnswerIndex: parseInt(index - 1),
//       options: [option1, option2, option3, option4]
//     }
//     axios.post(`${baseUrl}psychometric_questions`, datapost)
//       .then((response) => {
//         toast.success(response.data.message)
//         getdata()
//         closeModal();
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//       });
//   };
//   useEffect(() => {
//     getdata();
//   }, []);
//   const getdata = () => {
//     axios.get(`${baseUrl}alljobTitle`).then((response) => {
//       setGetval(response.data.details)
//     }).catch((error) => {
//       console.log(error.response.data)
//     })
//   }
//   const handleJobTitleChange123 = (e, jobId) => {
//     const jobTitle = e.target;
//     setSelectedJobTitle(jobTitle);
//   };
//   const handleclick = (_id) => {
//     navigate('/Admin/Viewdetails', { state: { data: _id } })
//   }
//   const handleclickdelete = (_id) => {
//     alert(_id)
//     axios.delete(`${baseUrl}deletepsychometrcTest/${_id}`).then((response) => {
//       toast.success(response.data.message)
//     }).catch((error) => {
//       toast.error(error.response.data.message)
//     })
//   }

// useEffect(()=>{
//   getQuestion123()
// },[])
//   const getQuestion123 =()=>{
    
//   axios.post(`${baseUrl}getAll_psychometric_questions`).then((response)=>{
//     setQuestions(response.data.Questions)
//   }).catch((error)=>{
//     console.log(error.response.data)
//   })
// }
//   return (
//     <>
//       <div className='d-flex justify-content-between mb-3'>
//         <div className='w-20'>
//           {/* <FormControl className='pshychoSelect'  sx={{minWidth: 180 }} variant="outlined" margin="normal" size="small">
//             <InputLabel id="job-title-small-label">Job Title</InputLabel>
//             <Select
//               labelId="job-title-small-label"
//               id="job-title-small-select"
//               value={selectedJobTitle}
//               onChange={(e) => { handleJobTitleChange(e) }}
//               label="Job Title"
//             >
//               {jobTitles.map((item, index) => (
//                 <MenuItem key={index} value={item.jobTitle} style={{ cursor: "pointer" }}>
//                   {item.jobTitle}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl> */}
//         </div>
//         <div className='mt-3 me-2'>
//           <Button variant="contained" color="primary" onClick={openModal}>
//             Add Test
//           </Button>
//         </div>
//       </div>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Job Title</TableCell>
//               <TableCell>Question</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {questions && questions.length > 0 && questions.map((item, index) => {
//               return (
//                 <>
//                   <TableRow key={index}>
//                     <TableCell>{item.question}</TableCell>
//                     <TableCell style={{ cursor: "pointer" }}><p className='fw-bold my-3 text-primary' onClick={() => { handleclick(item._id) }} >view</p></TableCell>
//                     <TableCell><DeleteIcon className='text-danger' onClick={() => { handleclickdelete(item._id) }} /></TableCell>
//                   </TableRow>
//                 </>
//               )
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Modal open={isModalOpen} onClose={closeModal}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             border: '2px solid #000',
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           {/* <FormControl fullWidth variant="outlined" margin="normal">
//             <InputLabel id="job-title-label">Job Title</InputLabel>
//             <Select
//               labelId="job-title-label"
//               id="job-title-select"
//               value={selectedJobTitle}
//               onChange={(e) => handleJobTitleChange123(e)}
//               label="Job Title"
//               name='job_title'
//             >
//               {getval && getval.length > 0 && getval.map((item, index) => (
//                 <MenuItem key={index} value={item.jobTitle}>
//                   {item.jobTitle}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl> */}
//           <TextField
//             fullWidth
//             label="New Question"
//             margin="normal"
//             name='newQuestion'
//             value={newQuestion}
//             onChange={(e) => setNewQuestion(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="correct answer"
//             margin="normal"
//             name='index'
//             value={index}
//             onChange={(e) => setIndex(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Option1"
//             margin="normal"
//             name='option1'
//             value={option1}
//             onChange={(e) => setOption1(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Option2"
//             margin="normal"
//             name='option2'
//             value={option2}
//             onChange={(e) => setOption2(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Option3"
//             margin="normal"
//             name='option3'
//             value={option3}
//             onChange={(e) => setOption3(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Option4"
//             margin="normal"
//             name='option4'
//             value={option4}
//             onChange={(e) => setOption4(e.target.value)}
//           />
//           <Button variant="contained" color="primary" onClick={handleAddQuestion}>
//             Add Question
//           </Button>
//           <Button variant="text" onClick={closeModal}>
//             Cancel
//           </Button>
//         </Box>
//       </Modal>
//       <ToastContainer />
//     </>
//   )
// }
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { baseUrl } from '../../features/Api/BaseUrl';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box, } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import DeleteIcon from '@mui/icons-material/Delete';
// export default function Viewdetails() {
//     const [data, setData] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const location = useLocation();
//     const [valu, setValu] = useState({
//         question: "", correctAnswerIndex: ""
//     })
//     useEffect(() => {
//         getData();
//     }, []);
//     const getData = () => {
//         axios.get(`${baseUrl}getquestions/${location?.state?.data}`).then((response) => {
//             setData(response.data.Question);
//         }).catch((error) => {
//             console.error(error.response.data);
//         });
//     };
//     const openModal = () => {
//         setIsModalOpen(true);
//     };
//     const closeModal = () => {
//         setIsModalOpen(false);
//     };
//     /////////////////////////////////////////////// post question ///////////////////////////////////////////////////////////
//     const handlechange = (e) => {
//         const { name, value } = e.target
//         setValu({ ...valu, [name]: value })
//     }
//     const handleapi = () => {
//         const data123 = {
//             question: valu.question,
//             options: [valu.option1, valu.option2, valu.option3, valu.option2],
//             correctAnswerIndex: valu.correctAnswerIndex
//         }
//         console.log(data123)
//         axios.post(`${baseUrl}addQuestion/${location?.state?.data}`, data123).then((response) => {
//             getData();
//             toast.success(response.data.message)
//             closeModal()
//         }).catch((error) => {
//             toast.error(error.response.data.message)
//         })
//     }

//    const hndleclickdelete =(_id)=>{
//     axios.delete(`${baseUrl}deletequestion_in_Test/${location?.state?.data}/${_id}`)
//     .then((response)=>{
//         getData();
//         toast.error(response.data.message)
//     }).catch((error)=>{
//         console.log(error.response)
//     })
//    }

//     return (
//         <>
//         <p className='text-center my-3 fw-bold fs-3' style={{color:'#2e47cc'}}>Add Question</p>
//             <div className="d-flex justify-content-end my-3 me-2">
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={openModal}
//                 >
//                     Add Question
//                 </Button>
//             </div>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Questions</TableCell>
//                             <TableCell>Correct Answer</TableCell>
//                             <TableCell>Options</TableCell>
//                             <TableCell>Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {data && data.length > 0 && data.map((item, index) => (
//                             <TableRow key={index}>
//                                 <TableCell>{item.question}</TableCell>
//                                 <TableCell>{item.correctAnswerIndex +1}</TableCell>
//                                 <TableCell>
//                                     {item.options.map((info, optionIndex) => (
//                                         <p key={optionIndex}>{info}</p>
//                                     ))}
//                                 </TableCell>
//                                 <TableCell>
//                                     <DeleteIcon className='text-danger' onClick={()=>{hndleclickdelete(item._id)}}/>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Modal open={isModalOpen} onClose={closeModal}>
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
//                     <h2>Add New Question</h2>
//                     <TextField
//                         fullWidth
//                         label="New Question"
//                         margin="normal"
//                         name='question'
//                         onChange={handlechange}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Option 1"
//                         margin="normal"
//                         name='option1'
//                         onChange={handlechange}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Option 2"
//                         margin="normal"
//                         name='option2'
//                         onChange={handlechange}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Option 3"
//                         margin="normal"
//                         onChange={handlechange}
//                         name='option3'
//                     />
//                     <TextField
//                         fullWidth
//                         label="Option 4"
//                         margin="normal"
//                         name='option4'
//                         onChange={handlechange}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Correct Answer Index"
//                         margin="normal"
//                         onChange={handlechange}
//                         name='correctAnswerIndex'
//                     />
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleapi}
//                     >
//                         Add
//                     </Button>
//                     <Button variant="text" onClick={closeModal}>
//                         Cancel
//                     </Button>
//                 </Box>
//             </Modal>
//             <ToastContainer />
//         </>
//     );
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import DeleteIcon from "@mui/icons-material/Delete";
export default function Psychometric() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const [valu, setValu] = useState({
    question: "",
    correctAnswerIndex: "",
  });
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  /////////////////////////////////////////////// post question ///////////////////////////////////////////////////////////
  const handlechange = (e) => {
    const { name, value } = e.target;
    setValu({ ...valu, [name]: value });
  };
  const handleapi = () => {
    const data123 = {
      question: valu.question,
      options: [valu.option1, valu.option2, valu.option3, valu.option2],
      correctAnswerIndex: valu.correctAnswerIndex,
    };
    console.log(data123);
    axios
      .post(`${baseUrl}addQuestion/${location?.state?.data}`, data123)
      .then((response) => {
        toast.success(response.data.message);
        closeModal();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const hndleclickdelete = (_id) => {
    axios
      .delete(
        `${baseUrl}deletepsychometrcTest/${_id}`
      )
      .then((response) => {
        toast.error(response.data.message);
        getallQuestiondata()
      })
      .catch((error) => {
        console.log(error.response);
      });
  };



  // const get all question 
  useEffect(()=>{
getallQuestiondata()
  },[])

  const getallQuestiondata =() =>{
    axios.post(`${baseUrl}getAll_psychometric_questions`).then((response)=>{
      console.log(response.data.Questions)
      setData(response.data.Questions)
    }).catch((error)=>{
      console.log(error.response.data)
    })
  }
  return (
    <>
      <p className="text-center my-3 fw-bold fs-3" style={{ color: "#2e47cc" }}>
        Add Question
      </p>
      <div className="d-flex justify-content-end my-3 me-2">
        <Button variant="contained" color="primary" onClick={openModal}>
          Add Question
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Questions</TableCell>
              <TableCell>Correct Answer</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length > 0 &&
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.question}</TableCell>
                  <TableCell>{item.correctAnswerIndex + 1}</TableCell>
                  <TableCell>
                    <div className="d-flex">
                      {item.options.map((info, optionIndex) => (
                        <p key={optionIndex}>{info}&nbsp;</p>
                        
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      className="text-danger"
                      onClick={() => {
                        hndleclickdelete(item._id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Add New Question</h2>
          <TextField
            fullWidth
            label="New Question"
            margin="normal"
            name="question"
            onChange={handlechange}
          />
          <TextField
            fullWidth
            label="Option 1"
            margin="normal"
            name="option1"
            onChange={handlechange}
          />
          <TextField
            fullWidth
            label="Option 2"
            margin="normal"
            name="option2"
            onChange={handlechange}
          />
          <TextField
            fullWidth
            label="Option 3"
            margin="normal"
            onChange={handlechange}
            name="option3"
          />
          <TextField
            fullWidth
            label="Option 4"
            margin="normal"
            name="option4"
            onChange={handlechange}
          />
          <TextField
            fullWidth
            label="Correct Answer Index"
            margin="normal"
            onChange={handlechange}
            name="correctAnswerIndex"
          />
          <Button variant="contained" color="primary" onClick={handleapi}>
            Add
          </Button>
          <Button variant="text" onClick={closeModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
}

