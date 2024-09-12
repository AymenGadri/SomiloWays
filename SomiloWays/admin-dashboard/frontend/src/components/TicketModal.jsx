import React, { useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTicket } from "../services/api";

const TicketModal = ({ open, handleClose, refreshTickets }) => {
  const [ticket, setTicket] = useState({
    from: "",
    to: "",
    date: "",
    departureTime: "",
    arrivalTime: "",
    seats: "",
  });

  const CustomDatePickerWrapper = styled.div`
    .react-datepicker-popper {
      z-index: 1000 !important;
    }
  `;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    if (date) {
      date.setUTCHours(0, 0, 0, 0);
      setTicket((prev) => ({ ...prev, date: date.toISOString() }));
    }
  };

  const handleSubmit = async () => {
    try {
      await createTicket(ticket);
      refreshTickets();
      handleClose();
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          padding: 2,
          margin: "auto",
          marginTop: "20vh",
          backgroundColor: "white",
        }}
      >
        <FormControl fullWidth margin="normal">
          <InputLabel id="from-label">From</InputLabel>
          <Select
            labelId="from-label"
            id="from"
            name="from"
            value={ticket.from}
            onChange={handleChange}
            label="From"
          >
            <MenuItem value="">Select location</MenuItem>
            <MenuItem value="location1">Location 1</MenuItem>
            <MenuItem value="location2">Location 2</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="to-label">To</InputLabel>
          <Select
            labelId="to-label"
            id="to"
            name="to"
            value={ticket.to}
            onChange={handleChange}
            label="To"
          >
            <MenuItem value="">Select location</MenuItem>
            <MenuItem value="location1">Location 1</MenuItem>
            <MenuItem value="location2">Location 2</MenuItem>
          </Select>
        </FormControl>
        <CustomDatePickerWrapper>
          <DatePicker
            id="date"
            selected={ticket.date ? new Date(ticket.date) : null}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="form-control"
          />
        </CustomDatePickerWrapper>
        <TextField
          label="Departure Time"
          name="departureTime"
          value={ticket.departureTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Arrival Time"
          name="arrivalTime"
          value={ticket.arrivalTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Seats"
          name="seats"
          type="number"
          value={ticket.seats}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create Ticket
        </Button>
      </Box>
    </Modal>
  );
};

export default TicketModal;
