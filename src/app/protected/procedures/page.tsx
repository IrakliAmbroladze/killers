"use client";

import NewCalendar from "@/components/calendar/NewCalendar";
import TechniciansOrdersListCotainer from "@/components/technicians-orders-list-container/technicians-orders-list-container";
import { MonthProvider } from "@/context/month/Provider";

const OrdersPage = () => {
  return (
    <div className="w-full">
      <MonthProvider>
        <NewCalendar />
        <TechniciansOrdersListCotainer />
      </MonthProvider>
    </div>
  );
};

export default OrdersPage;
