import { ArrowBack } from "@mui/icons-material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function JobsDetails() {
  const location = useLocation();
  const datat = location?.state?.data[0];
  console.log(datat);
  console.log(datat.key_qualification);
  const navigate = useNavigate()
  return (
    <div className="container">
      <div className="client_details">
       <ArrowBack className="mb-3" style={{cursor:"pointer"}} onClick={()=>{navigate('/Admin/Job-Posting')}} />
        <h2>Job Details</h2>
        <div className="card border-0">
          <div className="card-body">
            <h5 className="mb-3">Basic Information</h5>
            <div className="row">
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Experience</p>
                  <h6>{datat?.Experience}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Number of Emp Needed</p>
                  <h6>{datat?.Number_of_emp_needed}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Company Industry</p>
                  <h6>{datat?.company_Industry}</h6>
                </div>
              </div>
              {/* <div className="col-md-3">
                <div className="inner_section">
                  <p>Company Address</p>
                  <h6>{datat?.company_address}</h6>
                </div>
              </div> */}
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Company Name</p>
                  <h6>{datat?.company_name}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Employee Email</p>
                  <h6>{datat?.employee_email}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Skills</p>
                  <h6>{datat?.skills}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Qualification</p>
                  <h6>{datat?.qualification}</h6>
                </div>
              </div>
              {/* <div className="col-md-3">
                <div className="inner_section">
                  <p>Skills</p>
                  {datat?.key_qualification?.map((item, index) => {
                    console.log(item);
                    return (
                      <>
                        <h6>{item}</h6>
                      </>
                    );
                  })}
                </div>
              </div> */}
              {/* <div className="col-md-3">
                <div className="inner_section">
                  <p>HR Email</p>
                    <h6>{datat?.hr_email}</h6>
                </div>
              </div> */}
            </div>
            <div className="row">
              {/* <div className="col-md-3">
                <div className="inner_section">
                  <p>Job Post</p>
                  <h6>{datat?.job_schedule}</h6>
                </div>
              </div> */}
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Job Title</p>
                  <h6>{datat?.job_title}</h6>
                </div>
              </div>
              {/* <div className="col-md-3">
                <div className="inner_section">
                  <p>Job Type</p>
                  <h6>{datat?.job_type}</h6>
                </div>
              </div> */}
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Phone No</p>
                  <h6>{datat?.phone_no}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Location</p>
                  <h6>{datat?.location?.join(",")}</h6>
                </div>
              </div>
            </div>
            
            {/* <div className="row">
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Hiring Manager Email</p>
                  <h6>{datat.hiring_manager_email}</h6>
                </div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-6">
                <div className="inner_section">
                  <p>Job Description</p>
                  <h6 dangerouslySetInnerHTML={{ __html: datat?.job_Description }} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="inner_section">
                  <p>Job Responsibility</p>
                  <h6 dangerouslySetInnerHTML={{ __html: datat?.job_Responsibility }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
