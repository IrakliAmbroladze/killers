import React, { JSX } from "react";
import SideNav from "@/components/ui/sidenav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="w-full mt-16 sm:px-20 flex flex-col flex-1 sm:flex-row">
      <SideNav />
      {children}
    </div>
  );
}
