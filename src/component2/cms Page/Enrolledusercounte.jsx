import React from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
export default function Enrolledusercounte() {
  const location = useLocation();
  const data = location.state.data;
  return (
    <div className="main_container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone No</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                return (
                  <>
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {item.first_name} {item.last_name}
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phone_no}</TableCell>
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
