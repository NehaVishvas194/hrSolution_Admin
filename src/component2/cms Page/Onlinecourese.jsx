import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Button,
  DialogTitle,
  Modal,
  Grid,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import EditSquare from "@mui/icons-material/EditSquare";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { baseurlImage } from "../../features/Imageurl";

const pageSize = 5;

export default function OnlineCourses() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [files, setFiles] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [upfatedata, setUpfatedata] = useState({
    Heading: "",
    Description: "",
    Detailed_description: "",
    price: "",
    video: "",
  });
  const [iwe, setIwe] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`${baseUrl}get_cms_online_courses_details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.courses);
        setData(response.data.courses);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const filterData = data.filter((item) => {
    return (
      item.Description.toLowerCase().includes(query.toLowerCase()) ||
      item.Detailed_description.toLowerCase().includes(query.toLowerCase()) ||
      item.Heading.toLowerCase().includes(query.toLowerCase()) ||
      item.price.toLowerCase().includes(query.toLowerCase())
    );
  });
  const totalPage = Math.ceil(filterData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filterData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddJobList = () => {
    const formData = new FormData();
    formData.append("Heading", upfatedata.Heading);
    formData.append("Description", upfatedata.Description);
    formData.append("Detailed_description", upfatedata.Detailed_description);
    formData.append("price", upfatedata.price);

    if (files) {
      formData.append("image", files);
    }

    console.log(formData);
    axios
      .post(`${baseUrl}cms_online_courses`, formData)
      .then((response) => {
        toast.success(response.data.message);
        setOpenModal(false);
        getData();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenUpdateModal = (item) => {
    console.log(item);
    setOpen(true);
    setIwe(item._id);
    setUpfatedata({
      Heading: item.Heading,
      Description: item.Description,
      Detailed_description: item.Detailed_description,
      price: item.price,
      presentation: item.presentation,
      video: item.video,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpfatedata({ ...upfatedata, [name]: value });
  };

  const handleChangefile = (e) => {
    const file = e.target.files[0];
    setFiles(file);
  };

  const handleClickDelete = (_id) => {
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
          .delete(`${baseUrl}delete_course/${_id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            getData();
            toast.success(response.data.message);
          })
          .catch((error) => {
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

  const handleClose = () => setOpen(false);

  const handleApi = () => {
    const formData = new FormData();
    formData.append("Heading", upfatedata.Heading);
    formData.append("Description", upfatedata.Description);
    formData.append("Detailed_description", upfatedata.Detailed_description);
    formData.append("price", upfatedata.price);
    if (files) {
      formData.append("image", files);
    }

    axios
      .put(`${baseUrl}update_online_course/${iwe}`, formData)
      .then((response) => {
        if (response.data.success) {
          setOpen(false);
          getData();
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        // toast.error(error.response.data);
        toast.error(error.response.data.message);
      });
  };

  const handleget = () => {
    navigate("/Admin/onlinecouresefulldetails");
  };

  const handleClickview = (item) => {
    console.log(item._id);
    navigate("/Admin/testDescription", { state: { data: item } });
  };

  const handleClicknavigate = (_id) => {
    navigate("/Admin/CourseEdit", { state: { data: _id } });
  };

  const handleclicknavigeate = () => {
    navigate("/Admin/AddCourse");
  };
  return (
    <div className="content">
      <div className="row">
        <div className="col-md-12">
          <h4 className="page-title">Online courses</h4>
        </div>
      </div>
      <div className="container main_container">
        {/* Add Modal */}
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
            <DialogTitle>Add Course</DialogTitle>
            <div className="d-flex flex-column">
              <TextField
                style={{ width: "100%" }}
                onChange={handleChange}
                name="Heading"
                label="Heading"
                variant="outlined"
                size="small"
              />
              <TextField
                className="mt-3"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="Description"
                label="Description"
                variant="outlined"
                size="small"
              />
              <TextField
                className="mt-3"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="Detailed_description"
                label="Detailed Description"
                variant="outlined"
                size="small"
              />
              <TextField
                className="mt-3"
                type="file"
                onChange={handleChangefile}
                name="image"
                label="Image"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                size="small"
              />
              <TextField
                className="mt-3"
                name="price"
                onChange={handleChange}
                label="Price"
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
        {/* Update Modal */}
        <Modal open={open} onClose={handleClose}>
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
            <DialogTitle>Update Course</DialogTitle>
            <div className="d-flex flex-column">
              <TextField
                className="mt-3"
                onChange={handleChange}
                name="Heading"
                value={upfatedata.Heading}
                label="Heading"
                variant="outlined"
                size="small"
              />
              <TextField
                className="mt-3"
                onChange={handleChange}
                name="Description"
                value={upfatedata.Description}
                label="Description"
                variant="outlined"
                size="small"
              />
              <TextField
                className="mt-3"
                onChange={handleChange}
                name="Detailed_description"
                value={upfatedata.Detailed_description}
                label="Detailed Description"
                variant="outlined"
                size="small"
              />
              <TextField
                className="mt-3"
                type="file"
                onChange={handleChangefile}
                name="image"
                label="Image"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                size="small"
              />
              <TextField
                className="mt-3"
                onChange={handleChange}
                name="price"
                value={upfatedata.price}
                label="Price"
                variant="outlined"
                size="small"
              />
              <div className="d-flex justify-content-between">
                <Button
                  style={{ backgroundColor: "#5c6bc0", color: "white" }}
                  onClick={handleApi}
                  className="mt-4"
                >
                  Submit
                </Button>
                <Button
                  style={{ backgroundColor: "gray", color: "white" }}
                  onClick={handleClose}
                  className="mt-4"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
        {/* Course Table */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Button
            style={{ backgroundColor: "#5c6bc0", color: "white" }}
            onClick={handleclicknavigeate}
          >
            Add New Course
          </Button>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant="outlined"
            size="small"
            placeholder="Search"
          />
        </Box>
        <Grid container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course Image</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Topics</TableCell>
                  <TableCell>Enroll user</TableCell>
                  {/* <TableCell>View</TableCell> */}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((item) => {
                  console.log(item);
                  return (
                    <>
                      <TableRow key={item._id}>
                        <TableCell>
                          <img
                            className="rounded-circle"
                            src={`${baseurlImage}${item.image}`}
                            style={{ width: "65px", height: "65px" }}
                          />
                        </TableCell>
                        <TableCell>
                          {item.Heading.slice(0, 20) + "..."}
                        </TableCell>
                        <TableCell>
                          {item.Description.slice(0, 35) + "..."}
                        </TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell
                          onClick={() => {
                            handleClickview(item);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <a style={{ color: "blue" }}>{item.topic.length}</a>
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            navigate("/Admin/enrolldedusercopunt", {
                              state: { data: item.enrolled_users },
                            });
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <a style={{ color: "blue" }}>
                            {item.enrolled_users_count}
                          </a>
                        </TableCell>
                        {/* <TableCell><i className="fa fa-eye" onClick={()=>{handleClickview(item)}}></i></TableCell> */}
                        <TableCell>
                          <Button
                            style={{
                              marginRight: "8px",
                              backgroundColor: "#5c6bc0",
                              color: "white",
                              marginTop: "5px",
                            }}
                            onClick={() => handleClicknavigate(item._id)}
                            // onClick={() => handleOpenUpdateModal(item)}
                          >
                            <FaEdit size={18} />
                          </Button>
                          <Button
                            onClick={() => handleClickDelete(item._id)}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              marginTop: "5px",
                            }}
                          >
                            <MdDelete size={20} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
            <div className="m-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 rounded pagePre"
              >
                <SkipPreviousIcon />
              </button>
              <span>{`Page ${currentPage} of ${totalPage}`}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                className="p-1 rounded pageNext"
              >
                <SkipNextIcon />
              </button>
            </div>
          </TableContainer>
          <ToastContainer />
        </Grid>
      </div>
    </div>
  );
}
