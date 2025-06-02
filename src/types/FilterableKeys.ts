import { Sheets_Invoice } from "./invoices";

export type FilterableKeys = keyof Pick<
  Sheets_Invoice,
  "date" | "customer" | "email"
>;
