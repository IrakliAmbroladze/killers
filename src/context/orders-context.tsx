"use client";
import type { OrdersContextType } from "@/types/orders-types";
import { createContext } from "react";

export const OrdersContext = createContext<OrdersContextType | undefined>(
  undefined
);
