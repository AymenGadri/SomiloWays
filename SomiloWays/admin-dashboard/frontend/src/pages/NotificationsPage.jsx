import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import NotificationList from "../components/NotificationList";

const NotificationsPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Notifications
      </Typography>
      <Paper>
        <NotificationList />
      </Paper>
    </Container>
  );
};

export default NotificationsPage;
