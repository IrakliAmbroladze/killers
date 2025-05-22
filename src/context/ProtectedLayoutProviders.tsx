"use client";
import { ProtectedLayoutProvidersProps } from "@/types/ProtectedLayoutProvidersProps";
import React from "react";
import { OrdersProvider } from "@/context/orders-provider";
import { OrderModalProvider } from "@/context/OrderModalProvider";
import { EmployeesProvider } from "./EmployeesProvider";

const ProtectedLayoutProviders = ({
  children,
  orders = [],
  employees = [],
}: ProtectedLayoutProvidersProps) => {
  return (
    <OrdersProvider initialOrders={orders}>
      <OrderModalProvider>
        <EmployeesProvider employees={employees}>{children}</EmployeesProvider>
      </OrderModalProvider>
    </OrdersProvider>
  );
};

export default ProtectedLayoutProviders;
