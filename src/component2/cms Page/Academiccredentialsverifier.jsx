import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../features/Api/BaseUrl';
export default function AcademicCredentialsVerifier() {
  const [description12, setDescription12] = useState('');
  const [description13, setDescription13] = useState(''); 
  const [heading, setHeading] = useState('');
  const [image, setImage] = useState(null);
  useEffect(() => {
    getdataapi();
  }, []);
  const getdataapi = () => {
    axios.get(`${baseUrl}get_acadmic_credentials_verifier_admin`,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    
      },
    })
      .then((response) => {
        const details = response.data.Details;
        setHeading(details.Heading);
        setDescription12(details.Description);
        setDescription13(details.Description1);
        setImage(details.image);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleGetData = () => {
    const formData = new FormData();
    formData.append('Heading', heading);
    formData.append('Description', description12);
    formData.append('Description1', description13);
    formData.append('image', image);
    axios.post(`${baseUrl}cms_acadmic_credentials_verifier`, formData,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",

      },
    }) 
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.errors[0].msg);
      });
  };
  const handleHeadingChange = (e) => setHeading(e.target.value);
  const handleDescription13Change = (e) => setDescription13(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="App">
              <p className="fs-3 fw-bold text-center mt-2 pb-3">Academic Credentials Verifier</p>
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
                  value={description13}
                  placeholder="Description1"
                  name="Description1"
                  onChange={handleDescription13Change}
                />
              </div>
              {/* <div className="form-floating mb-3">
                <input
                  type="file"
                  className="w-100 py-2 text-dark bg-white rounded px-2 border"
                  placeholder="Image"
                  name="image"
                  onChange={handleImageChange}
                />
              </div> */}
              <CKEditor
                editor={ClassicEditor}
                data={description12}
                onChange={(event, editor) => {
                  const newData = editor.getData();
                  setDescription12(newData);
                }}
              />
              <div className="text-center">
                <button onClick={handleGetData} className="w-25 px-3 py-2 btn btn-primary mt-3">Update</button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
