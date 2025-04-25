import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../features/Api/BaseUrl";
import { useLocation, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  DialogTitle,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { DeleteForever } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
export default function DeatisCategory() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [iDs, setIDs] = useState("");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const friv = location.state.data;
  console.log(friv);
  const gwtdata = () => {
    axios
      .get(`${baseUrl}all_topics_of_course/${friv._id}`)
      .then((response) => {
        console.log(response.data.all_topics);
        setData(response.data.all_topics);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData1({ ...data1, [name]: value });
  };
  const handleOpenModal = (id) => {
    setIDs(id);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    gwtdata();
  }, []);
  const handleclick = () => {
    navigate("/Admin/AddTopic", { state: { data: friv } });
  };
  const handleclick12 = (id) => {
    axios
      .delete(`${baseUrl}delete_course_topic/${friv._id}/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",

        },
    })
      .then((response) => {
        toast.success(response.data.message);
        gwtdata();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handeldhjdf = (id) => {
    navigate("/Admin/addquizzzzz", { state: { data: id } });
  };
  const handleAddJobList = () => {
    const data123 = {
      topic_id: iDs,
      question: data1.question,
      options: [
        { option_name: data1.option1 },
        { option_name: data1.option2 },
        { option_name: data1.option3 },
        { option_name: data1.option4 },
      ],
      correct_answer: data1.correct_answer_index,
    };
    axios
      .post(`${baseUrl}course_quiz_test/${friv._id}`, data123)
      .then((response) => {
        toast.success(response.data.message);
        handleCloseModal();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleupdate = (item) => {
    navigate("/Admin/Edittopic", { state: { data: item, dataq: friv } });
  };
  return (
    <div className="main_container">
      <div className="d-flex justify-content-end me-3">

        <Button size="small" className="py-2 px-3 text-end text-end" onClick={handleclick}>
          ADD Topic
        </Button>

      </div>
      <TableContainer component={Paper} className="mt-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Topic Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell> Quiz</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.topic_name}</TableCell>
                <TableCell>
                  {item.topic_description.slice(0, 30) + "..."}
                </TableCell>
                <TableCell>
                  {
                    item.quizExists === 0 ? <Button onClick={() => handleOpenModal(item._id)}>
                      Add Quizz
                    </Button> : (<RemoveRedEyeIcon
                      onClick={() => handeldhjdf(item._id)}
                    />)
                  }
                </TableCell>

                <TableCell>
                  <DeleteForever className="text-danger" onClick={() => handleclick12(item._id)} />
                  <div
                    className="fa fa-edit align-middle fs-6 p-1"
                    onClick={() => {
                      handleupdate(item);
                    }}
                  ></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <DialogTitle>Add Quiz</DialogTitle>
          <div className="d-flex flex-column">
            <TextField
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
              label="Correct Answer"
              variant="outlined"
              size="small"
            />
            <TextField
              className="mt-3"
              style={{ width: "100%" }}
              onChange={handleChange}
              name="option1"
              label="option1"
              variant="outlined"
              size="small"
            />
            <TextField
              className="mt-3"
              style={{ width: "100%" }}
              onChange={handleChange}
              name="option2"
              label="option2"
              variant="outlined"
              size="small"
            />
            <TextField
              className="mt-3"
              style={{ width: "100%" }}
              onChange={handleChange}
              name="option3"
              label="option3"
              variant="outlined"
              size="small"
            />
            <TextField
              className="mt-3"
              style={{ width: "100%" }}
              onChange={handleChange}
              name="option4"
              label="option4"
              variant="outlined"
              size="small"
            />
            <div className="d-flex justify-content-between">
              <Button
                style={{ backgroundColor: "#5c6bc0", color: "white" }}
                onClick={handleAddJobList}
                className="mt-4"
              >
                Submit
              </Button>
              <Button
                style={{ backgroundColor: "gray", color: "white" }}
                onClick={handleCloseModal}
                className="mt-4"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}
