import type { Sheets_Invoice } from "@/types/invoices";

export interface Context {
  orders: Sheets_Invoice[];
  paginatedOrders: Sheets_Invoice[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  totalPages: number;
  updateOrder: (order: Sheets_Invoice) => void;
  addOrder: (order: Sheets_Invoice) => void;
}
