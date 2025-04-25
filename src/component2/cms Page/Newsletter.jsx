import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { baseUrl } from "../../features/Api/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Swal from "sweetalert2";
const pageSize = 5;

export default function Newsletter() {
  const [email, setEmail] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = () => {
    axios
      .get(`${baseUrl}getAll_newsLetter`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setEmail(response.data.all_details);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Error fetching data:");
      });
  };

  useEffect(() => {
    getData();
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
          .delete(`${baseUrl}delete_newsLetter/${id}`, {
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
      }
    });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPage = Math.ceil(email.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = email.slice(startIndex, endIndex);

  return (
    <div className="container main_container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData &&
              currentData.length > 0 &&
              currentData.map((item, index) => {
                return (
                  <>
                    <TableRow key={index}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        <DeleteIcon
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleclick(item._id)}
                        />
                      </TableCell>
                    </TableRow>
                  </>
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
    </div>
  );
}
