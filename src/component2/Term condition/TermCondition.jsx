//  import React, { useEffect, useState } from 'react';
//  import { CKEditor } from '@ckeditor/ckeditor5-react';
//  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//  import axios from 'axios';
//  import { ToastContainer, toast } from 'react-toastify';
//  import 'react-toastify/dist/ReactToastify.css';
//  import { baseUrl } from '../../features/Api/BaseUrl';

//  const TermCondition = () => {
//    const [heading, setHeading] = useState('');
//    const [description12, setDescription12] = useState('');

//    useEffect(() => {
//      getdataapi();
//    }, []);

//    const userid = localStorage.getItem('id');

//    const getdataapi = () => {
//      if (!userid) {
//        toast.error('User ID not found in local storage.');
//        return;
//      }

//      axios.get(`${baseUrl}get_admin_term_condition/${userid}`)
//        .then((response) => {
//          if (response.data.Details) {
//            console.log(response.data.Details);
//            setHeading(response.data.Details.Heading);
//            setDescription12(response.data.Details.Description);
//            console.log(response.data.Details.Description);
//          } else {
//            toast.error('No details found in the response.');
//          }
//        })
//        .catch((error) => {
//          // console.error('Error fetching data:', error);
//          toast.error(error.response.data.message );
//        });
//    };

//    const handleGetData = () => {
//      const postdata = {
//        Heading: heading,
//        Description: description12,
//      };
  
//      axios.post(`${baseUrl}create_term_condition/${userid}`, postdata)
//        .then((response) => {
//          console.log('Response:', response); // Add this line for debugging
//          if (response.data.success) {
//            toast.success(response.data.message);
//            setHeading(response.data.Details.Heading);
//            setDescription12(response.data.Details.Description);
//          } else {
//            toast.info('Data posted but no success flag found.');
//          }
//        })
//        .catch((error) => {
//          console.error('Error posting data:', error); // Add this line for debugging
//          const errorMessage = error.response ? error.response.data.message : 'Error posting data';
//          toast.error(errorMessage);
//        });
//    };

//    const handleHeadingChange = (e) => {
//      setHeading(e.target.value);
//    };

//    const handleDescriptionChange = (event, editor) => {
//      const newData = editor.getData();
//      setDescription12(newData);
//    };

//    return (
//      <>
//        <div className="wpWrapper">
//          <div className="container-fluid ">
//            <div className='row mx-2 mt-3'>
//              <div className='col'>
//                <div className="card">
//                  <div className="card-body">
//                    <div className="card-text">
//                      <div className="App">
//                        <p className='fs-3 fw-bold text-center mt-2'>Terms & Conditions</p>
//                        <div className="form-floating mb-3">
//                          <input type="text" className='w-100 py-2 text-dark bg-white rounded px-2 border' value={heading} placeholder='heading' name='heading' onChange={handleHeadingChange} />
//                        </div>
//                        <CKEditor
//                          editor={ClassicEditor}
//                          data={description12}
//                          onChange={handleDescriptionChange}
//                          config={{
//                            toolbar: [
//                              'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo'
//                            ]
//                          }}
//                        />
//                        <div className="text-center">
//                          <button onClick={handleGetData} className='w-25 px-3 py-2 btn btn-primary mt-3'>Update</button>
//                        </div>
//                      </div>
//                    </div>
//                  </div>
//                </div>
//              </div>
//            </div>
//            <ToastContainer />
//          </div>
//        </div>
//      </>
//    );
//  };

//  export default TermCondition;
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../features/Api/BaseUrl';

const TermCondition = () => {
  const [heading, setHeading] = useState('');
  const [description12, setDescription12] = useState('');

  useEffect(() => {
    getdataapi();
  }, []);

  const userid = localStorage.getItem('id');

  const getdataapi = () => {
    if (!userid) {
      toast.error('User ID not found in local storage.');
      return;
    }

    axios.get(`${baseUrl}get_admin_term_condition_admin/${userid}`,{
      headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",

      },
  })
      .then((response) => {
        if (response.data.Details) {
          setHeading(response.data.Details.Heading);
          setDescription12(response.data.Details.Description);
        } else {
          toast.error('No details found in the response.');
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message );
      });
  };

  const handleGetData = () => {
    const postdata = {
      Heading: heading,
      Description: description12, // This will contain the formatted HTML content
    };
  
    axios.post(`${baseUrl}create_term_condition/${userid}`, postdata,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",

      },
  })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setHeading(response.data.Details.Heading);
          setDescription12(response.data.Details.Description);
        } else {
          toast.info('Data posted but no success flag found.');
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleDescriptionChange = (event, editor) => {
    const newData = editor.getData(); // This captures the formatted HTML content
    setDescription12(newData);
  };

  return (
    <>
      <div className='main_container'>
        <div className="wpWrapper">
          <div className="container-fluid ">
            <div className='row'>
              <div className='col-12'>
                <div className="card-text">
                  <div className="App">
                    <p className='fs-3 fw-bold text-center mt-2'>Terms & Conditions</p>
                    <div className="form-floating mb-3">
                      <input 
                        type="text" 
                        className='w-100 py-2 text-dark bg-white rounded px-2 border' 
                        value={heading} 
                        placeholder='heading' 
                        name='heading' 
                        onChange={handleHeadingChange} 
                      />
                    </div>
                    <CKEditor
                      editor={ClassicEditor}
                      data={description12}
                      onChange={handleDescriptionChange}
                      config={{
                        toolbar: [
                          'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo'
                        ]
                      }}
                    />
                    <div className="text-center">
                      <button onClick={handleGetData} className='w-25 px-3 py-2 btn btn-primary mt-3'>Update</button>
                    </div>
                  </div>
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

export default TermCondition;


//  import React, { useEffect, useState } from 'react';
//  import { CKEditor } from '@ckeditor/ckeditor5-react';
//  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//  import axios from 'axios';
//  import { ToastContainer, toast } from 'react-toastify';
//  import 'react-toastify/dist/ReactToastify.css';
//  import { baseUrl } from '../../features/Api/BaseUrl';

//  export default function TermCondition() {
//    const [heading, setHeading] = useState('');
//    const [description12, setDescription12] = useState('');
//    const [isLoading, setIsLoading] = useState(false); // New state for loading

//    useEffect(() => {
//      getdataapi();
//    }, []);

//    const userid = localStorage.getItem('id');

//    const getdataapi = () => {
//      if (!userid) {
//        toast.error('User ID not found in local storage.');
//        return;
//      }

//      setIsLoading(true); // Set loading to true
//      axios.get(`${baseUrl}get_admin_term_condition/${userid}`)
//        .then((response) => {
//          if (response.data.Details) {
//            setHeading(response.data.Details.Heading);
//            setDescription12(response.data.Details.Description);
//          } else {
//            toast.error('No details found in the response.');
//          }
//        })
//        .catch((error) => {
//          const errorMessage = error.response ? error.response.data.message : 'Error fetching data';
//          toast.error(errorMessage);
//        })
//        .finally(() => setIsLoading(false)); // Set loading to false
//    };

//    const handleGetData = () => {
//      if (!userid) {
//        toast.error('User ID not found in local storage.');
//        return;
//      }

//      setIsLoading(true); // Set loading to true
//      const postdata = {
//        Heading: heading,
//        Description: description12,
//      };
  
//      axios.post(`${baseUrl}create_term_condition/${userid}`, postdata)
//        .then((response) => {
//          console.log(response.data.success===true)
//          if (response.data.success===true) {
//            toast.success(response.data.message);
//            setHeading(response.data.Details.Heading);
//            setDescription12(response.data.Details.Description);
//          } else {
//            toast.info('Data posted but no success flag found.');
//          }
//        })
//        .catch((error) => {
//          console.log(error)
//          // const errorMessage = error.response ? error.response.data.message : "";
//          // toast.error(error.response.data.message);
//        })
//        .finally(() => setIsLoading(false)); // Set loading to false
//    };

//    const handleHeadingChange = (e) => {
//      setHeading(e.target.value);
//    };

//    const handleDescriptionChange = (event, editor) => {
//      const newData = editor.getData();
//      setDescription12(newData);
//    };

//    return (
//      <>
//        <div className="wpWrapper">
//          <div className="container-fluid ">
//            <div className='row mx-2 mt-3'>
//              <div className='col'>
//                <div className="card">
//                  <div className="card-body">
//                    <div className="card-text">
//                      <div className="App">
//                        <p className='fs-3 fw-bold text-center mt-2'>Terms & Conditions</p>
//                        <div className="form-floating mb-3">
//                          <input
//                            type="text"
//                            className='w-100 py-2 text-dark bg-white rounded px-2 border'
//                            value={heading}
//                            placeholder='heading'
//                            name='heading'
//                            onChange={handleHeadingChange}
//                            disabled={isLoading} // Disable during loading
//                          />
//                        </div>
//                        <CKEditor
//                          editor={ClassicEditor}
//                          data={description12}
//                          onChange={handleDescriptionChange}
//                          config={{
//                            toolbar: [
//                              'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo'
//                            ]
//                          }}
//                        />
//                        <div className="text-center">
//                          <button
//                            onClick={handleGetData}
//                            className='w-25 px-3 py-2 btn btn-primary mt-3'
//                            disabled={isLoading} // Disable during loading
//                          >
//                            {isLoading ? 'Updating...' : 'Update'} {/* Show loading text */}
//                          </button>
//                        </div>
//                      </div>
//                    </div>
//                  </div>
//                </div>
//              </div>
//            </div>
//            <ToastContainer />
//          </div>
//        </div>
//      </>
//    );
//  };

// // export default TermCondition;
// import React, { useEffect, useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { baseUrl } from '../../features/Api/BaseUrl';

// const TermCondition = () => {
//   const [heading, setHeading] = useState('');
//   const [description12, setDescription12] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // State for loading

//   useEffect(() => {
//     getdataapi();
//   }, []);

//   const userid = localStorage.getItem('id');

//   const getdataapi = () => {
//     if (!userid) {
//       toast.error('User ID not found in local storage.');
//       return;
//     }

//     setIsLoading(true); // Set loading to true
//     axios.get(`${baseUrl}get_admin_term_condition/${userid}`)
//       .then((response) => {
//         if (response.data.Details) {
//           setHeading(response.data.Details.Heading);
//           setDescription12(response.data.Details.Description);
//         } else {
//           toast.error('No details found in the response.');
//         }
//       })
//       .catch((error) => {
//         const errorMessage = error.response ? error.response.data.message : 'Error fetching data';
//         toast.error(errorMessage);
//       })
//       .finally(() => setIsLoading(false)); // Set loading to false
//   };

//   const handleGetData = () => {
//     if (!userid) {
//       toast.error('User ID not found in local storage.');
//       return;
//     }

//     setIsLoading(true); // Set loading to true
//     const postdata = {
//       Heading: heading,
//       Description: description12,
//     };

//     axios.post(`${baseUrl}create_term_condition/${userid}`, postdata)
//       .then((response) => {
//         if (response.data.success) { // Check for success flag
//           toast.success(response.data.message);
//           setHeading(response.data.Details.Heading);
//           setDescription12(response.data.Details.Description);
//         } else {
//           toast.error('Something went wrong. Please try again.');
//         }
//       })
//       .catch((error) => {
//         const errorMessage = error.response ? error.response.data.message : 'Error posting data';
//         toast.error(errorMessage); // Handle the error properly
//       })
//       .finally(() => setIsLoading(false)); // Set loading to false
//   };

//   const handleHeadingChange = (e) => {
//     setHeading(e.target.value);
//   };

//   const handleDescriptionChange = (event, editor) => {
//     const newData = editor.getData();
//     setDescription12(newData);
//   };

//   return (
//     <>
//       <div className="wpWrapper">
//         <div className="container-fluid ">
//           <div className='row mx-2 mt-3'>
//             <div className='col'>
//               <div className="card">
//                 <div className="card-body">
//                   <div className="card-text">
//                     <div className="App">
//                       <p className='fs-3 fw-bold text-center mt-2'>Terms & Conditions</p>
//                       <div className="form-floating mb-3">
//                         <input
//                           type="text"
//                           className='w-100 py-2 text-dark bg-white rounded px-2 border'
//                           value={heading}
//                           placeholder='heading'
//                           name='heading'
//                           onChange={handleHeadingChange}
//                           disabled={isLoading} // Disable during loading
//                         />
//                       </div>
//                       <CKEditor
//                         editor={ClassicEditor}
//                         data={description12}
//                         onChange={handleDescriptionChange}
//                         config={{
//                           toolbar: [
//                             'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo'
//                           ]
//                         }}
//                       />
//                       <div className="text-center">
//                         <button
//                           onClick={handleGetData}
//                           className='w-25 px-3 py-2 btn btn-primary mt-3'
//                           disabled={isLoading} // Disable during loading
//                         >
//                           {isLoading ? 'Updating...' : 'Update'} {/* Show loading text */}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <ToastContainer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default TermCondition;



// import React, { useEffect, useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import { baseUrl } from '../../features/Api/BaseUrl';

// const TermCondition = () => {
//   const [heading, setHeading] = useState('');
//   const [description12, setDescription12] = useState('');

//   useEffect(() => {
//     getdataapi();
//   }, []);

//   const userid = localStorage.getItem('id');

//   const getdataapi = () => {
//     axios.get(`${baseUrl}get_admin_term_condition/${userid}`)
//       .then((response) => {
//         if (response.data.Details) {
//           setHeading(response.data.Details.Heading);
//           setDescription12(response.data.Details.Description);
//         } else {
//           toast.error('No details found in the response.');
//         }
//       })
//       .catch((error) => {
//         toast.error('Error fetching data');
//         console.error(error.response);
//       });
//   };

//   const handleGetData = () => {
//     const postdata = {
//       Heading: heading,
//       Description: description12,
//     };

//     axios.post(`${baseUrl}create_term_condition/${userid}`, postdata)
//       .then((response) => {
//         console.log(response.status===200)
//         if (response) {
//           toast.success(response.data.message);
//           setHeading(response.data.Details.Heading);
//           setDescription12(response.data.Details.Description);
//         } else {
//           toast.error('Something went wrong while posting the data.');
//         }
//       }).catch((error) => {
      
//         console.error(error);
//       });
//   };

//   const handleHeadingChange = (e) => {
//     setHeading(e.target.value);
//   };

//   const handleDescriptionChange = (event, editor) => {
//     const newData = editor.getData();
//     setDescription12(newData);
//   };

//   return (
//     <>
//       <div className="wpWrapper">
//         <div className="container-fluid ">
//           <div className='row mx-2 mt-3'>
//             <div className='col'>
//               <div className="card">
//                 <div className="card-body">
//                   <div className="card-text">
//                     <div className="App">
//                       <p className='fs-3 fw-bold text-center mt-2'>Terms & Conditions</p>
//                       <div className="form-floating mb-3">
//                         <input
//                           type="text"
//                           className='w-100 py-2 text-dark bg-white rounded px-2 border'
//                           value={heading}
//                           placeholder='heading'
//                           name='heading'
//                           onChange={handleHeadingChange}
//                         />
//                       </div>
//                       <CKEditor
//                         editor={ClassicEditor}
//                         data={description12}
//                         onChange={handleDescriptionChange}
//                       />
//                       <div className="text-center">
//                         <button onClick={handleGetData} className='w-25 px-3 py-2 btn btn-primary mt-3'>Update</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <ToastContainer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default TermCondition;
