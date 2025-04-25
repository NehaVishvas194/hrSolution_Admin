import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../features/Api/BaseUrl";

const HrConsultancy = () => {
  const [getdataapi, setGetdataapi] = useState([]);

  const handleEditorChange = (index, data) => {
    setGetdataapi((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].Description = data;
      return updatedData;
    });
  };

  const handleImageChange = (event, index) => {
    const updatedData = [...getdataapi];
    updatedData[index].image = event.target.files[0];
    setGetdataapi(updatedData);
  };

  const handleSubmit = async (index) => {
    try {
      const formData = new FormData();
      formData.append("Heading", getdataapi[index].Heading);
      formData.append("Description", getdataapi[index].Description);
      formData.append("Description1", getdataapi[index].Description1);
      formData.append("image", getdataapi[index].image);

      await axios.post(`${baseUrl}cms_Hr_consultancy`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Data has been submitted successfully!");
    } catch (error) {
      // toast.error('Error submitting data!');
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  };

  const getdata = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getHr_consultancy_Details_admin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setGetdataapi(response.data.Details);
    } catch (error) {
      // console.log('Error fetching data:', error);
      toast.error(error.response.data.message);
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
                HR Consultancy{" "}
              </p>
              {getdataapi.map((item, index) => (
                <div key={index}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="w-100 py-2 text-dark bg-white rounded px-2 border"
                      placeholder="heading"
                      name="Heading"
                      value={item.Heading}
                      onChange={(e) => {
                        setGetdataapi((prevData) => {
                          const updatedData = [...prevData];
                          updatedData[index].Heading = e.target.value;
                          return updatedData;
                        });
                      }}
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="w-100 py-2 text-dark bg-white rounded px-2 border"
                      placeholder="Description1"
                      name="Description1"
                      value={item.Description1}
                      onChange={(e) => {
                        setGetdataapi((prevData) => {
                          const updatedData = [...prevData];
                          updatedData[index].Description1 = e.target.value;
                          return updatedData;
                        });
                      }}
                    />
                  </div>
                  {/* <div className="form-floating mb-3">
                      <input
                        type="file"
                        className='w-100 py-2 text-dark bg-white rounded px-2 border'
                        name='image'
                        onChange={(e) => handleImageChange(e, index)}
                      />
                    </div> */}
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
export default HrConsultancy;
