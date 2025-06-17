"use client";

import Calendar from "@/features/calendar/components/Calendar";
import { MonthProvider } from "@/context/month/Provider";
import ToDoDoneList from "@/features/to-do-list/components/ToDoDoneList";

const OrdersPage = () => {
  return (
    <div className="w-full">
      <MonthProvider>
        <Calendar />
        <ToDoDoneList />
      </MonthProvider>
    </div>
  );
};

export default OrdersPage;
