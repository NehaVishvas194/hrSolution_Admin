import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Swal from "sweetalert2";
const pageSize = 5;

export default function Contactus() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const getdata = () => {
    axios
      .get(`${baseUrl}get_contactUS`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data.Details);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handledelete = (_id) => {
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
          .delete(`${baseUrl}DeleteContactUS/${_id}`)
          .then((response) => {
            getdata();
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
  useEffect(() => {
    getdata();
  }, []);
  
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
          <h4 className="page-title">Contact Us</h4>
        </div>
      </div>
      <div className="container main_container">
        <Grid container>
          <TableContainer component={Paper}>
            <Table sx={{ padding: "16px" }}>
              <TableHead>
                <TableRow style={{ "white-space": "nowrap" }}>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData &&
                  currentData.length > 0 &&
                  currentData.map((item, index) => {
                    console.log(item);
                    return (
                      <TableRow key={index}>
                        <TableCell className="py-4">
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone_no}</TableCell>
                        <TableCell>{item.subject}</TableCell>
                        <TableCell>{item.message}</TableCell>
                        <TableCell>
                          <DeleteIcon
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handledelete(item._id);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
