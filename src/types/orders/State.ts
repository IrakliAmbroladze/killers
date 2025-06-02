import { Sheets_Invoice } from "../invoices";
import { Filters } from "./Filters";
import { Sort } from "./Sort";

export type State = {
  orders: Sheets_Invoice[];
  currentPage: number;
  searchTerm: string;
  pageSize: number;
  filters: Filters;
  sort: Sort;
};
