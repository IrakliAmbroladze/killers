import { Sheets_Invoice } from "../invoices";

export type State = {
  orders: Sheets_Invoice[];
  currentPage: number;
  searchTerm: string;
  pageSize: number;
  filters: { [key: string]: string };
  sort: { column: keyof Sheets_Invoice; direction: "asc" | "desc" } | null;
};
