// // // // import axios from 'axios'
// // // // import React, { useEffect, useState } from 'react'
// // // // import { useLocation } from 'react-router-dom'
// // // // import { baseUrl } from '../../features/Api/BaseUrl'

// // // // export default function Onlinecourseeditpage() {
// // // //     const location = useLocation()
// // // //     const [data,setData]=useState([])
// // // //     const prevId = (location.state.data)

// // // // const getdata = () =>{
// // // //     axios.get(`${baseUrl}get_cms_online_courses_details`).then((response)=>{
// // // //             setData(response.data.Details)
// // // //     }).catch((error)=>{
// // // //         console.log(error.response.data)
// // // //     })
// // // // }

// // // //     useEffect(()=>{
// // // //         getdata()
// // // //     },[])

// // // // const vlauedata =  data.filter((item)=>{
// // // //        return item._id === prevId
// // // // })


// // // //     return (
// // // //     <div>

// // // //     </div>
// // // //   )
// // // // }
// // // import axios from 'axios';
// // // import React, { useEffect, useState } from 'react';
// // // import { useLocation } from 'react-router-dom';
// // // import { baseUrl } from '../../features/Api/BaseUrl';
// // // import { TextField, Button, Box } from '@mui/material';
// // // import { ToastContainer, toast } from 'react-toastify';

// // // export default function Onlinecourseeditpage() {
// // //     const location = useLocation();
// // //     const [data, setData] = useState(null);
// // //     const [updatedData, setUpdatedData] = useState({
// // //         Heading: "",
// // //         Description: "",
// // //         Detailed_description: "",
// // //         price: ""
// // //     });
// // //     const prevId = location.state.data; // Get the course ID passed via navigation

// // //     const getData = () => {
// // //         axios.get(`${baseUrl}get_cms_online_courses_details`)
// // //             .then((response) => {
// // //                 const courseData = response.data.Details.find(item => item._id === prevId);
// // //                 setData(courseData); // Set the course data to the state
// // //                 setUpdatedData({
// // //                     Heading: courseData.Heading,
// // //                     Description: courseData.Description,
// // //                     Detailed_description: courseData.Detailed_description,
// // //                     price: courseData.price
// // //                 }); // Pre-fill the form with the course details
// // //             })
// // //             .catch((error) => {
// // //                 console.log(error.response.data);
// // //             });
// // //     };

// // //     useEffect(() => {
// // //         getData(); // Fetch the course details when the component mounts
// // //     }, [prevId]);

// // //     const handleChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setUpdatedData(prevState => ({
// // //             ...prevState,
// // //             [name]: value
// // //         }));
// // //     };

// // //     const handleSubmit = () => {
// // //         axios.put(`${baseUrl}update_online_course/${prevId}`, updatedData)
// // //             .then((response) => {
// // //                 toast.success("Course updated successfully!");
// // //             })
// // //             .catch((error) => {
// // //                 toast.error("Error updating course: " + error.response.data.message);
// // //             });
// // //     };

// // //     return (
// // //         <div>
// // //             <h1>Edit Online Course</h1>
// // //             {data ? (
// // //                 <Box
// // //                     sx={{
// // //                         display: 'flex',
// // //                         flexDirection: 'column',
// // //                         width: 400,
// // //                         margin: '0 auto'
// // //                     }}
// // //                 >
// // //                     <TextField
// // //                         label="Heading"
// // //                         name="Heading"
// // //                         value={updatedData.Heading}
// // //                         onChange={handleChange}
// // //                         variant="outlined"
// // //                         margin="normal"
// // //                     />
// // //                     <TextField
// // //                         label="Description"
// // //                         name="Description"
// // //                         value={updatedData.Description}
// // //                         onChange={handleChange}
// // //                         variant="outlined"
// // //                         margin="normal"
// // //                     />
// // //                     <TextField
// // //                         label="Detailed Description"
// // //                         name="Detailed_description"
// // //                         value={updatedData.Detailed_description}
// // //                         onChange={handleChange}
// // //                         variant="outlined"
// // //                         margin="normal"
// // //                     />
// // //                     <TextField
// // //                         label="Price"
// // //                         name="price"
// // //                         value={updatedData.price}
// // //                         onChange={handleChange}
// // //                         variant="outlined"
// // //                         margin="normal"
// // //                     />
// // //                     <Button
// // //                         variant="contained"
// // //                         color="primary"
// // //                         onClick={handleSubmit}
// // //                         sx={{ mt: 2 }}
// // //                     >
// // //                         Update Course
// // //                     </Button>
// // //                 </Box>
// // //             ) : (
// // //                 <p>Loading course data...</p>
// // //             )}
// // //             <ToastContainer />
// // //         </div>
// // //     );
// // // }
// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';
// // import { useLocation } from 'react-router-dom';
// // import { baseUrl } from '../../features/Api/BaseUrl';
// // import { TextField, Button, Box } from '@mui/material';
// // import { ToastContainer, toast } from 'react-toastify';
// // import { CKEditor } from '@ckeditor/ckeditor5-react';
// // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// // export default function Onlinecourseeditpage() {
// //     const location = useLocation();
// //     const [data, setData] = useState(null);
// //     const [updatedData, setUpdatedData] = useState({
// //         Heading: "",
// //         Description: "",
// //         Detailed_description: "",
// //         price: ""
// //     });
// //     const prevId = location.state.data; // Get the course ID passed via navigation

// //     const getData = () => {
// //         axios.get(`${baseUrl}get_cms_online_courses_details`)
// //             .then((response) => {
// //                 const courseData = response.data.Details.find(item => item._id === prevId);
// //                 setData(courseData); // Set the course data to the state
// //                 setUpdatedData({
// //                     Heading: courseData.Heading,
// //                     Description: courseData.Description,
// //                     Detailed_description: courseData.Detailed_description,
// //                     price: courseData.price
// //                 }); // Pre-fill the form with the course details
// //             })
// //             .catch((error) => {
// //                 console.log(error.response.data);
// //             });
// //     };

// //     useEffect(() => {
// //         getData(); // Fetch the course details when the component mounts
// //     }, [prevId]);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setUpdatedData(prevState => ({
// //             ...prevState,
// //             [name]: value
// //         }));
// //     };

// //     const handleEditorChange = (event, editor) => {
// //         const data = editor.getData();
// //         setUpdatedData(prevState => ({
// //             ...prevState,
// //             Detailed_description: data // Update detailed description from CKEditor
// //         }));
// //     };

// //     const handleSubmit = () => {
// //         axios.put(`${baseUrl}update_online_course/${prevId}`, updatedData)
// //             .then((response) => {
// //                 toast.success("Course updated successfully!");
// //             })
// //             .catch((error) => {
// //                 toast.error("Error updating course: " + error.response.data.message);
// //             });
// //     };

// //     return (
// //         <div>
// //             <h1>Edit Online Course</h1>
// //             {data ? (
// //                 <Box
// //                     sx={{
// //                         display: 'flex',
// //                         flexDirection: 'column',
// //                         width: 400,
// //                         margin: '0 auto'
// //                     }}
// //                 >
// //                     <TextField
// //                         label="Heading"
// //                         name="Heading"
// //                         value={updatedData.Heading}
// //                         onChange={handleChange}
// //                         variant="outlined"
// //                         margin="normal"
// //                     />
// //                     <TextField
// //                         label="Description"
// //                         name="Description"
// //                         value={updatedData.Description}
// //                         onChange={handleChange}
// //                         variant="outlined"
// //                         margin="normal"
// //                     />
// //                     <CKEditor
// //                         editor={ClassicEditor}
// //                         data={updatedData.Detailed_description} // Pre-fill with existing detailed description
// //                         onChange={handleEditorChange} // Handle editor change
// //                     />
// //                     <TextField
// //                         label="Price"
// //                         name="price"
// //                         value={updatedData.price}
// //                         onChange={handleChange}
// //                         variant="outlined"
// //                         margin="normal"
// //                     />
// //                     <Button
// //                         variant="contained"
// //                         color="primary"
// //                         onClick={handleSubmit}
// //                         sx={{ mt: 2 }}
// //                     >
// //                         Update Course
// //                     </Button>
// //                 </Box>
// //             ) : (
// //                 <p>Loading course data...</p>
// //             )}
// //             <ToastContainer />
// //         </div>
// //     );
// // }
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { baseUrl } from '../../features/Api/BaseUrl';
// import { TextField, Button, Box } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// export default function Onlinecourseeditpage() {
//     const location = useLocation();
//     const [data, setData] = useState(null);
//     const [updatedData, setUpdatedData] = useState({
//         Heading: "",
//         Description: "",
//         Detailed_description: "",
//         price: "",
//         image: null // For image handling
//     });
//     const prevId = location.state.data; // Get the course ID passed via navigation

//     const getData = () => {
//         axios.get(`${baseUrl}get_cms_online_courses_details`)
//             .then((response) => {
//                 const courseData = response.data.Details.find(item => item._id === prevId);
//                 setData(courseData); // Set the course data to the state
//                 setUpdatedData({
//                     Heading: courseData.Heading,
//                     Description: courseData.Description,
//                     Detailed_description: courseData.Detailed_description,
//                     price: courseData.price,
//                     image: courseData.image || null // Pre-fill the image if available
//                 });
//             })
//             .catch((error) => {
//                 console.log(error.response.data);
//             });
//     };

//     useEffect(() => {
//         getData(); // Fetch the course details when the component mounts
//     }, [prevId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleEditorChange = (event, editor) => {
//         const data = editor.getData();
//         setUpdatedData(prevState => ({
//             ...prevState,
//             Detailed_description: data // Update detailed description from CKEditor
//         }));
//     };

//     const handleImageChange = (e) => {
//         setUpdatedData(prevState => ({
//             ...prevState,
//             image: e.target.files[0] // Update image when file is selected
//         }));
//     };

//     const handleSubmit = () => {
//         const formData = new FormData();
//         formData.append('Heading', updatedData.Heading);
//         formData.append('Description', updatedData.Description);
//         formData.append('Detailed_description', updatedData.Detailed_description);
//         formData.append('price', updatedData.price);
//         if (updatedData.image) {
//             formData.append('image', updatedData.image); // Append image only if it's updated
//         }

//         axios.put(`${baseUrl}update_online_course/${prevId}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data' // Important for file uploads
//             }
//         })
//         .then((response) => {
//             toast.success("Course updated successfully!");
//         })
//         .catch((error) => {
//             toast.error("Error updating course: " + error.response.data.message);
//         });
//     };

//     return (
//         <div>
//             <h1>Edit Online Course</h1>
//             {data ? (
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         width: 400,
//                         margin: '0 auto'
//                     }}
//                 >
//                     <TextField
//                         label="Heading"
//                         name="Heading"
//                         value={updatedData.Heading}
//                         onChange={handleChange}
//                         variant="outlined"
//                         margin="normal"
//                     />
//                     <TextField
//                         label="Description"
//                         name="Description"
//                         value={updatedData.Description}
//                         onChange={handleChange}
//                         variant="outlined"
//                         margin="normal"
//                     />
//                     <CKEditor
//                         editor={ClassicEditor}
//                         config={{
//                             ckfinder: {
//                                 // Config for the image upload feature
//                                 uploadUrl: `${baseUrl}upload_image`, // Your image upload endpoint
//                             }
//                         }}
//                         data={updatedData.Detailed_description}
//                         onChange={handleEditorChange}
//                     />
//                     <TextField
//                         label="Price"
//                         name="price"
//                         value={updatedData.price}
//                         onChange={handleChange}
//                         variant="outlined"
//                         margin="normal"
//                     />
//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                     />
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleSubmit}
//                         sx={{ mt: 2 }}
//                     >
//                         Update Course
//                     </Button>
//                 </Box>
//             ) : (
//                 <p>Loading course data...</p>
//             )}
//             <ToastContainer />
//         </div>
//     );
// }
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { baseUrl } from '../../features/Api/BaseUrl';
// import { TextField, Button, Box } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { baseurlImage } from '../../features/Imageurl';

// export default function Onlinecourseeditpage() {
//     const location = useLocation();
//     const [data, setData] = useState(null);
//     const [updatedData, setUpdatedData] = useState({
//         Heading: "",
//         Description: "",
//         Detailed_description: "",
//         price: "",
//         image: null // For image handling
//     });
//     const prevId = location.state.data; // Get the course ID passed via navigation

//     const getData = () => {
//         axios.get(`${baseUrl}get_cms_online_courses_details`)
//             .then((response) => {
//                 const courseData = response.data.courses.find(item => item._id === prevId);
//                 setData(courseData); // Set the course data to the state
//                 setUpdatedData({
//                     Heading: courseData.Heading,
//                     Description: courseData.Description,
//                     Detailed_description: courseData.Detailed_description,
//                     price: courseData.price,
//                     image: courseData.image || null // Pre-fill the image if available
//                 });
//             })
//             .catch((error) => {
//                 console.log(error.response.data);
//             });
//     };

//     useEffect(() => {
//         getData(); // Fetch the course details when the component mounts
//     }, [prevId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleEditorChange = (event, editor) => {
//         const data = editor.getData();
//         setUpdatedData(prevState => ({
//             ...prevState,
//             Detailed_description: data // Update detailed description from CKEditor
//         }));
//     };

//     const handleImageChange = (e) => {
//         setUpdatedData(prevState => ({
//             ...prevState,
//             image: e.target.files[0] // Update image when file is selected
//         }));
//     };

//     const handleSubmit = () => {
//         const formData = new FormData();
//         formData.append('Heading', updatedData.Heading);
//         formData.append('Description', updatedData.Description);
//         formData.append('Detailed_description', updatedData.Detailed_description);
//         formData.append('price', updatedData.price);
//         if (updatedData.image) {
//             formData.append('image', updatedData.image); // Append image only if it's updated
//         }

//         axios.put(`${baseUrl}update_online_course/${prevId}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data' // Important for file uploads
//             }
//         })
//         .then((response) => {
//             toast.success("Course updated successfully!");
//         })
//         .catch((error) => {
//             toast.error("Error updating course: " + error.response.data.message);
//         });
//     };

//     return (
//         <div className='w-100'>
//             <h1>Edit Online Course</h1>
//             {data ? (
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'column',

//                         margin: '0 auto'
//                     }}
//                 >
//                     <TextField
//                         label="Heading"
//                         name="Heading"
//                         value={updatedData.Heading}
//                         onChange={handleChange}
//                         variant="outlined"
//                         margin="normal"

//                     />
//                     <TextField
//                         label="Description"
//                         name="Description"
//                         value={updatedData.Description}
//                         onChange={handleChange}
//                         variant="outlined"
//                         margin="normal"
//                     />
//                     <CKEditor
//                         editor={ClassicEditor}
//                         config={{
//                             ckfinder: {
//                                 // Config for the image upload feature
//                                 uploadUrl: `${baseUrl}upload_image`, // Your image upload endpoint
//                             }
//                         }}
//                         data={updatedData.Detailed_description}
//                         onChange={handleEditorChange}
//                     />
//                     <TextField
//                         label="Price"
//                         name="price"
//                         value={updatedData.price}
//                         onChange={handleChange}
//                         variant="outlined"
//                         margin="normal"
//                     />
//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                     />
//                     <div className='rounded border' >
//                    <img src={`${baseurlImage}${updatedData.image}`} alt='hellwo' style={{width:"50px",height:"50px"}} />
//                     </div>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleSubmit}
//                         sx={{ mt: 2 }}
//                     >
//                         Update Course
//                     </Button>
//                 </Box>
//             ) : (
//                 <p>Loading course data...</p>
//             )}
//             <ToastContainer />
//         </div>
//     );
// }
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../features/Api/BaseUrl';
import { TextField, Button, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { baseurlImage } from '../../features/Imageurl';
import { ArrowBack } from '@mui/icons-material';

export default function Onlinecourseeditpage() {
    const location = useLocation();
    const [data, setData] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        Heading: "",
        Description: "",
        Detailed_description: "",
        price: "",
        image: null // For image handling
    });
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const prevId = location.state.data; // Get the course ID passed via navigation

    const getData = () => {
        axios.get(`${baseUrl}get_cms_online_courses_details`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                const courseData = response.data.courses.find(item => item._id === prevId);
                setData(courseData); // Set the course data to the state
                setUpdatedData({
                    Heading: courseData.Heading,
                    Description: courseData.Description,
                    Detailed_description: courseData.Detailed_description,
                    price: courseData.price,
                    image: courseData.image || null // Pre-fill the image if available
                });
                setImagePreview(`${baseurlImage}${courseData.image}`); // Show the current image
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    useEffect(() => {
        getData(); // Fetch the course details when the component mounts
    }, [prevId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setUpdatedData(prevState => ({
            ...prevState,
            Detailed_description: data // Update detailed description from CKEditor
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUpdatedData(prevState => ({
            ...prevState,
            image: file // Update image when file is selected
        }));

        // Generate a URL for the selected image for preview
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        } else {
            setImagePreview(`${baseurlImage}${updatedData.image}`); // Reset preview to the original image
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('Heading', updatedData.Heading);
        formData.append('Description', updatedData.Description);
        formData.append('Detailed_description', updatedData.Detailed_description);
        formData.append('price', updatedData.price);
        if (updatedData.image) {
            formData.append('image', updatedData.image); // Append image only if it's updated
        }

        axios.put(`${baseUrl}update_online_course/${prevId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                toast.success("Course updated successfully!");
            })
            .catch((error) => {
                toast.error("Error updating course: " + error.response.data.message);
            });
    };
    const navigate = useNavigate()
    return (
        <div className='w-100'>
            <div>
                <ArrowBack className="mb-3" style={{ cursor: "pointer" }} onClick={() => { navigate('/Admin/Onlinecourse') }} />
            </div>
            <h1>Edit Online Course</h1>
            {data ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '0 auto'
                    }}
                >
                    <TextField
                        label="Heading"
                        name="Heading"
                        value={updatedData.Heading}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        name="Description"
                        value={updatedData.Description}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                    />
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            ckfinder: {
                                // Config for the image upload feature
                                uploadUrl: `${baseUrl}upload_image`, // Your image upload endpoint
                            }
                        }}
                        data={updatedData.Detailed_description}
                        onChange={handleEditorChange}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={updatedData.price}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                    />

                    {/* Image preview */}
                    <div className='rounded border' style={{ marginTop: '10px', marginBottom: '10px' }}>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt='Course Preview'
                                style={{ width: '100px', height: '100px' }}
                            />
                        )}
                    </div>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ mt: 2 }}
                    >
                        Update Course
                    </Button>
                </Box>
            ) : (
                <p>Loading course data...</p>
            )}
            <ToastContainer />
        </div>
    );
}
