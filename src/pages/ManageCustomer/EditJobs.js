import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddJobs.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { baseUrl } from "../../features/Api/BaseUrl";
import Swal from "sweetalert2";

function EditJobs() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [values, setValues] = useState([]);
  const [jobErr, setJobErr] = useState(false);

  const [age, setAge] = useState("");
  const adminId = localStorage.getItem("id");
  const location = useLocation();
  console.log(location);

  console.log(adminId);

  const [inputData, setInputData] = useState({
    jobTitle: "",
    location: "",
    description: "",
    salary: "",
    publicationDate: null, // Initialize with null for the DatePicker
  });

  const updateData = () => {
    const selectedUser = location.state.response.filter((item) => {
      return item._id === location.state.id;
    });

    const getData = selectedUser[0];

    setInputData({
      jobTitle: getData.job_Heading || "",
      location: getData.company_Address || "",
      description: getData.job_Desciption || "",
      salary: getData.Salary || "",
      publicationDate: dayjs(getData.job_expired_Date) || null,
    });
  };
  console.log(inputData.publicationDate);
  useEffect(() => {
    updateData();

    console.log(inputData);
  }, []);
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
      // Display an error message if any field is empty
      setJobErr(true);
      return;
    }

    // Perform additional validation if needed

    // If all validations pass, proceed with the API call
    axios
      .put(`${baseUrl}updateJob/${location.state.id}`, {
        job_Heading: inputData?.jobTitle,
        company_Address: inputData?.location,
        job_Description: inputData?.description,
        Salary: inputData?.salary,
        job_expired_Date: inputData?.publicationDate,
      })
      .then((response) => {
        console.log(response);
        Swal.fire("Success", "job update successfully!", "success");
        navigate("/admin/jobs-list");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    console.log("GGGGGgg", event);
    setAge(event.target.value);
  };
  return (
    <>
      <div className="container">
        <div className="header-div">
          <span>
            <i class="fas fa-users"></i>
          </span>
          <span>Edit job</span>
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
                    className="w-100 mt-3"
                    value={inputData.publicationDate}
                    onChange={(newValue) =>
                      setInputData({
                        ...inputData,
                        publicationDate: newValue,
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
              Update
              <ArrowRightAltIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditJobs;
