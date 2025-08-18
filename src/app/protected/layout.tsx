import React, { JSX } from "react";
import OrderModal from "@/components/order-modal";
import { Providers } from "@/context/Providers";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({
  children,
}: LayoutProps): Promise<JSX.Element> {
  return (
    <Providers>
      <div className="w-full mt-10 sm:px-2.5">
        {children}
        <OrderModal />
      </div>
    </Providers>
  );
}
