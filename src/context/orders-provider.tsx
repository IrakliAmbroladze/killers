import { Sheets_Invoice } from "@/types/invoices";
import { OrdersContext } from "./orders-context";
import { useReducer } from "react";
import { ordersReducer } from "./orders-reducer";

export const OrdersProvider = ({
  children,
  initialOrders,
}: {
  children: React.ReactNode;
  initialOrders: Sheets_Invoice[];
}) => {
  const [orders, dispatch] = useReducer(ordersReducer, initialOrders);

  return (
    <OrdersContext.Provider value={{ orders, dispatch }}>
      {children}
    </OrdersContext.Provider>
  );
};
