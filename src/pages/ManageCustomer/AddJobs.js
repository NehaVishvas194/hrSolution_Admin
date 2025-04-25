import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import axios from "axios";
import "./AddJobs.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../features/Api/BaseUrl";
function AddJobs() {
  const navigate = useNavigate();
  const [values, setValues] = useState([]);
  const [jobErr, setJobErr] = useState(false);
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const [age, setAge] = useState("");
  const adminId = localStorage.getItem("id");
  console.log(adminId);
  useEffect(() => {
    axios
      .get("http://18.117.217.61:5000/api/get/category")
      .then((response) => {
        console.log(response.data);
        setValues(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [inputData, setInputData] = useState({
    jobTitle: "",
    location: "",
    description: "",
    salary: "",
    publicationDate: "",
  });

  let name, value;
  const submitInputdata = (e) => {
    console.log(e.target.value);
    name = e.target.name;
    value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };

  const submitAllData = () => {
    // Validate the form fields
    if (
      !inputData.jobTitle ||
      !inputData.location ||
      !inputData.description ||
      !inputData.salary ||
      !inputData.publicationDate
    ) {
      setJobErr(true);
      return;
    }
    axios
      .post(`${baseUrl}createJob/${adminId}`, {
        job_Heading: inputData?.jobTitle,
        company_Address: inputData?.location,
        job_Desciption: inputData?.description,
        Salary: inputData?.salary,
        job_expired_Date: inputData?.publicationDate,
      })
      .then((response) => {
        console.log(response);
        Swal.fire("Success", "job added successfully!", "success");
        navigate("/admin/jobs-list");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };

  return (
    <>
      <div className="container">
        <div className="header-div">
          <span>
            <i class="fas fa-users"></i>
          </span>
          <span>New job Add</span>
        </div>
        <div className="row row-style">
          <div className="col-12 d-flex justify-content-center image-div"></div>
          <div className="col-6">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  fullWidth
                  className="mb-1 mt-3 w-100"
                  type="text"
                  label="Title"
                  name="jobTitle"
                  value={inputData.jobTitle}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.jobTitle
                  ? "*Please Enter  Title Value"
                  : ""}
              </span>
              <div className="col-12  justify-content-center">
                <TextField
                  fullWidth
                  className="mb-1 mt-3 w-100"
                  type="text"
                  label="Salary"
                  name="salary"
                  value={inputData.salary}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.salary
                  ? "*Please Enter  Salary Value"
                  : ""}
              </span>
              <div className="col-12  justify-content-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    type="date"
                    className="w-100 mt-3"
                    onChange={(newValue) =>
                      setInputData({
                        ...inputData,
                        publicationDate: moment(newValue.$d).format(
                          "DD-MM-YYYY"
                        ),
                      })
                    }
                    label="Expired date"
                  />
                </LocalizationProvider>
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.publicationDate
                  ? "*Please Select Date"
                  : ""}
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  fullWidth
                  className="mb-1 mt-3 w-100"
                  type="text"
                  name="location"
                  value={inputData.location}
                  onChange={submitInputdata}
                  label="Address"
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.location
                  ? "*Please Enter Your Location"
                  : ""}
              </span>
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  className="mb-1 mt-3 w-100"
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4.5}
                  type="file"
                  name="description"
                  value={inputData.description}
                  onChange={submitInputdata}
                  fullWidth
                />
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.description
                  ? "*Please Enter Description  "
                  : ""}
              </span>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center mt-2">
            <button
              type="button"
              className="global_button mb-3"
              style={{ borderRadius: "5px" }}
              onClick={submitAllData}
            >
              Submit
              <ArrowRightAltIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddJobs;
