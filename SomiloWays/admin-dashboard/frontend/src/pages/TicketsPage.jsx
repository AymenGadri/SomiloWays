import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import TicketList from "../components/TicketList";

const TicketsPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Tickets
      </Typography>
      <Paper>
        <TicketList />
      </Paper>
    </Container>
  );
};

export default TicketsPage;
