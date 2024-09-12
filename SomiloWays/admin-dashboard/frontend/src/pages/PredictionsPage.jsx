import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import image from "../assets/prediction.jpg";

const PredictionsPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Prédiction | Under Construction
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

export default PredictionsPage;
