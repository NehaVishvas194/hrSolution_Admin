import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function StaffSection() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
    role: "",
    phone_no: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setData({ ...data, [name]: newValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleValidate = () => {
    const newErrors = {};
    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (!data.profileImage) {
      newErrors.profileImage = "Profile image is required";
    }
   
    if (!data.phone_no.trim()) {
      newErrors.phone_no = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlekeypress = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  };

  const userid = localStorage.getItem("id");
  console.log(userid);
  const handleClick = () => {
    if (handleValidate()) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("profileImage", data.profileImage);
      formData.append("role", "HR Coordinator");
      formData.append("phone_no", data.phone_no);

      axios
        .post(`${baseUrl}addStaff/${userid}`, formData,{
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            
          },
        })
        .then((response) => {
          toast.success(response.data.message);
          setTimeout(() => {
            if (response.status == 200) {
              navigate("/Admin/Get-Staff");
            }
          }, 1500);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <>
      <div className="container main_container">
        <div className="row">
          <div className="col-md-12">
            <p className="text-center fs-4 fw-bold mb-5 mt-4">
              <i className="fas fa-users"></i> Register User
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <TextField
              id="outlined-basic"
              name="name"
              onChange={handleChange}
              label="Full Name"
              variant="outlined"
              style={{ width: "100%" }}
              error={!!errors.name}
              helperText={errors.name}
              onKeyPress={(e) => {
                if (!/^[a-zA-Z\s]$/.test(e.key)) { // Allow letters and spaces
                  e.preventDefault();
                }
            }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <TextField
              id="outlined-basic"
              style={{ width: "100%" }}
              name="email"
              onChange={handleChange}
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <div className="col-md-6 mb-3">
            <TextField
              id="outlined-basic"
              style={{ width: "100%" }}
              name="password"
              type="password"
              onChange={handleChange}
              label="Password"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password}
            />
          </div>
          <div className="col-md-6 mb-3">
            <TextField
              type="file"
              style={{ width: "100%" }}
              id="profileImage"
              name="profileImage"
              onChange={handleChange}
            />
            {errors.profileImage && (
              <p style={{ color: "red" }}>{errors.profileImage}</p>
            )}
          </div>
          {/* <div className="col-md-6 mb-3">
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="dropdown-label1">Select Role</InputLabel>
              <Select
                labelId="dropdown-label1"
                id="dropdown"
                label="Select Place"
                onChange={handleChange}
                name="role"
                value={data.role}
                error={!!errors.role}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="HR Coordinator">HR Coordinator</MenuItem>
              </Select>
              {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
            </FormControl>
          </div>  */}
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              onKeyPress={handlekeypress}
              style={{ width: "100%" }}
              inputProps={{
                maxLength: 13,
              }}
              name="phone_no"
              onChange={handleChange}
              label="Phone Number"
              variant="outlined"
              error={!!errors.phone_no}
              helperText={errors.phone_no}
            />
          </div>
          <div className="mt-2" style={{"text-align":"center"}}><Button
            variant="contained"
            onClick={handleClick}
            style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
          >
            Add Staff
          </Button></div>


        </div>
        <ToastContainer />
      </div>
    </>
  );
}
