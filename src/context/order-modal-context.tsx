"use client";

import { createContext, useState } from "react";
import { Sheets_Invoice } from "@/types/invoices";

interface ModalContextType {
  order: Sheets_Invoice | null;
  openOrder: (order: Sheets_Invoice) => void;
  closeOrder: () => void;
  setOrder: (order: Sheets_Invoice) => void;
}

export const OrderModalContext = createContext<ModalContextType | undefined>(
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
    <OrderModalContext.Provider
      value={{ order, openOrder, closeOrder, setOrder }}
    >
      {children}
    </OrderModalContext.Provider>
  );
};
