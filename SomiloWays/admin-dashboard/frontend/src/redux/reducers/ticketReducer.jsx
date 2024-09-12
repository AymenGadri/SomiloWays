import { GET_TICKETS, DELETE_TICKET } from "../actions/types";

const initialState = {
  tickets: [],
};

export default function ticketReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TICKETS:
      return { ...state, tickets: action.payload };
    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket) => ticket._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
