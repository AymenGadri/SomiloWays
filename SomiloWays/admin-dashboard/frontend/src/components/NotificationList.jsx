import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import InfoModal from "./InfoModal";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/info/fetch");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const refreshInfos = () => {
    fetchNotifications();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/info/${id}`);
      setNotifications(
        notifications.filter((notification) => notification._id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div>
      <div>
        <Typography variant="h4" gutterBottom>
          Informations
        </Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          color="primary"
          style={{ marginBottom: "16px", width: "100%" }}
        >
          Share information
        </Button>
      </div>
      <List>
        {notifications.map((notification) => (
          <ListItem
            key={notification._id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                style={{ color: "#666" }}
                onClick={() => handleDelete(notification._id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  style={{ color: "redx", fontWeight: "bold" }}
                >
                  {notification.title}
                </Typography>
              }
              secondary={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <img
                    src={notification.image}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "15px",
                    }}
                  />
                  <Typography
                    variant="body2"
                    style={{
                      color: "#666",
                      lineHeight: "1.5",
                      width: "300px",
                      wordWrap: "break-word",
                    }}
                  >
                    {notification.text}
                  </Typography>
                </div>
              }
            />
          </ListItem>
        ))}
      </List>
      <InfoModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        refreshInfos={refreshInfos}
      />
    </div>
  );
};

export default NotificationList;
