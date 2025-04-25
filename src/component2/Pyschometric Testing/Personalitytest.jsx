import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../features/Api/BaseUrl";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TextField,Button,Modal,Box,} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
export default function Personalitytest() {
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
      options: ["Strongly Agree", "Agree", "Neutral","Disagree", "Strongly Disagree"],
      correctAnswerIndex: valu.correctAnswerIndex,
    };
    console.log(data123);
    axios
      .post(`${baseUrl}add_personality_test_question/${location?.state?.data}`, data123)
      .then((response) => {
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
          `${baseUrl}Delete_personal_ability_ques/${_id}`
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
    axios.get(`${baseUrl}getAll_psychometric_personal_ability_questions`).then((response)=>{
      console.log(response.data.Questions)
      setData(response.data.Questions)
    }).catch((error)=>{
      console.log(error.response.data)
    })
  }
  return (
    <>
      <p className="text-center my-3 fw-bold fs-3" style={{ color: "#000" }}>
        Add Personality test Question
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
                        <p key={optionIndex} style={{marginRight:"10px"}}>{info}&nbsp;</p>
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
          {/* <TextField
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
          /> */}
          <TextField
            fullWidth
            label="Correct Answer Index"
            margin="normal"
            onChange={handlechange}
            name="correctAnswerIndex"
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

