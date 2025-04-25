import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  DialogTitle,TextField
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from "react-toastify";
export default function Getpagequest() {
  const location = useLocation();
  const [openModal2, setOpenModal2] = useState(false);
  const [data,setData] = useState([]);
  const [quiztest, setQuiztest] = useState([]);
  console.log(location.state.data);

  useEffect(() => {
    getdata();
  }, []);
  const getdata = () => {
    axios
      .get(`${baseUrl}get_quiz_test_of_course/${location.state.data}`)
      .then((response) => {
        console.log(response.data.quiz_test.questions_Bank);
        setQuiztest(response.data.quiz_test.questions_Bank);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handledelete =(id)=>{
    axios.delete(`${baseUrl}delete_question_in_test/${location.state.data}/${id}`).then((response)=>{
        toast.success(response.data.message)
        getdata()
    }).catch((error)=>{
        console.log(error.response.data)
    })
  }

  const handleOpenModal2 = () => {
    setOpenModal2(true);
  };   

  const handleCloseModal2 = () => {
    setOpenModal2(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const addquistestweew =() =>{
    const dtata123 ={
         question:data.question, 
         options:[data.option1,data.option2,data.option3,data.option4], 
         correct_answer_index:parseInt(data.correct_answer_index),
    }
    axios.post(`${baseUrl}addQuestion_in_Quiz_test/${location.state.data}`,dtata123).then((response)=>{
            toast.success(response.data.message)
            getdata()
            handleCloseModal2()
            
    }).catch((error)=>{
        console.log(error.response.data)
    })
  }
  return (
    <div>
        <Button onClick={handleOpenModal2}>Add Question</Button>
      <TableContainer component={Paper} className="mt-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Topic Name</TableCell>
              <TableCell>Question Bank</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quiztest.map((item) => {
                console.log(item)
              return (
                <>
                  <TableRow key={item._id}>
                    <TableCell>{item.question}</TableCell>
                    <TableCell>{item.correct_answer_index}</TableCell>
                    <TableCell>{item.options.map((item,index)=>{
                        console.log(item)
                        return(
                            <>
                            <p key={index}>{item}</p>
                            </>
                        )
                    })}</TableCell>
                    <TableCell><DeleteIcon className="fa fa-trash-o" onClick={()=>handledelete(item._id)} /></TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
      <Modal open={openModal2} onClose={handleCloseModal2}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <DialogTitle>Add Quiz Test</DialogTitle>
          <div className="d-flex flex-column">
         
            <TextField
              className="mt-3"
              style={{ width: "100%" }}
              onChange={handleChange}
              name="question"
              label="question"
              variant="outlined"
              size="small"
            />
            <TextField
              className="mt-3"
              style={{ width: "100%" }}
              onChange={handleChange}
              name="correct_answer_index"
              label="correct_answer_index"
              variant="outlined"
              size="small"
            />

            <TextField
              className="mt-3"
              onChange={handleChange}
              name="option1"
              label="option1"
              variant="outlined"
              size="small"
            />
            <TextField
              className="mt-3"
              onChange={handleChange}
              name="option2"
              label="option2"
              variant="outlined"
              size="small"
            />
            <TextField
              className="mt-3"
              onChange={handleChange}
              name="option3"
              label="option3"
              variant="outlined"
              size="small"
            />
            <TextField
              className="mt-3"
              onChange={handleChange}
              name="option4"
              label="option4"
              variant="outlined"
              size="small"
            />

            <div className="d-flex justify-content-between">
              <Button
                style={{ backgroundColor: "#5c6bc0", color: "white" }}
                onClick={addquistestweew}
                className="mt-4"
              >
                Submit
              </Button>
              <Button
                style={{ backgroundColor: "gray", color: "white" }}
                onClick={handleCloseModal2}
                className="mt-4"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
