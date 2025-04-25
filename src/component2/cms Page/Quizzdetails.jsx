// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Modal,
//   Box,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import axios from "axios";
// import { baseUrl } from "../../features/Api/BaseUrl";
// import { toast, ToastContainer } from "react-toastify";
// import { DeleteForever } from "@mui/icons-material";

// export default function Quizzdetails() {
//   const location = useLocation();
//   const [openModal, setOpenModal] = useState(false);
//   const [data1, setData1] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [data, setData] = useState([]);

//   const handeldhjdf = () => {
//     axios.get(`${baseUrl}topic_quiz/${location?.state?.data}`).then((response)=>{


//       console.log(response.data.Topic_quiz[0].topic_quiz[0])
//       console.log(response.data?.Topic_quiz[0].topic_quiz)
//       setData2(response.data.Topic_quiz[0].topic_quiz)
//       setData(response.data.Topic_quiz[0].quiz_id)
//       // navigate("/Admin/addquizzzzz", { state: { data:response?.data?.Topic_quiz} });
//     }).catch((error)=>{
//       console.log(error.response.data)
//     })
//   };

//   useEffect(()=>{
//     handeldhjdf()
//   },[])
//   const handleOpenModal = (id) => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData1({ ...data1, [name]: value });
//   };

//   const handleAddJobList = () => {
//     const data123 = {
//       question: data1.question,
//       options: [{option_name:data1.option1}, {option_name:data1.option2}, {option_name:data1.option3}, {option_name:data1.option4}],
//       correct_answer: data1.correct_answer_index,
//     };
//     axios.post(`${baseUrl}addQuestion_in_Quiz_test/${data}`, data123).then((response)=>{
//       toast.success(response.data.message)
//       handeldhjdf()
//       handleCloseModal()
//     }).catch((error)=>{
//       console.log(error.response.data)
//     })
//   };

//   const handleclickdelete =(id) =>{
//     axios.delete(`${baseUrl}delete_question_in_test/${data}/${id}`).then((response)=>{
//       toast.success(response.data.message)
//       handeldhjdf()
//     }).catch((error)=>{
//       console.log(error.response.data)
//     })
//   }

//   return (
//     <div>
//       <Button
//         onClick={() => {
//           handleOpenModal();
//         }}
//       >
//         Add Question
//       </Button>

//       <TableContainer component={Paper} className="mt-5">
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Question</TableCell>
//               <TableCell>Correct Answer</TableCell>
//               <TableCell>Options</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//              {data2?.map((item) => {
//               return (
//                 <>
//                   <TableRow key={item?._id}>
//                     <TableCell>{item?.question}</TableCell>
//                     <TableCell>{item?.correct_answer}</TableCell>
//                     {/* {item?.options[0]?.map((item) => {
//                       return (
//                         <>
//                           <p className="mx-2">{item}</p>
//                         </>
//                       );
//                     })}  */}
//                     <p className="mx-2">{item?.options[0]?.option_name}</p>
//                     <p className="mx-2">{item?.options[1]?.option_name}</p>
//                     <p className="mx-2">{item?.options[2]?.option_name}</p>
//                     <p className="mx-2">{item?.options[3]?.option_name}</p>
//                     <TableCell>
//                       <DeleteForever onClick={()=>{handleclickdelete(item._id)}} />
//                     </TableCell>
//                   </TableRow>
//                 </>
//               );
//             })} 
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Modal open={openModal} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             height: 500,
//             bgcolor: "background.paper",
//             border: "2px solid #000",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <DialogTitle>Add Quiz</DialogTitle>
//           <div className="d-flex flex-column">
//             <TextField
//               style={{ width: "100%" }}
//               onChange={handleChange}
//               name="question"
//               label="question"
//               variant="outlined"
//               size="small"
//             />

//             <TextField
//               className="mt-3"
//               style={{ width: "100%" }}
//               onChange={handleChange}
//               name="correct_answer_index"
//               label="Correct Answer"
//               variant="outlined"
//               size="small"
//             />
//             <TextField
//               className="mt-3"
//               style={{ width: "100%" }}
//               onChange={handleChange}
//               name="option1"
//               label="option1"
//               variant="outlined"
//               size="small"
//             />
//             <TextField
//               className="mt-3"
//               style={{ width: "100%" }}
//               onChange={handleChange}
//               name="option2"
//               label="option2"
//               variant="outlined"
//               size="small"
//             />
//             <TextField
//               className="mt-3"
//               style={{ width: "100%" }}
//               onChange={handleChange}
//               name="option3"
//               label="option3"
//               variant="outlined"
//               size="small"
//             />
//             <TextField
//               className="mt-3"
//               style={{ width: "100%" }}
//               onChange={handleChange}
//               name="option4"
//               label="option4"
//               variant="outlined"
//               size="small"
//             />

//             <div className="d-flex justify-content-between">
//               <Button
//                 style={{ backgroundColor: "#5c6bc0", color: "white" }}
//                 onClick={handleAddJobList}
//                 className="mt-4"
//               >
//                 Submit
//               </Button>
//               <Button
//                 style={{ backgroundColor: "gray", color: "white" }}
//                 onClick={handleCloseModal}
//                 className="mt-4"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </Box>
//       </Modal>
//       <ToastContainer />
//     </div>
//   );
// }
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
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import { DeleteForever } from "@mui/icons-material";

export default function Quizzdetails() {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track if in edit mode
  const [questionId, setQuestionId] = useState(null); // Track ID for updating
  const [data1, setData1] = useState({}); // Store form data
  const [data2, setData2] = useState([]); // List of questions
  const [data, setData] = useState([]); // Quiz ID

  const fetchQuizDetails = () => {
    axios.get(`${baseUrl}topic_quiz/${location?.state?.data}`)
      .then((response) => {
        setData2(response.data.Topic_quiz[0].topic_quiz);
        setData(response.data.Topic_quiz[0].quiz_id);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  const handleOpenModal = (question = null) => {
    if (question) {
      setData1({
        question: question.question,
        option1: question.options[0]?.option_name || "",
        option2: question.options[1]?.option_name || "",
        option3: question.options[2]?.option_name || "",
        option4: question.options[3]?.option_name || "",
        correct_answer_index: question.correct_answer,
      });
      setQuestionId(question._id); // Set question ID for editing
      setIsEditMode(true);
    } else {
      setData1({});
      setIsEditMode(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setData1({});
    setQuestionId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData1({ ...data1, [name]: value });
  };

  const handleAddOrUpdateQuestion = () => {
    const questionData = {
      question: data1.question,
      options: [
        { option_name: data1.option1 },
        { option_name: data1.option2 },
        { option_name: data1.option3 },
        { option_name: data1.option4 },
      ],
      correct_answer: data1.correct_answer_index,
    };
    
    if (isEditMode) {
      // Update existing question
      axios.post(`${baseUrl}update_question_of_quiz/${data}/${questionId}`, questionData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",

        },
    })
        .then((response) => {
          toast.success(response.data.message);
          fetchQuizDetails();
          handleCloseModal();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      // Add new question
      axios.post(`${baseUrl}addQuestion_in_Quiz_test/${data}`, questionData, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",

        },
    })
        .then((response) => {
          toast.success(response.data.message);
          fetchQuizDetails();
          handleCloseModal();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  const handleDeleteQuestion = (id) => {
    axios.delete(`${baseUrl}delete_question_in_test/${data}/${id}`, {
      headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",

      },
  })
      .then((response) => {
        toast.success(response.data.message);
        fetchQuizDetails();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <Button onClick={() => handleOpenModal()}>Add Question</Button>
      <TableContainer component={Paper} className="mt-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Correct Answer</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.question}</TableCell>
                <TableCell>{item?.correct_answer}</TableCell>
                <TableCell>
                  {item?.options.map((opt, idx) => (
                    <p key={idx}>{opt.option_name}</p>
                  ))}
                </TableCell>
                <TableCell>
                  <p className="fa fa-edit" onClick={() => handleOpenModal(item)}></p>
                  <DeleteForever onClick={() => handleDeleteQuestion(item._id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box   sx={{
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
            overflow:"scroll"
          }}
        >
          <DialogTitle>{isEditMode ? "Update Question" : "Add Question"}</DialogTitle>
          <TextField name="question" className="w-100 mb-3" label="Question" onChange={handleChange} value={data1.question || ""} />
          <TextField name="correct_answer_index"  className="w-100 mb-3" label="Correct Answer" onChange={handleChange} value={data1.correct_answer_index || ""} />
          <TextField name="option1" label="Option 1"  className="w-100 mb-3" onChange={handleChange} value={data1.option1 || ""} />
          <TextField name="option2" label="Option 2"  className="w-100 mb-3" onChange={handleChange} value={data1.option2 || ""} />
          <TextField name="option3" label="Option 3"  className="w-100 mb-3" onChange={handleChange} value={data1.option3 || ""} />
          <TextField name="option4" label="Option 4"  className="w-100 mb-3" onChange={handleChange} value={data1.option4 || ""} />
          <Button onClick={handleAddOrUpdateQuestion}>{isEditMode ? "Update" : "Submit"}</Button>
          <Button className="ms-2" onClick={handleCloseModal}>Cancel</Button>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}
