import { SET_AUTH_TOKEN, LOGOUT } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      localStorage.setItem("token", action.payload);
      return { ...state, token: action.payload };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, token: null };
    default:
      return state;
  }
}
