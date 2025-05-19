import React, { JSX } from "react";
import SideNav from "@/components/ui/sidenav";
import fetchOrders from "@/utils/server/fetch-orders";
import OrdersWrapper from "@/components/orders-wrapper";
import { OrderModalProvider } from "@/context/order-modal-context";
import OrderModal from "@/components/order-modal";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({
  children,
}: LayoutProps): Promise<JSX.Element> {
  const orders = await fetchOrders();
  return (
    <OrdersWrapper orders={orders}>
      <OrderModalProvider>
        <div className="w-full mt-20 sm:px-20 flex flex-col sm:flex-row">
          <div className="sm:w-3xs">
            <SideNav />
          </div>
          {children}
          <OrderModal />
        </div>
      </OrderModalProvider>
    </OrdersWrapper>
  );
}
