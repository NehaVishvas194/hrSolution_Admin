import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../features/Api/BaseUrl";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Swal from "sweetalert2";
const pageSize = 5;

export default function Uploadresume() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [seekerStatus, setSeekerStatus] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  useEffect(() => {
    getdata();
  }, []);
  const getdata = () => {
    axios
      .get(`${baseUrl}get_upload_section_candidates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.candidates);
        setData(response.data.candidates);
      })
      .catch((error) => {
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
          .delete(`${baseUrl}delete_resume/${id}`, {
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

  const handleChange1234 = (event, _id) => {
    setSeekerStatus(event.target.value);
    setSelectedCandidateId(_id);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEmailSubject("");
    setEmailContent("");
  };
  const handleDialogSubmit = () => {
    axios
      .post(
        `${baseUrl}candidate_recruitment_process_for_uploaded_candidate/${selectedCandidateId}`,
        {
          seeker_status: seekerStatus,
          emailSubject: emailSubject,
          emailContent: emailContent,
        }
      )
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
        setOpenDialog(false);
        setEmailSubject("");
        setEmailContent("");
      })
      .catch((error) => {
        console.log(error.response.data);
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
          <h4 className="page-title">Upload Resume</h4>
        </div>
        <div className="container main_container">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Post</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Qualification</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData &&
                  currentData.length > 0 &&
                  currentData.map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>{item.first_Name}</TableCell>
                      <TableCell>{item.last_Name}</TableCell>
                      <TableCell>{item.user_Email}</TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell>{item.job_Heading}</TableCell>
                      <TableCell>{item.gender}</TableCell>
                      <TableCell>{item.Highest_Education}</TableCell>
                      <TableCell>
                        <DeleteIcon
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleclick(item._id)}
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
          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Send Email Notification</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please provide the email subject and content for the selected
                candidate.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Email Subject"
                type="text"
                fullWidth
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Email Content"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button onClick={handleDialogSubmit} color="primary">
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
