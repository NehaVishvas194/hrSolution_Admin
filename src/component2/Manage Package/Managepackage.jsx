import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Switch,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import { toast } from "react-toastify";

export default function ManagePackage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [datauser, setDatauser] = useState([]);
  const [datauser1, setDatauser1] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [isEditingYearly, setIsEditingYearly] = useState(true);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleToggle = (package_id, status) => {
    axios
      .post(`${baseUrl}active_inactive_Package/${package_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        getData();
        getData1();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const getData = () => {
    axios
      .get(`${baseUrl}get_allPackages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        
        setDatauser1(response.data.weekly_packages);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const getData1 = () => {
    axios
      .get(`${baseUrl}get_allPackages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response)
        setDatauser(response.data.yearly_packages);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    getData();
    getData1();
  }, []);

  const openModal = (package_id, isYearly) => {
    const editItem = isYearly
      ? datauser.find((item) => item.package_id === package_id)
      : datauser1.find((item) => item.package_id === package_id);
    setEditData(editItem);
    setIsEditingYearly(isYearly);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditData({});
    setIsEditingYearly(null); 
  };

  const handleChangeUpdateData = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdateData = () => {
    const updateUrl = isEditingYearly
      ? `${baseUrl}updatepackage/${editData.package_id}`
      : `${baseUrl}updatepackage/${editData.package_id}`;
    axios
      .put(updateUrl, editData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("Package updated successfully");
        closeModal();
        getData();
        getData1();
      })
      .catch((error) => {
        toast.error("Error updating package");
      });
  };
  return (
    <div className="content">
      <div className="row">
        <div className="col-md-12">
          <h4
            className=""
            style={{ padding: "10px 0px", margin: "0px 0px 0px 12px" }}
          >
            Manage packege
          </h4>
        </div>
      </div>
      <div className="main_container">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="Manage Package Tabs"
            centered
            sx={{ "& .MuiTab-root": { mx: 2 } }}
          >
            <Tab label="Yearly Packages" />
            <Tab label="Weekly Packages" />
          </Tabs>
          {selectedTab === 0 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">Yearly packages</Typography>
              <TableContainer component={Paper} className="mt-3">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr. No.</TableCell>
                      <TableCell>Package Name</TableCell>
                      <TableCell>Features</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datauser &&
                      datauser.map((item, index) => (
                        <TableRow key={item.package_id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.package_name}</TableCell>
                          <TableCell>{item.features}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell>
                            <Switch
                              checked={item.status === 1}
                              onChange={() => {
                                handleToggle(item.package_id, item.status);
                              }}
                              color="primary"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => openModal(item.package_id, true)}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          {selectedTab === 1 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">Weekly packages</Typography>
              <TableContainer component={Paper} className="mt-3">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr. No.</TableCell>
                      <TableCell>Package Name</TableCell>
                      <TableCell>Features</TableCell>
                      <TableCell>Package Price</TableCell>
                      <TableCell>Price with GST</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datauser1 &&
                      datauser1.map((item, index) => (
                        <TableRow key={item.package_id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.package_name}</TableCell>
                          <TableCell>{item.features}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell>{item.price_with_gst}</TableCell>
                          <TableCell>
                            <Switch
                              checked={item.status === 1}
                              onChange={() => {
                                handleToggle(item.package_id, item.status);
                              }}
                              color="primary"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => openModal(item.package_id, false)}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {isModalOpen && (
            <Modal open={isModalOpen} onClose={closeModal}>
              <Box
                sx={{
                  position: "absolute",
                  overflow: "auto",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 500,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                {isEditingYearly ? (
                  <p className="mb-3  fs-5">Yearly Package Update</p>
                ) : (
                  <p className="mb-3 fs-6">Weekly Package Update</p>
                )}
                <TextField
                  label="Package Name"
                  variant="outlined"
                  className="mb-3"
                  onChange={handleChangeUpdateData}
                  fullWidth
                  value={editData.package_name || ""}
                  name="package_name"
                />
                <TextField
                  label="Features"
                  variant="outlined"
                  className="mb-3"
                  onChange={handleChangeUpdateData}
                  fullWidth
                  value={editData.features || ""}
                  name="features"
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  className="mb-3"
                  onChange={handleChangeUpdateData}
                  fullWidth
                  value={editData.price || ""}
                  name="price"
                />
                {!isEditingYearly ? (
                  <TextField
                    label="Price(with GST)"
                    variant="outlined"
                    className="mb-3"
                    onChange={handleChangeUpdateData}
                    fullWidth
                    value={editData.price_with_gst || ""}
                    name="price"
                  />
                ) : (
                  ""
                )}
                {isEditingYearly ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateData}
                  >
                    Update Yearly Package
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateData}
                  >
                    Update Weekly Package
                  </Button>
                )}
              </Box>
            </Modal>
          )}
        </Box>
      </div>
    </div>
  );
}
