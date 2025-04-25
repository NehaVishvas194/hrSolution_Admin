import React, { useState, useEffect } from "react";
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
  Switch,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const pageSize = 5;
export default function GetStaff() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [report, setReport] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleChangeReport = (event) => {
    setReport(event.target.value);
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`${baseUrl}getAll_Staffs`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",

        },
      })
      .then((response) => {
        console.log(response.data.allStaffs);
        setData(response.data.allStaffs);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggle = (_id, status) => {
    axios
      .post(`${baseUrl}active_inactive_Hr/${_id}`)
      .then((response) => {
        getData();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const filterdata = data?.filter((item) => {
    // const phoneNumber = item?.phone_no.toString();
    return (
      item?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      //  phoneNumber?.includes(searchQuery?.toLowerCase())
    );
    // phoneNumber.includes(searchQuery?.toLowerCase())
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPage = Math.ceil(filterdata.length / pageSize);
  const startindex = (currentPage - 1) * pageSize;
  const endIndex = startindex + pageSize;
  const currentdata = filterdata.slice(startindex, endIndex);

  const getReport = () => {
    axios
      .get(`${baseUrl}export_Hr_staff`, {
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
        link.setAttribute("download", `report_${report}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up after download
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleclick = (staff_id) => {
    const datat1 = data.filter((item) => {
      return item.staff_id === staff_id;
    });
    navigate("/Admin/Permission", { state: { data: datat1 } });
    // console.log(datat1)
  };


  return (
    <div className="content">
      <div className="row">
        <div className="col-md-12">
          <h4 className="page-title">Access Control</h4>
        </div>
      </div>
      <div className="container main_container">
        <div className="d-flex justify-content-between mb-3">
          <div className="col-md-4">
            <TextField
              id="outlined-size-small"
              label="Search...."
              value={searchQuery}
              variant="outlined"
              size="small"
              placeholder="Search..."
              name=""
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-8 d-flex justify-content-end align-items-center gap-3 mb-3">
            <div className=" ">
              <Button
                variant="contained"
                onClick={getReport}
                style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
              >
                Export
              </Button>
            </div>
            <div className=" ">
              <Button
                variant="contained"
                onClick={() => navigate("/Admin/Add-Staff")}
                style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
              >
                ADD Staff
              </Button>
            </div>
          </div>



        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Staff ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Active/InActive</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentdata &&
                currentdata.length > 0 &&
                currentdata.map((item, index) => {
                  console.log(item);
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell>{startindex + index + 1}</TableCell>
                        <TableCell>{item?.staff_id}</TableCell>
                        <TableCell>{item?.name}</TableCell>
                        <TableCell>{item?.email}</TableCell>
                        <TableCell>{item?.phone_no}</TableCell>
                        <TableCell>
                          <RemoveRedEyeIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleclick(item.staff_id);
                            }}
                          />
                        </TableCell>
                        <TableCell>{item?.role}</TableCell>
                        <TableCell>
                          {item?.status === 1 ? (
                            <p className="text-success">Active</p>
                          ) : (
                            <p className="text-danger">In Active</p>
                          )}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={item.status === 1}
                            onChange={() => {
                              handleToggle(item._id, item.status);
                            }}
                            color="primary"
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
          <div className="m-3">
            <button
              disabled={currentPage === 1}
              className="p-1 rounded pagePre"
              onClick={() => handlePageChange(currentPage - 1)}
            >
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
        <ToastContainer />
      </div>
    </div>
  );
}
