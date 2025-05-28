import { Sheets_Invoice } from "@/types/invoices";
import { Context } from "@/context/orders/Context";
import { useReducer } from "react";
import { reducer } from "./reducer";
import * as action from "./action";
import { State } from "@/types/orders/State";

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
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateOrder = (order: Sheets_Invoice) =>
    dispatch(action.updateOrder(order));
  const addOrder = (order: Sheets_Invoice) => dispatch(action.addOrder(order));
  const setCurrentPage = (page: number) =>
    dispatch(action.setCurrentPage(page));
  const setSearchTerm = (term: string) => dispatch(action.setSearchTerm(term));

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
      }}
    >
      {children}
    </Context.Provider>
  );
};
