import React, { useContext, useState } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import axios from "axios";
import { baseUrl } from "../features/Api/BaseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import image from "../Assests/smart-start-sl-ltd-SLOGAN.png";
import { ToastContainer, toast } from "react-toastify";
import { MyContext } from "../Context/Mycontext";
const defaultState = {
  email: "",
  password: "",
};
function Login() {
  const navigate = useNavigate();
  const { text, setText } = useContext(MyContext);
  const [state, setState] = useState(defaultState);
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const loginApproved = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(state);
  const submitData = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${baseUrl}login`, {
        email: state.email,
        password: state.password,
      })
      .then((response) => {
        console.log();
        console.log(response.data);
        if (response.data.success) {
          console.log(response.data.message);
          const getId = response.data.data._id;
          const getName = response.data.data.name;
          setText(response.data.data.profileImage);
          const email = response.data.data.email;
          const status = response.data.data.status;
          const role = response.data.data.role;
          localStorage.setItem("id", getId);
          localStorage.setItem("name", getName);
          localStorage.setItem("status", status);
          localStorage.setItem("role", role);
          localStorage.setItem("email", email);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("permissions", JSON.stringify(response.data.permissions));

          Swal.fire(
            response.data.message,
            "You clicked the button!",
            "success"
          );
          if (response.data.data.role === "HR Coordinator") {
            navigate("/Admin/Get-Staff");
          } else {
            navigate("/admin");
          }
        }
      })
      .catch((error) => {
        // toast.error(error.response.data.message)
        Swal.fire(
          error.response.data.message,
          { icon: "error" },
          "You clicked the button!",
          "false"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const forgotPassword = () => {
    navigate("/forgot-password");
  };
  return (
    <>
      <div className="loginBg">
        <div className="wrapper">
          <div className="container-style">
            <div className="colRight" style={{ width: "100%" }}>
              <div className="login-form">
                <div className="loginLogo">
                  <img
                    src={image}
                    className="festabash-l0go mt-3"
                    style={{ width: "180px" }}
                    alt=""
                  />
                </div>

                {/* <h2>Admin</h2> */}
                <span style={{ color: "red" }}>
                  {error.isError
                    ? error.errors?.response?.data?.EmailMessage
                    : " "}
                </span>
                <p>
                  <TextField
                    fullWidth
                    className="mb-1 mt-3 w-100 "
                    label="Email"
                    name="email"
                    type="text"
                    error={false}
                    autoComplete="off"
                    onChange={loginApproved}
                    value={state.email}
                    size="normal"
                  />
                  <p>{error.email}</p>
                  <span style={{ color: "red" }}>
                    {error.isError
                      ? error.errors.response.data.emailExistanceMessage
                      : " "}
                  </span>
                </p>
                <span style={{ color: "red" }}>
                  {error.isError
                    ? error.errors.response.data.passwordMessage
                    : " "}
                </span>
                <p>
                  <TextField
                    fullWidth
                    classNameName="mb-1 mt-3 w-100"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={loginApproved}
                    value={state.password}
                    size="normal"
                  />
                  <p className="text-danger">{error.password}</p>
                  <span style={{ color: "red" }}>
                    {error.isError
                      ? error.errors.response.data.passwordExistanceMessage
                      : " "}
                  </span>
                </p>
                <p>
                  <Button
                    variant="contained"
                    className="global_button"
                    onClick={submitData}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </p>
                <div className="text-center mt-3">
                  <span style={{ cursor: "pointer" }} onClick={forgotPassword}>
                    Forgot password?{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="credit"></div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
export default Login;
