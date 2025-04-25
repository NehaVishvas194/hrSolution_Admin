import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Firsttab from "./Firsttab";
import Secondtab from "./Secondtab";
import Thirdtab from "./Thirdtab";
import Fourthtab from "./Fourthtab";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Labourlaw() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">Basic Labour Templates</h4>
          </div>
        </div>
        <div className="container main_container">
          <div className="row">
            <div className="col-md-12">
              <Box sx={{ width: "100%" }}>
                <Box>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{ backgroundColor: "#F5F5F5" }} 
                  >
                    <Tab
                      label="EOSB Computation"
                      {...a11yProps(0)}
                      sx={{ backgroundColor: "blue !important", color: "white" }} 
                    />
                    <Tab
                      label="Leave Allowance"
                      {...a11yProps(1)}
                      className="tabsColor"
                    />
                    <Tab
                      label="Over Time"
                      {...a11yProps(2)}
                      className="tabsColor"
                    />
                    <Tab
                      label="Basic Salary to Net"
                      {...a11yProps(3)}
                      style={{ backgroundColor: "cyan !important" }}
                    />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <Firsttab />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <Secondtab />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <Thirdtab />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                  <Fourthtab />
                </CustomTabPanel>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
