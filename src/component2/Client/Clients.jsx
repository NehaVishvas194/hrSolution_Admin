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
  Button,
  Switch,
} from "@mui/material";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
const pageSize = 6;
export default function Clients() {
  const [currentPage, setCurrentPage] = useState(1);
  const [report, setReport] = useState("");
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [jobStatus, setJobStatus] = useState("4");
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${baseUrl}getAllEmp_admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.Details);
        setData(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message);
      });
  };
  const handleToggle = (_id, status) => {
    axios
      .post(`${baseUrl}active_inactive_emp/${_id}`)
      .then((response) => {
        getData();
        toast.success(response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("API call error:", error.response.data);
        toast.error(error.response?.data?.message);
      });
  };

  const dataActiveInactive = (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1; // Toggle status
    axios
      .post(
        `${baseUrl}active_inactive_emp/${id}`,
        { newStatus: newStatus }, // Send new status in the body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          Swal.fire(
            "Status Updated!",
            `Employee has been ${
              newStatus === 1 ? "activated" : "deactivated"
            }.`,
            "success"
          );
          getData(); // Refresh the data after updating the status
        } else {
          Swal.fire("Error", "Failed to update status.", "error");
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire(
          "Error",
          "An error occurred while updating the status.",
          "error"
        );
      });
  };

  const handleNavigate = (_id) => {
    const obj = {
      userid: _id,
    };
    axios
      .get(`${baseUrl}getJobs_posted_by_employee/${_id}`)
      .then((response) => {
        const jobData = response.data.emp_jobs;
        console.log(jobData);
        navigate("/Admin/Alljobs", { state: { data: jobData, suerdata: obj } });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const getActiveAndinActive = () => {
    if (jobStatus === "4") {
      getData();
    }
    {
      axios
        .get(`${baseUrl}getAllEmp?status=${jobStatus}`)
        .then((response) => {
          console.log(response.data.Details);
          setData(response.data.Details);
        })
        .catch((error) => {
          console.log(error);
          // toast.error(error.response?.data?.message);
        });
    }
  };

  useEffect(() => {
    if (jobStatus) {
      getActiveAndinActive();
    }
  }, [jobStatus]);
  const filterData = (data || []).filter((item) => {
    const numberofEmp = item.Number_of_emp.toString();
    return (
      item.email.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.phone_no.toString().includes(query.toLowerCase()) ||
      item.company_industry.toLowerCase().includes(query.toLowerCase()) ||
      item.company_name.toLowerCase().includes(query.toLowerCase())
    );
  });

  const handleChangeReport = (event) => {
    setReport(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const totalPage = Math.ceil(filterData.length / pageSize);
  const startindex = (currentPage - 1) * pageSize;
  const endIndex = startindex + pageSize;
  const currentdata = filterData.slice(startindex, endIndex);
  const handleActive = (_id) => {
    navigate("/Admin/Activejobs", { state: { data: _id } });
  };
  const handleInactive = (_id) => {
    navigate("/Admin/Inactivejobs", { state: { data: _id } });
  };
  /////////////////////////////////get all jobs//////////////////////////////////////////////
  const getalljobs = () => {
    axios
      .get(`${baseUrl}getAll_Jobs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    getalljobs();
  }, []);
  const handleclick = (item) => {
    const datta = data.filter((item1) => {
      return item1._id === item._id;
    });
    console.log(datta);
    navigate("/Admin/Clientview-page", { state: { data: datta[0] } });
  };

  const getReport = () => {
    axios
      .get(`${baseUrl}export_clients/?client_status=${jobStatus}`, {
        responseType: "blob", // Important to set the response type to 'blob'
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
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
        console.log(error.message);
        alert(error.response.data.message);
        toast.error(error.response.data.message);
      });
  };

  // useEffect(() => {
  //   if (report) {
  //     getReport();
  //   }
  // }, [report]);

  const handleChangeJobStatus = (event) => {
    // const { value } = event.target;
    setJobStatus(event.target.value);
  };

  return (
    <div className="content">
      <div className="row">
        <div className="col-md-12">
          <h4 className="page-title">Clients</h4>
        </div>
      </div>
      <div className="container main_container">
        <div className="d-flex justify-content-between mx-1 mt-2 mb-3">
          <div>
            <TextField
              id="outlined-size-small"
              value={query}
              label="Search...."
              variant="outlined"
              size="small"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-8 d-flex justify-content-end align-items-center gap-3 mb-3">
            <Box>
              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel id="job-status-small-label">Filter</InputLabel>
                <Select
                  labelId="job-status-small-label"
                  id="job-status-select-small"
                  value={jobStatus}
                  name="dropval"
                  label="status"
                  onChange={handleChangeJobStatus}
                >
                  <MenuItem value="4">All</MenuItem>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div>
              <Button
                variant="contained"
                onClick={getReport}
                style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
              >
                Export
              </Button>

              {/* <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Export</InputLabel>
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
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
            </div>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ "white-space": "nowrap" }}>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Contact Person Name</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Company Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Status</TableCell>
                {/* <TableCell>Action</TableCell> */}
                <TableCell>Active Jobs</TableCell>
                <TableCell>Inactive Jobs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentdata &&
                currentdata.length > 0 &&
                currentdata.map((item, index) => {
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell>{startindex + index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.company_name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone_no}</TableCell>
                        <TableCell>
                          <RemoveRedEyeIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleclick(item);
                            }}
                          />
                        </TableCell>
                        {/* <TableCell>
                          {" "}
                          {item.status === 0 ? (
                            <p className="mb-0" style={{ fontSize: "14px" }}>
                              In Active
                            </p>
                          ) : item.status === 1 ? (
                            <p className="mb-0" style={{ fontSize: "14px" }}>
                              Active
                            </p>
                          ) : (
                            ""
                          )}
                        </TableCell> */}
                        <TableCell>
                          <Switch
                            checked={item.status === 1}
                            onChange={() => handleToggle(item._id, item.status)}
                            color="primary"
                          />
                          {/* <BootstrapSwitchButton
                            width={100}
                            checked={item.status === 1} // Ensure this is boolean
                            onlabel="Active"
                            offlabel="Inactive"
                            onstyle="success"
                            offstyle="danger" // Optional: Add an offstyle for better UX
                            onChange={() => dataActiveInactive(item._id, item.status)} // Pass item._id and item.status
                          /> */}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleActive(item._id)}
                            variant="outlined"
                            color="primary"
                          >
                            View
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleInactive(item._id)}
                            variant="outlined"
                            color="primary"
                          >
                            View
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
