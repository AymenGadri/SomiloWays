import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const EditTicketModal = ({ open, onClose, ticket, onSave }) => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    departureTime: "",
    arrivalTime: "",
    seats: "",
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        from: ticket.from,
        to: ticket.to,
        date: ticket.date,
        departureTime: ticket.departureTime,
        arrivalTime: ticket.arrivalTime,
        seats: ticket.seats,
      });
    }
  }, [ticket]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(ticket._id, formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit Ticket
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="From"
          name="from"
          value={formData.from}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="To"
          name="to"
          value={formData.to}
          onChange={handleChange}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Departure Time"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Arrival Time"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Seats"
          name="seats"
          type="number"
          value={formData.seats}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleSubmit} variant="contained">
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTicketModal;
