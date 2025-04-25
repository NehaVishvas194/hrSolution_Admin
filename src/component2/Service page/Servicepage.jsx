import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../../features/Api/BaseUrl';

const Servicepage = () => {

  const [description12, setDescription12] = useState('');
  const [heading, setHeading] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    getdataapi();
  }, []);
  
  const userid = localStorage.getItem("id");
  const getdataapi = () => {
    axios.get(`${baseUrl}getService_admin/${userid}`)
      .then((response) => {
        setHeading(response.data.Details.Heading)
        setDescription12(response.data.Details.Description)
        setImage(response.data.Details.image)
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleGetData = () => {
    const formData = new FormData();
    formData.append('Heading', heading);
    formData.append('Description', description12);
    formData.append('image', image);
    axios.post(`${baseUrl}create_services/${userid}`, formData)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.errors[0].msg);
      });
  };
  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="wpWrapper">
      <div className="container-fluid ">
        <div className='row mx-2 mt-3'>
          <div className='col'>
            <div className="card">
              <div className="card-body">
                <div className="card-text">
                  <div className="App">
                    <p className='fs-3 fw-bold text-center mt-2'>Academic Credential Verifier  </p>
                    <div className="form-floating mb-3">
                      <input type="text" className='w-100 py-2 text-dark bg-white rounded px-2 border' value={heading} placeholder='heading' name='heading' onChange={handleHeadingChange} />
                    </div>
                    {/* <div className="form-floating mb-3">
                      <input type="file" className='w-100 py-2 text-dark bg-white rounded px-2 border' placeholder='heading' name='image' onChange={handleImageChange} />
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
                      <button onClick={handleGetData} className='w-25 px-3 py-2 btn btn-primary mt-3 mb-5'>Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
export default Servicepage;
