import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { baseUrl } from "../../features/Api/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BarChart from "./Barchart";
import CountUp from 'react-countup';
import { toast } from "react-toastify";
import Chart from 'react-apexcharts';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const [data1, setData1] = useState({});

  const totalJobs = () => {
    navigate("/admin/Job-Posting");
  };

  const totalBlogs = () => {
    navigate("/Admin/Clients");
  };

  const getdataDash = () => {
    axios.get(`${baseUrl}dashboard_counts`,{
      headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          
      },
  })
      .then((response) => {
        setData1(response.data);
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || "Error fetching data");
      });
  };

  useEffect(() => {
    getdataDash();
  }, []);

  const handleclicknavi = () => {
    navigate('/Admin/TalentPool');
  };
  // donut chart////////////////////////////////////////////////////////////////////////
  const [data, setData] = useState({
    pending_count: 0,
    shortlisted_count: 0,
    longlisted_count: 0,
    assessment_count: 0,
    schedule_count: 0,
    complete_count: 0,
    rejected_count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }
  
        const response = await axios.post(
          `${baseUrl}jobseeker_count`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        const {
          pending_count,
          shortlisted_count,
          longlisted_count,
          assessment_count,
          schedule_count,
          complete_count,
          rejected_count,
        } = response.data;
  
        setData({
          pending_count: pending_count || 0,
          shortlisted_count: shortlisted_count || 0,
          longlisted_count: longlisted_count || 0,
          assessment_count: assessment_count || 0,
          schedule_count: schedule_count || 0,
          complete_count: complete_count || 0,
          rejected_count: rejected_count || 0,
        });
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response?.data || "Error fetching data");
        setLoading(false);
      }
    };
  
    getData();
  }, []);
  
  const chartData = {
    series: [
      data.pending_count,
      data.shortlisted_count,
      data.longlisted_count,
      data.assessment_count,
      data.schedule_count,
      data.complete_count,
      data.rejected_count,
    ],
    options: {
      chart: {
        type: 'donut',
        width: '400px',
        height: '400px',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            width: "10px"
          },
        },
      },
      colors: ['#dab95c', '#F7418F', '#864AF9', '#41B06E', '#00FFFF', '#FF9800', '#D2DE32'],
      labels: ['Pending', 'Shortlist', 'Longlisted', 'Assessment', 'Schedule Interview', 'Complete', 'Reject'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%"
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="container main_container">
      <div className="row">
        <div className="cards">
          <div className="dashboard-card" onClick={totalJobs}>
            <div className="card-content">
              <div className="number">{data1.allCandidates || 0}</div>
              <div className="card-name">Total Application</div>
            </div>
            <div className="icon-box">
              <i className="fas fa-search-plus"></i>
            </div>
          </div>
          <div className="dashboard-card" onClick={totalBlogs}>
            <div className="card-content">
              <div className="number">
                <CountUp end={data1.all_clients_count || 0} />
              </div>
              <div className="card-name">Total Clients</div>
            </div>
            <div className="icon-box">
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
          </div>
          <div className="dashboard-card" onClick={() => { navigate("/Admin/Job-Posting") }}>
            <div className="card-content">
              <div className="number">
                <CountUp end={data1.active_jobs_count || 0} />
              </div>
              <div className="card-name">Active Jobs</div>
            </div>
            <div className="icon-box">
              <i className="fas fa-users"></i>
            </div>
          </div>
          <div className="dashboard-card" onClick={handleclicknavi}>
            <div className="card-content">
              <div className="number">{data1.all_cvCount || 0}</div>
              <div className="card-name">Talent Pool</div>
            </div>
            <div className="icon-box">
              <i className="fas fa-file"></i>
            </div>
          </div>
          <div className="dashboard-card" onClick={() => { navigate('/Admin/Female-Candidate') }}>
            <div className="card-content">
              <div className="number">{data1.all_femaleCandidates_count || 0}</div>
              <div className="card-name">Female Talent Pool</div>
            </div>
            <div className="icon-box">
              <i className="fas fa-female"></i>
            </div>
          </div>
        </div>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Item className="pt-3">
              <BarChart />
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Item style={{ height: "423px" }} className="pt-3">
              <Chart

                options={chartData.options}
                series={chartData.series}
                type="donut"

              />
              <p className="text-center fs-5"></p>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
