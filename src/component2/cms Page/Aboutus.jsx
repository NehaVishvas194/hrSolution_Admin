import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
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
  Modal,
  Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
export default function Aboutus() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({ Heading: "", Description: "" });
  const [open, setOpen] = useState(false);
  const userid = localStorage.getItem("id");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}get_aboutUS_details_admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.Details);
      setData(response.data.Details);
      if (response.data.Details.length > 0) {
        setData1(response.data.Details[0]);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error fetching data:");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleApi = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}cms_aboutUs`,
        {
          Heading: data1.Heading,
          Description: data1.Description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
      fetchData();
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.message || "Error posting data");
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="container main_container">
        <Button
          variant="contained"
          className="me-3 mb-3"
          onClick={handleOpen}
          style={{ backgroundColor: "#2b6166", color: "#ffffff" }}
        >
          Update
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <div className="d-flex flex-column gap-2">
              <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="Heading"
                label="Heading"
                variant="outlined"
                value={data1.Heading}
              />
              <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="Description"
                label="Description"
                variant="outlined"
                margin="normal"
                value={data1.Description}
              />
              <Button
                variant="contained"
                onClick={handleApi}
                style={{
                  backgroundColor: "#2b6166",
                  color: "#ffffff",
                  marginTop: "10px",
                }}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Modal>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Heading</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.length > 0 &&
                data.map((item, index) => {
                  console.log(item);
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.Heading}</TableCell>
                      <TableCell>{item.Description}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <ToastContainer />
        </TableContainer>
      </div>
    </>
  );
}
