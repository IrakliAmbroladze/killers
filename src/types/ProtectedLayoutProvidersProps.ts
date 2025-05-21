import { Sheets_Invoice } from "@/types/invoices";

export interface ProtectedLayoutProvidersProps {
  children: React.ReactNode;
  orders?: Sheets_Invoice[];
}
