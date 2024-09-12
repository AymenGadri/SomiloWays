import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { deleteTicket, setAuthToken, editTicket } from "../services/api";
import TicketModal from "./TicketModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import TicketDeletionModal from "./TicketDeletionModal";
import EditTicketModal from "./EditTicketModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const CustomDatePickerWrapper = styled.div`
    .react-datepicker-popper {
      z-index: 1000 !important;
    }
  `;

  const [anchorEls, setAnchorEls] = useState({});

  const handleClick = (event, ticketId) => {
    setAnchorEls((prevAnchorEls) => ({
      ...prevAnchorEls,
      [ticketId]: event.currentTarget,
    }));
  };

  const handleClose = (ticketId) => {
    setAnchorEls((prevAnchorEls) => ({
      ...prevAnchorEls,
      [ticketId]: null,
    }));
  };

  const handleDeleteClick = (id) => {
    setSelectedTicketId(id);
    setConfirmationOpen(true);
  };

  const handleEditClick = (ticket) => {
    setSelectedTicketId(ticket);
    setEditModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedTicketId) {
      try {
        await deleteTicket(selectedTicketId);
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket._id !== selectedTicketId)
        );
        setConfirmationOpen(false);
        setSelectedTicketId(null);
      } catch (error) {
        console.error("Error deleting ticket:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setConfirmationOpen(false);
    setSelectedTicketId(null);
  };

  const handleSaveChanges = async (id, updatedData) => {
    try {
      const response = await editTicket(id, updatedData);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === id ? response.data : ticket
        )
      );
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const handleDateRangeChange = async () => {
    if (startDate && endDate) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tickets/fetch?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        );
        const sortedTickets = response.data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });
        setTickets(sortedTickets);
      } catch (error) {
        console.error("Error fetching tickets by date range:", error);
      }
    }
  };

  const handleDownloadTicketCSV = () => {
    const filteredTickets = tickets.map((ticket) => ({
      from: ticket.from,
      to: ticket.to,
      date: new Date(ticket.date).toLocaleDateString(),
      departureTime: ticket.departureTime,
      arrivalTime: ticket.arrivalTime,
      seats: ticket.seats,
    }));

    const ws = XLSX.utils.json_to_sheet(filteredTickets, {
      header: ["from", "to", "date", "departureTime", "arrivalTime", "seats"],
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tickets");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    saveAs(
      blob,
      `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}.xlsx`
    );
  };

  const handleDownloadUsersCSV = (ticketId) => {
    const specificTicket = tickets.find((ticket) => ticket._id === ticketId);

    const ticketDate = new Date(specificTicket.date).toLocaleDateString();
    const departureTime = specificTicket.departureTime;
    const arrivalTime = specificTicket.arrivalTime;

    if (!specificTicket || !specificTicket.reservedBy) {
      console.error("Ticket not found or no reservedBy data available.");
      return;
    }

    const usernames = specificTicket.reservedBy.map((user) => user.username);

    const data = usernames.map((username) => ({ Passengers: username }));

    const ws = XLSX.utils.json_to_sheet(data, {
      header: ["Passengers"],
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Passengers");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([wbout], { type: "application/octet-stream" });

    saveAs(
      blob,
      `Passengers - ${ticketDate} - ${departureTime} - ${arrivalTime}.xlsx`
    );
  };

  return (
    <div>
      <div>
        <Typography variant="h4" gutterBottom>
          Tickets
        </Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          color="primary"
          style={{ marginBottom: "16px", width: "100%" }}
        >
          Create a Ticket
        </Button>
      </div>
      <Typography variant="h6" gutterBottom>
        Rechercher des tickets dans la base de données :
      </Typography>
      <div style={{ textAlign: "center", marginTop: "20px", zIndex: 2 }}>
        <div style={{ marginBottom: "20px" }}>
          <CustomDatePickerWrapper>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select start date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select end date"
            />
          </CustomDatePickerWrapper>
        </div>
        <Button
          onClick={handleDateRangeChange}
          variant="contained"
          color="secondary"
          style={{ marginLeft: "16px", marginBottom: "20px" }}
        >
          Filter by Date Range
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ textAlignLast: "center", maxHeight: 400 }}
      >
        <Table>
          <TableHead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              zIndex: 1,
            }}
          >
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Reserved By</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket._id}>
                <TableCell>{ticket.from}</TableCell>
                <TableCell>{ticket.to}</TableCell>
                <TableCell>
                  {new Date(ticket.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{ticket.departureTime}</TableCell>
                <TableCell>{ticket.arrivalTime}</TableCell>
                <TableCell>{ticket.seats}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(event) => handleClick(event, ticket._id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEls[ticket._id] || null}
                    open={Boolean(anchorEls[ticket._id])}
                    onClose={() => handleClose(ticket._id)}
                  >
                    {ticket.reservedBy.length > 0 ? (
                      ticket.reservedBy.map((user, index) => (
                        <MenuItem key={index} onClick={handleClose}>
                          <ListItemText primary={user.username} />
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>
                        <ListItemText primary="No reservations" />
                      </MenuItem>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: "15px" }}
                      onClick={() => handleDownloadUsersCSV(ticket._id)}
                    >
                      Download
                    </Button>
                  </Menu>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteClick(ticket._id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleEditClick(ticket)}
                    color="secondary"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: "right", marginTop: "16px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadTicketCSV}
        >
          Download as Excel
        </Button>
      </div>
      <TicketModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        refreshTickets={() => setTickets([])}
      />
      <TicketDeletionModal
        open={confirmationOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      {selectedTicketId && (
        <EditTicketModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          ticket={selectedTicketId}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default TicketList;
