"use client";

import React from "react";
import { OrdersProvider } from "@/context/orders-context";
import { Sheets_Invoice } from "@/types/invoices";

export default function OrdersWrapper({
  children,
  orders,
}: {
  children: React.ReactNode;
  orders: Sheets_Invoice[];
}) {
  return <OrdersProvider initialOrders={orders}>{children}</OrdersProvider>;
}
