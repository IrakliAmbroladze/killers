import React, { JSX } from "react";
import SideNav from "@/components/ui/sidenav";
import fetchOrders from "@/utils/server/fetch-orders";
import OrderModal from "@/components/order-modal";
import ProtectedLayoutProviders from "@/context/ProtectedLayoutProviders";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({
  children,
}: LayoutProps): Promise<JSX.Element> {
  const orders = await fetchOrders();
  return (
    <ProtectedLayoutProviders orders={orders}>
      <div className="w-full mt-20 sm:px-20 flex flex-col sm:flex-row">
        <div className="sm:w-3xs">
          <SideNav />
        </div>
        {children}
        <OrderModal />
      </div>
    </ProtectedLayoutProviders>
  );
}
