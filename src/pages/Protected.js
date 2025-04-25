import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Protected(props) {
  const navigate = useNavigate();
  const { Component } = props;
  useEffect(() => {
    let login = localStorage.getItem("name");
    console.log(login)
    if (!login) {
      navigate("/hrsolutions");
    }
  });
  return (
    <>
      <Component />
    </>
  );
}
export default Protected;