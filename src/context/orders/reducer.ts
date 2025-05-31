import { Action } from "@/types/orders/Actions";
import { State } from "@/types/orders/State";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
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
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
        },
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {},
      };
    case "SET_SORT":
      return {
        ...state,
        sort: action.payload,
      };

    default:
      return state;
  }
}
