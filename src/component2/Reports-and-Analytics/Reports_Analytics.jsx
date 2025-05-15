import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Chart1 from "./Chart1";
import Chart3 from "./Chart3";
import Chart4 from "./Chart4";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Reports_Analytics() {
  return (
    <div className="main_container">
      <div className="container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} className="mb-3">
            <Grid item xs={6}>
              <Item>
                <Chart1 />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Chart3 />
              </Item>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} className="mb-3">
            <Grid item xs={6}>
              <Item>
                <Chart4 />
              </Item>
            </Grid>
            {/* <Grid item xs={6}>
              <Item>
                {/* <Chart1 /> */}
            {/* </Item>
            </Grid> */}
          </Grid>
        </Box>
      </div>
    </div>
  );
}
