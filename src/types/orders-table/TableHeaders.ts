import { Sheets_Invoice } from "../invoices";

export type TableHeaders = {
  display: string;
  value: keyof Sheets_Invoice;
  hidden: boolean;
};
