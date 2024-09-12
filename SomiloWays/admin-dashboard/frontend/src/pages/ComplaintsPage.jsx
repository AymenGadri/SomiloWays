import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import ComplaintList from "../components/ComplaintList";

const ComplaintsPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Complaints
      </Typography>
      <Paper>
        <ComplaintList />
      </Paper>
    </Container>
  );
};

export default ComplaintsPage;
