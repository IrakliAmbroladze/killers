import React, { JSX } from "react";
import SideNav from "@/components/ui/sidenav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="w-full mt-20 sm:px-20 flex flex-col sm:flex-row">
      <div className="sm:w-3xs">
        <SideNav />
      </div>
      {children}
    </div>
  );
}
