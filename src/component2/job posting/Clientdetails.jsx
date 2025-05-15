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
  Box,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { baseurlImage } from "../../features/Imageurl";
import Rating from "react-rating-stars-component";
import { ArrowBack } from "@mui/icons-material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
const pageSize = 5;
export default function Clientdetails() {
  const location = useLocation();
   const [currentPage, setCurrentPage] = useState(1);
  const datauser1 = location.state?.data;
  const [datauser, setDatauser] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
    const [query, setQuery] = useState("");
  const navigate = useNavigate()
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    fetchJobSeekerProfile();
  }, [datauser1]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const fetchJobSeekerProfile = () => {
    axios
      .get(`${baseUrl}get_jobseeker_profile/${datauser1}`)
      .then((response) => {
        console.log(response.data.Details[0].jobId)
        setDatauser(response.data.Details);
      })
      .catch((error) => {
        toast.error(
          "Error fetching job seeker profile: " + error.response.data
        );
      });
  };

  const handleChangeStatus = (id, newStatus) => {
    axios
      .post(`${baseUrl}candidate_recruitment_process/${id}`, {
        seeker_status: newStatus,
      })
      .then((response) => {
        toast.success(response.data.message);
        fetchJobSeekerProfile();
      })
      .catch((error) => {
        toast.error("Error updating status: " + error.response.data);
      });
  };

  const handleExportCandidates = (jobSeekerStatus) => {
    axios
      .get(
        `${baseUrl}export_candidate/Male?jobSeeker_status=${jobSeekerStatus}&jobId=${datauser[0].jobId}`,
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
      <p className={classMap[jobSeekerStatus]} style={{ marginTop: "10px" }}>
        {statusMap[jobSeekerStatus]}
      </p>
    );
  };
  const filterData = (datauser || []).filter((item) => {
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <ArrowBack className="mb-3" style={{ cursor: "pointer" }} onClick={() => { navigate('/Admin/Job-Posting') }} />
        </div>
        <div className="col-md-8 d-flex justify-content-end align-items-center gap-3 mb-3">
          <div>
            <TextField
              id="outlined-size-small"
              value={query}
              label="Search by Email and City"
              variant="outlined"
              size="small"
              onChange={handleChange}
            />
          </div>
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                <InputLabel id="status-filter-small-label12">Export</InputLabel>
                <Select
                  labelId="status-filter-small-label12"
                  id="status-filter-select-small"
                  label="Export"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem onClick={() => handleExportCandidates(3)}>
                    Longlist
                  </MenuItem>
                  <MenuItem onClick={() => handleExportCandidates(2)}>
                    Shortlist
                  </MenuItem>
                  <MenuItem onClick={() => handleExportCandidates(4)}>
                    Assesment Schedule
                  </MenuItem>
                  <MenuItem onClick={() => handleExportCandidates(5)}>
                    Schedule Interview
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>


      </div>
      <TableContainer component={Paper}>
        {currentdata.length === 0 ? (
          <p style={{ "text-align": "center", "font-size": "20px" }}>No Male applied for this position.</p>
        ) : (
          <Table className="jobdetailtd">
            <TableHead>
              <TableRow style={{ "white-space": "nowrap" }}>
                <TableCell>JOB ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>District</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Job-seeker Status</TableCell>
                <TableCell>CV</TableCell>
                <TableCell>Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentdata.map((item, index) => {
                return (
                  <>
                    <TableRow key={index}>
                      <TableCell>{item.jobId}</TableCell>
                      <TableCell>
                        {item.first_Name} {item.last_Name}
                      </TableCell>
                      <TableCell>{item.user_Email}</TableCell>
                      <TableCell>{item.phone_no}</TableCell>
                      <TableCell>{item.Total_experience} Yr</TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell>{item.gender}</TableCell>
                      <TableCell>
                        {renderJobSeekerStatus(item.jobSeeker_status)}
                      </TableCell>
                      <TableCell className="text-center">
                        <a
                          href={`${baseurlImage}${item.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i class="fi fi-sr-resume"></i>
                        </a>
                      </TableCell>
                      <TableCell >
                        <Rating
                          count={5}
                          size={24}
                          fractions={2}
                          value={item?.candidate_rating}
                          activeColor="#ffd700"
                          className="star_Sec"
                        />
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <div className="m-3">
            <button
              disabled={currentPage === 1}
              className="p-1 rounded pagePre"
              onClick={() => handlePageChange(currentPage - 1)}>
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