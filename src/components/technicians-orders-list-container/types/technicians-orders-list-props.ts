import { Sheets_Invoice } from "@/types/invoices";

export interface TechniciansOrdersListProps {
  orders: Sheets_Invoice[] | null;
  title: string;
}
