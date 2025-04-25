import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../features/Api/BaseUrl";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button } from "antd";
import { toast, ToastContainer } from "react-toastify";

export default function Enrollusercouser() {
  const [data, setData] = useState([]);
  const location = useLocation();
  console.log();

  useEffect(() => {
    getuserdta();
  }, []);

  const getuserdta = () => {
    axios
      .get(`${baseUrl}get_my_enrolled_courses/${location.state.data}`)
      .then((response) => {
        console.log(response.data.enrolled_courses);
        setData(response.data.enrolled_courses);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const acceptfunc = (course_id) => {
    axios
      .post(
        `${baseUrl}update_course_status/${location.state.data}/${course_id}`
      )
      .then((response) => {
        toast.success(response.data.message);
        getuserdta()
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <div className="container main_container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Enroll Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.course_name}</TableCell>
                  <TableCell>{item.course_status === "Accepted" ? <p className="text-success">Accepted</p> : <p className="text-secondary">Pending</p>}</TableCell>
                  <TableCell>
                    {new Date(item.enroll_Date).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>
                    {item.course_status === "Pending" ? (
                      <Button onClick={() => acceptfunc(item.course_id)}>Accept</Button>
                    ) : (
                      ""
                    )}
                  </TableCell>
                  {/*  <TableCell>{item.video}</TableCell>
                 <TableCell>
                   <Button onClick={()=>handleOpenModal1(info,item._id)}>Quiz</Button>
                 </TableCell>
                 <TableCell>
 <i className="fa fa-eye" onClick={()=>handleclickquizz(info,item)}></i>
                 </TableCell>
                 <TableCell>
                   <DeleteIcon  onClick={()=>handleclick(item)}/>
                 </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ToastContainer />
      </div>
    </>

  );
}
