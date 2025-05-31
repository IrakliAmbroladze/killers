import { Sheets_Invoice } from "@/types/invoices";
import { Context } from "@/context/orders/Context";
import { useReducer } from "react";
import { reducer } from "./reducer";
import { State } from "@/types/orders/State";
import { useOrderActions } from "./hooks/useOrderActions";

const PAGE_SIZE = 10;

export const Provider = ({
  children,
  initialOrders,
}: {
  children: React.ReactNode;
  initialOrders: Sheets_Invoice[];
}) => {
  const initialState: State = {
    orders: initialOrders,
    currentPage: 1,
    searchTerm: "",
    filters: {},
    sort: null,
    pageSize: PAGE_SIZE,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    updateOrder,
    addOrder,
    setCurrentPage,
    setSearchTerm,
    setFilter,
    clearFilters,
    setSort,
  } = useOrderActions(dispatch);

  return (
    <Context.Provider
      value={{
        orders: state.orders,
        updateOrder,
        addOrder,
        currentPage: state.currentPage,
        setCurrentPage,
        searchTerm: state.searchTerm,
        setSearchTerm,
        pageSize: PAGE_SIZE,
        filters: state.filters,
        setFilter,
        clearFilters,
        sort: state.sort,
        setSort,
      }}
    >
      {children}
    </Context.Provider>
  );
};
