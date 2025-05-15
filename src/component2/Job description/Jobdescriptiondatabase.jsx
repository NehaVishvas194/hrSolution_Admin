import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../features/Api/BaseUrl";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { TbFileTypeDocx } from "react-icons/tb";
import { PiFileDocBold } from "react-icons/pi";
import { CgFileDocument } from "react-icons/cg";
import { PiFileDocFill } from "react-icons/pi";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
const pageSize = 5;

export default function Jobdescriptiondatabase() {
  const [response, setResponse] = useState([]);
  const [postdata, setPostdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ismodalOpen, setIsmodalOpen] = useState(false);
  const [jobId, setJobId] = useState("");
  const [inputdata, setInputdata] = useState({
    jobTitle: "",
    job_Description: "",
    Responsibilities: "",
  });
  const [error, setError] = useState({});
  useEffect(() => {
    getdata();
    getpostdata();
  }, []);

  const getdata = () => {
    axios
      .get(`${baseUrl}all_main_jobTitle`)
      .then((response) => {
        setResponse(response.data.details);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        toast.error(error.response.data.message);
      });
  };

  const getpostdata = () => {
    axios
      .get(`${baseUrl}getAllUploadedJobFiles`)
      .then((response) => {
        console.log(response.data.data);
        setPostdata(response.data.data);
      })
      .catch((error) => {
        // console.log(error.response.data);
        toast.error(error.response.data.message);
      });
  };

  const navigate = useNavigate();
  const handlechnage = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const handleclick = () => {
    handlevalidate(inputdata);
  };
  const handlegetJobID = (e, jobid) => {
    setJobId(jobid);
  };
  const handlevalidate = (value) => {
    let error = {};
    if (!value.Main_jobTitle) {
      error.Main_jobTitle = "Title is required";
    } else {
      apihit();
    }
    setError(error);
  };
  // console.log(response)
  const apihit = () => {
    navigate("/Admin/post-description", {
      state: { data: jobId },
    });
  };

  const handleclickdelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseUrl}deleteJobDescriptionById/${_id}`)
          .then((response) => {
            console.log(response.data.message);
            getpostdata();
          })
          .catch((error) => {
            // console.log(error.response.data.message);
            toast.error(error.response.data.message);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleclickmodal = (_id) => {
    openmodal();
    const exactdata = postdata.filter((item) => item._id === _id)[0];
    setInputdata(exactdata);
  };

  const openmodal = () => {
    setIsmodalOpen(true);
  };

  const handleClose = () => {
    setIsmodalOpen(false);
  };

  const handleDescriptionChange12 = (event, editor) => {
    const newData = editor.getData();
    setInputdata({ ...inputdata, job_Description: newData });
  };

  const handleDescriptionChange = (event, editor) => {
    const newData = editor.getData();
    setInputdata({ ...inputdata, Responsibilities: newData });
  };

  // const handlePostUpdateData = () => {
  //   axios
  //     .post(`${baseUrl}addJob_Description`, inputdata, {
  //       headers: {
  //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setIsmodalOpen(false);
  //       if (response.status === 200) {

  //         toast.success(response?.data?.message);
  //         setInputdata({
  //           jobTitle: "",
  //           job_Description: "",
  //           Responsibilities: "",
  //         });
  //         getpostdata();
  //       }

  //     })
  //     .catch((error) => {
  //       // console.log(error.response.data);
  //       toast.error(error.response.data.message);
  //     });
  // };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const totalPage = Math.ceil(postdata.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = postdata.slice(startIndex, endIndex);

  return (
    <>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">Job Descriptions</h4>
          </div>
        </div>
        <div className="container main_container">
          <Modal open={ismodalOpen} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "400px",
                height: "600px",
                transform: "translate(-50%,-50%)",
                bgcolor: "background.paper",
                p: 4,
                overflowY: "scroll",
              }}
            >
              <div className="mb-5">
                <p className="fw-bold">Description</p>
                <CKEditor
                  editor={ClassicEditor}
                  data={inputdata.job_Description}
                  onChange={handleDescriptionChange12}
                  config={{
                    placeholder: "Enter your description here...",
                  }}
                />
              </div>
              <div className="mb-5">
                <p className="fw-bold">Responsibilities</p>
                <CKEditor
                  editor={ClassicEditor}
                  data={inputdata.Responsibilities}
                  onChange={handleDescriptionChange}
                  config={{
                    placeholder: "Enter your description here...",
                  }}
                />
              </div>
              {/* <Button variant="contained" onClick={handlePostUpdateData}>
                Update
              </Button> */}
            </Box>
          </Modal>
          <div className="border text-center bg-light mb-3">
            <div className="mt-2">Select job title</div>
            {/* <p className="mb-4">
              Post to multiple job boards in a single submission. Add your details
              below and try Workable for free
            </p> */}
            <div className="d-flex justify-content-center">
              <div className="w-20">
                <FormControl
                  className="mb-3 jobDesSelect"
                  sx={{ m: 1, minWidth: 120 }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">
                    Job Title
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Job Title"
                    onChange={handlechnage}
                    name="Main_jobTitle"
                  >
                    <MenuItem value="">
                      <em>Select Title</em>
                    </MenuItem>
                    {response &&
                      response.length > 0 &&
                      response.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item._id}
                          onClick={(e) => handlegetJobID(e, item._id)}
                        >
                          {item.Main_jobTitle}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <p className="text-danger">{error.Main_jobTitle}</p>
              </div>
              <div>
                <button
                  className="mt-2 py-1 px-4 fw-bold fs-5 rounded ms-2"
                  style={{
                    backgroundColor: "#dab95c",
                    color: "white",
                    borderColor: "#dab95c",
                  }}
                  variant="outlined"
                  // color="primary"
                  onClick={handleclick}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <TableContainer component={Paper}>
              <Table className="text-danger">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>Job Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>count</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData &&
                    currentData.length > 0 &&
                    currentData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{startIndex + index + 1}</TableCell>
                        <TableCell>{item.jobTitle}</TableCell>
                        {/* <TableCell style={{ width: "500px", overflowX: "auto" }}>
                          {`http://192.168.1.54:4101/+${item.jobPdf}`}
                        </TableCell> */}
                        <TableCell>
                          {item.jobWord ? (
                            <a
                              href={
                                "https://sisccltd.com/hrsolutions/" +
                                item.jobWord
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <CgFileDocument size={20} />
                            </a>
                          ) : (
                            "_"
                          )}
                        </TableCell>
                        <TableCell>{item.count}</TableCell>
                        {/* <TableCell dangerouslySetInnerHTML={{ __html: item.Responsibilities }} /> */}
                        <TableCell className="d-flex">
                          {/* <div
                            className="text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleclickmodal(item._id);
                            }}
                          >
                            <p className="fa fa-edit"></p>
                          </div> */}
                          <div
                            style={{ cursor: "pointer" }}
                            className="mx-3 text-danger"
                            onClick={() => {
                              handleclickdelete(item._id);
                            }}
                          >
                            <DeleteIcon />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <div className="m-3">
                <button
                  disabled={currentPage === 1}
                  className="p-1 rounded pagePre"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <SkipPreviousIcon />
                </button>
                <span>{`Page ${currentPage} of ${totalPage}`}</span>
                <button
                  disabled={currentPage === totalPage}
                  className="p-1 rounded pageNext"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <SkipNextIcon />
                </button>
              </div>
            </TableContainer>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}