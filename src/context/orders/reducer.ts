import { Action } from "@/types/orders/Action";
import { State } from "@/types/orders/State";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ORDERS":
      return { ...state };
    case "UPDATE_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.order_id === action.payload.order_id ? action.payload : order
        ),
      };
    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
}
