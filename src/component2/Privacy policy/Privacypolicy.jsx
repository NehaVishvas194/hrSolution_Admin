import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl } from "../../features/Api/BaseUrl";

const Privacypolicy = () => {
  const [heading, setHeading] = useState("");
  const [description12, setDescription12] = useState("");

  useEffect(() => {
    getdataapi();
  }, []);

  const userid = localStorage.getItem("id");

  const getdataapi = () => {
    axios
      .get(`${baseUrl}get_admin_privacy_policy_admin/${userid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.Details);
        setHeading(response.data.Details.Heading);
        setDescription12(response.data.Details.Description);
        console.log(response.data.Details.Description);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const getdataId = localStorage.getItem("id");
  const handleGetData = () => {
    const postdata = {
      Heading: heading,
      Description: description12,
    };
    axios
      .post(`${baseUrl}create_privacy_policy/${getdataId}`, postdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success(response.data.message);

        console.log(response.data);
        if (response.data.success === true) {
          console.log(response.data.Details.Heading);
          setHeading(response.data.Details.Heading);
          setDescription12(response.data.Details.Heading);
        } else {
          toast.success("data post");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
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
    <div className="main_container">
      <div className="wpWrapper">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-12">
              <div className="card-text">
                <div className="App">
                  <p className="fs-3 fw-bold text-center mt-2">
                    Privacy Policy
                  </p>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="w-100 py-2 text-dark bg-white rounded px-2 border"
                      value={heading}
                      placeholder="heading"
                      name="heading"
                      onChange={handleHeadingChange}
                    />
                  </div>
                  <CKEditor
                    editor={ClassicEditor}
                    data={description12}
                    onChange={handleDescriptionChange}
                  />
                  <div className="text-center">
                    <button
                      onClick={handleGetData}
                      className="w-25 px-3 py-2 btn btn-primary mt-3"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Privacypolicy;
