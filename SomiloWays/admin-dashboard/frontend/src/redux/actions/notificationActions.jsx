import axios from "axios";
import { GET_NOTIFICATIONS, DELETE_NOTIFICATION } from "./types";

export const getNotifications = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/notifications");
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

export const deleteNotification = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/notifications/${id}`);
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: id,
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
  }
};
