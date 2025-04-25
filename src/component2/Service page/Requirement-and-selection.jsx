import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../../features/Api/BaseUrl';

const Requirementandselection = () => {
  const [getdataapi, setGetdataapi] = useState([]);

  const handleEditorChange = (index, data) => {
    const updatedData = [...getdataapi];
    updatedData[index].Description = data;
    setGetdataapi(updatedData);
  };

  const handleImageChange = (event, index) => {
    const updatedData = [...getdataapi];
    updatedData[index].image = event.target.files[0];
    setGetdataapi(updatedData);
  };

  const handleSubmit = async (index) => {
    try {
      const formData = new FormData();
      formData.append('Heading', getdataapi[index].Heading);
      formData.append('Description', getdataapi[index].Description);
      formData.append('image', getdataapi[index].image);

      await axios.post(`${baseUrl}cms_recruitment_selection`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Data has been submitted successfully!');
    } catch (error) {
      // toast.error('Error submitting data!');
      toast.error(error.response.data.message);
      console.error('Error:', error);
    }
  };

  const getdata = async () => {
    try {
      const response = await axios.get(`${baseUrl}get_recruitment_selection_Details`);
      setGetdataapi(response.data.Details);
    } catch (error) {
      // console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className='row'>
          <div className='col'>
            <div className="card">
              <div className="card-body">
                <div className="card-text">
                  <div className="App">
                    <p className='fs-3 fw-bold text-center mt-2'>Service page </p>
                    {
                      getdataapi.map((item, index) => (
                        <div key={index}>
                          <div className="form-floating mb-3">
                            <input type="text" className='w-100 py-2 text-dark bg-white rounded px-2 border' placeholder='heading' name='Heading' value={item.Heading} onChange={(e) => {
                              const updatedData = [...getdataapi];
                              updatedData[index].Heading = e.target.value;
                              setGetdataapi(updatedData);
                            }} />
                          </div>
                          {/* <div className="form-floating mb-3">
                            <input type="file" className='w-100 py-2 text-dark bg-white rounded px-2 border' name='image' onChange={(e) => handleImageChange(e, index)} />
                          </div> */}
                          <CKEditor
                            editor={ClassicEditor}
                            data={item.Description}
                            onChange={(event, editor) => handleEditorChange(index, editor.getData())}
                          />
                          <div className="text-center">
                            <button onClick={() => handleSubmit(index)} className='w-25 px-3 py-2 btn btn-primary mt-3 mb-5'>Update</button>
                          </div>
                        </div>
                      ))
                    }
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

export default Requirementandselection;  
