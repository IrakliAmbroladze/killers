import { Sheets_Invoice } from "@/types/invoices";
import { Action } from "@/types/orders/Actions";
import * as action from "../action";

export const useOrderActions = (dispatch: React.Dispatch<Action>) => ({
  updateOrder: (order: Sheets_Invoice) => dispatch(action.updateOrder(order)),
  addOrder: (order: Sheets_Invoice) => dispatch(action.addOrder(order)),
  setCurrentPage: (page: number) => dispatch(action.setCurrentPage(page)),
  setSearchTerm: (term: string) => dispatch(action.setSearchTerm(term)),
  setFilter: (key: string, value: string) =>
    dispatch(action.setFilter({ key, value })),
  clearFilters: () => dispatch(action.clearFilters()),
  setSort: (column: keyof Sheets_Invoice, direction: "asc" | "desc") =>
    dispatch(action.setSort({ column, direction })),
});
