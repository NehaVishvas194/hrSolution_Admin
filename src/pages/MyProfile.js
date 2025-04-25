// // import React, { useState, useEffect } from "react";
// // import TextField from "@mui/material/TextField";
// // import axios from "axios";
// // import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// // import Swal from "sweetalert2";
// // import { useNavigate } from "react-router-dom";
// // import { baseUrl } from "../features/Api/BaseUrl";
// // import { toast } from "react-toastify";
// // const defaultState = {
// //   firstName: "",
// //   lastName: "",
// //   email: "",
// //   image: "",
// // };
// // const MyProfile = () => {
// //   const [error, setError] = useState({
// //     errors: {},
// //     isError: false,
// //   });
// //   const adminId = localStorage.getItem("id");
// //   console.log(adminId);
// //   const navigate = useNavigate();
// //   const [state, setState] = useState(defaultState);
// //   const [selectedImage, setSelectedImage] = useState("");
// //   const adminProfile = () => {
// //     axios.get(`${baseUrl}getAdmin/${adminId}`).then((response) => {
// //         console.log(response.data.Admin_Details.profileImage);
// //         setState((prevData) => ({
// //           ...prevData,
// //           firstName: response.data.Admin_Details.firstName,
// //           lastName: response.data.Admin_Details.lastName,
// //           email: response.data.Admin_Details.email,
// //           image: response.data.Admin_Details.profileImage,
// //         }));
// //         localStorage.setItem("name", response.data.Admin_Details.firstName);
// //         localStorage.setItem("image123", response.data.Admin_Details.profileImage);
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });
// //   };
// //   useEffect(() => {
// //     adminProfile();
// //   }, []);
// //   const imageFunction = (event) => {
// //     setSelectedImage(event.target.files[0]);
// //     setState({ ...state, image: event.target.files[0].name });
// //   };
// //   const submitData = (event) => {
// //     console.log(selectedImage);
// //     const { name, value } = event.target;
// //     setState((prevState) => {
// //       return {
// //         ...prevState,
// //         [name]: value,
// //       };
// //     });
// //   };
// //   const submitFormData = () => {
// //     const bodyFormData = new FormData();
// //     const file = new File([selectedImage], state.image, {
// //       type: "image/jpeg",
// //     });
// //     bodyFormData.append("firstName", state.firstName);
// //     bodyFormData.append("lastName", state.lastName);
// //     bodyFormData.append("email", state.email);
// //     bodyFormData.append("profileImage", file);
// //     axios.post(`${baseUrl}updateAdmin/${adminId}`, bodyFormData)
// //       .then((response) => {
// //         console.log(response);
        
// //       //  toast.success("Profile Updated Successfully");
// //       //   navigate("/admin", { state: { dataValue: state } });
// //       //   adminProfile();
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         // setError({
// //         //   errors: error,
// //         //   isError: true,
// //         // });
// //       });
// //   };
// //   return (
// //     <>
// //       <div class=" bg-white m-0 p-0 ">
// //         <div class="row">
// //           <div class="col-md-3 border-right">
// //             <div class="d-flex flex-column align-items-center text-center p-3 py-5">
// //               {selectedImage ? (
// //                 <img
// //                   alt="not found"
// //                   class="rounded-circle mt-5"
// //                   width="150px"
// //                   height="150px"
// //                   src={URL.createObjectURL(selectedImage)}
// //                 />
// //               ) : (
// //                 <img
// //                   alt="not found"
// //                   class="rounded-circle mt-5"
// //                   width="150px"
// //                   src={"https://sisccltd.com/hrsolutions/" + state.image}
// //                   defaultState={state.image}
// //                 />
// //               )}
// //               <div style={{ marginStart: "10px" }}>
// //                 <input
// //                   style={{ margin: "5px 0px 0px 50px" }}
// //                   className="mb-2  w-100 hidden "
// //                   type="file"
// //                   name="image"
// //                   defaultValue={state.image}
// //                   onChange={(event) => {
// //                     imageFunction(event);
// //                   }}
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //           <div class="col-md-9 border-right">
// //             <div class="p-3 py-5">
// //               <div class="d-flex justify-content-between align-items-center mb-3">
// //                 <h4 class="text-right " style={{ color: "#000000" }}>
// //                   {" "}
// //                   My Profile{" "}
// //                 </h4>
// //               </div>
// //               <div class="form-outline mb-4">
// //                 <TextField
// //                   fullWidth
// //                   label=" first Name"
// //                   id="fullWidth"
// //                   autoComplete="off"
// //                   onChange={submitData}
// //                   name="firstName"
// //                   value={state.firstName}
// //                 />
// //               </div>
// //               <div class="form-outline mb-4">
// //                 <TextField
// //                   fullWidth
// //                   label="last Name"
// //                   id="fullWidth"
// //                   autoComplete="off"
// //                   onChange={submitData}
// //                   name="lastName"
// //                   cursor="pointer"
// //                   value={state.lastName}
// //                 />
// //               </div>
// //               <div class="form-outline mb-4">
// //                 <TextField
// //                   fullWidth
// //                   label="Email"
// //                   id="fullWidth"
// //                   autoComplete="off"
// //                   onChange={submitData}
// //                   name="email"
// //                   value={state.email}
// //                 />
// //               </div>
// //               <div class="mt-3 text-center">
// //                 <button
// //                   type="button"
// //                   className="btn btn-primary"
// //                   onClick={submitFormData}
// //                 >
// //                   Update 
// //                   <ArrowRightAltIcon />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };
// // export default MyProfile;

// import React, { useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import axios from "axios";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { baseUrl } from "../features/Api/BaseUrl";

// const defaultState = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   image: "",
// };

// const MyProfile = () => {
//   const [state, setState] = useState(defaultState);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const adminId = localStorage.getItem("id");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAdminProfile();
//   }, []);

//   const fetchAdminProfile = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}getAdmin/${adminId}`);
//       const { firstName, lastName, email, profileImage } = response.data.Admin_Details;
//       setState({ firstName, lastName, email, image: profileImage });
//     } catch (error) {
//       Swal.fire("Error", "Failed to fetch profile data.", "error");
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setState((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setState((prev) => ({ ...prev, image: file.name }));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!state.firstName || !state.lastName || !state.email) {
//       Swal.fire("Validation Error", "All fields are required.", "warning");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("firstName", state.firstName);
//       formData.append("lastName", state.lastName);
//       formData.append("email", state.email);

//       if (selectedImage) {
//         formData.append("profileImage", selectedImage);
//       }

//       await axios.post(`${baseUrl}updateAdmin/${adminId}`, formData).then((response) => { 
//         console.log(response)}).catch((error) => {
//           console.log(error);
//         });

//       // Swal.fire("Success", "Profile updated successfully.", "success");
//       // fetchAdminProfile(); // Refresh profile data
//     } catch (error) {
//       Swal.fire("Error", "Failed to update profile.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white m-0 p-0">
//       <div className="row">
//         <div className="col-md-3 border-right">
//           <div className="d-flex flex-column align-items-center text-center p-3 py-5">
//             {selectedImage ? (
//               <img
//                 alt="Preview"
//                 className="rounded-circle mt-5"
//                 width="150px"
//                 height="150px"
//                 src={URL.createObjectURL(selectedImage)}
//               />
//             ) : (
//               <img
//                 alt="Profile"
//                 className="rounded-circle mt-5"
//                 width="150px"
//                 src={`https://sisccltd.com/hrsolutions/${state.image}`}
//               />
//             )}
//             <div style={{ marginTop: "10px" }}>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 style={{ display: "none" }}
//                 id="imageUpload"
//               />
//               <label htmlFor="imageUpload" className="btn btn-secondary mt-2">
//                 Upload Image
//               </label>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-9 border-right">
//           <div className="p-3 py-5">
//             <h4 className="text-right" style={{ color: "#000000" }}>
//               My Profile
//             </h4>
//             <TextField
//               fullWidth
//               label="First Name"
//               name="firstName"
//               value={state.firstName}
//               onChange={handleInputChange}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               label="Last Name"
//               name="lastName"
//               value={state.lastName}
//               onChange={handleInputChange}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               label="Email"
//               name="email"
//               value={state.email}
//               onChange={handleInputChange}
//               margin="normal"
//             />
//             <div className="mt-3 text-center">
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleSubmit}
//                 disabled={loading}
//               >
//                 {loading ? "Updating..." : "Update"}
//                 <ArrowRightAltIcon />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../features/Api/BaseUrl";
const defaultState = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
};
const MyProfile = () => {
  const [state, setState] = useState(defaultState);
  const [selectedImage, setSelectedImage] = useState(null);
  const adminId = localStorage.getItem("id");
  const navigate = useNavigate();
  const adminProfile = async () => {
    try {
      const response = await axios.get(`${baseUrl}getAdmin/${adminId}`);
      const adminDetails = response.data.Admin_Details;
      setState({
        firstName: adminDetails.firstName,
        lastName: adminDetails.lastName,
        email: adminDetails.email,
        image: adminDetails.profileImage,
      });
      localStorage.setItem("name", adminDetails.firstName);
      localStorage.setItem("image123", adminDetails.profileImage);
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      Swal.fire("Error", "Failed to load profile data. Please try again.", "error");
    }
  };
  useEffect(() => {
    adminProfile();
  }, []);
  const imageFunction = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setState((prevState) => ({
        ...prevState,
        image: file.name,
      }));
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitFormData =  () => {
      const formData = new FormData();
      formData.append("firstName", state.firstName);
      formData.append("lastName", state.lastName);
      formData.append("email", state.email);
      if (selectedImage) {
        const file = new File([selectedImage], state.image, { type: selectedImage.type });
        formData.append("profileImage", file);
      }
        axios.post(`${baseUrl}updateAdmin/${adminId}`, formData).then((response) => {
          console.log(response)
      navigate("/admin", { state: { dataValue: state } });
      adminProfile();
    }).catch ((error)=> {
      console.error("Error updating profile111:", error);      
    })
  };
  return (
    <div className="bg-white m-0 p-0">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            {selectedImage ? (
              <img
                alt="Selected"
                className="rounded-circle mt-5"
                width="150px"
                height="150px"
                src={URL.createObjectURL(selectedImage)}
              />
            ) : (
              <img
                alt="Profile"
                className="rounded-circle mt-5"
                width="150px"
                src={"https://sisccltd.com/hrsolutions/" + state.image}
              />
            )}
            <input
              className="mt-3"
              type="file"
              onChange={imageFunction}
            />
          </div>
        </div>
        <div className="col-md-9 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">My Profile</h4>
            </div>
            <div className="form-outline mb-4">
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={state.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-outline mb-4">
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={state.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-outline mb-4">
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={state.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-3 text-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitFormData}
              >
                Update <ArrowRightAltIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
