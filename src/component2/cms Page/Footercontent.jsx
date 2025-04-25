import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl } from "../../features/Api/BaseUrl";

const Footercontent = () => {
  const [getdataapi, setGetdataapi] = useState([]);

  const handleEditorChange = (index, data) => {
    const updatedData = [...getdataapi];
    updatedData[index].Description = data;
    setGetdataapi(updatedData);
  };

  const handleSubmit = async (index) => {
    try {
      const data = {
        Description: getdataapi[index].Description,
      };
      console.log(data);
      await axios
        .post(`${baseUrl}cms_footer_content`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          toast.success(response.data.message);
        });
    } catch (error) {
      toast.error(error.response.data.message || "Error submitting data!");
      // console.error('Error:', error);
    }
  };

  const getdata = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}get_cms_footer_content_admin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.Details);
      setGetdataapi(response.data.Details);
    } catch (error) {
      toast.error(error.response.data.message || "Error submitting data!");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="App">
              <p className="fs-3 fw-bold text-center mt-2 pb-3">
                Footer Content{" "}
              </p>
              {getdataapi.map((item, index) => (
                <div key={index}>
                  <div className="form-floating mb-3"></div>
                  <CKEditor
                    editor={ClassicEditor}
                    data={item.Description}
                    onChange={(event, editor) =>
                      handleEditorChange(index, editor.getData())
                    }
                  />
                  <div className="text-center">
                    <button
                      onClick={() => handleSubmit(index)}
                      className="w-25 px-3 py-2 btn btn-primary mt-3"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Footercontent;
