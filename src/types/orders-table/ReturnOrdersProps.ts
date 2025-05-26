import { Sheets_Invoice } from "../invoices";

export interface ReturnOrdersProps {
  orders: Sheets_Invoice[];
  onSetStatus: (s: string) => void;
  onSetTitle: (t: string) => void;
  onOpenModal: (id: string | null) => void;
  modalIndex: string | null;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalOrders: number;
}
