import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Notification from "./component2/Notification/Notificaton";
import ChangePassword from "./pages/ChangePassword";
import Protected from "./pages/Protected";
import ResetPassword from "./pages/ResetPassword";
// import PageNotFound from "./pages/PageNotFound";
import OtpGenerate from "./pages/OtpGenrate";
import FemaleCandidate from "./component2/FemaleCandiadate/FemaleCandidate";
import Clients from "./component2/Client/Clients";
import ATS from "./component2/ATS/ATS";
// import Pyschometric from "./component2/Pyschometric Testing/Pyschometric";
import Labourlaw from "./component2/labour law computation/Labourlaw";
import MyProfile from "./component2/MY profile/MyProfile";
import Jobposting from "./component2/job posting/Jobposting";
import JDsetup from "./component2/Jd setupr/JDsetup";
import Updateprofile from "./component2/Update rpofile/Updateprofile";
import StaffSection from "./component2/Staff Section/StaffSection";
import GetStaff from "./component2/Staff Section/GetStaff";
import Alljobs from "./component2/Client/Alljobs";
import Detailsjob from "./component2/Client/Detailsjob";
import Hrsection from "./component2/HR/Hrsection";
import Hrresponse from "./component2/HR/Hrresponse";
import Postjob from "./component2/Client/Postjob";
import Clientdetails from "./component2/job posting/Clientdetails";
import Privacypolicy from "./component2/Privacy policy/Privacypolicy";
import TermCondition from "./component2/Term condition/TermCondition";
import Servicepage from "./component2/Service page/Servicepage";
import Testmonail from "./component2/cms Page/Testmonail";
import Femalejobs from "./component2/job posting/Femalejobs";
import Jobpostingsection from "./component2/cms Page/Jobpostingsection";
import JOBPOSTINGSEC from "./component2/cms Page/JOBPOSTINGSEC";
import Cmspage3 from "./component2/cms Page/Cmspage3";
import Cmspage4 from "./component2/cms Page/Cmspage4";
import Blog1 from "./component2/cms Page/Blog1";
import Blog2 from "./component2/cms Page/Blog2";
import Jobtitle from "./component2/job posting/Jobtitle";
import Location from "./component2/cms Page/Location";
import Viewdetails from "./component2/Pyschometric Testing/Viewdetails";
import Testing from "./component2/cms Page/Testing";
import TalentPool from "./component2/Talentpool/TalentPool";
import Reports_Analytics from "./component2/Reports-and-Analytics/Reports_Analytics";
import Activejobs from "./component2/Client/Activejobs";
import Inactivejobs from "./component2/Client/Inactivejobs";
import Jobdescriptiondatabase from "./component2/Job description/Jobdescriptiondatabase";
import HrConsultancy from "./component2/Service page/HrConsultancy";
import Fixitfinder from "./component2/Service page/Fixitfinder";
import TranningandDevelopment from "./component2/Service page/TranningandDevelopment";
import Requirementandselection from "./component2/Service page/Requirement-and-selection";
import EmployeeOutsourcing from "./component2/Service page/Employee-Outsourcing";
import Contactus from "./component2/Contatc/Contactus";
import Aboutus from "./component2/cms Page/Aboutus";
import Contactus1 from "./component2/cms Page/Aboutus";
import Ourmission from "./component2/cms Page/Ourmission";
import Ourvision from "./component2/cms Page/Ourvision";
import Ourcommitment from "./component2/cms Page/Ourcommitment";
import Getstart from "./component2/cms Page/Getstart";
import Postdescription from "./component2/Job description/Postdescription";
import Whychooseus from "./component2/cms Page/Whychooseus";
import HrTeleconsultancy from "./component2/Service page/HrTeleconsultancy";
import Footercontent from "./component2/cms Page/Footercontent";
import Academiccredentialsverifier from "./component2/cms Page/Academiccredentialsverifier";
import Newsletter from "./component2/cms Page/Newsletter";
import Uploadresume from "./component2/upload resume/Uploadresume";
import CareerAdvice from "./component2/cms Page/CareerAdvice";
// import Skilledtalent from "./component2/cms Page/Skilledtalent";
import Cmslabourtoool from "./component2/cms Page/Cmslabourtoool";
import Onlinecourese from "./component2/cms Page/Onlinecourese";
import Homesections from "./component2/cms Page/Homesections";
import Clientdetailsviewpage from "./component2/Client/Clientdetailsviewpage";
import JobsDetails from "./component2/job posting/JobsDetails";
import Personalitytest from "./component2/Pyschometric Testing/Personalitytest";
import { MyContext } from "./Context/Mycontext";
import { useState } from "react";
import OnlinecourseQuerry from "./component2/cms Page/OnlinecourseQuerry";
import Quiztest from "./component2/Quiz test/Quiztest";
import QuizeDetails from "./component2/Quiz test/QuizeDetails";
import Psychometricmain from "./component2/Pyschometric Testing/Psychometricmain";
import DeatisCategory from "./component2/cms Page/DeatisCategory";
import Quizzdetails from "./component2/cms Page/Quizzdetails";
import Enrolluser from "./component2/cms Page/Enrolluser";
import Enrollusercouser from "./component2/cms Page/Enrollusercouser";
import Getpagequest from "./component2/cms Page/Getpagequest";
import Onlinecourseeditpage from "./component2/cms Page/Onlinecourseeditpage";
import Addcourse from "./component2/cms Page/Addcourse";
import Addtopic from "./component2/cms Page/Addtopic";
import Enrolledusercounte from "./component2/cms Page/Enrolledusercounte";
import Edittopicpage from "./component2/cms Page/Edittopicpage";
import Transcitiobn from "./component2/transcition/Transcitiobn";
import Emailsetuo from "./component2/email/Emailsetuo";
import Managepackage from "./component2/Manage Package/Managepackage";
import Packagetype from "./component2/transcition/Packagetype";
import Permission from "./component2/Permission/Permission";
import Permission2 from "./component2/Permission/Permission2";
import BlogComment from "./component2/cms Page/BlogComment";
function App() {
  console.log("date:23-04-2025,time:12:58");
  const [text, setText] = useState("");
  return (
    <MyContext.Provider value={{ text, setText }}>
      <Router basename="/super_admin">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/otp-generate" element={<OtpGenerate />} />
          <Route path="/admin" element={<Protected Component={MainLayout} />}>
            <Route index element={<Dashboard />} />
            <Route path="Female-Candidate" element={<FemaleCandidate />} />
            <Route path="Clients" element={<Clients />} />
            <Route path="Permission" element={<Permission />} />
            <Route path="Permission2" element={<Permission2 />} />
            <Route path="Activejobs" element={<Activejobs />} />
            <Route path="Inactivejobs" element={<Inactivejobs />} />
            <Route path="Update-Profile" element={<Updateprofile />} />
            <Route path="Add-Staff" element={<StaffSection />} />
            <Route path="Get-Staff" element={<GetStaff />} />
            <Route
              path="onlinecouresefulldetails"
              element={<OnlinecourseQuerry />}
            />
            <Route path="View-Deatils" element={<Clientdetails />} />
            <Route
              path="Reports-and-Analytics"
              element={<Reports_Analytics />}
            />
            <Route path="Alljobs" element={<Alljobs />} />
            <Route path="Details_jobs" element={<Detailsjob />} />
            <Route path="viewdetails" element={<Viewdetails />} />
            <Route path="HR-Section" element={<Hrsection />} />
            <Route path="Clientview-page" element={<Clientdetailsviewpage />} />
            <Route path="TalentPool" element={<TalentPool />} />
            <Route path="HR-Response" element={<Hrresponse />} />
            <Route path="Notification" element={<Notification />} />
            <Route path="Careeradvice" element={<CareerAdvice />} />
            <Route path="post-job-client" element={<Postjob />} />
            <Route path="Whychooseus" element={<Whychooseus />} />
            <Route
              path="Academiccredentialsverifier"
              element={<Academiccredentialsverifier />}
            />
            <Route path="privacy-policy" element={<Privacypolicy />} />
            <Route path="Contactus" element={<Contactus />} />
            <Route path="Terms-Condition" element={<TermCondition />} />
            <Route path="Onlinecourse" element={<Onlinecourese />} />
            <Route
              path="enrolldedusercopunt"
              element={<Enrolledusercounte />}
            />
            <Route path="AddCourse" element={<Addcourse />} />
            <Route path="testDescription" element={<DeatisCategory />} />
            <Route path="Edittopic" element={<Edittopicpage />} />
            <Route path="AddTopic" element={<Addtopic />} />
            <Route path="testquesdetail" element={<Getpagequest />} />
            <Route path="enrolluser" element={<Enrolluser />} />
            <Route path="CourseEdit" element={<Onlinecourseeditpage />} />
            <Route path="enrollcourseuser" element={<Enrollusercouser />} />
            <Route path="HomeSection" element={<Homesections />} />
            <Route path="Service-Page" element={<Servicepage />} />
            <Route path="Hr-Consultancy" element={<HrConsultancy />} />
            <Route path="Fixitfinder" element={<Fixitfinder />} />
            <Route
              path="tranning-and-development"
              element={<TranningandDevelopment />}
            />
            <Route
              path="Requirementandselection"
              element={<Requirementandselection />}
            />
            <Route
              path="Employee-Outsourcing"
              element={<EmployeeOutsourcing />}
            />
            <Route path="Hr-Teleconsultancy" element={<HrTeleconsultancy />} />
            <Route path="FemaleElite" element={<EmployeeOutsourcing />} />
            <Route path="post-description" element={<Postdescription />} />
            <Route path="CMS-testimonial" element={<Testmonail />} />
            <Route path="addquizzzzz" element={<Quizzdetails />} />
            <Route path="Jobdetails" element={<JobsDetails />} />
            {/* <Route path="SkilledTitle" element={<Skilledtalent />} /> */}
            <Route path="About-us" element={<Aboutus />} />
            <Route path="CmslabourTool" element={<Cmslabourtoool />} />
            <Route path="Contact-us" element={<Contactus1 />} />
            <Route path="Our-mission" element={<Ourmission />} />
            <Route path="Our-vision" element={<Ourvision />} />
            <Route path="Our-commitment" element={<Ourcommitment />} />
            <Route path="packagetransction" element={<Packagetype />} />
            <Route path="get-start" element={<Getstart />} />
            <Route path="transcition" element={<Transcitiobn />} />
            <Route path="ATS" element={<ATS />} />
            <Route path="Pyschometric-Testing" element={<Viewdetails />} />
            <Route path="Emailsetup" element={<Emailsetuo />} />
            <Route path="Pyschometrictest" element={<Psychometricmain />} />
            <Route path="Personalitytest" element={<Personalitytest />} />
            <Route path="Labour-law-law-Computation" element={<Labourlaw />} />
            <Route path="Newsletter" element={<Newsletter />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route
              path="Job-Description-Database"
              element={<Jobdescriptiondatabase />}
            />
            <Route path="My-Profile" element={<MyProfile />} />
            <Route path="Job-Posting" element={<Jobposting />} />
            <Route path="JD-Setup" element={<JDsetup />} />
            <Route path="UploadResume" element={<Uploadresume />} />
            <Route path="managepackage" element={<Managepackage />} />
            <Route path="Femail-jobs" element={<Femalejobs />} />
            <Route path="Job-posting-sec" element={<Jobpostingsection />} />
            <Route path="Job-posting-sec2" element={<JOBPOSTINGSEC />} />
            <Route path="Job-posting-sec3" element={<Cmspage3 />} />
            <Route path="Job-posting-sec4" element={<Cmspage4 />} />
            {/* <Route path="Blog_1" element={<Blog1 />} /> */}
            <Route path="Blog_2" element={<Blog2 />} />
            <Route path="JobDetails_comment" element={<BlogComment />} />
            <Route path="Job-Title" element={<Jobtitle />} />
            <Route path="Footercontent" element={<Footercontent />} />
            <Route path="Location" element={<Location />} />
            <Route path="quiztest" element={<Quiztest />} />
            <Route path="quizquestuion" element={<QuizeDetails />} />
            <Route path="Testing" element={<Testing />} />
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Route>
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}
export default App;
