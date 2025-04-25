import React, { useState } from "react";
import { TextField } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../features/Api/BaseUrl";
import { toast } from "react-toastify";
const defaultState = {
  oldPassword: "",
  password: "",
  confirmpassword: "",
};
const ChangePassword = (props) => {
  const adminId = localStorage.getItem("id");
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const [state, setState] = useState(defaultState);
  const submitData = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const submitdtata = (event) => {
    const {name,value}=event.target;
    console.log(name,value);
  }
  const submitFormData = () => {
    console.log(state);
    axios
      .post(`${baseUrl}admin_ChangePassword/${adminId}`, {
        oldPassword: state.oldPassword,
        password: state.password,
        confirmPassword: state.confirmpassword,
      })
      .then((response) => {
        toast.success(response.data.message);
        if (response.data.success) {
          Swal.fire(
            "Password  update  successfully!",
            "You clicked the button!",
            "success"
          );
          setState({
            oldPassword: "",
            password: "",
            confirmpassword: "",
          });
          setError({
            isError: false,
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setError({
          errors: error,
          isError: true,
        });
      });
  };
  const submitFormData12 = () => {
    console.log(state);
    axios
      .post(`${baseUrl}staff_ChangePassword/${adminId}`, {
        oldPassword: state.oldPassword,
        password: state.password,
        confirmPassword: state.confirmpassword,
      })
      .then((response) => {
        toast.success(response.data.message);
        if (response.data.success) {
          Swal.fire(
            "Password  Update  Successfully!",
            "You clicked the button!",
            "success"
          );
          setState({
            oldPassword: "",
            password: "",
            confirmpassword: "",
          });
          setError({
            isError: false,
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setError({
          errors: error,
          isError: true,
        });
      });
  };
  const role = localStorage.getItem('role')
  return (
    <>
      <div className="container " style={{ backgroundColor: "#fff" }}>
        <div className="row m-0 ">
          <div className="col-12 my-3">
            <h4 className="text-center"> Change Password</h4>
          </div>
          <span style={{ color: "red" }}>
            {error.isError
              ? error?.errors?.response?.data?.OldPasswordValidMessage
              : " "}
          </span>
          <div className="col-12 my-3">
            <TextField
              fullWidth
              variant="outlined"
              size="large"
              label={"Old Password "}
              name="oldPassword"
              onChange={submitData}
              value={state.oldPassword}
            />
            <span style={{ color: "red" }}>
              {error.isError
                ? error?.errors?.response?.data?.oldPasswordMessage
                : " "}
            </span>
          </div>
          <div className="col-12 my-3">
            <TextField
              fullWidth
              variant="outlined"
              aize="large"
              label={"New password "}
              name="password"
              onChange={submitData}
              value={state.password}
            />
            <span style={{ color: "red" }}>
              {error.isError
                ? error?.errors?.response?.data?.passwordMessage
                : " "}
            </span>
          </div>
          <div className="col-12 my-3">
            <span style={{ color: "red" }}>
              {error.isError
                ? error?.errors?.response?.data?.passwordMatchMessage
                : " "}
            </span>
            <TextField
              fullWidth
              variant="outlined"
              className="me-2"
              size="large"
              label={"Confirm Password "}
              name="confirmpassword"
              onChange={submitData}
              value={state.confirmpassword}
            />
            <span style={{ color: "red" }}>
              {error.isError
                ? error?.errors?.response?.data?.confirmPasswordMessage
                : " "}
            </span>
          </div>
          {
            role === "super Admin" ? (
              <div className="col-12 my-3 d-flex justify-content-center">
                <button
                  type="submit"
                  className="global_button"
                  onClick={submitFormData}
                  style={{ borderRadius: "5px" }}
                >
                  Submit <ArrowRightAltIcon />
                </button>
              </div>
            ) : (
              <div className="col-12 my-3 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn"
                  onClick={submitFormData12}
                  style={{ borderRadius: "5px", backgroundColor:"#ffc83d"}}
                >
                  Submit pass <ArrowRightAltIcon />
                </button>
              </div>
            )
          }

        </div>
      </div>
    </>
  );
};

export default ChangePassword;
