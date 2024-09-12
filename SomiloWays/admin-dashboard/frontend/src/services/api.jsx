import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const login = (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const fetchTickets = () => {
  return axios.get(`${API_URL}/tickets/fetch`);
};

export const deleteTicket = (id) => {
  return axios.delete(`${API_URL}/tickets/${id}`);
};

export const createTicket = (ticketData) =>
  axios.post(`${API_URL}/tickets/create`, ticketData);

export const editTicket = (id, updatedData) =>
  axios.put(`${API_URL}/tickets/${id}`, updatedData);

export const fetchNotifications = () => {
  return axios.get(`${API_URL}/notifications`);
};

export const createInfo = (infoData) =>
  axios.post(`${API_URL}/info/create`, infoData);

export const deleteNotification = (id) => {
  return axios.delete(`${API_URL}/notifications/${id}`);
};
