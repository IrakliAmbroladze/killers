import { Sheets_Invoice } from "@/types/invoices";

export interface ContextActions {
  updateOrder: (order: Sheets_Invoice) => void;
  addOrder: (order: Sheets_Invoice) => void;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  setFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  setSort: (column: keyof Sheets_Invoice, direction: "asc" | "desc") => void;
}
