"use client";
import { createContext, useState } from "react";
import { Sheets_Invoice } from "@/types/invoices";

interface OrdersContextType {
  orders: Sheets_Invoice[];
  setOrders: (orders: Sheets_Invoice[]) => void;
  updateSingleOrder: (updatedOrder: Sheets_Invoice) => void;
}

export const OrdersContext = createContext<OrdersContextType | undefined>(
  undefined
);

export const OrdersProvider = ({
  children,
  initialOrders,
}: {
  children: React.ReactNode;
  initialOrders: Sheets_Invoice[];
}) => {
  const [orders, setOrders] = useState<Sheets_Invoice[]>(initialOrders);

  const updateSingleOrder = (updatedOrder: Sheets_Invoice) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.order_id === updatedOrder.order_id ? updatedOrder : order
      )
    );
  };

  return (
    <OrdersContext.Provider value={{ orders, setOrders, updateSingleOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};
