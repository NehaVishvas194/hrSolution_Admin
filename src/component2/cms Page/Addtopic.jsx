import React, { useState } from "react";
import { Button, TextField, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { baseUrl } from "../../features/Api/BaseUrl";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
export default function AddTopic() {
  const [data, setData] = useState({
    topic_name: "",
    topic_description: "",
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const location = useLocation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const friv = location.state?.data;
  const handleChangeFile = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const newPreviews = selectedFiles.map((file) => {
      return {
        file,
        url: URL.createObjectURL(file),
        type: file.type,
      };
    });
    setPreviews(newPreviews);
  };
  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };
  const handlePostData = () => {
    const formData = new FormData();
    formData.append("topic_name", data.topic_name);
    formData.append("topic_description", data.topic_description);
    files.forEach((file) => {
      formData.append("files", file); 
    })
    axios
      .post(`${baseUrl}add_topics/${friv?._id}`, formData,  {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",

        },
    })
      .then((response) => {
        toast.success(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) =>   {
        toast.error(error.response.data.message);
      })
  }
  return (
    <div className="main_container">
      <h3 className="mb-4">Add Topic</h3>
      <TextField
        style={{ width: "100%" }}
        onChange={handleChange}
        name="topic_name"
        label="Topic Name"
        variant="outlined"
        size="small"
      />
      <div className="mt-3">
        <CKEditor
          editor={ClassicEditor}
          data={data.topic_description}
          onChange={(event, editor) => {
            const topic_description = editor.getData();
            setData((prevData) => ({ ...prevData, topic_description }));
          }}
        />
      </div>
      <TextField
        className="mt-3 w-100"
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
      <div className="d-flex flex-wrap mt-3">
        {previews.map((preview, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              marginRight: "10px",
              marginBottom: "10px",
            }}
          >
            {preview.type.includes("image") ? (
              <img
                src={preview.url}
                alt="Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : preview.type.includes("video") ? (
              <video
                src={preview.url}
                controls
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : preview.type.includes("pdf") ? (
              <embed
                src={preview.url}
                type="application/pdf"
                style={{ width: "100px", height: "100px" }}
              />
            ) : (
              <p style={{ width: "100px", textAlign: "center" }}>
                {preview.file.name}
              </p>
            )}
            <IconButton
              size="small"
              onClick={() => handleRemoveFile(index)}
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                color: "red",
                backgroundColor: "white",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        ))}
      </div>
      <Button
        style={{ backgroundColor: "#5c6bc0", color: "white" }}
        onClick={handlePostData}
        className="mt-3"
      >
        Submit
      </Button>
      <ToastContainer />
    </div>
  );
}
