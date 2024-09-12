import { SET_AUTH_TOKEN, LOGOUT } from "./types";

export const setAuthToken = (token) => (dispatch) => {
  localStorage.setItem("authToken", token);

  dispatch({
    type: SET_AUTH_TOKEN,
    payload: token,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
