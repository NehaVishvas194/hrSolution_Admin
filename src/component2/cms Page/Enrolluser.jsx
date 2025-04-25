import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import axios from 'axios';
import { baseUrl } from '../../features/Api/BaseUrl';
import { useNavigate } from 'react-router-dom';
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { ToastContainer, toast } from "react-toastify";
const pageSize= 5;
export default function Enrolluser() {
  const [data, setData] = useState([])
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    getuser()
  }, [])
  const getuser = () => {
    axios.get(`${baseUrl}all_enrolled_user`,{
      headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",

      },
  }).then((response) => {
      console.log(response.data.enrolled_user)
      setData(response.data.enrolled_user)
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
  }
  const handleclickdata = (_id) => {
    navigate('/Admin/enrollcourseuser', { state: { data: _id } })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const filterData = data?.filter((item) => {
    console.log(item); // Check which item is causing issues
    return (
      (item.email && item.email.toLowerCase().includes(query.toLowerCase())) ||
      (item.first_name && item.first_name.toLowerCase().includes(query.toLowerCase())) ||
      (item.last_name && item.last_name.toLowerCase().includes(query.toLowerCase())) 
     
    );
  });
  

  const totalPage = Math.ceil(filterData.length / pageSize);
  const startindex = (currentPage - 1) * pageSize;
  const endIndex = startindex + pageSize;
  const currentdata = filterData.slice(startindex, endIndex);
  const handleActive = (_id) => {
    navigate("/Admin/Activejobs", { state: { data: _id } });
  };
  const getReport = () => {
    axios
      .get(`${baseUrl}export_Enrolled_user`, {
        responseType: "blob", // Important to set the response type to 'blob'
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Create a URL for the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        // You can set a default file name here
        link.setAttribute("download", `Enrolled user.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up after download
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="content">
    <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">Enrolled user</h4>
          </div>
        </div>
    <div className="container main_container">
        <div className="d-flex justify-content-between mx-1 mt-2 mb-3">
              <div>
                <TextField
                  id="outlined-size-small"
                  value={query}
                  label="Search By Name and Email..."
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                />
              </div>
              <div className=" "> <Button
            variant="contained"
            onClick={getReport}
            style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
          >
            Export
          </Button>  </div>
            </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone NO</TableCell>
              <TableCell>Gender</TableCell>
              {/* <TableCell>view</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentdata.map((item,index) => (
              <TableRow key={item._id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{item.first_name}{" "}{item.last_name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone_no}</TableCell>
                <TableCell>
                  {item.gender}
                </TableCell>
                {/* <TableCell>
                  <i className="fa fa-eye" style={{cursor: "pointer"}}
                   onClick={() => handleclickdata(item._id)}></i>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="m-3">
          <button
            disabled={currentPage === 1}
            className="p-1 rounded pagePre"
            onClick={() => handlePageChange(currentPage - 1)}>      
            <SkipPreviousIcon />
          </button>
          <span>{`Page ${currentPage} of ${totalPage}`}</span>
          <button
            disabled={currentPage === totalPage}
            className="p-1 rounded pageNext"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <SkipNextIcon />
          </button>
        </div>
      </TableContainer>
    </div>
    </div>
  )
}
