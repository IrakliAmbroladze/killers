import { Sheets_Invoice } from "@/types/invoices";
import { Employee } from "./Employee";

export interface ProvidersProps {
  children: React.ReactNode;
  orders?: Sheets_Invoice[];
  employees?: Employee[];
}
