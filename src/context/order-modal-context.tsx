"use client";

import { createContext, useContext, useState } from "react";
import { Sheets_Invoice } from "@/types/invoices";

interface ModalContextType {
  order: Sheets_Invoice | null;
  openOrder: (order: Sheets_Invoice) => void;
  closeOrder: () => void;
}

const OrderModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const OrderModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [order, setOrder] = useState<Sheets_Invoice | null>(null);

  const openOrder = (order: Sheets_Invoice) => setOrder(order);
  const closeOrder = () => setOrder(null);

  return (
    <OrderModalContext.Provider value={{ order, openOrder, closeOrder }}>
      {children}
    </OrderModalContext.Provider>
  );
};

export const useOrderModal = () => {
  const ctx = useContext(OrderModalContext);
  if (!ctx)
    throw new Error("useOrderModal must be used within OrderModalProvider");
  return ctx;
};
