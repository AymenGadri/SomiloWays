import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import image from "../assets/powerbi.png";

const DashboardPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Visiualisations des données | Under Construction
      </Typography>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <img style={{ width: "inherit" }} src={image} alt="" />
      </Box>
    </Container>
  );
};

export default DashboardPage;
