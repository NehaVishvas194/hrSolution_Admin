import React, { useState, useEffect } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
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
import { useNavigate } from "react-router-dom";
import ManIcon from "@mui/icons-material/Man";
import Woman2Icon from "@mui/icons-material/Woman2";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Swal from "sweetalert2";
const pageSize = 5;
export default function Jobposting() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [report, setReport] = useState('');
  const [employee, setEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [jobStatus, setJobStatus] = useState("4");

  const [open, setOpen] = useState(false);
  const [iwe, setIwe] = useState("");
  const [upfatedata, setUpfatedata] = useState({
    Number_of_emp_needed: "",
    job_Responsibility: "",
    startDate: "",
    endDate: "",
    Experience: "",
    skills:" ",
    qualification:" "
  });
  useEffect(() => {
    getData();
    getAllJobs();
  }, []);
  const getData = () => {
    axios
      .get(`${baseUrl}getAll_Jobs_admin`,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.allJobs);
        setData(response.data.allJobs);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleclickotherman = (jobId) => {
    navigate("/Admin/View-Deatils", { state: { data: jobId } });
  };
  const handleclicwoman = (jobId) => {
    navigate("/Admin/Femail-jobs", { state: { data: jobId } });
  };
  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };
  const handleChangeReport = (event) => {
    setReport(event.target.value);
  };

  const filterData = data.filter((item) => {
    return (
      item.job_title.toLowerCase().includes(query.toLowerCase()) ||
      item.company_Industry.toLowerCase().includes(query.toLowerCase()) ||
      item.jobId.toLowerCase().includes(query.toLowerCase()) ||
      item.company_name.toLowerCase().includes(query.toLowerCase()) ||
      item.phone_no.toString().includes(query.toLowerCase()) ||
      item.employee_email.toLowerCase().includes(query.toLowerCase()) ||
      (item.endDate &&
        new Date(item.endDate).toLocaleDateString("en-CA").includes(query))
    );
  });
  const totalPage = Math.ceil(filterData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filterData.slice(startIndex, endIndex);
  const handleChangeJobStatus = (event) => {
    const { value } = event.target;
    setJobStatus(event.target.value)
    // setJobStatus((prevStatus) => ({
    //   ...prevStatus,
    //   dropval: value,
    // }));

    if (value === "4") {
      getData()
    } else {
      axios
        .get(`${baseUrl}getAll_Jobs?job_status=${value}`)
        .then((response) => {
          setData(response.data.allJobs);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }

  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const getAllJobs = () => {
    axios
      .get(`${baseUrl}getAllEmp`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setEmployee(response.data.Details);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleJobTitleChange1 = (e) => {
    setSelectedEmployee(e.target.value);
  };
  const handleAddJobList = () => {
    if (!selectedEmployee) {
      toast.error("Please select a Company before adding to the job.");
      return;
    }
    navigate("/Admin/post-job-client", { state: { userid: selectedEmployee } });
    console.log("Job added with employee:", selectedEmployee);
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenUpdateModal = (item) => {
    setOpen(true);
    const editItem = data.find((i) => i.jobId === item.jobId);
    setIwe(editItem.jobId);
    setUpfatedata({
      Number_of_emp_needed: editItem.Number_of_emp_needed,
      job_type: editItem.job_type,
      job_schedule: editItem.job_schedule,
      job_Description: editItem.job_Description,
      job_Responsibility: editItem.job_Responsibility,
      startDate: editItem.startDate,
      endDate: editItem.endDate,
      Experience: editItem.Experience,
      skills:editItem.skills,
      qualification:editItem.qualification
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpfatedata({ ...upfatedata, [name]: value });
  };
  const handleClickDelete = (jobId) => {
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
          .delete(`${baseUrl}deleteJob/${jobId}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
    axios
      .post(`${baseUrl}updateJob/${iwe}`, upfatedata, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          setOpen(false);
          getData();
          getAllJobs();
          toast.success(response.data.message);
        }
        console.log(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // const dataActiveInactive = (e, jobId) => {
  //   const { value } = e.target;
  //   setJobStatus((prevState) => ({
  //     ...prevState,
  //     [jobId]: value,
  //   }));
  //   axios
  //     .post(`${baseUrl}active_inactive_job/${jobId}`, { newStatus: value })
  //     .then((response) => {
  //       getData();
  //       if (response.data.message === "open") {
  //         toast.success("Active");
  //       }
  //       if (response.data.message === "close") {
  //         toast.success("Inactive");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error updating job status:", error.response.data);
  //     });
  // };
  const dataActiveInactive = (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 3 : 1;

    axios
      .post(`${baseUrl}active_inactive_job/${id}`, { newStatus }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          Swal.fire(
            "Status!",
            currentStatus === 1 ? "Deactivated." : "Activated.",
            "success"
          );
          getData();
        } else {
          Swal.fire("Error", "Failed to update status.", "error");
        }
      })
      .catch((error) => {
        console.error(error);
         
        Swal.fire("Error", `${error.response.data.message}`, "error");
      });
  };
  const handleclick = (jobId) => {
    const datat1 = data.filter((item) => {
      return item.jobId === jobId;
    });
    navigate("/Admin/Jobdetails", { state: { data: datat1 } });
    // console.log(datat1)
  };

  const handlekeypress = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  };


  const getReport = () => {
    axios
      .get(`${baseUrl}export_Jobs?job_status=${jobStatus}`, {
        responseType: "blob",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        }, // Important to set the response type to 'blob'
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
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  // useEffect(() => {
  //   if (report) {
  //     getReport();
  //   }
  // }, [report]);
  return (
    <div className="content">
      <div className="row">
        <div className="col-md-12">
          <h4 className="page-title">Jobs</h4>
        </div>
      </div>
      <div className="container main_container">
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <TextField
                id="outlined-size-small"
                value={query}
                label="Search..."
                onChange={handleChangeQuery}
                variant="outlined"
                size="small"
              />
            </div>

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
                  label="Jobs"
                  onChange={handleChangeJobStatus}
                >
                  
                  <MenuItem value="4">All</MenuItem>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="3">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, mx: 0 }} size="small">
              <Button
                variant="contained"
                onClick={getReport}
                style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
                
              >
                Export
              </Button>
              {/* <FormControl fullWidth>
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
                  <MenuItem value="1">active</MenuItem>
                  <MenuItem value="2">Inactive</MenuItem>
                </Select>
              </FormControl> */}
            </Box>


            <Button
              variant="contained"
              style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
              onClick={handleOpenModal}
            >
              Add Job
            </Button>

          </div>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ "white-space": "nowrap" }}>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Job ID</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                {/* <TableCell>Status</TableCell> */}
                <TableCell>View</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applied Candidate</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData &&
                currentData.length > 0 &&
                currentData.map((item, index) => {
                  console.log(item);
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell>{startIndex + index + 1}</TableCell>
                        <TableCell>{item.jobId}</TableCell>
                        <TableCell>{item.job_title}</TableCell>
                        <TableCell>
                          {new Date(item.startDate).toLocaleDateString("en-CA")}
                        </TableCell>
                        <TableCell>
                          {new Date(item.endDate).toLocaleDateString("en-CA")}
                        </TableCell>
                        {/* <TableCell>
                        {item.status === 0
                          ? "Pending"
                          : item.status === 1
                            ? "Active"
                            : item.status === 2
                              ? "Requirement Full"
                              : "Inactive"}
                      </TableCell> */}
                        <TableCell>
                          <RemoveRedEyeIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleclick(item.jobId);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="">
                            {/* <FormControl
                            sx={{ minWidth: 100 }}
                            fullwidth
                            size="small"
                            className="py-0"
                          >
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              value={jobStatus[item.jobId] || ""}
                              className="text-center"
                              onChange={(e) =>
                                handleJobStatusChange(e, item.jobId)
                              }
                            >
                              <MenuItem value={1}>Active</MenuItem>
                              <MenuItem value={3}>Inactive</MenuItem>
                            </Select>
                          </FormControl> */}
                            {
                              <BootstrapSwitchButton
                                width={100}
                                checked={Boolean(item.status === 1)}
                                onlabel="Active"
                                offlabel="Inactive"
                                onstyle="success"
                                // offstyle="danger"
                                onChange={() => dataActiveInactive(item.jobId, item.status)}
                              />
                            }
                          </div>
                        </TableCell>
                        <TableCell className="text-success">
                          <div className="d-flex jobPostingDrop justify-content-center">
                            <div style={{ cursor: "pointer" }}>
                              <ManIcon
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={() => handleclickotherman(item.jobId)}
                              />
                              <br />
                              <p
                                className="text-center mb-0"
                                onClick={() => handleclickotherman(item.jobId)}
                              >
                                {item?.maleCandidateCount}
                              </p>
                            </div>
                            <div style={{ cursor: "pointer" }}>
                              <Woman2Icon
                                onClick={() => handleclicwoman(item.jobId)}
                              />
                              <br />
                              <p
                                className="text-center mb-0"
                                onClick={() => handleclicwoman(item.jobId)}
                              >
                                {item?.femaleCandidateCount}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="d-flex align-items-center justify-content-center">
                            <p
                              className="text-danger mb-0"
                              onClick={() => {
                                handleClickDelete(item.jobId);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <DeleteForeverIcon />
                            </p>
                            <p
                              className="mb-0"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleOpenUpdateModal(item);
                              }}
                            >
                              <i
                                className="fa fa-edit"
                                style={{ color: "#dab95c" }}
                              />
                            </p>
                          </div>
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
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Select a Company</DialogTitle>
          <DialogContent>
            <select
              value={selectedEmployee}
              className="p-2 rounded"
              onChange={handleJobTitleChange1}
            >
              <option>Select</option>
              {employee &&
                employee.length > 0 &&
                employee.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.company_name}
                  </option>
                ))}
            </select>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 25px 25px 25px",
            }}
          >
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddJobList} color="primary">
              Add Job
            </Button>
          </DialogActions>
        </Dialog>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              overflow: "auto",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              height: 600,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <p className="fs-3 text-center fw-normal pb-3"> Update Job</p>
            <div className="d-flex flex-column">
              <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
                value={upfatedata.Number_of_emp_needed}
                name="Number_of_emp_needed"
                label="Number of Emp Needed"
                variant="outlined"
                className="mb-2"
              />
              {/* <TextField
              id="outlined-basic"
              style={{ width: "100%" }}
              onChange={handleChange}
              name="job_type"
              value={upfatedata.job_type}
              label="Job Type"
              variant="outlined"
              margin="normal"
            /> */}
              {/* <FormControl className="mb-3" sx={{ width: "100%" }}>
                <InputLabel id="selectjobpost">Select Job Type</InputLabel>
                <Select
                  labelId="selectjobpost"
                  id="dropdown"
                  label="Select Job Post"
                  onChange={handleChange}
                  name="job_type"
                  value={upfatedata?.job_type}
                >
                  <MenuItem value="">
                    <em>Select Type</em>
                  </MenuItem>
                  <MenuItem value="Full-Time">Full-Time</MenuItem>
                  <MenuItem value="Part-Time">Part-Time</MenuItem>
                  <MenuItem value="Temporary">Temporary</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                  <MenuItem value="Commission">Commission</MenuItem>
                  <MenuItem value="Fresher">Fresher</MenuItem>
                  <MenuItem value="Volunteer">Volunteer</MenuItem>
                  <MenuItem value="Walk-In">Walk-In</MenuItem>
                </Select>
              </FormControl> */}
              {/* <TextField
              id="outlined-basic"
              style={{ width: "100%" }}
              value={upfatedata.job_schedule}
              onChange={handleChange}
              name="job_schedule"
              label="Job Post"
              variant="outlined"
              margin="normal"
            /> */}
              {/* <FormControl className="mb-3" sx={{ width: "100%" }}>
                <InputLabel id="JobType">Job Schedule</InputLabel>
                <Select
                  labelId="JobType"
                  id="dropdown"
                  label="Job Schedule"
                  value={upfatedata?.job_schedule}
                  onChange={handleChange}
                  name="job_schedule"
                >
                  <MenuItem value="">
                    <em>Select Schedule</em>
                  </MenuItem>
                  <MenuItem value="Day Shift">Day Shift</MenuItem>
                  <MenuItem value="Morning Shift">Morning Shift</MenuItem>
                  <MenuItem value="Rotational Shift">Rotational Shift</MenuItem>
                  <MenuItem value="Night Shift">Night Shift</MenuItem>
                  <MenuItem value="Monday to Friday">Monday to Friday</MenuItem>
                  <MenuItem value="Evening Shift">Evening Shift</MenuItem>
                  <MenuItem value="US Shift">US Shift</MenuItem>
                  <MenuItem value="UK Shift">UK Shift</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl> */}
              <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="job_Description"
                value={upfatedata?.job_Description} // Display plain text
                label="Job Description"
                variant="outlined"
                margin="normal"
              />
              {/* <TextField
              id="outlined-basic"
              style={{ width: "100%" }}
              onChange={handleChange}
              name="job_Description"
              value={upfatedata.job_Description}
              label="Job Description"
              variant="outlined"
              margin="normal"
            /> */}
              {/* <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="job_Responsibility"
                value={upfatedata?.job_Responsibility.replace(/<\/?[^>]+(>|$)/g, "")}
                // value={upfatedata.job_Responsibility}
                label="Responsibility"
                variant="outlined"
                margin="normal"
              /> */}
              <TextField
                id="outlined-basic"
                type="date"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="startDate"
                value={
                  upfatedata.startDate
                    ? new Date(upfatedata?.startDate).toISOString().split("T")[0]
                    : ""
                }
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                margin="normal"
              />
              <TextField
                id="outlined-basic"
                type="date"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="endDate"
                value={
                  upfatedata?.endDate
                    ? new Date(upfatedata.endDate).toISOString().split("T")[0]
                    : ""
                }
                label="End Date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                margin="normal"
              />
              <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
                onKeyPress={handlekeypress}
                value={upfatedata?.Experience}
                name="Experience"
                label="Experience"
                variant="outlined"
                margin="normal"
              />
               <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
               
                value={upfatedata?.skills}
                name="skills"
                label="skills"
                variant="outlined"
                margin="normal"
              />
               <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
                
                value={upfatedata?.qualification}
                name="qualification"
                label="qualification"
                variant="outlined"
                margin="normal"
              />
              <Button
                variant="contained"
                onClick={handleApi}
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
      </div>
    </div>
  );
}
