import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseUrl } from "../features/Api/BaseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

function OtpGenerate() {
  const [otp, setOtp] = useState("");

  const [forgotErr, setForgotErr] = useState(false);

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const navigate = useNavigate();
  

  const submitData = (e) => {
    console.log(otp);
    e.preventDefault();
    if (otp === "") {
      setForgotErr(true);
    } else {
      setForgotErr(false);

      axios
        .post(`${baseUrl}AdminverifyOTP`, {
          otp: otp,
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            console.log(response.data.AdminId)
            const userId = response.data.AdminId;
            localStorage.setItem('adminid',userId)
            localStorage.setItem("userId", userId);
            Swal.fire(
              "Verify OTP Successfully",
              "You clicked the button!",
              "success"
            );
            navigate("/reset-password");
          }
        })
        .catch((error) => {
          console.log(error);
          setError({
            errors: error,
            isError: true,
          });
          // handdale error in proper way
        });
    }
  };
  const handlekey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
        e.preventDefault();
    }
}
  return (
    <>
      <div>
      <div className="loginBg">
        <div class="wrapper">
          <div class="container-style">
            <div class="col-right" style={{width:"100%"}}>
              <div class="login-form">
                <h2> OTP verification</h2>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "rgb(117, 117, 117)",
                  }}
                >
                  OTP verification
                </p>
                <p>
                  <span style={{ color: "red" }}>
                    {forgotErr ? "Please enter your Otp!" : " "}
                  </span>
                  <OtpInput
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      fontSize: "1rem",
                      borderRadius: 4,
                      border: "2px solid rgba(0,0,0,0.3)",
                    }}
                    value={otp}
                    
                    onChange={setOtp}
                    numInputs={4}
                    onKeyPress={handlekey}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                  <span style={{ color: "red" }}>
                    {error.isError ? error.errors?.response?.data?.message : " "}
                  </span>
                </p>

                <p>
                  <Button
                    variant="contained"
                    className="global_button"
                    onClick={submitData}
                  >
                    verify
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

export default OtpGenerate;
