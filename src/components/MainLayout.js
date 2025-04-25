import React, { useState, useEffect, useContext } from "react";
import "./MainLayout.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import logo from "../Assests/mainlogo.jpg";
import logoSm from "../images/logoSm.png";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { baseurlImage } from "../features/Imageurl";
import { baseUrl } from "../features/Api/BaseUrl";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Woman2Icon from "@mui/icons-material/Woman2";
import GavelIcon from "@mui/icons-material/Gavel";
import PolicyIcon from "@mui/icons-material/Policy";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { SiGoogleanalytics } from "react-icons/si";
import { MdMiscellaneousServices } from "react-icons/md";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import axios from "axios";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import MonitorIcon from "@mui/icons-material/Monitor";
import CasinoIcon from "@mui/icons-material/Casino";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CastleIcon from "@mui/icons-material/Castle";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import HvacIcon from "@mui/icons-material/Hvac";
import CampaignIcon from "@mui/icons-material/Campaign";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AdbIcon from "@mui/icons-material/Adb";
import EventIcon from "@mui/icons-material/Event";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CircleIcon from "@mui/icons-material/Circle";
import { MyContext } from "../Context/Mycontext";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  // const [data, setData] = useState();
  const [selectedKey, setSelectedKey] = useState("");
  const navigate = useNavigate();
  const [notification, setNotification] = useState([]);
  const [conut, setConut] = useState({});
  const location = useLocation();
  const { text, setText } = useContext(MyContext);
  const { state } = location;
  const role = localStorage.getItem("role");
  const localstoregeimage = localStorage.getItem("profileImage");
  const permissions = JSON.parse(localStorage.getItem("permissions")) || [];

  const signoutData = () => {
    localStorage.clear();
    navigate("/");
  };
  // useEffect(() => {
  //   getnotification();
  // }, []);
  // const getnotification = () => {
  //   axios
  //     .get(`${baseUrl}getAdminNotification`,{
  //       headers: {
  //           "Authorization": `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",

  //       },
  //   })
  //     .then((response) => {
  //       setNotification(response.data.notifications);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //     });
  // };
  const handleclicknotifi = (notification_id) => {
    axios
      .post(`${baseUrl}seen_notification/${notification_id}`)
      .then((response) => {
        // getnotification();
        // countsds();
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const userID = localStorage.getItem("id");
  // const getApi = () => {
  //   axios
  //     .get(`${baseUrl}getAdmin/${userID}`)
  //     .then((response) => {
  //       setData(response.data.Details);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //     });
  // };
  useEffect(() => {
    // getApi();
    setSelectedKey(getActiveKey());
  }, []);
  // useEffect(() => {
  //   countsds();
  // }, []);
  // const countsds = () => {
  //   axios
  //     .get(`${baseUrl}unseen_admin_notification_count`,{
  //       headers: {
  //           "Authorization": `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",

  //       },
  //   })
  //     .then((response) => {
  //       setConut(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data.message);
  //     });
  // };
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedImage = localStorage.getItem("image");
    if (storedName) {
      setNameValue(storedName);
    } else {
      localStorage.setItem("name", state?.dataValue?.firstName || "");
      setNameValue(state?.dataValue?.firstName || "");
    }
    if (storedImage) {
      setImageValue(storedImage);
    } else {
      localStorage.setItem("image", state?.dataValue?.image || "");
      setImageValue(state?.dataValue?.image || "");
    }
  }, [nameValue, imageValue, state]);
  useEffect(() => {
    setSelectedKey(getActiveKey());
  }, [location.pathname]);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleBadgeClick = () => {
    setShowDropdown(!showDropdown);
  };

  // autoclose submenu
  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  console.log(text);
  const getActiveKey = () => {
    const path = location.pathname;
    switch (path) {
      case "/Admin":
        return "";
      case "/Admin/Get-Staff":
        return "Get-Staff";
      case "/Admin/Add-Staff":
        return "Get-Staff";
      case "/Admin/Job-Posting":
        return "Job-Posting";
      case "/Admin/View-Deatils":
        return "Job-Posting";
      case "/Admin/Femail-jobs":
        return "Job-Posting";
      case "/Admin/Clients":
        return "Clients";
      case "/Admin/Reports-and-Analytics":
        return "Reports-and-Analytics";
      case "/Admin/Job-Title":
        return "Job-Title";
      // case "/Admin/SkilledTitle":
      //   return "Skilledtalent";
      case "/Admin/Female-Candidate":
        return "Female-Candidate";
      case "/Admin/Pyschometric-Testing":
        return "Pyschometric-Testing";
      case "/Admin/Pyschometrictest":
        return "Pyschometrictest";
      case "/Admin/Labour-law-law-Computation":
        return "Labour-law-law-Computation";
      case "/Admin/Service-Page":
        return "Service-Page";
      case "/Admin/Clientview-page":
        return "Clients";
      case "/Admin/post-job-client":
        return "Clients";
      case "/Admin/Emailsetup":
        return "email";
      case "/Admin/AddCourse":
        return "Online courses";
      case "/Admin/Hr-Consultancy":
        return "Hr-Consultancy";
      case "/Admin/Contactus":
        return "Contactus";
      case "/Admin/Jobdetails":
        return "Jobs";
      case "/Admin/Fixitfinder":
        return "Fixitfinder";
      case "/Admin/tranning-and-development":
        return "tranning-and-development";
      case "/Admin/Requirementandselection":
        return "Requirementandselection";
      case "/Admin/Academiccredentialsverifier":
        return "Academiccredentialsverifier";
      case "/Admin/Employee-Outsourcing":
        return "Employee-Outsourcing";
      case "/Admin/Hr-Teleconsultancy":
        return "Hr-Teleconsultancy";
      case "/Admin/FemaleElite":
        return "FemaleElite";
      case "/Admin/Notification":
        return "Notification";
      case "/Admin/privacy-policy":
        return "privacy-policy";
      case "/Admin/Terms-Condition":
        return "Terms-Condition";
      case "/Admin/CMS-testimonial":
        return "CMS-testimonial";
      case "/Admin/CMS-testimonial":
        return "Career Advice";
      case "/Admin/UploadResume":
        return "UploadResume";
      case "/Admin/Job-posting-sec":
        return "Job-posting-sec";
      case "/Admin/Job-posting-sec2":
        return "Job-posting-sec2";
      case "/Admin/Job-posting-sec3":
        return "Job-posting-sec3";
      case "/Admin/Job-posting-sec4":
        return "Job-posting-sec4";
      case "/Admin/CmslabourTool":
        return "Labour Tool";
      case "/Admin/post-description":
        return "Job-Description-Database";
      case "/Admin/Newsletter":
        return "newsletter";
      case "/Admin/Job-posting-sec5":
        return "Job-posting-sec5";
      case "/Admin/Footercontent":
        return "Footercontent";
      // case "/Admin/Blog_1":
      //   return "Blog_1";
      case "/Admin/Alljobs":
        return "Blog_1";
      case "/Admin/Whychooseus":
        return "Whychooseus";
      case "/Admin/Viewdetails":
        return "Pyschometric-Testing";
      case "/Admin/Personalitytest":
        return "Pyschometric-Testing";
      case "/Admin/Activejobs":
        return "Clients";
      case "/Admin/Inactivejobs":
        return "Clients";
      case "/Admin/Details_jobs":
        return "Clients";
      case "/Admin/Blog_2":
        return "Blog_2";
      case "/Admin/JobDetails_comment":
        return "JobDetails_comment";
      case "/Admin/quiztest":
        return "Quiz Question";
      case "/Admin/Our-mission":
        return "Our-mission";
      case "/Admin/managepackage":
        return "managepackage";
      case "/Admin/About-us":
        return "About-us";
      // case "/Admin/Our-Mission":
      //   return "Our-Mission";
      case "/Admin/Our-vision":
        return "Our-vision";
      case "/Admin/get-start":
        return "get-start";
      case "/Admin/Contact-us":
        return "Contact-us";
      case "/Admin/Onlinecourse":
        return "Onlinecourse";
      case "/Admin/Onlinecourse":
        return "Onlinecourse";
      case "/Admin/HomeSection":
        return "Home Section";
      case "/Admin/Our-commitment":
        return "Our-commitment";
      case "/Admin/Alljobs":
        return "Clients";
      case "/Admin/Job-Description-Database":
        return "Job-Description-Database";
      case "/Admin/Location":
        return "Location";
      default:
        return "";
    }
  };
  const menuStyle = {
    background: "rgb(46, 71, 204)",
    color: "#fff",
    // maxHeight: "80vh",
    // overflowX: "hidden",
    // overflowY: "auto"
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">
              {" "}
              <img
                src={logoSm}
                className=" festabash-l0go mb-3"
                style={{ width: "35px", height: "35px" }}
                alt=""
              />
            </span>
            <span
              className="lg-logo "
              style={{ color: "#2e47cc", width: "150px", height: "70px" }}
            >
              {" "}
              <img
                src={logo}
                className=" festabash-l0go mb-3"
                style={{ width: "170px", height: "70px" }}
                alt=""
              />
            </span>
          </h2>
        </div>
        <Menu
          mode="inline"
          style={menuStyle}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear();
              navigate("/hrsolutions");
            } else {
              setSelectedKey(key);
              navigate(`/Admin/${key}`);
            }
          }}
        >
          {/* {permissions.includes("/dashboard") && (
            <Menu.Item key="" icon={<AiOutlineDashboard className="fs-4" />}>
              Dashboard
            </Menu.Item>
          )} */}
          {permissions.includes("/dashboard") && (
            <Menu.Item key="" icon={<AiOutlineDashboard className="fs-4" />}>
              Dashboard
            </Menu.Item>
          )}
          {permissions.includes("/report_and_analyst") && (
            <Menu.Item
              key="Reports-and-Analytics"
              icon={<SiGoogleanalytics className="fs-4" />}
            >
              Reports and Analytics
            </Menu.Item>
          )}
          {permissions.includes("/client") && (
            <Menu.Item key="Clients" icon={<AiOutlineUser className="fs-4" />}>
              Clients
            </Menu.Item>
          )}
          {permissions.includes("/jobs") && (
            <Menu.Item
              key="Job-Posting"
              icon={<WorkOutlineIcon className="fs-4" />}
            >
              Jobs
            </Menu.Item>
          )}
          {permissions.includes("/access_control") && (
            <Menu.Item
              key="Get-Staff"
              icon={<ControlCameraIcon className="fs-4" />}
            >
              Access Control
            </Menu.Item>
          )}

          {/* {role === "Super Admin" && (
            <Menu.Item
              key="Get-Staff"
              icon={<ControlCameraIcon className="fs-4" />}
            >
              Access Control
            </Menu.Item>
          )}
          */}
          {permissions.includes("/manage_package") && (
            <Menu.Item
              key="managepackage"
              icon={<ControlCameraIcon className="fs-4" />}
            >
              Manage Package
            </Menu.Item>
          )}
          {permissions.includes("/services") && (
            <Menu.SubMenu
              key="Services"
              icon={<MdMiscellaneousServices className="fs-4" />}
              title="Services"
            >
              <Menu.Item
                key="Fixitfinder"
                icon={<FindReplaceIcon className="fs-4" />}
              >
                Fixit Finder
              </Menu.Item>
              <Menu.Item
                key="Hr-Consultancy"
                icon={<KeyboardCommandKeyIcon className="fs-4" />}
              >
                HR Consultancy
              </Menu.Item>
              <Menu.Item
                key="tranning-and-development"
                icon={<MonitorIcon className="fs-4" />}
              >
                Learning and Development
              </Menu.Item>
              <Menu.Item
                key="Hr-Teleconsultancy"
                icon={<SupervisorAccountIcon className="fs-4" />}
              >
                HR Teleconsultancy
              </Menu.Item>
              <Menu.Item
                key="FemaleElite"
                icon={<SupervisorAccountIcon className="fs-4" />}
              >
                Elite Female Talent Pool
              </Menu.Item>
              <Menu.Item
                key="Academiccredentialsverifier"
                icon={<SupervisorAccountIcon className="fs-4" />}
              >
                Academic Credentials Verifier
              </Menu.Item>
            </Menu.SubMenu>
          )}
          {permissions.includes("/cms_pages") && (
            <Menu.SubMenu
              key="CMS-Pages-1"
              icon={<CastleIcon className="fs-4" />}
              title="CMS Pages"
            >
              <Menu.Item
                key="CMS-testimonial"
                icon={<CasinoIcon className="fs-4" />}
              >
                Testimonial
              </Menu.Item>
              <Menu.Item
                key="Job-posting-sec"
                icon={<FiberManualRecordIcon className="fs-4" />}
              >
                Section 1
              </Menu.Item>
              <Menu.Item
                key="Job-posting-sec2"
                icon={<FiberManualRecordIcon className="fs-4" />}
              >
                Section 2
              </Menu.Item>
              <Menu.Item
                key="Job-posting-sec3"
                icon={<FiberManualRecordIcon className="fs-4" />}
              >
                Section 3
              </Menu.Item>
              <Menu.Item
                key="Job-posting-sec4"
                icon={<FiberManualRecordIcon className="fs-4" />}
              >
                Section 4
              </Menu.Item>
              <Menu.Item
                key="Footercontent"
                icon={<FiberManualRecordIcon className="fs-4" />}
              >
                Footer Content
              </Menu.Item>
              <Menu.Item
                key="Careeradvice"
                icon={<FiberManualRecordIcon className="fs-4" />}
              >
                Career Advice
              </Menu.Item>

              <Menu.Item
                key="CmslabourTool"
                icon={<FiberManualRecordIcon className="fs-4" />}
              >
                Labour Tool
              </Menu.Item>
              <Menu.Item
                key="HomeSection"
                icon={<FiberManualRecordIcon className="fs-4" />}
              >
                Home Section
              </Menu.Item>
              <Menu.Item
                key="Location"
                icon={<LocationOnIcon className="fs-4" />}
              >
                Cms For Loaction
              </Menu.Item>
              <Menu.Item key="About-us" icon={<CircleIcon className="fs-4" />}>
                About Us
              </Menu.Item>
              <Menu.Item key="Our-Mission" icon={<AdbIcon className="fs-4" />}>
                Our Mission
              </Menu.Item>
              <Menu.Item
                key="Our-vision"
                icon={<RemoveRedEyeIcon className="fs-4" />}
              >
                Our Vision
              </Menu.Item>
              <Menu.Item
                key="Our-commitment"
                icon={<CampaignIcon className="fs-4" />}
              >
                Our Commitment
              </Menu.Item>
              <Menu.Item
                key="Newsletter"
                icon={<CampaignIcon className="fs-4" />}
              >
                News Letter
              </Menu.Item>
              <Menu.Item
                key="Whychooseus"
                icon={<CampaignIcon className="fs-4" />}
              >
                Why Choose-Us
              </Menu.Item>
              <Menu.Item key="get-start" icon={<EventIcon className="fs-4" />}>
                Get Start Today
              </Menu.Item>
            </Menu.SubMenu>
          )}

          {permissions.includes("/job_database") && (
            <Menu.SubMenu
              key="Job-Title1"
              icon={<AcUnitIcon className="fs-4" />}
              title="Job DataBase"
            >
              <Menu.Item
                key="Job-Title"
                icon={<GraphicEqIcon className="fs-4" />}
              >
                Job Title
              </Menu.Item>
              {/* <Menu.Item
              key="SkilledTitle"
              icon={<GraphicEqIcon className="fs-4" />}
            >
              Skilled Title
            </Menu.Item> */}
              <Menu.Item
                key="Job-Description-Database"
                icon={<GraphicEqIcon className="fs-4" />}
              >
                Job Description Database
              </Menu.Item>
            </Menu.SubMenu>
          )}
          {permissions.includes("/transaction") && (
            <Menu.SubMenu
              key="Job-Title12"
              icon={<AcUnitIcon className="fs-4" />}
              title="Transaction"
            >
              <Menu.Item
                key="transcition"
                icon={<GraphicEqIcon className="fs-4" />}
              >
                Course Transaction
              </Menu.Item>
              <Menu.Item
                key="packagetransction"
                icon={<GraphicEqIcon className="fs-4" />}
              >
                Package Transaction
              </Menu.Item>
            </Menu.SubMenu>
          )}
          {permissions.includes("/cms_blog") && (
            <Menu.SubMenu
              key="CMS-Pages-2"
              icon={<AcUnitIcon className="fs-4" />}
              title="CMS Blog"
            >
              {/* <Menu.Item key="Blog_1" icon={<GraphicEqIcon className="fs-4" />}>
              Blog 1
            </Menu.Item> */}
              <Menu.Item key="Blog_2" icon={<GraphicEqIcon className="fs-4" />}>
                Blog
              </Menu.Item>
              <Menu.Item
                key="JobDetails_comment"
                icon={<GraphicEqIcon className="fs-4" />}
              >
                Blog Comment
              </Menu.Item>
            </Menu.SubMenu>
          )}
          {permissions.includes("/email_template") && (
            <Menu.Item
              key="Emailsetup"
              icon={<MarkEmailUnreadIcon className="fs-4" />}
            >
              Email Template
            </Menu.Item>
          )}
          {permissions.includes("/enrolled_user") && (
            <Menu.Item
              key="enrolluser"
              icon={<CampaignIcon className="fs-4" />}
            >
              Enrolled user
            </Menu.Item>
          )}
          {permissions.includes("/online_courses") && (
            <Menu.Item
              key="Onlinecourse"
              icon={<CampaignIcon className="fs-4" />}
            >
              Online courses
            </Menu.Item>
          )}
          {permissions.includes("/elite_female_talent") && (
            <Menu.Item
              key="Female-Candidate"
              icon={<Woman2Icon className="fs-4" />}
            >
              Elite Female Talent Pool
            </Menu.Item>
          )}
          {permissions.includes("/upload_resume") && (
            <Menu.Item
              key="UploadResume"
              icon={<Woman2Icon className="fs-4" />}
            >
              Upload Resume
            </Menu.Item>
          )}
          {permissions.includes("/basic_labour_template") && (
            <Menu.Item
              key="Labour-law-law-Computation"
              icon={<GavelIcon className="fs-4" />}
            >
              Basic Labour Templates
            </Menu.Item>
          )}
          {permissions.includes("/contact_us") && (
            <Menu.Item
              key="Contactus"
              icon={<AddIcCallIcon className="fs-4" />}
            >
              Contact Us
            </Menu.Item>
          )}
          {permissions.includes("/notification") && (
            <Menu.Item
              key="Notification"
              icon={<NotificationsActiveIcon className="fs-4" />}
            >
              Notification
            </Menu.Item>
          )}
          {permissions.includes("/privacy_policy") && (
            <Menu.Item
              key="privacy-policy"
              icon={<PolicyIcon className="fs-4" />}
            >
              Privacy Policy
            </Menu.Item>
          )}
          {permissions.includes("/terms_and_condtions") && (
            <Menu.Item
              key="Terms-Condition"
              icon={<HvacIcon className="fs-4" />}
            >
              Terms & Conditions
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            backgroundColor: "#fff",
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-2 align-items-center">
            <div style={{ position: "relative", display: "inline-block" }}>
              {" "}
            </div>
            {/* <div className="dropdown topRightParent">
              <button
                className="btn"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="far fa-bell" style={{ color: "black" }}></i>
                {conut.unseenNotificationCount > 0 && (
                  <span className="badgesTop">
                    {conut.unseenNotificationCount}
                  </span>
                )}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
                style={{ maxHeight: "450px", overflowY: "scroll" }}
              >
                <h5>Notification</h5>
                {notification && notification.length > 0 ? (
                  notification.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="scrollNoti"
                        style={{
                          maxWidth: "350px",
                          padding: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleclicknotifi(item.notitication_id)}
                      >
                        <div>
                          <h6 className="text-dark text-capitalize">
                            {item.title}
                          </h6>
                          <p>{item.message}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center">No notifications</p>
                )}
              </ul>
            </div> */}
            <div className="d-flex gap-3 align-items-center dropdown">
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {text ? (
                  <img
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                    width={40}
                    height={40}
                    src={`${baseurlImage}${text}`}
                    alt="loading2"
                  />
                ) : (
                  <img
                    style={{ borderRadius: "50%" }}
                    width={40}
                    height={32}
                    src={logo}
                    alt="loading1"
                  />
                )}
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <NavLink
                    to="/admin/My-Profile"
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedKey("My-Profile");
                      navigate("/admin/My-Profile");
                    }}
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/change-password"
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedKey("change-password");
                      navigate("/admin/change-password");
                    }}
                  >
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <button
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={signoutData}
                  >
                    Logout
                  </button>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <div className="main_section">
          <Content
            style={{
              padding: "30px",
              background: theme.useToken().colorBgContainer,
            }}
          >
            <ToastContainer
              position="top-right"
              autoClose={250}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="light"
            />
            <Outlet />
          </Content>
          <footer className="py-4 bg-white">
            <p className="text-center mb-0">
              Copyright © 2024. All right reserved
            </p>
          </footer>
        </div>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
