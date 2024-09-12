import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/complaint/fetch"
      );
      setComplaints(response.data);
      console.log("response: ", response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/complaint/${id}`);
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Plaintes
      </Typography>
      <List>
        {complaints.map((complaint) => (
          <ListItem
            key={complaint._id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                style={{ color: "#666" }}
                onClick={() => handleDelete(complaint._id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  component="div"
                  style={{ color: "#ff1744", fontWeight: "bold" }}
                >
                  {complaint.title}
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
                  {complaint.image && (
                    <img
                      src={
                        "https://www.shutterstock.com/image-photo/explain-vs-complain-symbol-male-260nw-1878145975.jpg"
                      }
                      alt="Complaint"
                      style={{
                        width: "250px",
                        height: "200px",
                        objectFit: "contain",
                        borderRadius: "8px",
                        marginRight: "15px",
                      }}
                    />
                  )}
                  <Typography
                    variant="body2"
                    component="div"
                    style={{
                      color: "#666",
                      lineHeight: "1.5",
                      width: "300px",
                      wordWrap: "break-word",
                    }}
                  >
                    {complaint.message}
                  </Typography>
                </div>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ComplaintList;
