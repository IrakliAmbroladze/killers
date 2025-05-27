import { Sheets_Invoice } from "@/types/invoices";
import { Context } from "@/context/orders/Context";
import { useReducer, useMemo } from "react";
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
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateOrder = (order: Sheets_Invoice) =>
    dispatch(action.updateOrder(order));
  const addOrder = (order: Sheets_Invoice) => dispatch(action.addOrder(order));
  const setCurrentPage = (page: number) =>
    dispatch(action.setCurrentPage(page));

  // Pagination logic
  const paginatedOrders = useMemo(() => {
    const start = (state.currentPage - 1) * PAGE_SIZE;
    return state.orders.slice(start, start + PAGE_SIZE);
  }, [state.orders, state.currentPage]);

  const totalPages = Math.ceil(state.orders.length / PAGE_SIZE);

  return (
    <Context.Provider
      value={{
        orders: state.orders,
        paginatedOrders,
        updateOrder,
        addOrder,
        currentPage: state.currentPage,
        setCurrentPage,
        totalPages,
        pageSize: PAGE_SIZE,
      }}
    >
      {children}
    </Context.Provider>
  );
};
