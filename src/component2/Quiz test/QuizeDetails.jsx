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
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { baseUrl } from "../../features/Api/BaseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { ConstructionOutlined } from "@mui/icons-material";

export default function QuizeDetails() {
  const location = useLocation();

  console.log(location?.state?.data);
  const test_id = location?.state?.data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [valu, setValu] = useState([]);
  // const data = location?.state?.data?.questions_Bank
  const data123 = location.state.data;
  console.log(data123);
  useEffect(() => {
    dattaget(data123);
  }, [data123]);

  const dattaget = (data123) => {
    axios
      .get(`${baseUrl}get_quiz_test_of_course/${data123}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data.quiz_test.questions_Bank);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // const handledelete = (item) => {
  //   console.log(item);
  //   axios
  //     .delete(`${baseUrl}delete_question_in_test/${test_id}/${item._id}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       toast.message(response.data.message);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //     });
  // };


  const handledelete = (item) => {
    console.log(item);
    axios
      .delete(`${baseUrl}delete_question_in_test/${test_id}/${item._id}`)
      .then((response) => {
        // Check if the status is 2xx before assuming success
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          toast.success(response.data); // Ensure correct usage of toast
        } else {
          console.log('Unexpected status code:', response.status);
        }
      })
      .catch((error) => {
        // Check if the error has a response object (e.g., network errors may not)
        if (error.response) {
          console.log(error.response.data);
          toast.error(error.response.data.message)
        } else {
          console.log('Network or other error:', error.message);
        }
      });
  };


  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setValu({ ...valu, [name]: value });
  };

  const handleapi = () => {
    const data123 = {
      course_id: valu.course_id,
      question: valu.question,
      options: [valu.option1, valu.option2, valu.option3, valu.option4],
      correct_answer_index: parseInt(valu.correct_answer_index),
    };
    console.log(data123);
    axios
      .post(`${baseUrl}addQuestion_in_test/${test_id}`, data123)
      .then((response) => {
        dattaget()
        console.log(response.data.message);
        toast.success(response.data.message);
        closeModal();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={openModal}>
        Add Question
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Correct Ans</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                console.log(item);
                return (
                  <>
                    <TableRow key={index}>
                      {console.log(item)}
                      <TableCell>{item.question}</TableCell>
                      <TableCell>{item.correct_answer_index}</TableCell>
                      <TableCell>{item.options}</TableCell>
                      {/* <TableCell>
                   <i className="fa fa-eye" onClick={()=>{handledelete(item.test_id)}}></i>
                </TableCell>                  
                */}
                      <TableCell>
                        <DeleteIcon
                          className="text-danger"
                          onClick={() => {
                            handledelete(item);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>

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
              overflow: "scroll",
            }}
          >
            <h2>Add Questions</h2>

            {/* <select style={{width:250}} className="px-2 py-3 w-100 bg-white rounded" name="course_id"   onChange={handlechange}>
            
            <option>Select...</option>
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
             
          </select> */}
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
            <Button
              className="me-3"
              variant="contained"
              color="primary"
              onClick={handleapi}
            >
              Add
            </Button>
            <Button variant="text" onClick={closeModal}>
              Cancel
            </Button>
          </Box>
        </Modal>
      </TableContainer>
    </div>
  );
}
