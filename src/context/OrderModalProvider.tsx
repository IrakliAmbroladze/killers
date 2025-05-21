import type { Sheets_Invoice } from "@/types/invoices";
import { useReducer } from "react";
import { OrderModalContext } from "@/context/order-modal-context";
import { orderModalReducer } from "@/context/orderModalReducer";
import * as Action from "./orderModalActions";

export const OrderModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [order, dispatch] = useReducer(orderModalReducer, null);

  const openOrder = (order: Sheets_Invoice) =>
    dispatch(Action.openOrderAction(order));
  const closeOrder = () => dispatch(Action.closeOrderAction());
  const setOrder = (order: Sheets_Invoice) =>
    dispatch(Action.setOrderAction(order));

  return (
    <OrderModalContext.Provider
      value={{ order, openOrder, closeOrder, setOrder }}
    >
      {children}
    </OrderModalContext.Provider>
  );
};
