import { Sheets_Invoice } from "@/types/invoices";
import { SetSort } from "./SetSort";

export interface ContextActions {
  deleteOrder: (order: Sheets_Invoice) => void;
  updateOrder: (order: Sheets_Invoice) => void;
  addOrder: (order: Sheets_Invoice) => void;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  setFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  setSort: SetSort;
}
