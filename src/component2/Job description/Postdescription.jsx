import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function Postdescription() {
  const navigate = useNavigate();
  const location = useLocation();
  const data12 = location?.state?.data;
  console.log(data12);

  // const [descriptions, setDescriptions] = useState('');
  // const [descriptions12, setDescriptions12] = useState('');

  // const handleDescriptionChange12 = (event, editor) => {
  //     const newData = editor.getData();
  //     setDescriptions12(newData);
  // };

  // const handleDescriptionChange = (event, editor) => {
  //     const newData = editor.getData();
  //     setDescriptions(newData);
  // };

  const [selectedfile, setselectedfile] = useState({
    file: null,
  });

  const handleFileUpload = (e) => {
    e.preventDefault();
    const temp_file = e.target.files[0];
    console.log(temp_file);

    setselectedfile({ file: temp_file });
  };
  // axios.post(`${baseUrl}addJob_Description`, {
  //     jobTitle: data12,
  //     job_Description: descriptions12,
  //     Responsibilities: descriptions
  // },
  // {
  //     headers: {
  //       "Authorization": `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //   }).then((response) => {
  //     console.log(response.data)
  //     toast.error(response.data.message);
  //     if(response.data.success===true){
  //         navigate('/Admin/Job-Description-Database')
  //     }
  // }).catch((error) => {
  //     //   toast.error(error.response.data);
  //     alert(error.response.data.message || 'Dear HR Coordinator, you are not authorized to access this section!')

  // })

  const handlepst = () => {
    const formData = new FormData();
    formData.append("jobFile", selectedfile.file);
    axios
      .post(`${baseUrl}uploadJobFile/${data12}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // Do NOT set "Content-Type", Axios will handle it automatically
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        if (response.status === 201) {
          navigate("/Admin/Job-Description-Database");
        } else {
          toast.error(
            "The job description format is wrong"
          );
        }
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ||
            "The job description uploaded failed or was in the wrong format"
        );
      });
  };

  return (
    <>
      <div className="mt-4">
        <div className="row mt-5">
          <p>Upload your Job Descriptions File in (docx format)</p>
          <label htmlFor="fileInputcv">
            <div className="uploadFile">
              <div>
                <i className="fi fi-rr-cloud-upload-alt"></i>
                <p>{selectedfile.file ? selectedfile.file.name : " "}</p>
              </div>
            </div>
          </label>
          <input
            type="file"
            id="fileInputcv"
            onChange={handleFileUpload}
            accept=".pdf"
          />
        </div>
        {/* <div className="mb-5">
                    <CKEditor
                        editor={ClassicEditor}
                        data={descriptions12}
                        onChange={handleDescriptionChange12}
                        config={{
                            placeholder: 'Enter job description here...'
                        }}
                    />
                </div> */}
        {/* <CKEditor
                    editor={ClassicEditor}
                    data={descriptions}
                    onChange={handleDescriptionChange}
                    config={{
                        placeholder: 'Enter job Responsiblity here...'
                    }}
                /> */}
        <button
          className="px-3 py-2 rounded border-0 fw-bold mt-4"
          style={{ backgroundColor: "#dab95c", color: "white" }}
          onClick={handlepst}
        >
          Add Description
        </button>
      </div>
      <div></div>
    </>
  );
}
