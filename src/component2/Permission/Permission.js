import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../../features/Api/BaseUrl";
// Full permission list
const allPermissions = [
  "/dashboard",
  "/report_and_analyst",
  "/client",
  "/jobs",
  "/access_control",
  "/manage_package",
  "/services",
  "/cms_pages",
  "/job_database",
  "/transaction",
  "/cms_blog",
  "/email_template",
  "/enrolled_user",
  "/online_courses",
  "/elite_female_talent",
  "/upload_resume",
  "/basic_labour_template",
  "/contact_us",
  "/notification",
  "/privacy_policy",
  "/terms_and_condtions",
];

// Slug to label
const beautify = (slug) =>
  slug.replace("/", "").replace(/_/g, " ").toUpperCase();

const Permission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const datat = location?.state?.data?.[0];

  const [permissions, setPermissions] = useState({});

  // Fetch existing permissions from API
  const fetchPermissions = async () => {
    try {
      const staffId = datat?.staff_id;
      const res = await axios.get(
        `${baseUrl}get_added_sidebar_permission_for_staff/${staffId}`
      );

      const granted = res?.data?.permissions || [];

      const mapped = {};
      allPermissions.forEach((slug) => {
        mapped[slug] = granted.includes(slug);
      });

      setPermissions(mapped);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleToggle = (slug) => {
    setPermissions((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const handleUpdate = async () => {
    const payload = {
      role: datat?.role,
      staff_id: datat?.staff_id,
      permissions: Object.entries(permissions).map(([endpoint, isAllowed]) => ({
        endpoint,
        allow: isAllowed ? 1 : 0,
      })),
    };

    try {
      await axios.post(`${baseUrl}update_sidebar_Permission`, payload);
      Swal.fire({
        title: "Permission",
        text: "Permission Updated to Hr Coordinator",
        icon: "success",
        showConfirmButton: true,
      });
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update permissions.");
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
                <p>Name</p>
                <h6>{datat?.name}</h6>
              </div>
              <div className="col-md-3">
                <p>Phone</p>
                <h6>{datat?.phone_no}</h6>
              </div>
              <div className="col-md-3">
                <p>Role</p>
                <h6>{datat?.role}</h6>
              </div>
              <div className="col-md-3">
                <p>Staff ID</p>
                <h6>{datat?.staff_id}</h6>
              </div>
            </div>

            <div className="permissions-container mt-4">
              <label className="permissions-title">
                Manage Permission<span>*</span>
              </label>
              <div className="card border-0">
                <table className="permissions-table">
                  <thead>
                    <tr>
                      <th>PERMISSION</th>
                      <th>{datat?.role || "Role"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPermissions.map((slug) => (
                      <tr key={slug}>
                        <td>{beautify(slug)}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={permissions[slug] || false}
                            onChange={() => handleToggle(slug)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleUpdate}>
              Update Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permission;
