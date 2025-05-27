import { Sheets_Invoice } from "../invoices";

export interface ReturnOrdersProps {
  pageSize: number;
  orders: Sheets_Invoice[];
  onSetStatus: (s: string) => void;
  onSetTitle: (t: string) => void;
  onOpenModal: (id: string | null) => void;
  modalIndex: string | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;

  totalOrders: number;
}
