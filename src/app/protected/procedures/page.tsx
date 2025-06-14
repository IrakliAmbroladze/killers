"use client";

import NewCalendar from "@/components/calendar/NewCalendar";
import { MonthProvider } from "@/context/month/Provider";
import ToDoDoneList from "@/features/to-do-list/components/ToDoDoneList";

const OrdersPage = () => {
  return (
    <div className="w-full">
      <MonthProvider>
        <NewCalendar />
        <ToDoDoneList />
      </MonthProvider>
    </div>
  );
};

export default OrdersPage;
