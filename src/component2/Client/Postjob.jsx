import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { baseUrl } from "../../features/Api/BaseUrl";
import "react-toastify/dist/ReactToastify.css";
import OutlinedInput from "@mui/material/OutlinedInput";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function Postjob() {
  const [data, setData] = useState([]);
  const [dataapi, setDataapi] = useState({});
  const [emailError, setEmailError] = useState("");
  const [emailError1, setEmailError1] = useState("");
  const [formData, setFormData] = useState({
    job_title: "",
    job_type: "",
    job_schedule: "",
    Minimum_pay: "",
    Maximum_pay: "",
    Rate: "",
    Qualification:" ",
    skill: " ",
    Number_of_emp_needed: "",
    requirement_timeline: "",
    startDate: "",
    endDate: "",
    Experience: "",
    sub_job_title: "",
    company_address: "",
    template_type: "",
    job_Description:" ",
    psychometric_Test: "",
    hr_email: "",
    hiring_manager_email: "",
    isPsychometricTest: "",
    job_Responsibility:"",
  });
  const names = [
   "Western Area Urban",
   "Western Area Rural",
   "Bombali",  
   "Bonthe", 
   "Kailahun" ,
   "Kambia", 
   "Kenema" ,
   "Koinadugu" ,
   "Kono" ,
   "Moyamba",
   "Port Loko",
   "Pujehun",
   "Tonkolili", 
   "Bo",
   "Karene",
   "Falaba",
];
  // const [personName1, setPersonName1] = React.useState({});

  // const handleChange1 = (event) => {
  //   const {
  //     target: { value },
  //   } = event;

  //   if (typeof value === "string") {
  //     setPersonName1({ 0: value });
  //   } else {
  //     // Create an object with index as keys
  //     const formattedArray = value.reduce((acc, item, index) => {
  //       acc[index] = item;
  //       return acc;
  //     }, {});
  //     setPersonName1(formattedArray);
  //   }
  // };

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const [inputdata, setInputdata] = useState({});
  const [ismodalOpen, setIsmodalOpen] = useState(false);
  
  const [jobImage, setJobImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const datauser = location?.state?.userid;
  useEffect(() => {
    getdata();
  }, []);
  const getdata = () => {
    axios
      .get(`${baseUrl}all_main_jobTitle`)
      .then((response) => {
        setData(response.data.details);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    if (name === "hr_email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError(""); // Clear error if email is valid
      }
    }
    if (name === "hiring_manager_email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError1("Please enter a valid email address.");
      } else {
        setEmailError1(""); // Clear error if email is valid
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlekey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  };
  const handleImageChange = (event) => {
    setJobImage(event.target.files[0]);
  };
  // const handlegetdatat = (jobTitle) => {
  //   axios
  //     .post(`${baseUrl}getJd`, { jobTitle })
  //     .then((response) => {
  //       setDataapi(response.data.Details);
  //       setIsmodalOpen(true);
  //       getskills(jobTitle);
  //     })
  //     .catch((error) => {
  //       toast.error(error.response.data.message);
  //       setTimeout(() => {
  //         navigate("/Admin/Job-Description-Database");
  //       }, 1500);
  //     });
  // };
  // const getskills = (jobTitle) => {
  //   axios
  //     .post(`${baseUrl}getJs`, {jobTitle} )
  //     .then((response) => {
  //       setSkill_type(response.data.Details);
  //       const options = response.data.Details.map((skill) => ({
  //         label: skill.skill_Name,
  //         value: skill.skill_Name,
  //       }));
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       toast.error(error.response.data.message);
  //     });
  // };
  const handleDescriptionChange12 = (event, editor) => {
    const newData = editor.getData();
    setInputdata((prevState) => ({
      ...prevState,
      job_Description: newData,
      Responsibility: newData,
    }));
  };
  const today = new Date().toISOString().split("T")[0];
  const handleSubmit = () => {
    const locationtype = Object.values(personName);
    // const skillsArray1 = Object.values(personName1);
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    if (endDate < startDate) {
      toast.error("End Date cannot be earlier than Start Date.");
      return;
    }
    // const minimumPay = parseFloat(formData.Minimum_pay);
    // const maximumPay = parseFloat(formData.Maximum_pay);
    // if (isNaN(minimumPay) || isNaN(maximumPay)) {
    //   toast.error(
    //     "Please enter valid numerical values for Minimum Pay and Maximum Pay."
    //   );
    //   return;
    // }
    // if (maximumPay <= minimumPay) {
    //   toast.error("Maximum Pay should be greater than Minimum Pay.");
    //   return;
    // }
    // console.log({
    //   academic_qualification: JSON.stringify(personName1)
    // });
    const datatype ={
      emp_Id:datauser,
      qualification:formData.Qualification,
      skills:formData.skill,
      location:locationtype,
      template_type:"1",
      job_title: formData.job_title,
      Number_of_emp_needed:formData.Number_of_emp_needed,
      Experience:formData.Experience,
      startDate:startDate,
      endDate:endDate,
      job_Description:formData.job_Description,
      job_Responsibility:formData.job_Responsibility

    }
    // const formDataToSend = new FormData();
    // formDataToSend.append("emp_Id", datauser);
    // formDataToSend.append("acadmic_qualification", formData.Qualification);
    // formDataToSend.append("skills", formData.skill);
    // formDataToSend.append("location", locationtype ); 
    // formDataToSend.append("template_type", "1")
    // Object.keys(formData).forEach((key) => {
    //   formDataToSend.append(key, formData[key]);
    // });
    // formDataToSend.append(
    //   "job_Description",
    //   inputdata.job_Description || dataapi.job_Description
    // );
    // formDataToSend.append(
    //   "job_Responsibility",
    //   inputdata.Responsibility || dataapi.Responsibilities
    // );
    // if (jobImage) {
    //   formDataToSend.append("job_image", jobImage);
    // }
    // console.log(formDataToSend);
    axios
      .post(`${baseUrl}postJob/${datauser}`, datatype, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        setTimeout(() => {
          if (response.status === 200) {
            navigate("/Admin/Job-Posting");
          }
        }, [1000]);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  return (
    <>
      <Modal open={ismodalOpen} onClose={() => setIsmodalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            overflow: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 750,
            height: 700,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="mb-5">
            <h4>Job Description</h4>
            <CKEditor
              editor={ClassicEditor}
              data={dataapi.job_Description}
              onChange={handleDescriptionChange12}
              config={{
                placeholder: "Enter your description here...",
              }}
            />
          </div>
          <div className="mb-5">
            <h4>Job Responsibilities</h4>
            <CKEditor
              editor={ClassicEditor}
              data={dataapi.Responsibilities}
              onChange={handleDescriptionChange12}
              config={{
                placeholder: "Enter your responsibilities here...",
              }}
            />
            <Button
              onClick={() => setIsmodalOpen(false)}
              className=" w-100 px-3 py-2 rounded mt-3 fw-bold"
              style={{ color: "white", backgroundColor: "#dab95c" }}
            >
              Add Description
            </Button>
          </div>
        </Box>
      </Modal>
      <div>
        <FormControl className="mb-3 mt-3" sx={{ width: "100%" }}>
          <InputLabel id="job-title-label">Job Title</InputLabel>
          <Select
            labelId="job-title-label"
            id="job-title-dropdown"
            value={formData.job_title}
            onChange={handleInputChange}
            name="job_title"
            fullWidth
            label="Job Title"
          >
            <MenuItem value="">
              <em>Select Job Title</em>
            </MenuItem>
            {data.map((item, index) => (
              <MenuItem
                key={index}
                value={item.Main_jobTitle}
              // onClick={() => handlegetdatat(item.Main_jobTitle)}
              >
                {item.Main_jobTitle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Job Responsibility"
          className="mb-3 w-100"
          name="job_Responsibility"
          value={formData.job_Responsibility}
          onChange={handleInputChange}
          multiline
          maxRows={6}
        />
        </div>
        <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          className="mb-3 w-100"
          name="job_Description"
          value={formData.job_Description}
          onChange={handleInputChange}
          multiline
          maxRows={6}
        />
        </div>
        <TextField
          fullWidth
          className="mb-3 w-100"
          label="Skill"
          name="skill"
          value={formData.skill}
          type="text"
          
          onChange={handleInputChange}
        />
        {/* <div>
          <FormControl sx={{ width: "100%" }} className="mb-3">
            <InputLabel id="demo-multiple-checkbox-label">
              Key Qualification
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox-label"
              multiple
              value={Object.values(personName)}
              onChange={handleChange}
              input={<OutlinedInput label="Key Qualification" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {skill_type.map((name) => (
                <MenuItem key={name._id} value={name.skill_Name}>
                  <Checkbox
                    checked={
                      Object.values(personName).indexOf(name.skill_Name) > -1
                    }
                  />
                  <ListItemText primary={name.skill_Name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div> */}
        {/* <TextField
          fullWidth
          className="mb-1 mb-3 w-100"
          label="Maximum Pay"
          name="Maximum_pay"
          type="text"
          autoComplete="off"
          onKeyPress={handlekey}
          onChange={handleInputChange}
          size="normal"
        /> */}
        <TextField
          fullWidth
          className="mb-3 w-100"
          label="Academic Qualification"
          name="Qualification"
          type="text"
          autoComplete="off"
          onChange={handleInputChange}
          size="normal"
        />
        {/* <FormControl sx={{ width: "100%" }} className="mb-3">
          <InputLabel id="demo-multiple-checkbox-label">
            Academic Qualification
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={Object.values(personName1)}
            onChange={handleChange1}
            input={<OutlinedInput label="Academic Qualification" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={Object.values(personName1).includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
          <FormControl sx={{ width: "100%" }} className="mb-3">
            <InputLabel id="demo-multiple-checkbox-label">
            location
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox-label"
              multiple
              value={Object.values(personName)}
              onChange={handleChange}
              input={<OutlinedInput label="location" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
            </Select>
          </FormControl>
        {/* <FormControl className="mb-3" sx={{ width: "100%" }}>
          <InputLabel id="dropdown-label">Location</InputLabel>
          <Select
            labelId="dropdown-label"
            id="dropdown"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            label="Location"
          >
            <MenuItem value="">
              <em>Select Location</em>
            </MenuItem>
            <MenuItem value="Western Area Urban">Western Area Urban</MenuItem>
            <MenuItem value="Western Area Rural">Western Area Rural</MenuItem>
            <MenuItem value="Bombali">Bombali</MenuItem>
            <MenuItem value="Bonthe">Bonthe</MenuItem>
            <MenuItem value="Kailahun">Kailahun</MenuItem>
            <MenuItem value="Kambia">Kambia</MenuItem>
            <MenuItem value="Kenema">Kenema</MenuItem>
            <MenuItem value="Koinadugu">Koinadugu</MenuItem>
            <MenuItem value="Kono">Kono</MenuItem>
            <MenuItem value="Moyamba">Moyamba</MenuItem>
            <MenuItem value="Port Loko">Port Loko</MenuItem>
            <MenuItem value="Pujehun">Pujehun</MenuItem>
            <MenuItem value="Tonkolili">Tonkolili</MenuItem>
            <MenuItem value="Bo">Bo</MenuItem>
            <MenuItem value="Karene">Karene</MenuItem>
            <MenuItem value="Falaba">Falaba</MenuItem>
          </Select>
        </FormControl> */}
        {/* <FormControl className="mb-3" sx={{ width: "100%" }}>
          <InputLabel id="Rate">Rate</InputLabel>
          <Select
            labelId="Rate"
            label="Rate"
            id="dropdown"
            name="Rate"
            value={formData.Rate}
            onChange={handleInputChange}
          >
            <MenuItem value="">
              <em>Select Rate</em>
            </MenuItem>
            <MenuItem value="per Month">Per Month</MenuItem>
            <MenuItem value="per Year">Per Year</MenuItem>
            <MenuItem value="per Week">Per Week</MenuItem>
            <MenuItem value="per Day">Per Day</MenuItem>
            <MenuItem value="per Hour">Per Hour</MenuItem>
          </Select>
        </FormControl> */}
        {/* <FormControl className="mb-3" sx={{ width: "100%" }}>
          <InputLabel id="selectjobpost">Select Job Type</InputLabel>
          <Select
            labelId="selectjobpost"
            id="dropdown"
            label="Select Job Post"
            name="job_type"
            value={formData.job_type}
            onChange={handleInputChange}
          >
            <MenuItem value="">
              <em>Select Type</em>
            </MenuItem>
            <MenuItem value="Full-Time">Full-Time</MenuItem>
            <MenuItem value="Part-Time">Part-Time</MenuItem>
            <MenuItem value="Temporary">Temporary</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
            <MenuItem value="Commission">Commission</MenuItem>
            <MenuItem value="Fresher">Fresher</MenuItem>
            <MenuItem value="Volunteer">Volunteer</MenuItem>
            <MenuItem value="Walk-In">Walk-In</MenuItem>
          </Select>
        </FormControl> */}
        {/* <FormControl className="mb-3" sx={{ width: "100%" }}>
          <InputLabel id="JobType">Job Schedule</InputLabel>
          <Select
            labelId="JobType"
            id="dropdown"
            label="Job Schedule"
            name="job_schedule"
            value={formData.job_schedule}
            onChange={handleInputChange}
          >
            <MenuItem value="">
              <em>Select Schedule</em>
            </MenuItem>
            <MenuItem value="Day Shift">Day Shift</MenuItem>
            <MenuItem value="Morning Shift">Morning Shift</MenuItem>
            <MenuItem value="Rotational Shift">Rotational Shift</MenuItem>
            <MenuItem value="Night Shift">Night Shift</MenuItem>
            <MenuItem value="Monday to Friday">Monday to Friday</MenuItem>
            <MenuItem value="Evening Shift">Evening Shift</MenuItem>
            <MenuItem value="US Shift">US Shift</MenuItem>
            <MenuItem value="UK Shift">UK Shift</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl> */}
        {/* <TextField
          fullWidth
          className="mb-3 w-100"
          label="Company Address"
          name="company_address"
          type="text"
          autoComplete="off"
          onChange={handleInputChange}
          size="normal"
        /> */}
        {/* <TextField
          fullWidth
          className="mb-3 w-100"
          label="HR Email"
          name="hr_email"
          type="email"
          autoComplete="off"
          onChange={handleInputChange}
          size="normal"
        /> */}

        {/* {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <TextField
          fullWidth
          className="mb-3 w-100"
          label="Hiring Manager Email"
          name="hiring_manager_email"
          type="email"
          autoComplete="off"
          onChange={handleInputChange}
          size="normal"
        /> */}
        {emailError1 && <p style={{ color: "red" }}>{emailError1}</p>}
        <TextField
          fullWidth
          className="mb-3 w-100"
          label="Number of Emp Needed"
          name="Number_of_emp_needed"
          type="text"
          onKeyPress={handlekey}
          autoComplete="off"
          onChange={handleInputChange}
          size="normal"
        /> 
         <TextField
          fullWidth
          className="mb-1 mb-3 w-100"
          label="Experience"
          name="Experience"
          value={formData.Experience}
          type="text"
          autoComplete="off"
          onKeyPress={handlekey}
          onChange={handleInputChange}
          size="normal"
        />
        {/* <FormControl className="mb-3" sx={{ width: "100%" }}>
          <InputLabel id="Experience">Experience</InputLabel>
          <Select
            labelId="Experience"
            id="dropdown"
            label="Experience"
            name="Experience"
            value={formData.Experience}
            onChange={handleInputChange}
          >
            <MenuItem value="">
              <em>Select Experience</em>
            </MenuItem>
            <MenuItem value="1">1 yrs</MenuItem>
            <MenuItem value="2">2 yrs</MenuItem>
            <MenuItem value="3">3 yrs</MenuItem>
            <MenuItem value="4">4 yrs</MenuItem>
            <MenuItem value="5">5 yrs</MenuItem>
            <MenuItem value="6">6 yrs</MenuItem>
            <MenuItem value="7">7 yrs</MenuItem>
            <MenuItem value="8">8 yrs</MenuItem>
            <MenuItem value="9">9 yrs</MenuItem>
            <MenuItem value="10">10 yrs</MenuItem>
          </Select>
        </FormControl> */}
        {/* <FormControl className="mb-3" sx={{ width: "100%" }}>
          <InputLabel id="Templatetype">Template Type</InputLabel>
          <Select
            labelId="Templatetype"
            label="Template Type"
            id="dropdown"
            name="template_type"
            value={formData.template_type}
            onChange={handleInputChange}
          >
            <MenuItem value="">
              <em>Select Template Type</em>
            </MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
          </Select>
        </FormControl> */}
        {/* <TextField
          fullWidth
          className="mb-3 mb-3 w-100"
          type="file"
          name="job_image"
          onChange={handleImageChange}
        /> */}
        {/* <TextField
          fullWidth
          className="mb-3 w-100"
          label="Requirement Timeline"
          name="requirement_timeline"
          type="text"
          onKeyPress={handlekey}
          autoComplete="off"
          onChange={handleInputChange}
          size="normal"
        /> */}
        <TextField
          fullWidth
          className="mb-3 w-100"
          label="Start Date"
          name="startDate"
          type="date"
          autoComplete="off"
          onChange={handleInputChange}
          size="normal"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputProps: {
              min: today,
              onKeyDown: (e) => e.preventDefault(),
            },
          }}
        />
        <TextField
          fullWidth
          className="mb-3 w-100"
          label="End Date"
          name="endDate"
          type="date"
          autoComplete="off"
          onChange={handleInputChange}
          size="normal"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputProps: {
              min: minDate,
              onKeyDown: (e) => e.preventDefault(),
            },
          }}
        />
        <Button
          onClick={handleSubmit}
          className="mt-3 mb-5 px-3 py-2 rounded"
          style={{ color: "white", backgroundColor: "#dab95c" }}
        >
          Post Job
        </Button>
      </div>
      <ToastContainer />
    </>
  );
}
