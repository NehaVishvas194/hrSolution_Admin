import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { baseUrl } from '../../features/Api/BaseUrl';
import { baseurlImage } from '../../features/Imageurl';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MyContext } from '../../Context/Mycontext';
import Swal from "sweetalert2";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function MyProfile() {
  const iduser = localStorage.getItem('id');
  const defaultState = {
    name: "",
    role: "",
    email: "",
    profileImage: "",
  };
  
 
    const uploadedImage = React.useRef(null);
    const { text, setText } = useContext(MyContext)
    const [error, setError] = useState({
      errors: {},
      isError: false,
    });
  
    
    const navigate = useNavigate();
    const [state, setState] = useState(defaultState);
    const [selectedImage, setSelectedImage] = useState("");
    const [imageError, setImageError] = useState("");
  
    const adminProfile = () => {
      axios
        .get(`${baseUrl}getAdmin/${iduser}`)
        .then((response) => {
          console.log(response);
          setState((prevData) => ({
            ...prevData,
            name: response.data.Details.name,
            role: response.data.Details.role,
            email: response.data.Details.email,
            profileImage: response.data.Details.profileImage,
          }));
          // localStorage.setItem('profileImage', response.data.Details.profileImage)
          // localStorage.setItem("name", response.data.Details.name);
          setText(response.data.Details.profileImage)
        })
        .catch((error) => {
          Swal.fire("Error", `${error?.response?.data?.message}`, "error");
        });
    };
  
    useEffect(() => {
      adminProfile();
    }, []);
  
    const imageFunction = (event) => {
      const file = event.target.files[0];
      const fileType = file?.type;
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
  
      if (validImageTypes.includes(fileType)) {
        setSelectedImage(file);
        setState({ ...state, profileImage: file.name });
        setImageError("");
      } else {
        setImageError("Only .jpg, .jpeg, and .png formats are allowed");
      }
    };
  
    const handleImageUpload = (event) => {
      const [file] = event.target.files;
      if (file) {
        const reader = new FileReader();
        const { current } = uploadedImage;
  
        if (current) {
          current.file = file;
          reader.onload = (e) => {
            current.src = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          console.error("uploadedImage.current is null");
        }
      }
    };
  
    const submitData = (event) => {
      const { name, value } = event.target;
      if ((name === "phone_no") && value !== "" && !/^\d+$/.test(value)) {
        return;
      }
      console.log(selectedImage);
      console.log(name, value);
      setState((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    };
  
    const submitFormData = () => {
      if (imageError) {
        Swal.fire("Error", imageError, "error");
        return;
      }
 
      const bodyFormData = new FormData();
      const file = new File([selectedImage], state.profileImage, {
        type: selectedImage.type,
      });
  
      bodyFormData.append("name", state.name);
       
      bodyFormData.append("email", state.email);
      bodyFormData.append("profileImage", selectedImage);
  
      axios
        .put(`${baseUrl}updateAdmin/${iduser}`, bodyFormData)
        .then((response) => {
          if (response.status === 200) {
            
            console.log(response);
            Swal.fire(
              "Profile update successfully!",
              "You clicked the button!",
              "success"
            );
            adminProfile()
          
            // localStorage.setItem("Email", response.data.data.email);
            // console.log(response.data.data.name)
            // localStorage.setItem("name", response.data.data.name);
            navigate("/admin", { state: { dataValue: state } });
  
          }
  
  
        })
        .catch((error) => {
          console.log(error)
          Swal.fire("Error", `${error?.response?.data?.message}`, "error");
          setError({
            errors: error,
            isError: true,
          });
        });
    };
  
  // const [data, setData] = useState({});
  // const [openModal, setOpenModal] = useState(false);
  // const { text, setText } = useContext(MyContext);
 

  // useEffect(() => {
  //   getApi();
  // }, []);

  // const getApi = () => {
  //   axios
  //     .get(`${baseUrl}getAdmin/${iduser}`)
  //     .then((response) => {
  //       setData(response.data.Details);
  //       localStorage.setItem("name", response.data.Details.name);
  //     })
  //     .catch((error) => {
  //       console.log(error.response?.data || error.message);
  //     });
  // };

  // const handleUpdateClick = () => {
  //   setOpenModal(true);
  // };

  // const handleCloseModal = () => {
  //   setOpenModal(false);
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value });
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setData({ ...data, profileImage: file });
  // };

  // const handleUpdateProfile = () => {
  //   const formData = new FormData();
  //   formData.append("name", data.name);
  //   formData.append("email", data.email);
  //   if (data.profileImage) {
  //     formData.append("profileImage", data.profileImage);
  //   }

  //   axios
  //     .put(`${baseUrl}updateAdmin/${iduser}`, formData)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setText(response.data.admin.profileImage);
  //         // getApi();
  //         toast.success(response.data.message);
  //         setOpenModal(false);
  //       }

  //     })
  //     .catch((error) => {
  //       console.log(error.response?.data || error.message);
  //       toast.error("Failed to update profile");
  //     });
  // };

  return (
    <>
      {/* <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <img
              src={`${baseurlImage}${text}`}
              alt="Profile"
              style={{
                width: '150px',
                borderRadius: '50%',
                height: '150px',
                border: '2px solid red',
                marginBottom: '20px',
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>Name :</h5>
                <p>{data.name}</p>
              </div>
            </Item>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>Email :</h5>
                <p>{data.email}</p>
              </div>
            </Item>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>Role :</h5>
                <p>{data.role}</p>
              </div>
            </Item>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>Status :</h5>
                <p>{data.status === 1 ? 'Active' : 'Inactive'}</p>
              </div>
            </Item>
          </div>
        </div>
        <Button variant="contained" onClick={handleUpdateClick} style={{ display: 'block' }}>
          Update Profile
        </Button>
      </div>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <TextField
                label="Name"
                value={data.name}
                onChange={handleChange}
                name="name"
                fullWidth
                className="mt-2"
              />
            </div>
            <div className="col-12 col-md-6 mt-2 mb-3">
              <TextField
                type="file"
                name="profileImage"
                onChange={handleFileChange}
                fullWidth
                className="mb-3"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <TextField
                label="Email"
                value={data.email}
                onChange={handleChange}
                name="email"
                fullWidth
                className="mb-3"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleUpdateProfile} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer /> */}
       <div className="bg-white m-0 p-0">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                ref={uploadedImage}
                alt="not found"
                className="rounded-circle mt-5"
                width="150px"
                height="150px"
                src={`https://sisccltd.com/hrsolutions/${state.profileImage}`}
              />
              <div style={{ marginStart: "10px" }}>
                <input
                  style={{ margin: "5px 0px 0px 50px" }}
                  className="mb-2 w-100 hidden"
                  type="file"
                  name="profileImage"
                  onChange={(event) => {
                    imageFunction(event);
                    handleImageUpload(event);
                  }}
                />
              </div>
              {imageError && <span style={{ color: "red" }}>{imageError}</span>}
            </div>
          </div>
          <div className="col-md-9 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right" style={{ color: "#000000" }}>
                  My Profile
                </h4>
              </div>
              <div className="form-outline mb-4">
                <TextField
                  fullWidth
                  label="First Name"
                  id="fullWidth"
                  autoComplete="off"
                  onChange={submitData}
                  name="name"
                  value={state.name}
                />
              </div>
              <div className="form-outline mb-4">
                <TextField
                  fullWidth
                  label="Role"
                  id="fullWidth"
                  autoComplete="off"
                  onChange={submitData}
                  name="role"
                  value={state.role}
                  disabled
                  
                />
              </div>
              <div className="form-outline mb-4">
                <TextField
                  fullWidth
                  label="Email"
                  id="fullWidth"
                  autoComplete="off"
                  onChange={submitData}
                  name="email"
                  value={state.email}
                />
              </div>
              <div className="mt-3 text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitFormData}
                >
                  Update
                  <ArrowRightAltIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// export default MyProfile;
