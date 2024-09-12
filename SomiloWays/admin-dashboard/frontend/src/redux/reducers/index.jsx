import { combineReducers } from "redux";
import authReducer from "./authReducer";
import ticketReducer from "./ticketReducer";
import notificationReducer from "./notificationReducer";

export default combineReducers({
  auth: authReducer,
  tickets: ticketReducer,
  notifications: notificationReducer,
});
