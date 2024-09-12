import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import Styles from "../styles/SidebarCss";
import icon from "../assets/headerIcon.png";

const drawerWidth = 150;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#252830",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  height: "79px",
  alignItems: "center",
  alignSelf: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  backgroundColor: "#252830",
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...openedMixin(theme),
  "& .MuiDrawer-paper": openedMixin(theme),
}));

const Sidebar = ({ onSelect }) => {
  const [selectedItem, setSelectedItem] = useState("tickets");

  useEffect(() => {
    const storedSection = localStorage.getItem("selectedItem");
    if (storedSection) {
      setSelectedItem(storedSection);
    }
  }, []);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
    localStorage.setItem("selectedItem", item);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("token");
      localStorage.removeItem("selectedItem");
      localStorage.removeItem("selectedSection");
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open>
        <DrawerHeader>
          <img src={icon} style={{ height: "60px" }} />
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "#5f6368" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <List style={Styles.list}>
            <ListItem
              button
              onClick={() => handleSelect("tickets")}
              selected={selectedItem === "tickets"}
              sx={{
                color: selectedItem === "tickets" ? "#C79352" : "white",
              }}
            >
              <ListItemText
                primary="Tickets"
                sx={{
                  color: selectedItem === "tickets" ? "#C79352" : "white",
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => handleSelect("notifications")}
              selected={selectedItem === "notifications"}
              sx={{
                color: selectedItem === "notifications" ? "#C79352" : "white",
              }}
            >
              <ListItemText
                primary="Notifications"
                sx={{
                  color: selectedItem === "notifications" ? "#C79352" : "white",
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => handleSelect("plaintes")}
              selected={selectedItem === "plaintes"}
              sx={{
                color: selectedItem === "plaintes" ? "#C79352" : "white",
              }}
            >
              <ListItemText
                primary="Plaintes"
                sx={{
                  color: selectedItem === "plaintes" ? "#C79352" : "white",
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => handleSelect("Dashboard")}
              selected={selectedItem === "Dashboard"}
              sx={{
                color: selectedItem === "Dashboard" ? "#C79352" : "white",
              }}
            >
              <ListItemText
                primary="Dashboard"
                sx={{
                  color: selectedItem === "Dashboard" ? "#C79352" : "white",
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => handleSelect("Prédictions")}
              selected={selectedItem === "Prédictions"}
              sx={{
                color: selectedItem === "Prédictions" ? "#C79352" : "white",
              }}
            >
              <ListItemText
                primary="Prédictions"
                sx={{
                  color: selectedItem === "Prédictions" ? "#C79352" : "white",
                }}
              />
            </ListItem>
          </List>
          <Divider sx={{ backgroundColor: "#5f6368" }} />
          <List style={Styles.bottomList}>
            <ListItem button onClick={() => handleSelect("apropos")}>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <InfoIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="À propos" sx={{ color: "white" }} />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <LogoutIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: "white" }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
