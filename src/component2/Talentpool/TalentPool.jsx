import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../features/Api/BaseUrl";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
const pageSize = 5;

export default function TalentPool() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getdatay = () => {
    axios
      .get(`${baseUrl}getAll_candidates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data.candidates);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getdatay();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPage = Math.ceil(data.length / pageSize);
  const startindex = (currentPage - 1) * pageSize;
  const endIndex = startindex + pageSize;
  const currentdata = data.slice(startindex, endIndex);

  return (
    <div>
      <p className="text-center fw-bold fs-3 my-5" style={{ color: "#000" }}>
        Talent Pool
      </p>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Years of Experience</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Area of Specialization</TableCell>
              <TableCell>Profile Summary</TableCell>
              <TableCell>Handy help Rating</TableCell>
              <TableCell></TableCell>
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
                      <TableCell>
                        {item.first_Name} {item.last_Name}
                      </TableCell>
                      <TableCell>{item.candidate_email}</TableCell>
                      <TableCell>{item.phone_no}</TableCell>
                      <TableCell>{item.Total_experience}</TableCell>
                      <TableCell>{item.gender}</TableCell>
                      <TableCell>{item.gender}</TableCell>
                      <TableCell>{item.gender}</TableCell>
                      <TableCell>{item.gender}</TableCell>
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
    </div>
  );
}
