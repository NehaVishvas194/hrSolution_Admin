import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../features/Api/BaseUrl";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TextField,Button,Modal,Box,} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
export default function Quiztest() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const [questio,setQuestio]=useState([])
  const navigate = useNavigate()
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
        course_id:valu.course_id,
        question: valu.question,
        options: [valu.option1,valu.option2,valu.option3,valu.option4],
        correct_answer_index: parseInt(valu.correct_answer_index),
    };
    console.log(data123);
    axios
      .post(`${baseUrl}course_quiz_test`,data123 )
      .then((response) => {
        console.log(response.data.message);
        getallQuestiondata()
        toast.success(response.data.message);
        closeModal();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // const hndleclickdelete = (_id) => {
  //   axios
  //     .delete(
  //       `${baseUrl}Delete_personal_ability_ques/${_id}`
  //     )
  //     .then((response) => {
  //       toast.error(response.data.message);
  //       getallQuestiondata()
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };
  const hndleclickdelete = (_id) => {
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
        axios
        .delete(
          `${baseUrl}delete_test/${_id}`
        )
        .then((response) => {
          getallQuestiondata()
          toast.error(response.data.message);
        })
        .catch((error) => {
          console.log(error.response);
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }


  // const get all question 
  useEffect(()=>{
getallQuestiondata()
  },[])

  const getallQuestiondata =() =>{
    axios.get(`${baseUrl}all_quiz_test`).then((response)=>{
      console.log(response.data.all_tests)
      setData(response.data.all_tests)
    }).catch((error)=>{
      console.log(error.response.data)
    })
  }

 const getquestion =()=>{
    axios.get(`${baseUrl}get_cms_online_courses_details`).then((response)=>{
        setQuestio(response.data.Details)
    }).catch((error)=>{
        console.log(error.response.data)
    })
 }

  useEffect(()=>{
    getquestion()
  },[])

  const handleclickdata =(test_id)=>{
  //  axios.get(`${baseUrl}get_quiz_test_of_course/${test_id}`).then((response)=>{
  //   console.log(response.data)
  //   if(response.data.success===true){
      navigate('/Admin/quizquestuion',{state:{data:test_id}})
    // }else{
      // toast.error("Question not Exists")
    // }
  //  }).catch((error)=>{
    // console.log(error.response.data)
  //  })
  }
  return (
    <>
      <p className="text-center my-3 fw-bold fs-3" style={{ color: "#000" }}>
        Quiz test 
      </p>
      <div className="d-flex justify-content-end my-3 me-2">
        <Button variant="contained" color="primary" onClick={openModal}>
         Add Test
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length > 0 &&
              data.map((item, index) => (
                <TableRow key={index}>{console.log(item)}
                  <TableCell>{item.course_Name}</TableCell>
                  <TableCell>
                   <i className="fa fa-eye" onClick={()=>{handleclickdata(item.test_id)}}></i>
                  </TableCell>
                  <TableCell>
                   
                    <DeleteIcon
                      className="text-danger"
                      onClick={() => {
                        hndleclickdelete(item.test_id);
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
            overflow:"scroll"
          }}
        >
          <h2>Add New Test</h2>

          <select style={{width:250}} className="px-2 py-3 w-100 bg-white rounded" name="course_id"   onChange={handlechange}>
            
            <option>Select</option>
            {
                questio && questio.length>0 && questio.map((item,index)=>{
                    console.log(item)
                    return(
                        <>
                        <option key={index} value={item._id}>{item.Heading}</option>
                        </>
                    )
                })
            }
             
          </select>
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
            name="correct_answer_index"
          />
          <Button className="me-3" variant="contained" color="primary" onClick={handleapi}>
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

