"use client";
import { ProtectedLayoutProvidersProps } from "@/types/ProtectedLayoutProvidersProps";
import React from "react";
import { OrdersProvider } from "@/context/orders-provider";
import { OrderModalProvider } from "@/context/OrderModalProvider";

const ProtectedLayoutProviders = ({
  children,
  orders = [],
}: ProtectedLayoutProvidersProps) => {
  return (
    <OrdersProvider initialOrders={orders}>
      <OrderModalProvider>{children}</OrderModalProvider>
    </OrdersProvider>
  );
};

export default ProtectedLayoutProviders;
