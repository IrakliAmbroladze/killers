import React, { JSX } from "react";
import fetchOrders from "@/utils/server/fetch-orders";
import OrderModal from "@/components/order-modal";
import { Providers } from "@/context/Providers";
import { getEmployees } from "@/lib/getEmployees";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({
  children,
}: LayoutProps): Promise<JSX.Element> {
  const orders = await fetchOrders();

  const employees = await getEmployees();
  return (
    <Providers orders={orders} employees={employees}>
      <div className="w-full mt-10 sm:px-2.5">
        {children}
        <OrderModal />
      </div>
    </Providers>
  );
}
