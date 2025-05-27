import React from "react";
import TechniciansOrdersList from "./technicians-orders-list";
import { Sheets_Invoice } from "@/types/invoices";
import { orderListTitles } from "./utils/orderListTitles";
import { filterByStatus } from "./utils/filterByStatus";

interface SortOrdersProps {
  orders: Sheets_Invoice[];
}

const SortOrders = ({ orders }: SortOrdersProps) => {
  const toBePlannedOrders = filterByStatus(orders, "empty");
  const plannedOrders = filterByStatus(orders, "planned");
  const doneOrders = filterByStatus(orders, "done");
  return (
    <div className="flex gap-5 overflow-auto flex-nowrap w-full justify-around px-2.5">
      <TechniciansOrdersList
        orders={toBePlannedOrders}
        title={orderListTitles[0]}
      />
      <TechniciansOrdersList
        orders={plannedOrders}
        title={orderListTitles[1]}
      />
      <TechniciansOrdersList orders={doneOrders} title={orderListTitles[2]} />
    </div>
  );
};

export default SortOrders;
