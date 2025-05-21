import { Sheets_Invoice } from "@/types/invoices";

export type OrdersAction =
  | { type: "SET_ORDERS"; payload: Sheets_Invoice[] }
  | { type: "UPDATE_ORDER"; payload: Sheets_Invoice };
