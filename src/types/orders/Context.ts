import type { Sheets_Invoice } from "@/types/invoices";

export interface Context {
  orders: Sheets_Invoice[];
  updateOrder: (order: Sheets_Invoice) => void;
  addOrder: (order: Sheets_Invoice) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  pageSize: number;
}
