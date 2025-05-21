import type { Sheets_Invoice } from "@/types/invoices";

export type OrderModalAction =
  | { type: "OPEN_ORDER"; payload: Sheets_Invoice }
  | { type: "CLOSE_ORDER" }
  | { type: "SET_ORDER"; payload: Sheets_Invoice | null };

export function orderModalReducer(
  state: Sheets_Invoice | null,
  action: OrderModalAction
): Sheets_Invoice | null {
  switch (action.type) {
    case "OPEN_ORDER":
      return action.payload;
    case "CLOSE_ORDER":
      return null;
    case "SET_ORDER":
      return action.payload;
    default:
      return state;
  }
}
