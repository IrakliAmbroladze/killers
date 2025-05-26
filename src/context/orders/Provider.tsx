import { Sheets_Invoice } from "@/types/invoices";
import { Context } from "@/context/orders/Context";
import { useReducer } from "react";
import { reducer } from "./reducer";
import * as action from "./action";

export const Provider = ({
  children,
  initialOrders,
}: {
  children: React.ReactNode;
  initialOrders: Sheets_Invoice[];
}) => {
  const [orders, dispatch] = useReducer(reducer, initialOrders);

  const updateOrder = (order: Sheets_Invoice) =>
    dispatch(action.updateOrder(order));
  const addOrder = (order: Sheets_Invoice) => dispatch(action.addOrder(order));

  return (
    <Context.Provider value={{ orders, updateOrder, addOrder }}>
      {children}
    </Context.Provider>
  );
};
