import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { baseurlImage } from "../../features/Imageurl";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import Rating from "react-rating-stars-component";
import { ArrowBack } from "@mui/icons-material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
const pageSize = 6;
export default function Femalejobs() {
  const location = useLocation();
  const dataUser1 = location.state?.data;
  const [dataUser, setDataUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleChange2 = (e) => {
    setQuery(e.target.value);
  };

  const fetchData = () => {
    axios
      .get(`${baseUrl}get_Female_jobseeker_profile/${dataUser1}`)
      .then((response) => {
        console.log(response.data.Details);
        setDataUser(response.data.Details);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  const handleChange = (_id, value) => {
    console.log(value);
    console.log(_id);
    axios
      .post(`${baseUrl}/${_id}`, {
        seeker_status: value,
      })
      .then((response) => {
        fetchData();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  const handleExportCandidates = (jobSeekerStatus) => {
    axios
      .get(
        `${baseUrl}export_candidate/Female?jobSeeker_status=${jobSeekerStatus}`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `exported_data_${jobSeekerStatus}.xlsx`;
        link.click();
        URL.revokeObjectURL(url);
        toast.success("Data exported successfully!");
      })
      .catch((error) => {
        toast.error("Error exporting data: " + error.response.data);
      });
  };
  const renderJobSeekerStatus = (jobSeekerStatus) => {
    const statusMap = {
      1: "Pending",
      2: "Shortlisted",
      3: "longlisted",
      4: "Assessment Scheduled",
      5: "Schedule Interview",
      6: "Shortlist",
      7: "Reject",
    };
    const classMap = {
      1: "text-secondary",
      2: "text-success",
      3: "text-success",
      4: "text-success",
      5: "text-danger",
      6: "",
      7: "text-danger",
    };
    return (
      <p className={classMap[jobSeekerStatus]}>{statusMap[jobSeekerStatus]}</p>
    );
  };

  const navigate = useNavigate();
  const filterData = (dataUser || []).filter((item) => {
    // const numberofEmp = item.Number_of_emp.toString();
    return (
      item.user_Email.toLowerCase().includes(query.toLowerCase()) ||
      item.city.toLowerCase().includes(query.toLowerCase())
      // numberofEmp.includes(query.toLowerCase())
    );
  });
  const totalPage = Math.ceil(filterData.length / pageSize);
  const startindex = (currentPage - 1) * pageSize;
  const endIndex = startindex + pageSize;
  const currentdata = filterData.slice(startindex, endIndex);
  return (
    <div className="container main_container">
      <div className="d-flex justify-content-between mb-3">
        <div>
          <ArrowBack
            className="mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/Admin/Job-Posting");
            }}
          />
        </div>
        <div></div>
        <div className="col-md-8 d-flex justify-content-end align-items-center gap-3 mb-3">
          <TextField
            id="outlined-size-small"
            value={query}
            label="Search by Email and City"
            variant="outlined"
            size="small"
            onChange={handleChange2}
          />
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="status-filter-label123">Export</InputLabel>
                <Select
                  labelId="status-filter-label123"
                  label="Export"
                  id="status-filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem onClick={() => handleExportCandidates(5)}>
                    Complete
                  </MenuItem>
                  <MenuItem onClick={() => handleExportCandidates(6)}>
                    Shortlist
                  </MenuItem>
                  <MenuItem onClick={() => handleExportCandidates(7)}>
                    Reject
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        {currentdata.length === 0 ? (
          <p style={{ "text-align": "center", "font-size": "20px" }}>
            No women applied for this position.
          </p>
        ) : (
          <Table>
            <TableHead>
              <TableRow style={{ "white-space": "nowrap" }}>
                <TableCell>JOB ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>District</TableCell>
                <TableCell>Gender</TableCell>
                {/* <TableCell>Candidate Status</TableCell> */}
                <TableCell>Job-seeker Status</TableCell>
                <TableCell>Resume</TableCell>
                <TableCell>Rating</TableCell>
                {/* <TableCell>Status</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentdata.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.jobId}</TableCell>
                  <TableCell>{`${item.first_Name} ${item.last_Name}`}</TableCell>
                  <TableCell>{item.user_Email}</TableCell>
                  <TableCell>{item.phone_no}</TableCell>
                  <TableCell>{`${item.Total_experience} Yr`}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  {/* <TableCell>
                                        {item.jobSeeker_status === 1 ? <p className='text-secondary pt-2'>Pending</p> :
                                            item.jobSeeker_status === 2 ? <p className='text-success'>Interview Schedule</p> :
                                                item.jobSeeker_status === 3 ? <p className='text-success'>Assessment</p> :
                                                    item.jobSeeker_status === 4 ? <p className='text-success'>HR Discussion</p> :
                                                        item.jobSeeker_status === 5 ? <p className='text-danger'>Complete</p> :
                                                            item.jobSeeker_status === 6 ? <p>Shortlist</p> :
                                                                item.jobSeeker_status === 7 ? <p className='text-danger'>Reject</p> : ''}
                                    </TableCell> */}
                  <TableCell>
                    {item.jobSeeker_status === 1 ? (
                      <p>Pending </p>
                    ) : item.jobSeeker_status === 2 ? (
                      <p>schedule interview </p>
                    ) : item.jobSeeker_status === 3 ? (
                      <p>assessment</p>
                    ) : item.jobSeeker_status === 4 ? (
                      <p className="mt-2">HR_Discussion</p>
                    ) : item.jobSeeker_status === 5 ? (
                      <p>complete</p>
                    ) : item.jobSeeker_status === 6 ? (
                      "shortlist"
                    ) : item.jobSeeker_status === 7 ? (
                      "reject"
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`${baseurlImage}${item.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fi fi-sr-resume"></i>
                    </a>
                  </TableCell>
                  <TableCell className="">
                    <Rating
                      count={5}
                      size={24}
                      value={item?.candidate_rating}
                      activeColor="#ffd700"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
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
      <ToastContainer />
    </div>
  );
}
