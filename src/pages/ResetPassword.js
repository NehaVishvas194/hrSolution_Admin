import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseUrl } from "../features/Api/BaseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const defaultState = {
  newPassword: "",
  confirmPassword: "",
};
function ResetPassword() {
  const [resetPassErr, setResetPassErr] = useState(false);
  const [state, setState] = useState(defaultState);
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const navigate = useNavigate();
  const ResetPassword = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  var idGet = localStorage.getItem("userId");
  const resetData = (e) => {
    if (state.newPassword === "" && state.confirmPassword === "") {
      setResetPassErr(true);
    } else {
      setResetPassErr(false);
      axios
        .post(`${baseUrl}adminResetPass/${idGet}`, {
          password: state.newPassword,
          confirmPassword: state.confirmPassword,
        })
        .then((response) => {
          if (response.data.success) {
            Swal.fire(
              "Password Reset Successfully!",
              "You clicked the button!",
              "success"
            );
            navigate("/hrsolutions");
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          setError({
            errors: error,
            isError: true,
          });
        });
    }
  };
  return (
    <>
      <div>
        <div className="loginBg">
          <div class="wrapper">
            <div class="container-style">
              <div class="col-right" style={{ width: "100%" }}>
                <div class="login-form">
                  <h2> Reset Password</h2>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "rgb(117, 117, 117)",
                    }}
                  >
                    Enter your New Password
                  </p>
                  <span style={{ color: "red" }}>
                    {resetPassErr ? "please Enter your Password!" : ""}
                  </span>
                  <p>
                    <TextField
                      fullWidth
                      classNameName="mb-1 mt-3 w-100"
                      type="text"
                      label="New Password"
                      name="newPassword"
                      onChange={ResetPassword}
                      value={state.newPassword}
                    />
                    <span style={{ color: "red" }}>
                      {error.isError
                        ? error?.errors?.response?.data?.message
                        : " "}
                    </span>
                  </p>
                  <p>
                    <TextField
                      fullWidth
                      classNameName="mb-1 mt-3 w-100"
                      type="text"
                      label="Confirm Password"
                      name="confirmPassword"
                      onChange={ResetPassword}
                      value={state.confirmPassword}
                      size="normal"
                    />
                  </p>
                  <p>
                    <Button
                      variant="contained"
                      className="global_button"
                      onClick={resetData}
                    >
                      submit
                    </Button>
                  </p>
                </div>
              </div>
            </div>
            <div class="credit"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResetPassword;
