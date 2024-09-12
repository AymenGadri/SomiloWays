import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, Box, Alert } from "@mui/material";
import TicketList from "./TicketList";
import NotificationList from "./NotificationList";
import ComplaintList from "./ComplaintList";
import AproposPage from "../pages/AproposPage";
import Sidebar from "../components/Sidebar";
import DashboardPage from "../pages/DashboardPage";
import PredictionsPage from "../pages/PredictionsPage";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("tickets");

  useEffect(() => {
    const storedSection = localStorage.getItem("selectedSection");
    if (storedSection) {
      setSelectedSection(storedSection);
    }
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSelectSection = (section) => {
    setSelectedSection(section);
    setDrawerOpen(false);
    localStorage.setItem("selectedSection", section);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        onSelect={handleSelectSection}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "-webkit-fill-available",
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
            marginLeft: "80px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Admin Control Room
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              background: "none",
            }}
          >
            {selectedSection === "tickets" && <TicketList />}
            {selectedSection === "notifications" && <NotificationList />}
            {selectedSection === "plaintes" && <ComplaintList />}
            {selectedSection === "Dashboard" && <DashboardPage />}
            {selectedSection === "Prédictions" && <PredictionsPage />}
            {selectedSection === "apropos" && <AproposPage />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
