import React, { useEffect, useState } from "react";
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
import { baseurlImage } from "../../features/Imageurl";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import Rating from "react-rating-stars-component";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
const pageSize = 5;
export default function FemaleCandidate() {
  const [datauser, setDatauser] = useState([]);
  const [querry, setQuerry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(3);
  const getData = () => {
    axios
      .get(`${baseUrl}getAllFemale_Candidate_admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.Details);
        setDatauser(response.data.Details);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (newValue) => {
    setRating(newValue);
  };

  const handlechnage = (e) => {
    setQuerry(e.target.value);
  };

  const filterrdata = datauser.filter((item) => {
    return (
      item.first_Name.toLowerCase().includes(querry.toLowerCase()) ||
      item.last_Name.toLowerCase().includes(querry.toLowerCase()) ||
      item.user_Email.toLowerCase().includes(querry.toLowerCase()) ||
      item.city.toLowerCase().includes(querry.toLowerCase()) ||
      item.phone_no.toString().includes(querry.toLowerCase())
    );
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPage = Math.ceil(filterrdata.length / pageSize);
  const startindex = (currentPage - 1) * pageSize;
  const endIndex = startindex + pageSize;
  const currentdata = filterrdata.slice(startindex, endIndex);

  return (
    <>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">Elite Female Talent Pool</h4>
          </div>
        </div>
        <div className="container main_container">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <TextField
                id="outlined-size-small"
                size="small"
                label="Search by Email and City..."
                placeholder="Search"
                variant="outlined"
                value={querry}
                onChange={handlechnage}
              />
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Year of Experience</TableCell>
                  <TableCell>District</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>CV</TableCell>
                  <TableCell>Candidate Rating</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentdata &&
                  currentdata.length > 0 &&
                  currentdata.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{startindex + index + 1}</TableCell>
                        <TableCell>
                          {item.first_Name} {item.last_Name}
                        </TableCell>
                        <TableCell>{item.user_Email}</TableCell>
                        <TableCell>{item.phone_no}</TableCell>
                        <TableCell>{item.Total_experience} Yr</TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell>
                          <a
                            href={`${baseurlImage}${item.resume}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View CV
                          </a>
                        </TableCell>
                        <TableCell>
                          <Rating
                            count={5}
                            size={24}
                            value={item?.candidate_rating}
                            activeColor="#ffd700"
                            name="read-only"
                            readOnly
                          />
                        </TableCell>
                      </TableRow>
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
    </>
  );
}
