import { Sheets_Invoice } from "@/types/invoices";
import { createAction } from "@/utils/createAction";

export const updateOrder = (order: Sheets_Invoice) =>
  createAction("UPDATE_ORDER", order);

export const addOrder = (order: Sheets_Invoice) =>
  createAction("ADD_ORDER", order);

export const setCurrentPage = (page: number) =>
  createAction("SET_CURRENT_PAGE", page);

export const setSearchTerm = (term: string) =>
  createAction("SET_SEARCH_TERM", term);
