import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./redux/actions/authActions";
import { getTickets } from "./redux/actions/ticketActions";
import { getNotifications } from "./redux/actions/notificationActions";
import { getComplaints } from "./redux/actions/complaintsActions";
import Dashboard from "./components/Dashboard";
import TicketsPage from "./pages/TicketsPage";
import NotificationsPage from "./pages/NotificationsPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import AproposPage from "./pages/AproposPage";
import DashboardPage from "./pages/DashboardPage";
import PredictionsPage from "./pages/PredictionsPage";
import Login from "./components/Login";
import { setAuthToken as setToken } from "./services/api";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      dispatch(setAuthToken(storedToken));
    }
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      setToken(auth.token);
      dispatch(getTickets());
      dispatch(getNotifications());
      dispatch(getComplaints());
    }
  }, [auth.token, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/login"
        element={auth.token ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={auth.token ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/tickets"
        element={auth.token ? <TicketsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/notifications"
        element={auth.token ? <NotificationsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/diagrammes"
        element={auth.token ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/predictions"
        element={auth.token ? <PredictionsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/plaintes"
        element={auth.token ? <ComplaintsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/apropos"
        element={auth.token ? <AproposPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
