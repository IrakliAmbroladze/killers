"use client";

import React from "react";
import { OrdersContext } from "@/context/orders-context";
import { Sheets_Invoice } from "@/types/invoices";

export default function OrdersWrapper({
  children,
  orders,
}: {
  children: React.ReactNode;
  orders: Sheets_Invoice[];
}) {
  return (
    <OrdersContext.Provider value={orders}>{children}</OrdersContext.Provider>
  );
}
