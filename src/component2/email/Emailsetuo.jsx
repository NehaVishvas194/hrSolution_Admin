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
  Box,
  Modal,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import "react-toastify/dist/ReactToastify.css";
const pageSize = 5;
export default function EmailSetup() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({
    email_title: "",
    email_subject: "",
    email_body: "",
  });
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get(`${baseUrl}getall_emailContent`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            
        },
    })
      .then((response) => {
        setEmailTemplates(response.data.emailContents);
      })
      .catch((error) => {
        // toast.error(error.response?.data || "Error fetching data");
        toast.error(error.response.data.message);
      });
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleSearch = (e) => setSearchQuery(e.target.value);
  const filterData = emailTemplates?.filter((item) =>
    [item?.email_title, item?.email_subject, item?.email_body]
      .map((field) => field?.toLowerCase() || "")
      .some((field) => field.includes(searchQuery.toLowerCase()))
  );
  const handlePageChange = (page) => setCurrentPage(page);
  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}delete_email/${id}`)
      .then(() => {
        toast.success("Email template deleted successfully!");
        getData(); // Refresh data
      })
      .catch((error) =>toast.error(error.response.data.message));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const postApi = () => {
    axios
      .post(`${baseUrl}create_email_template`, data, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        setOpenModal(false);
        getData();
      })
      .catch((error) => toast.error(error.response?.data?.message || "Error posting data"));
  };
  const totalPage = Math.ceil(filterData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filterData.slice(startIndex, startIndex + pageSize);


  const renderHTML = (html) => {
    return { __html: html };
  };
  return (
    <div className="content">
    <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">Email Template</h4>
          </div>
        </div>
    <div className="container main_container">
      <div className="d-flex justify-content-between  mb-3">
        <TextField
          label="Search..."
          value={searchQuery}
          variant="outlined"
          size="small"
          onChange={handleSearch}
        />
        <Button
          variant="contained"
          onClick={handleOpenModal}
          style={{ backgroundColor: "#2b6166", color: "#fff" }}
        >
          Add Email
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Body</TableCell>
              {/* <TableCell>Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell>{item.email_title}</TableCell>
                <TableCell>{item.email_subject}</TableCell>
                <TableCell dangerouslySetInnerHTML={renderHTML(item.email_body)}></TableCell>
              
                {/* <TableCell>
                  <DeleteIcon
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(item._id)}
                  />
                </TableCell> */}
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
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            p: 4,
          }}
        >
          <p className="fs-3 text-center fw-normal mb-3">Add Email</p>
          <TextField
            fullWidth
            name="email_title"
            label="Email Title"
            variant="outlined"
            className="mb-3"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="email_subject"
            label="Email Subject"
            variant="outlined"
            className="mb-3"
            onChange={handleChange}
          />
          <CKEditor
            editor={ClassicEditor}
            data={data.email_body}
            onChange={(event, editor) => {
              const email_body = editor.getData();
              setData((prev) => ({ ...prev, email_body }));
            }}
          />
          <div className="text-center">
            <Button
              variant="contained"
              onClick={postApi}
              className="mt-3"
              style={{ backgroundColor: "#2b6166", color: "#fff" }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
    </div>
  );
}
