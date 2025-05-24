import { Sheets_Invoice } from "@/types/invoices";
import { Action } from "@/types/orders/Action";

export function reducer(
  state: Sheets_Invoice[],
  action: Action
): Sheets_Invoice[] {
  switch (action.type) {
    case "SET_ORDERS":
      return action.payload;
    case "UPDATE_ORDER":
      return state.map((order) =>
        order.order_id === action.payload.order_id ? action.payload : order
      );

    default:
      return state;
  }
}
