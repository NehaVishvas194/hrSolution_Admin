import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { baseUrl } from "../../features/Api/BaseUrl";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import TablePagination from "@mui/material/TablePagination";
import Swal from "sweetalert2";

export default function FixitFinder() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const [image, setImage] = useState(null);
  const [desc1, setDesc1] = useState("");
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const handleInput1Change = (e) => setInput1(e.target.value);
  const handleInput2Change = (e) => setInput2(e.target.value);
  const handleHeadingChange = (e) => setHeading(e.target.value);
  const handleDescChange = (e) => setDesc1(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = async () => {
    const userData = localStorage.getItem("id");
    try {
      const response = await axios.post(
        `${baseUrl}fixit_finder`,
        {
          job_title: input1,
          company_location: input2,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data.details);
    } catch (error) {
      // toast.error('Data Not Found');
      toast.error(error.response.data.message);
    }
  };

  const userData = localStorage.getItem("id");
  console.log(userData);

  const fetchDataApi = () => {
    axios
      .get(`${baseUrl}getService_admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const details = response.data.Details?.[0];
        if (details) {
          setHeading(details.Heading || "");
          setDesc1(details.Description1 || "");
          setDescription(details.Description || "");
          setImage(details.image || null);
        } else {
          toast.error("No service data found.");
        }
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to fetch service data"
        );
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
          .delete(`${baseUrl}delete_fixit_finder/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            fetchDataApi();
            toast.success(response.data.message);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    });
  };

  useEffect(() => {
    fetchDataApi();
  }, []);

  const handleGetData = () => {
    const formData = new FormData();
    formData.append("Heading", heading);
    formData.append("Description", description);
    formData.append("Description1", desc1);
    if (image) {
      formData.append("image", image);
    }
    axios
      .post(
        `${baseUrl}create_services/${userData}`,
        formData,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error response:", error.response);
          toast.error(error.response.data.errors[0].msg);
        } else {
          console.log("Error message:", error.message);
          toast.error("Internal Server Error");
        }
      });
  };

  const handleclickdownload = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}generate_sampleFile`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
        // Important
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sampleFile.xlsx"); // Specify the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error.response.data);
      // toast.error('Error downloading file');
      toast.error(error.response.data.message);
    }
  };

  const handleclickimport = () => {
    setOpen(true);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    axios
      .post(`${baseUrl}import_file`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
        }

        setOpen(false);
      })
      .catch((error) => {
        // alert(error)
        console.log(error.response.data.error);
        // toast.error(error.response.data)
        toast.error(error.response.data.error);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const pageSize = 5;
  const totalPage = Math.ceil(data.length / pageSize);
  const startindex = (currentPage - 1) * pageSize;
  const endIndex = startindex + pageSize;
  const currentdata = data.slice(startindex, endIndex);

  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="App">
              <p className="fs-3 fw-bold text-center mt-2 pb-3">Fixit Finder</p>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="w-100 py-2 text-dark bg-white rounded px-2 border"
                  value={heading}
                  placeholder="Heading"
                  name="heading"
                  onChange={handleHeadingChange}
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="w-100 py-2 text-dark bg-white rounded px-2 border"
                  value={desc1}
                  placeholder="Description1"
                  name="description1"
                  onChange={handleDescChange}
                />
              </div>
              {/* <div className="form-floating mb-3">
                <input
                  type="file"
                  className="w-100 py-2 text-dark bg-white rounded px-2 border"
                  name="image"
                  onChange={handleImageChange}
                />
              </div> */}
              <CKEditor
                editor={ClassicEditor}
                data={description || ""}
                onChange={(event, editor) => {
                  const newData = editor.getData();
                  setDescription(newData);
                }}
              />
              <div className="text-center">
                <Button
                  onClick={handleGetData}
                  className="w-25 px-3 py-2 btn  mt-3 mb-5 btn btn-primary"
                >
                  Update
                </Button>
              </div>
              <div className="d-flex justify-content-end">
                <div onClick={handleclickimport}>
                  <CloudDownloadIcon />
                </div>
                <div className="ms-3" onClick={handleclickdownload}>
                  <FileDownloadIcon />
                </div>
              </div>
            </div>
            <div className="App">
              <div className="mb-3">
                <label htmlFor="input1" className="form-label">
                  Job Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="input1"
                  value={input1}
                  onChange={handleInput1Change}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="input2" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="input2"
                  value={input2}
                  onChange={handleInput2Change}
                />
              </div>
              <Button onClick={handleSubmit} className="btn btn-primary">
                Submit
              </Button>
            </div>
          </div>
          {data.length > 0 && (
            <>
              <TableContainer component={Paper} className="mt-3">
                <Table>
                  <TableHead>
                    <TableRow style={{ "white-space": "nowrap" }}>
                      <TableCell align="left" style={{ minWidth: "80px" }}>
                        Sr. No.
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "60px" }}>
                        Full Name
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "85px" }}>
                        Mobile No. 1
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "85px" }}>
                        Mobile No. 2
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "100px" }}>
                        Gender
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "100px" }}>
                        Business Name
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "100px" }}>
                        Home Address
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ minWidth: "95px", "white-space": "nowrap" }}
                      >
                        Title
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "85px" }}>
                        Location in Sierra Leone
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ minWidth: "95px", "white-space": "nowrap" }}
                      >
                        Action
                      </TableCell>

                      {/* <TableCell align="left" style={{ minWidth: "100px" }}>
                    Status
                  </TableCell> */}
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                  {data &&
                    data.length > 0 &&
                    data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.FullName}</TableCell>
                        <TableCell>{item.Gender}</TableCell>
                        <TableCell>{item.phone_no}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.skills}</TableCell>
                      </TableRow>
                    ))}
                </TableBody> */}
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, i) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            <TableCell align="left">{i + 1}</TableCell>
                            <TableCell>{row.Full_Name}</TableCell>
                            <TableCell align="left">
                              {row.Mobile_Number}
                            </TableCell>
                            <TableCell align="left">
                              {row.Mobile_Number_2}
                            </TableCell>
                            <TableCell align="left">
                              {row.Gender}
                              {/* {row.job_experience.length > 20 ? `${row.job_experience.substring(0, 18)}...` : row.job_experience} */}
                            </TableCell>
                            <TableCell align="left">
                              {row.Business_Name}
                            </TableCell>
                            <TableCell align="left">
                              {row.Home_Address ? row.Home_Address : "_"}
                            </TableCell>
                            <TableCell align="left">{row.applicable}</TableCell>
                            <TableCell align="left">
                              {row.Location_in_Sierra_Leone}
                            </TableCell>
                            <TableCell>
                              <DeleteIcon
                                className="text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleclick(row._id)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={data.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                {/* <div className="m-3">
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
              </div> */}
              </TableContainer>
            </>
          )}
        </div>
        <ToastContainer />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Import Excel File
          </Typography>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="border px-3 py-2"
            style={{ marginTop: "16px", marginBottom: "16px" }}
          />
          <Button onClick={handleUpload} variant="contained" color="primary">
            Upload
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
