import axios from "axios";
import { GET_COMPLAINTS, DELETE_COMPLAINT } from "./types";

export const getComplaints = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/complaints");
    dispatch({
      type: GET_COMPLAINTS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching complaints:", error);
  }
};

export const deleteComplaint = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/complaints/${id}`);
    dispatch({
      type: DELETE_COMPLAINT,
      payload: id,
    });
  } catch (error) {
    console.error("Error deleting complaint:", error);
  }
};
