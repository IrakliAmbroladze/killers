"use client";
import { ProvidersProps } from "@/types/ProvidersProps";
import React from "react";
import { Provider as Orders } from "@/context/orders/Provider";
import { Provider as OrderModal } from "@/context/order-modal/Provider";
import { Provider as Employees } from "@/context/employees/Provider";
import { Provider as Year } from "@/context/year/Provider";
import { Provider as CommentsProvider } from "@/context/comments-quantities/Provider";

// Protected Layout Providers
export const Providers = ({
  children,
  orders = [],
  employees = [],
  CommentsQuantities = [],
}: ProvidersProps) => {
  return (
    <Orders initialOrders={orders}>
      <CommentsProvider initialCommentsQuantities={CommentsQuantities}>
        <OrderModal>
          <Employees employees={employees}>
            <Year>{children}</Year>
          </Employees>
        </OrderModal>
      </CommentsProvider>
    </Orders>
  );
};
