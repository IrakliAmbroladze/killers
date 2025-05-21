import React from "react";
import { TechniciansOrderProps } from "./types/technicians-order-props";
import { FiAlignLeft } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { useOrders } from "@/hooks/useOrders";
import { useOrderModal } from "@/hooks/useOrderModal";

const TechniciansOrder = ({ order }: TechniciansOrderProps) => {
  const { openOrder } = useOrderModal();
  const { orders } = useOrders();

  const handleClick = (id: string) => {
    const orderToOpen = orders.find((o) => o.order_id === id);
    if (orderToOpen) openOrder(orderToOpen);
  };

  return (
    <div
      className="group bg-gray-200 dark:bg-gray-900 rounded-lg mt-2.5 p-2.5 cursor-pointer border border-transparent hover:border-gray-400 transition-transform duration-150 ease-in-out "
      onClick={() => order.order_id && handleClick(order.order_id)}
    >
      <div className="flex">
        <span className="hidden group-hover:flex mx-1.5">o</span>
        <div>
          <div className="flex">{order.customer}</div>
          <div>{order.identity}</div>
        </div>
      </div>
      <div className="flex">
        <FiAlignLeft />
        <div className="px-5">
          <FaRegComment />
        </div>
      </div>
    </div>
  );
};

export default TechniciansOrder;
