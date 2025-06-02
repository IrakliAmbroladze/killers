import { Sheets_Invoice } from "../invoices";

export type SetSort = (
  column: keyof Sheets_Invoice,
  direction: "asc" | "desc"
) => void;
