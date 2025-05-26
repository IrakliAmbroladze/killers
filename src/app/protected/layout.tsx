import React, { JSX } from "react";
import SideNav from "@/components/ui/sidenav";
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
      <div className="w-full mt-20 sm:px-20 flex flex-col sm:flex-row">
        <div className="sm:w-[200px] shrink-0">
          <SideNav />
        </div>
        {children}
        <OrderModal />
      </div>
    </Providers>
  );
}
