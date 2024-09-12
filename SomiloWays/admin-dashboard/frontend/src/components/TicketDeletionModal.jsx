import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TicketDeletionModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" color="black">
          Are you sure you want to delete this ticket?
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} variant="outlined" sx={{ mr: 2 }}>
            No
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TicketDeletionModal;
