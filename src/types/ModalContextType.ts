import type { Sheets_Invoice } from "@/types/invoices";

export interface ModalContextType {
  order: Sheets_Invoice | null;
  openOrder: (order: Sheets_Invoice) => void;
  closeOrder: () => void;
  setOrder: (order: Sheets_Invoice) => void;
}
