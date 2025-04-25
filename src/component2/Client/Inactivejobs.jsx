import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../features/Api/BaseUrl";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";

export default function Inactivejobs() {
  const [data, setData] = useState([]);
  const locaitons = useLocation();

  useEffect(() => {
    getdata();
  }, []);
  const getdata = () => {
    axios
      .get(`${baseUrl}Inactivejobs_by_client/${locaitons?.state?.data}`)
      .then((response) => {
        setData(response.data.inactiveJob);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const navigate = useNavigate();
  return (
    <div>
      <ArrowBack
        className="mb-3"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/Admin/Clients");
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Id</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Client Email</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Company Location</TableCell>
              <TableCell>Number of Female Applicants</TableCell>
              <TableCell>Number of Male Applicants</TableCell>
              <TableCell>Applicants</TableCell>
              <TableCell>Number of Profile Mismatch</TableCell>
              <TableCell>Number of Profile Match</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                return (
                  <>
                    <TableRow key={index}>
                      <TableCell>{item.jobId}</TableCell>
                      <TableCell>{item.job_title}</TableCell>
                      <TableCell>{item.phone_no}</TableCell>
                      <TableCell>{item.company_name}</TableCell>
                      <TableCell>{item.employee_email}</TableCell>
                      <TableCell>
                        {new Date(item.startDate).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell>
                        {new Date(item.endDate).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell>{item.company_HQ}</TableCell>
                      <TableCell>{item.femaleCandidateCount}</TableCell>
                      <TableCell>{item.maleCandidateCount}</TableCell>
                      <TableCell>{item.AllCandidateCount}</TableCell>
                      <TableCell>{item.matchedProfileCount}</TableCell>
                      <TableCell>{item.mismatchedProfileCount}</TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
