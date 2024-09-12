import { GET_NOTIFICATIONS, DELETE_NOTIFICATION } from "../actions/types";

const initialState = {
  notifications: [],
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
