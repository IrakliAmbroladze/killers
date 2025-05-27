import React from "react";

import { TechniciansOrdersListProps } from "./types/technicians-orders-list-props";
import TechniciansOrder from "./technicians-order";

const TechniciansOrdersList = ({
  orders,
  title,
}: TechniciansOrdersListProps) => {
  return (
    <div className="flex flex-col w-80 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-2xl mt-5 p-2.5 ">
      <div className="flex justify-between">
        <span>{title}</span>
        <span>...</span>
      </div>
      {orders?.map((order) => (
        <div key={order.order_id}>
          <TechniciansOrder order={order} />
        </div>
      ))}
    </div>
  );
};

export default TechniciansOrdersList;
