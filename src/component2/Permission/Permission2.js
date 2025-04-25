import { ArrowBack } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../../features/Api/BaseUrl";
import axios from "axios";
import "./Permission.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Permission2() {
  const location = useLocation();
  const datat = location?.state?.data[0];
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}get_added_permission_for_staff/${datat?.staff_id}`
      );
      setData(response.data.permissions);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePermissionChange = (endpoint, value) => {
    setPermissions((prevPermissions) => {
      const existing = prevPermissions.find((p) => p.endpoint === endpoint);
      if (existing) {
        return prevPermissions.map((p) =>
          p.endpoint === endpoint ? { ...p, allow: value } : p
        );
      } else {
        return [...prevPermissions, { endpoint, allow: value }];
      }
    });
  };

  const handleSubmit = async () => {
    const payload = {
      role: datat?.role,
      staff_id: datat?.staff_id,
      permissions,
    };

    try {
      const response = await fetch(
        "https://sisccltd.com/hrsolutions/api/updatePermission",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Permissions updated successfully!");
        navigate("/Admin/Get-Staff");
      } else {
        const result = await response.json();
        alert(`Failed to update permissions: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
      alert("An error occurred while updating permissions.");
    }
  };

  return (
    <div className="container">
      <div className="client_details">
        <ArrowBack
          className="mb-3"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/Admin/Get-Staff")}
        />
        <h2>Staff Detail</h2>
        <div className="card border-0">
          <div className="card-body">
            <h5 className="mb-3">Basic Information</h5>
            <div className="row">
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Name</p>
                  <h6>{datat?.name}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Phone</p>
                  <h6>{datat?.phone_no}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Role</p>
                  <h6>{datat?.role}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="inner_section">
                  <p>Staff ID</p>
                  <h6>{datat?.staff_id}</h6>
                </div>
              </div>
              <div className="permissions-container">
                <label className="permissions-title">
                  Permission<span>*</span>
                </label>
                <ul className="permissions-list">
                  {/* Staff Section */}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("staff")}
                      >
                        {expandedSections.staff ? "-" : "+"}
                      </button>
                      <label>Staff</label>
                    </div>
                    {expandedSections.staff && (
                      <ul>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="staff-view"
                            defaultChecked={Array.isArray(data) && data?.includes("/getStaff_Details")}
                            onChange={(e) => {
                              const checkedValue = e.target.checked ? 1 : 0;
                              handlePermissionChange("/getStaff_Details", checkedValue);
                            }}
                          />
                          <label htmlFor="staff-view">View Detail</label>
                        </li> */}

                        <li>
                          <input
                            type="checkbox"
                            id="staff-add"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/addStaff",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) && data.includes("/addStaff")
                            }
                          />
                          <label htmlFor="staff-add">Add</label>
                        </li>

                        <li>
                          <input
                            type="checkbox"
                            id="staff-update"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/updatestaff",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/updatestaff")
                            }
                          />
                          <label htmlFor="staff-update">Update Staff</label>
                        </li>

                        <li>
                          <input
                            type="checkbox"
                            id="staff-change-password"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/staff_ChangePassword",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/staff_ChangePassword")
                            }
                          />
                          <label htmlFor="staff-change-password">
                            Staff Change Password
                          </label>
                        </li>
                        {/* Add more staff permissions here */}
                      </ul>
                    )}
                  </li>
                  {/* Client Section */}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("client")}
                      >
                        {expandedSections.client ? "-" : "+"}
                      </button>
                      <label>Client</label>
                    </div>
                    {expandedSections.client && (
                      <ul>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/getAllEmployees", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/getAllEmployees")}
                          />
                          <label htmlFor="client-getAllEmp">Get All Client</label>
                        </li>  */}
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/getAllEmp_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/getAllEmp_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">View Client</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/active_inactive_emp",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/active_inactive_emp")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Active inactive Client
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/send_notification_to_client",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/send_notification_to_client")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Send Notification To Client
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/sendNotification_to_allClient",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/sendNotification_to_allClient")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Send Notification to all Client
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/send_notification",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/send_notification")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            send notification
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/active_inactive_job",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/active_inactive_job")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Active Inactive Job
                          </label>
                        </li>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/getEmployeeDetails", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/getEmployeeDetails")}
                          />
                          <label htmlFor="client-getAllEmp">Get Client Details</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/updateEmp", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/updateEmp")}
                          />
                          <label htmlFor="client-getAllEmp">Update Client</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/emp_ChangePassword", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/emp_ChangePassword")}
                          />
                          <label htmlFor="client-getAllEmp">Emp ChangePassword</label>
                        </li> */}

                        {/* Add more client permissions here */}
                      </ul>
                    )}
                  </li>
                  {/* Candidate */}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("Candidate")}
                      >
                        {expandedSections.Candidate ? "-" : "+"}
                      </button>
                      <label>Candidate</label>
                    </div>
                    {expandedSections.Candidate && (
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/getAllFemale_Candidate_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/getAllFemale_Candidate_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Elite Female Talent Pool
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_upload_section_candidates",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_upload_section_candidates")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Upload Resume
                          </label>
                        </li>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/candidate_recruitment_process", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/candidate_recruitment_process")}
                          />
                          <label htmlFor="client-getAllEmp">Candidate Recruitment Process</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/new_carrer_advice", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/new_carrer_advice")}
                          />
                          <label htmlFor="client-getAllEmp">Career Advice Page</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/deleteCandidate", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/deleteCandidate")}
                          />
                          <label htmlFor="client-getAllEmp">Delete Candidate</label>
                        </li> */}

                        {/* Add more Candidate permissions here */}
                      </ul>
                    )}
                  </li>
                  {/* policy & term */}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("Policy")}
                      >
                        {expandedSections.Policy ? "-" : "+"}
                      </button>
                      <label>Policy & term</label>
                    </div>
                    {expandedSections.Policy && (
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_admin_privacy_policy_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_admin_privacy_policy_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View Privacy Policy
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/create_privacy_policy",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/create_privacy_policy")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Create Privacy Policy
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_admin_term_condition_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_admin_term_condition_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View term condition
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/create_term_condition",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/create_term_condition")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            create term condition
                          </label>
                        </li>

                        {/* Add more policy & term permissions here */}
                      </ul>
                    )}
                  </li>
                  {/* servise */}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("servise")}
                      >
                        {expandedSections.servise ? "-" : "+"}
                      </button>
                      <label>servise</label>
                    </div>
                    {expandedSections.servise && (
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/create_services",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/create_services")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View Fixit Finder
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/create_services",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/create_services")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Fixit Finder</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/getHr_consultancy_Details_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/getHr_consultancy_Details_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            view Hr consultancy
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_Hr_consultancy",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_Hr_consultancy")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Hr consultancy
                          </label>
                        </li>

                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_training_development_Details_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes(
                                "/get_training_development_Details_admin"
                              )
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View Learning and Development
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_training_developement",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_training_developement")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Learning and Development
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_hr_teleconsultation_Details_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes(
                                "/get_hr_teleconsultation_Details_admin"
                              )
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View Hr Teleconsultancy
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_Hr_teleconsultation",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_Hr_teleconsultation")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add HR Teleconsultancy
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_cms_elite_talent_pool_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_cms_elite_talent_pool_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View Elite Female Talent Pool
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_elite_talent_pool",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_elite_talent_pool")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Elite Female Talent Pool
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_acadmic_credentials_verifier_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes(
                                "/get_acadmic_credentials_verifier_admin"
                              )
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            view Academic Credentials Verifier
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_acadmic_credentials_verifier",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_acadmic_credentials_verifier")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Academic Credentials Verifier
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/generate_sampleFile",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/generate_sampleFile")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            generate sampleFile (Fixit Finder)
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/import_file",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/import_file")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            import file (Fixit Finder)
                          </label>
                        </li>

                        {/* Add more policy & term permissions here */}
                      </ul>
                    )}
                  </li>
                  {/* fAQ */}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("fAQ")}
                      >
                        {expandedSections.fAQ ? "-" : "+"}
                      </button>
                      <label>contact US</label>
                    </div>
                    {expandedSections.fAQ && (
                      <ul>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/createFAQ", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/createFAQ")}
                          />
                          <label htmlFor="client-getAllEmp">createFAQ</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/DeleteFAQ", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/DeleteFAQ")}
                          />
                          <label htmlFor="client-getAllEmp">DeleteFAQ</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/cms_post_your_job_section", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/cms_post_your_job_section")}
                          />
                          <label htmlFor="client-getAllEmp">Get contactUS</label>
                        </li> */}
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/DeleteContactUS",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/DeleteContactUS")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Delete ContactUS
                          </label>
                        </li>

                        {/* Add more policy & term permissions here */}
                      </ul>
                    )}
                  </li>
                  {/* Cms page */}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("Cmspage")}
                      >
                        {expandedSections.Cmspage ? "-" : "+"}
                      </button>
                      <label>Cms Page</label>
                    </div>
                    {expandedSections.Cmspage && (
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/getAll_testimonial_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/getAll_testimonial_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View testimonial
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/update_testimonial",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/update_testimonial")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Edit testimonial
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/create_testimonial",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/create_testimonial")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add testimonial
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/delete_testimonial",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/delete_testimonial")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Delete testimonial
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/getJobs_posted_procedure_section1_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes(
                                "/getJobs_posted_procedure_section1_admin"
                              )
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            view section1
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_job_posting_section1",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_job_posting_section1")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Add section1</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_cms_need_any_job_section_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes(
                                "/get_cms_need_any_job_section_admin"
                              )
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            view section2
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_need_any_job_section",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_need_any_job_section")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Add section2</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_cms_need_any_job_section_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes(
                                "/get_cms_need_any_job_section_admin"
                              )
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View Section3
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_post_your_job_section",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_contactUS")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Add Section3</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_cms_job_market_data_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_cms_job_market_data_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View section4
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_job_market_data_section",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_job_market_data_section")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Add Section4</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_cms_footer_content_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_cms_footer_content_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Footer Content
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_blog_section1",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_blog_section1")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            cms_blog_section1
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/getBlogDetails_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/getBlogDetails_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">View Blog</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cmsBlog_section2",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cmsBlog_section2")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Add Blog</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/update_cms_blog",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/update_cms_blog")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            update_cms_blog
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/deleteBlog",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/deleteBlog")
                            }
                          />
                          <label htmlFor="client-getAllEmp">deleteBlog</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/getcms_headquarter_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/getcms_headquarter_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            view cms for location
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cmsHeadquarter",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cmsHeadquarter")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add cms for location
                          </label>
                        </li>

                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_recruitment_selection",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_recruitment_selection")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            cms_recruitment_selection
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_employee_outsourcing",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_employee_outsourcing")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            cms_employee_outsourcing
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_ourMission_details_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_ourMission_details_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View cms our mission
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_our_mission",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_our_mission")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add cms our mission
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_ourVission_details_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_ourVission_details_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View our vission
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_our_vission",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_our_vission")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add our vission
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_ourCommitment_details_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_ourCommitment_details_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View our commitment
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_our_commitment",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_our_commitment")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add our commitment
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_started_todayDetails_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_started_todayDetails_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View get started today
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_get_started_today",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_get_started_today")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            {" "}
                            Add get started today
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_aboutUS_details_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_aboutUS_details_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View cms aboutUs
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_aboutUs",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_aboutUs")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add cms aboutUs
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/getDetails_why_choose_us_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/getDetails_why_choose_us_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View Why Choose Us
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_why_choose_us",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_why_choose_us")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add Why Choose Us
                          </label>
                        </li>

                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_footer_content",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_footer_content")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            cms_footer_content
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_cms_labour_tool_details_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes(
                                "/get_cms_labour_tool_details_admin"
                              )
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View Labour Tool
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_labour_tool",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_labour_tool")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add labour tool
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_online_courses",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/cms_online_courses")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            cms_online_courses
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_cms_Home_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_cms_Home_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            view cms Home
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/cms_Home",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) && data.includes("/cms_Home")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Add cms Home</label>
                        </li>

                        {/* Add more policy & term permissions here */}
                      </ul>
                    )}
                  </li>
                  {/* newsLetter&carrer_advice */}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("newsLetter")}
                      >
                        {expandedSections.newsLetter ? "-" : "+"}
                      </button>
                      <label>News Letter & Carrer Advice</label>
                    </div>
                    {expandedSections.newsLetter && (
                      <ul>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/newsLetter", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/newsLetter")}
                          />
                          <label htmlFor="client-getAllEmp">newsLetter</label>
                        </li> */}
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/getAll_newsLetter",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/getAll_newsLetter")
                            }
                          />
                          <label htmlFor="client-getAllEmp">News Letter</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/all_carrer_details_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/all_carrer_details_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View carrer advice
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/new_carrer_advice",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/new_carrer_advice")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            ADD carrer advice
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/all_carrer_details",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/all_carrer_details")
                            }
                          />
                          <label htmlFor="client-getAllEmp">View carrer</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/delete_carrer_advice",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/delete_carrer_advice")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Delete carrer advice
                          </label>
                        </li>

                        {/* Add more Candidate permissions here */}
                      </ul>
                    )}
                  </li>
                  {/*file */}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("file")}
                      >
                        {expandedSections.file ? "-" : "+"}
                      </button>
                      <label>Job Skill</label>
                    </div>
                    {expandedSections.file && (
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/alljobSkills_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/alljobSkills_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View job Skills
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/addJob_skills",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/addJob_skills")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add Job skills
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/alljobSkills",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/alljobSkills")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            All jobSkills
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/deletejobskill",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/deletejobskill")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Delete jobskill
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/getJs",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) && data.includes("/getJs")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            get Job Skill
                          </label>
                        </li>

                        {/* Add more Candidate permissions here */}
                      </ul>
                    )}
                  </li>
                  {/*online_course */}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("online_course")}
                      >
                        {expandedSections.online_course ? "-" : "+"}
                      </button>
                      <label>Online course</label>
                    </div>
                    {expandedSections.online_course && (
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/all_enrolled_user",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/all_enrolled_user")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            all enrolled user
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/update_online_course",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/update_online_course")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            update online course
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/delete_course",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/delete_course")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Delete course
                          </label>
                        </li>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/all_enq_of_courses", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/all_enq_of_courses")}
                          />
                          <label htmlFor="client-getAllEmp">all_enq_of_courses</label>
                        </li> */}
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/course_quiz_test",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/course_quiz_test")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            course quiz[First Quiz]
                          </label>
                        </li>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/get_quiz_test_of_course", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/get_quiz_test_of_course")}
                          />
                          <label htmlFor="client-getAllEmp">View quiz test of course</label>
                        </li> */}
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/topic_quiz",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/topic_quiz")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            view topic quiz
                          </label>
                        </li>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/course_quiz", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/course_quiz")}
                          />
                          <label htmlFor="client-getAllEmp">course_quiz</label>
                        </li> */}

                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/addQuestion_in_Quiz_test",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/addQuestion_in_Quiz_test")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            add Question IN quiz (course --> topic --> quiz -->
                            question)
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/delete_question_in_test",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/delete_question_in_test")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            delete question in Quiz(course --> topic --> quiz
                            --> question)
                          </label>
                        </li>

                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/delete_test", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/delete_test")}
                          />
                          <label htmlFor="client-getAllEmp">delete_test</label>
                        </li> */}

                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/add_topics",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/add_topics")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add topics(course --> topic)
                          </label>
                        </li>

                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/delete_course_topic",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/delete_course_topic")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Delete course Topic
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/all_topics_of_course",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/all_topics_of_course")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View Topics of course
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/edit_topic",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/edit_topic")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Edit topic</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/update_question_of_quiz",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/update_question_of_quiz")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Update question of quiz (course --> topic --> quiz
                            --> question)
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_transaction",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_transaction")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View Course transaction
                          </label>
                        </li>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/get_all_courses_details", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/get_all_courses_details")}
                          />
                          <label htmlFor="client-getAllEmp">get_all_courses_details</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/enroll_user_course_topic_quiz", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/enroll_user_course_topic_quiz")}
                          />
                          <label htmlFor="client-getAllEmp">enroll_user_course_topic_quiz</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/update_topic_status", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/update_topic_status")}
                          />
                          <label htmlFor="client-getAllEmp">update_topic_status</label>
                        </li> */}

                        {/* Add more Candidate permissions here */}
                      </ul>
                    )}
                  </li>
                  {/*emailtemplate &Package */}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("emailtemplate")}
                      >
                        {expandedSections.emailtemplate ? "-" : "+"}
                      </button>
                      <label>Email Template & Package</label>
                    </div>
                    {expandedSections.emailtemplate && (
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/create_email_template",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/create_email_template")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add email template
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/getall_emailContent",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/getall_emailContent")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View all email Content
                          </label>
                        </li>

                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/add_clientPackage", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/add_clientPackage")}
                          />
                          <label htmlFor="client-getAllEmp">add_clientPackage</label>
                        </li> */}
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/get_allPackages",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/get_allPackages")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View All Packages
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/active_inactive_Package",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/active_inactive_Package")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Active Inactive Package
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/updatepackage",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/updatepackage")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Edit package</label>
                        </li>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/getActivePackages", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/getActivePackages")}
                          />
                          <label htmlFor="client-getAllEmp">getActivePackages</label>
                        </li> */}

                        {/* Add more Candidate permissions here */}
                      </ul>
                    )}
                  </li>
                  {/*export*/}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("export")}
                      >
                        {expandedSections.export ? "-" : "+"}
                      </button>
                      <label>Export </label>
                    </div>
                    {expandedSections.export && (
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/export_clients",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/export_clients")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Export clients
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/export_Jobs",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/export_Jobs")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Export Jobs</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/export_Hr_staff",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/export_Hr_staff")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            export Hr staff
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/export_Enrolled_user",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/export_Enrolled_user")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            export Enrolled user
                          </label>
                        </li>

                        {/* Add more Candidate permissions here */}
                      </ul>
                    )}
                  </li>
                  {/*JobTitle*/}
                  <li>
                    <div className="section-header">
                      <button
                        className="toggle-button"
                        onClick={() => toggleSection("JobTitle")}
                      >
                        {expandedSections.JobTitle ? "-" : "+"}
                      </button>
                      <label>Jobs</label>
                    </div>
                    {expandedSections.JobTitle && (
                      <ul>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/addJobTitle", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/addJobTitle")}
                          />
                          <label htmlFor="client-getAllEmp">addJobTitle</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/alljobTitle", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/alljobTitle")}
                          />
                          <label htmlFor="client-getAllEmp">alljobTitle</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/deletejobTitle", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/deletejobTitle")}
                          />
                          <label htmlFor="client-getAllEmp">Delete jobTitle</label>
                        </li> */}
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/addJob_Description",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/addJob_Description")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Add Job Description
                          </label>
                        </li>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/getJd", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/getJd")}
                          />
                          <label htmlFor="client-getAllEmp">get Jd</label>
                        </li> */}
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/deleteJob_Description",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/deleteJob_Description")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            delete Job Description
                          </label>
                        </li>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/download_jd", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/download_jd")}
                          />
                          <label htmlFor="client-getAllEmp">download_jd</label>
                        </li> */}
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/postJob",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) && data.includes("/postJob")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Post Job</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/updateJob",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) && data.includes("/updateJob")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Edit Job</label>
                        </li>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/getJobs_posted_by_employee", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/getJobs_posted_by_employee")}
                          />
                          <label htmlFor="client-getAllEmp">get Jobs posted by_employee</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/getJob", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/getJob")}
                          />
                          <label htmlFor="client-getAllEmp">getJob</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/get_Female_jobseeker_profile", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/get_Female_jobseeker_profile")}
                          />
                          <label htmlFor="client-getAllEmp">get_Female_jobseeker_profile</label>
                        </li> */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/get_jobseeker_profile", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/get_jobseeker_profile")}
                          />
                          <label htmlFor="client-getAllEmp">get_jobseeker_profile</label>
                        </li> */}
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/deleteJob",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) && data.includes("/deleteJob")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Delete Job</label>
                        </li>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/download_word_Jd", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/download_word_Jd")}
                          />
                          <label htmlFor="client-getAllEmp">download_word_Jd</label>
                        </li> */}
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/delete_main_jobTitle",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/delete_main_jobTitle")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            Delete jobTitle
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/all_main_jobTitle_main",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/all_main_jobTitle_main")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View Job Title
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/add_Main_JobTitle",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/add_Main_JobTitle")
                            }
                          />
                          <label htmlFor="client-getAllEmp">Add JobTitle</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange(
                                "/getAll_Jobs_admin",
                                e.target.checked ? 1 : 0
                              )
                            }
                            defaultChecked={
                              Array.isArray(data) &&
                              data.includes("/getAll_Jobs_admin")
                            }
                          />
                          <label htmlFor="client-getAllEmp">
                            View All Jobs
                          </label>
                        </li>
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/update_detail", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/update_detail")}
                          />
                          <label htmlFor="client-getAllEmp">update_detail</label>
                        </li>getAll_Jobs_admin */}
                        {/* <li>
                          <input
                            type="checkbox"
                            id="client-getAllEmp"
                            onChange={(e) =>
                              handlePermissionChange("/jobseeker_count_of_client_job", e.target.checked ? 1 : 0)
                            }
                            defaultChecked={Array.isArray(data) && data.includes("/jobseeker_count_of_client_job")}
                          />
                          <label htmlFor="client-getAllEmp">jobseeker_count_of_client_job</label>
                        </li> */}
                        {/* Add more Candidate permissions here */}
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>
              Update Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}