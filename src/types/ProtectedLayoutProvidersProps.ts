import { Sheets_Invoice } from "./invoices";

export interface ProtectedLayoutProvidersProps {
  children: React.ReactNode;
  orders?: Sheets_Invoice[];
}
