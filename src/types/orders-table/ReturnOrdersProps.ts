import { Sheets_Invoice } from "../invoices";

export interface ReturnOrdersProps {
  onSetStatus: (status: string) => void;
  onSetTitle: (title: string) => void;
  onOpenModal: (index: string | null) => void;
  modalIndex: string | null;
  orders: Sheets_Invoice[];
}
