import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { baseUrl } from "../../features/Api/BaseUrl";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { baseurlImage } from "../../features/Imageurl";

export default function Edittopicpage() {
  const location = useLocation();
  const navigate = useNavigate();
  const friv = location.state?.data;
  const courseId = location.state.dataq._id;
  const [data, setData] = useState({
    topic_name: friv.topic_name || "",
    topic_description: friv.topic_description || "",
  });
  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState(friv.files || []);

  useEffect(() => {
    setData({
      topic_name: friv.topic_name,
      topic_description: friv.topic_description,
    });
    setExistingFiles(friv.files || []);
  }, [friv]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangeFile = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDeleteFile = (index, isExistingFile = false) => {
    if (isExistingFile) {
      setExistingFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  };

  const handlePostData = () => {
    const formData = new FormData();
    formData.append("topic_name", data.topic_name);
    formData.append("topic_description", data.topic_description);
    existingFiles.forEach((file, index) => {
      formData.append(`existing_files[${index}]`, file);
    });
    files.forEach((file) => {
      formData.append("files", file);
    });

    axios
      .put(`${baseUrl}edit_topic/${courseId}/${friv._id}`, formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",

        },
    })
      .then((response) => {
        toast.success(response.data.message);
        // Navigate as needed
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="main_container">
      <h3 className="mb-4">Edit Topic</h3>
      <TextField
        style={{ width: "100%" }}
        onChange={handleChange}
        name="topic_name"
        label="Topic Name"
        variant="outlined"
        size="small"
        value={data.topic_name}
      />
      <div className="mt-4">
        <CKEditor
          editor={ClassicEditor}
          data={data.topic_description}
          onChange={(event, editor) => {
            const topic_description = editor.getData();
            setData((prevData) => ({ ...prevData, topic_description }));
          }}
        />
      </div>

      <div className="mt-4">
        <h4>Existing Files</h4>
        {existingFiles.map((file, index) => {
          // Define file extension for icon display
          console.log(file);
          const fileName = file.toLowerCase();
          const isImage =
            file.endsWith(".jpg") ||
            file.endsWith(".jpeg") ||
            file.endsWith(".png") ||
            file.endsWith(".gif");
          const isPdf = file.endsWith(".pdf");
          const isExcel = file.endsWith(".xls") || file.endsWith(".xlsx");
          const isVideo =
            file.endsWith(".mp4") ||
            file.endsWith(".avi") ||
            file.endsWith(".mov") ||
            file.endsWith(".wmv");

          return (
            <div key={index} className="d-flex align-items-center">
              {/* Render file preview */}
              {isImage && (
                <img
                  src={`${baseurlImage}${file}`}
                  alt="Image"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
              )}
              {isPdf && (
                <img
                  src="/path/to/pdf-icon.png"
                  alt="PDF Icon"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
              )}
              {isExcel && (
                <img
                  src="/path/to/excel-icon.png"
                  alt="Excel Icon"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
              )}
              {isVideo && (
                <img
                  src="/path/to/video-icon.png"
                  alt="Video Icon"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
              )}

              {/* Default to file name if no specific icon matches */}
              {!isImage && !isPdf && !isExcel && !isVideo && (
                <p style={{ marginRight: "10px" }}>{file.name}</p>
              )}

              <Button
                color="secondary"
                onClick={() => handleDeleteFile(index, true)}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>

      <TextField
        className="mt-4 w-100"
        type="file"
        onChange={handleChangeFile}
        name="files"
        label="Upload Files"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        size="small"
        inputProps={{
          multiple: true,
          accept:
            ".jpg, .jpeg, .png, .gif, .ppt, .pdf, .doc, .docx, .mp4, .avi, .mov, .wmv",
        }}
      />

      {/* New files section */}
      <div className="mt-4">
        <h4>New Files</h4>
        {files.map((file, index) => (
          <div key={index} className="d-flex align-items-center">
            <p>{file.name}</p>
            <Button color="secondary" onClick={() => handleDeleteFile(index)}>
              Delete
            </Button>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between">
        <Button
          style={{ backgroundColor: "#5c6bc0", color: "white" }}
          onClick={handlePostData}
          className="mt-4"
        >
          Submit
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
