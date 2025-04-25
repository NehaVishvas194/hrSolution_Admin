import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { baseurlImage } from "../../features/Imageurl";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
  Modal,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Blog2() {
  const [data, setData] = useState([]);
  // const [formData, setFormData] = useState({ name: '', heading: '', description: '', photo: null });
  const [name, setname] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [seletimage, setSeletimage] = useState("");
  const [open, setOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get(`${baseUrl}getBlogDetails_admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => setData(response.data.Blogs))
      .catch((error) => toast.error(error.response.data.message));
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSeletimage(file);
  };
  const renderHTML = (html) => {
    return { __html: html };
  };
  // const validateForm = () => {
  //   let isValid = true;
  //   const errors = [];

  //   if (!formData.name) {
  //     isValid = false;
  //     errors.push('Name is required.');
  //   }
  //   if (!formData.heading) {
  //     isValid = false;
  //     errors.push('Heading is required.');
  //   }
  //   if (!formData.description) {
  //     isValid = false;
  //     errors.push('Description is required.');
  //   }
  //   if (!formData.photo) {
  //     isValid = false;
  //     errors.push('Photo is required.');
  //   }
  //   return { isValid, errors };
  // };

  const handlename = (event, editor) => {
    const newData = editor.getData();
    setname(newData);
  };
  const handleheading = (event, editor) => {
    const newData = editor.getData();
    setHeading(newData);
  };
  const handledescription = (event, editor) => {
    const newData = editor.getData();
    setDescription(newData);
  };

  const handleApi = async () => {
    // const { isValid, errors } = validateForm();
    // if (!isValid) {
    //   errors.forEach(error => toast.error(error));
    //   return;
    // }
    const formDataObj = new FormData();
    formDataObj.append("Heading", heading);
    formDataObj.append("name", name);
    formDataObj.append("Description", description);
    formDataObj.append("photo", seletimage);
    try {
      const response = await axios.post(
        `${baseUrl}cmsBlog_section2/`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getData();
        handleClose();
        setname("");
        setDescription("");
        setHeading("");
        setSeletimage("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}deleteBlog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message);
      getData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleUpdateOpen = (id) => {
    const updateVal = data.find((item) => item._id === id);
    console.log(updateVal._id);
    if (updateVal) {
      setUpdateData({
        _id: updateVal._id,
        name: updateVal.name,
        Heading: updateVal.Heading,
        Description: updateVal.Description,
        photo: updateVal.photo,
      });
      setOpenUpdateModal(true);
    }
  };
  const handleUpdateChange = (e, editor) => {
    const newData = editor.getData();
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };
  const handleUpdateFileChange = (e) => {
    const file = e.target.files[0];
    setUpdateData({ ...updateData, photo: file });
  };

  const handleUpdateSubmit = async () => {
    const formDataObj = new FormData();
    formDataObj.append("Heading", updateData.Heading);
    formDataObj.append("Description", updateData.Description);
    formDataObj.append("name", updateData.name);

    if (updateData.photo instanceof File) {
      formDataObj.append("photo", updateData.photo);
    }

    try {
      const response = await axios.put(
        `${baseUrl}update_cms_blog/${updateData._id}`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      getData();
      handleUpdateClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating blog");
    }
  };

  const handleUpdateClose = () => setOpenUpdateModal(false);
  return (
    <div className="container main_container">
      <Button
        variant="contained"
        className="me-3 mb-3"
        onClick={handleOpen}
        style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
      >
        Add Blog
      </Button>
      <Modal open={open} onClose={handleClose} disableScrollLock={true}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: "80vh", // Fixed height for the modal
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto", // Scroll for the modal
          }}
        >
          <div className="d-flex flex-column gap-3">
            {/* <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%' }}
            /> */}
            <CKEditor
              editor={ClassicEditor}
              data={name}
              onChange={handlename}
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "blockQuote",
                  "undo",
                  "redo",
                ],
                placeholder: "Name",
              }}
            />
            {/* <TextField
              id="heading"
              name="heading"
              label="Heading"
              variant="outlined"
              value={formData.Heading}
              onChange={handleChange}
              style={{ width: '100%' }}
            /> */}
            <CKEditor
              editor={ClassicEditor}
              data={heading}
              onChange={handleheading}
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "blockQuote",
                  "undo",
                  "redo",
                ],
                placeholder: "Heading",
              }}
            />
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={handledescription}
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "blockQuote",
                  "undo",
                  "redo",
                ],
                placeholder: "Description",
              }}
            />
            {/* <TextField
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              value={formData.Description}
              onChange={handleChange}
              style={{ width: '100%' }}
            /> */}

            <input type="file" name="photo" onChange={handleFileChange} />
            <Button
              variant="contained"
              onClick={handleApi}
              style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell dangerouslySetInnerHTML={renderHTML(blog.name)} />
                <TableCell dangerouslySetInnerHTML={renderHTML(blog.Heading)} />
                <TableCell
                  dangerouslySetInnerHTML={renderHTML(blog.Description)}
                />
                <TableCell>
                  {blog.photo && (
                    <img
                      src={`${baseurlImage}${blog.photo}`}
                      alt="Blog"
                      style={{
                        width: "100px",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div className="d-flex align-items-center justify-content-center">
                    <p
                      className="text-danger mb-0"
                      onClick={() => handleClick(blog._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <DeleteForeverIcon />
                    </p>
                    <p
                      className="mb-0"
                      onClick={() => handleUpdateOpen(blog._id)}
                    >
                      <i
                        className="fa fa-edit"
                        style={{ color: "#dab95c", cursor: "pointer" }}
                      />
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
      <Modal
        open={openUpdateModal}
        onClose={handleUpdateClose}
        disableScrollLock={true}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: "80vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <div className="d-flex flex-column gap-3">
            <CKEditor
              editor={ClassicEditor}
              data={updateData.name}
              onChange={(e, editor) =>
                setUpdateData({ ...updateData, name: editor.getData() })
              }
              config={{ placeholder: "Name" }}
            />
            <CKEditor
              editor={ClassicEditor}
              data={updateData.Heading}
              onChange={(e, editor) =>
                setUpdateData({ ...updateData, Heading: editor.getData() })
              }
              config={{ placeholder: "Heading" }}
            />
            <CKEditor
              editor={ClassicEditor}
              data={updateData.Description}
              onChange={(e, editor) =>
                setUpdateData({ ...updateData, Description: editor.getData() })
              }
              config={{ placeholder: "Description" }}
            />
            <input type="file" name="photo" onChange={handleUpdateFileChange} />
            <Button
              variant="contained"
              onClick={handleUpdateSubmit}
              style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
            >
              Update Blog
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
