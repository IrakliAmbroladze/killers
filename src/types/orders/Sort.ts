import { Sheets_Invoice } from "../invoices";

export type Sort = {
  column: keyof Sheets_Invoice;
  direction: "asc" | "desc";
} | null;
