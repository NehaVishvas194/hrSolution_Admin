import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
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
  Grid
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
const pageSize = 5;

export default function JobTitle() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [inpData, setInpData] = useState({});
  const navigate = useNavigate();

  const getData = () => {
    axios
      .get(`${baseUrl}all_main_jobTitle_main`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data.details);
      })
      .catch((error) => {
        // console.log(error.response.data);
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInpData({ ...inpData, [name]: value });
  };

  const handleClick = () => {
    axios
      .post(
        `${baseUrl}add_Main_JobTitle`,
        {
          Main_jobTitle: inpData.jobTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log(response.data);

        if (response.data.success === true) {
          toast.success(response.data.message);
          // navigate("/Admin/Job-Description-Database");
          handleClose();
          getData();
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // const handleDelete = (_id) => {
  //   axios
  //     .delete(`${baseUrl}deletejobTitle/${_id}`)
  //     .then((response) => {
  //       toast.success(response.data.message);
  //       getData();
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data.message);
  //     });
  // };
  const handleDelete = (_id) => {
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
          .delete(`${baseUrl}delete_main_jobTitle/${_id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            toast.success(response.data.message);
            getData();
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            // console.log(error.response.data.message);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const totalPage = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="content">
      <div className="row">
        <div className="col-md-12">
          <h4 className="page-title">Job Title</h4>
        </div>
      </div>
      <div className="container main_container">
        <Button
          variant="contained"
          className="me-3 mb-3"
          onClick={handleOpen}
          style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
        >
          Add Job List
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h5 className="text-center mb-3">Add Job Title</h5>
            <div className="d-flex flex-column">
              <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="jobTitle"
                label="Job Title"
                variant="outlined"
              />
              <Button
                variant="contained"
                onClick={handleClick}
                style={{
                  backgroundColor: "#2b6166",
                  color: "#ffffff",
                  marginTop: "20px",
                }}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Modal>
        <Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData &&
                  currentData.length > 0 &&
                  currentData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>{item.Main_jobTitle}</TableCell>
                      <TableCell>
                        <DeleteForeverIcon
                          style={{ cursor: "pointer" }}
                          className="text-danger"
                          onClick={() => handleDelete(item._id)}
                        />
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
        </Grid>
      </div>
    </div>
  );
}
