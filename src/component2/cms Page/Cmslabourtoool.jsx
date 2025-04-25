import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../features/Api/BaseUrl";
const CmsLabourTool = () => {
  const [heading, setHeading] = useState("");
  const [description12, setDescription12] = useState("");
  useEffect(() => {
    getDataApi();
  }, []);
  const userid = localStorage.getItem("id");
  const getDataApi = () => {
    if (!userid) {
      toast.error("User ID not found in local storage.");
      return;
    }
    axios
      .get(`${baseUrl}get_cms_labour_tool_details_admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const details = response.data.Details;
        if (details) {
          console.log(details);
          setHeading(details.Heading || "");
          setDescription12(details.Description || "");
        } else {
          toast.error("No details found in the response.");
        }
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.message
          : "Error fetching data";
        toast.error(errorMessage);
      });
  };

  const handleUpdateData = () => {
    if (!heading || !description12) {
      toast.error("Heading and Description are required.");
      return;
    }
    const postData = {
      Heading: heading,
      Description: description12,
    };
    axios
      .post(`${baseUrl}cms_labour_tool`, postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response);
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.info("Data posted but no success flag found.");
        }
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.message
          : "Error posting data";
        toast.error(errorMessage);
      });
  };
  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };
  const handleDescriptionChange = (event, editor) => {
    const newData = editor.getData();
    setDescription12(newData);
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="App">
                <p className="fs-3 fw-bold text-center mt-2 pb-3">
                  Labour Tool
                </p>
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
                <CKEditor
                  editor={ClassicEditor}
                  data={description12}
                  onChange={handleDescriptionChange}
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
                  }}
                />
                <div className="text-center">
                  <button
                    onClick={handleUpdateData}
                    className="w-25 px-3 py-2 btn btn-primary mt-3"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};
export default CmsLabourTool;
