import { Sheets_Invoice } from "../invoices";

export type State = {
  orders: Sheets_Invoice[];
  currentPage: number;
};
