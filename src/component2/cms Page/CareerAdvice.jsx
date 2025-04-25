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

export default function CareerAdvice() {
  const [datauser, setDatauser] = useState([]);
  const [username, setUsername] = useState("");
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
  const postData = () => {
    const formData = new FormData();
    formData.append("Heading", username);
    formData.append("Description", description);
    formData.append("image", userImage);

    axios
      .post(`${baseUrl}new_carrer_advice`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      .get(`${baseUrl}all_carrer_details_admin`, {
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
          .delete(`${baseUrl}delete_carrer_advice/${id}`, {
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
      item.Heading.toLowerCase().includes(querry.toLowerCase()) ||
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
            Career Advice
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData &&
              filterData.length > 0 &&
              filterData.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.Description}</TableCell>
                    <TableCell>{item.Heading}</TableCell>
                    <TableCell>
                      <img
                        src={`${baseurlImage}${item.image}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                        alt="heloow"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="d-flex">
                        <div>
                          <DeleteForeverIcon
                            className="text-danger"
                            onClick={() => handleclick(item._id)}
                          />
                        </div>
                        <div></div>
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
            Add Career Advice
          </p>
          <TextField
            label="Heading"
            variant="outlined"
            name="Heading"
            className="mb-3"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Description"
            name="Description"
            variant="outlined"
            className="mb-3"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            type="file"
            variant="outlined"
            name="image"
            className="mb-3"
            fullWidth
            onChange={(e) => setUserImage(e.target.files[0])}
          />
          <div className="text-center">
            <Button variant="contained" onClick={postData}>
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}
