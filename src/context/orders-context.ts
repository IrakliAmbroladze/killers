"use client";

import { Sheets_Invoice } from "@/types/invoices";
import { createContext, useContext } from "react";

export const OrdersContext = createContext<Sheets_Invoice[] | null>(null);

export const useOrders = () => useContext(OrdersContext);
