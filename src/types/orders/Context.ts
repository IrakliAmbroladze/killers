import type { Sheets_Invoice } from "@/types/invoices";

export interface Context {
  orders: Sheets_Invoice[];
  updateOrder: (order: Sheets_Invoice) => void;
}
