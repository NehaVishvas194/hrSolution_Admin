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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Swal from "sweetalert2";
const pageSize = 5;
export default function Transcitiobn() {
  const [data, setData] = useState([]);
  const [report, setReport] = useState("3");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toggle, setToggle] = useState(false);
  function MyComponent({ setToggle }) {
    if (!setToggle) {
      console.error("setToggle is undefined!");
    }
  }
  
  useEffect(() => {
    getData();
  }, []);
  const handleChangeReport = (event) => {
    setReport(event.target.value);
  };
  const getData = () => {
    axios
      .get(`${baseUrl}get_transaction`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.all_transaction);
        setData(response.data.all_transactions);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const getActiveAndinActive = () => {
    if (report === "3") {
      getData()
    } {
      axios
        .get(`${baseUrl}get_transaction?payment_status=${report}`,{
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.all_transaction);
          setData(response.data.all_transactions);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };
  useEffect(() => {
    if (report) {
      getActiveAndinActive();
    }
  }, [report]);

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };
  const filterData = data?.filter((item) => {
    // console.log(item);
    return (
      (item.booking_id &&
        item.booking_id.toLowerCase().includes(query.toLowerCase())) ||
      (item.course_name &&
        item.course_name.toLowerCase().includes(query.toLowerCase())) ||
      (item.currency &&
        item.currency.toLowerCase().includes(query.toLowerCase())) ||
      (item.kind && item.kind.toLowerCase().includes(query.toLowerCase())) ||
      (item.user_name &&
        item.user_name.toLowerCase().includes(query.toLowerCase())) ||
      // (item.amount !== undefined &&
      //   item.amount.toString().includes(query.toLowerCase())) || // Check if amount is defined
      (item.session_id &&
        item.session_id.toLowerCase().includes(query.toLowerCase()))
    );
  });
  const totalPage = Math.ceil(filterData?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filterData?.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleClickDelete = (jobId) => {
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
          .delete(`${baseUrl}deleteJob/${jobId}`)
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
  const getReport = () => {
   
      axios
      .get(`${baseUrl}export_course_transaction/?transaction_status=${report}`, {
        responseType: "blob", // Important to set the response type to 'blob'
        // headers: {
        //   "Authorization": `Bearer ${localStorage.getItem("token")}`,
        //   "Content-Type": "application/json",
        // },
      })
      .then((response) => {
        // Create a URL for the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        // You can set a default file name here
        link.setAttribute("download", `report_${report}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up after download
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    
   
  };
  return (
    <div className="content">
      <div className="row">
        <div className="col-md-12">
          <h4 className="page-title">Course Transactions</h4>
        </div>
      </div>
      <div className="container main_container">
        <div className="row">
          <div className="col-md-4">
            <TextField
              id="outlined-size-small"
              value={query}
              className="mb-3"
              label="Search by Booking ID..."
              onChange={handleChangeQuery}
              variant="outlined"
              size="small"
            />
          </div>
          <div className="col-md-8 d-flex justify-content-end align-items-center gap-3 mb-3">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={report}
                  label="All Candidates"
                  onChange={handleChangeReport}
                  sx={{
                    padding: 0, // Removes the inner padding
                    ".MuiSelect-select": {
                      padding: "9px 8px", // Adjust the inner content padding
                    },
                  }}
                >
                  <MenuItem value="3">All</MenuItem>
                  <MenuItem value="1">complete</MenuItem>
                  <MenuItem value="2">Failed</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <div><Button
              variant="contained"
              onClick={getReport}
              style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
               
            >
              Export
            </Button></div>

          </div>
        </div>



        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ "white-space": "nowrap" }}>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Booking ID</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Payment Date</TableCell>
                {/* <TableCell>Kind</TableCell> */}
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData &&
                currentData.length > 0 &&
                currentData.map((item, index) => {
                  
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.booking_id}</TableCell>
                        <TableCell>{item.session_id}</TableCell>
                        <TableCell>{item.user_name}</TableCell>
                        <TableCell className="col-2">
                          {item.course_name}
                        </TableCell>
                        <TableCell>{item.currency}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>
                          {new Date(item.payment_time).toLocaleDateString(
                            "en-CA"
                          )}
                        </TableCell>
                        {/* <TableCell>{item.kind}</TableCell> */}
                        <TableCell>
                          {item.payment_status == "STATE_COMPLETED" ? (
                            <p style={{ color: "green" }}>Completed</p>
                          ) : item.payment_status == "STATE_PENDING" ? (
                            <p style={{ color: "grey" }}>Pending</p>
                          ) : item.payment_status == "STATE_FAILED" ? (
                            <p style={{ color: "red" }}>Failed</p>
                          ) : (
                            ""
                          )}
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
        <ToastContainer />
      </div>
    </div>
  );
}
