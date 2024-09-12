import axios from "axios";
import { GET_TICKETS, DELETE_TICKET } from "./types";

export const getTickets = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/tickets");
    dispatch({
      type: GET_TICKETS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
};

export const deleteTicket = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/tickets/${id}`);
    dispatch({
      type: DELETE_TICKET,
      payload: id,
    });
  } catch (error) {
    console.error("Error deleting ticket:", error);
  }
};
