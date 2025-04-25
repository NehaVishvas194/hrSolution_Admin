import React, { useEffect, useState } from "react";
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
import { baseurlImage } from "../../features/Imageurl";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";

export default function Testmonail() {
  const [datauser, setDatauser] = useState([]);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userImage, setUserImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [querry, setQuerry] = useState("");
  const [editData, setEditData] = useState({
    _id: "",
    username: "",
    title: "",
    Description: "",
    user_image: null,
  });
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openUpdateModal = (id) => {
    const editItem = datauser.find((item) => item._id === id);
    setEditData(editItem);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };
  const postData = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("title", title);
    formData.append("Description", description);
    formData.append("user_image", userImage);
    axios
      .post(`${baseUrl}create_testimonial`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        closeModal();
        getdata();
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message);
      });
  };
  const getdata = () => {
    axios
      .get(`${baseUrl}getAll_testimonial_admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.Details);
        setDatauser(response.data.Details);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    getdata();
  }, []);
  const updateTestimonial = () => {
    const formData = new FormData();
    formData.append("username", editData.username);
    formData.append("title", editData.title);
    formData.append("Description", editData.Description);
    if (editData.user_image) {
      formData.append("user_image", editData.user_image);
    }
    axios
      .put(`${baseUrl}update_testimonial/${editData._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        closeUpdateModal();
        getdata();
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message);
      });
  };

  const handleclick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseUrl}delete_testimonial/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            getdata();
            toast.success(response.data.message);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    });
  };

  const handlechnage = (e) => {
    setQuerry(e.target.value);
  };
  const filterData = datauser.filter((item) => {
    return (
      item.username.toLowerCase().includes(querry.toLowerCase()) ||
      item.title.toLowerCase().includes(querry.toLowerCase()) ||
      item.Description.toLowerCase().includes(querry.toLowerCase())
    );
  });
  return (
    <div className="container main_container">
      <div className="d-flex justify-content-between mb-3">
        <div>
          <TextField
            id="outlined-size-small"
            size="small"
            onChange={handlechnage}
            value={querry}
            label="Search...."
            variant="outlined"
          />
        </div>
        <div>
          <Button
            variant="contained"
            className="global_button"
            onClick={openModal}
          >
            Add Testimonial
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData &&
              filterData.length > 0 &&
              filterData.map((item, index) => {
                return (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.Description}</TableCell>
                    <TableCell>
                      <img
                        src={`${baseurlImage}${item.user_image}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center justify-content-center">
                        <p
                          className="text-danger mb-0"
                          onClick={() => handleclick(item._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <DeleteForeverIcon />
                        </p>
                        <p
                          style={{ cursor: "pointer" }}
                          className="mb-0"
                          onClick={() => openUpdateModal(item._id)}
                        >
                          <i
                            className="fa fa-edit"
                            style={{ color: "#dab95c" }}
                          />
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            overflow: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <p
            id="modal-modal-title"
            className="fs-3 text-center fw-normal pb-3 mb-3"
          >
            Add Testimonial
          </p>
          <TextField
            label="Name"
            variant="outlined"
            className="mb-3"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Title"
            variant="outlined"
            className="mb-3"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            className="mb-3"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            type="file"
            variant="outlined"
            className="mb-3"
            fullWidth
            onChange={(e) => setUserImage(e.target.files[0])}
          />
          <Button variant="contained mt-3" onClick={postData}>
            Submit
          </Button>
        </Box>
      </Modal>
      {/* Modal for updating testimonial */}
      <Modal
        open={isUpdateModalOpen}
        onClose={closeUpdateModal}
        aria-labelledby="modal-update-title"
        aria-describedby="modal-update-description"
      >
        <Box
          sx={{
            position: "absolute",
            overflow: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <p
            id="modal-update-title"
            className="fs-3 text-center fw-normal pb-3 mb-3"
          >
            Update Testimonial
          </p>

          <TextField
            label="Name"
            variant="outlined"
            className="mb-3"
            fullWidth
            value={editData.username}
            onChange={(e) =>
              setEditData({ ...editData, username: e.target.value })
            }
          />

          <TextField
            label="Title"
            variant="outlined"
            className="mb-3"
            fullWidth
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />

          <TextField
            label="Description"
            variant="outlined"
            className="mb-3"
            fullWidth
            value={editData.Description}
            onChange={(e) =>
              setEditData({ ...editData, Description: e.target.value })
            }
          />

          <TextField
            type="file"
            variant="outlined"
            className="mb-3"
            fullWidth
            onChange={(e) =>
              setEditData({ ...editData, user_image: e.target.files[0] })
            }
          />

          <Button variant="contained" onClick={updateTestimonial}>
            Update
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}
