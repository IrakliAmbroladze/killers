import React from "react";
import { TechniciansOrderProps } from "./types/technicians-order-props";
import { FiAlignLeft } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
// import { useOrders } from "@/hooks/useOrders";
import { useOrderModal } from "@/hooks/useOrderModal";
import TagTechnician from "@/features/TagTechnician/TagTechnician";
import TagPlanTime from "@/features/tag-plan-time/TagPlanTime";

const TechniciansOrder = ({ order }: TechniciansOrderProps) => {
  const { openOrder } = useOrderModal();

  const handleClick = (id: string) => {
    openOrder(id);
  };

  return (
    <div className="border rounded-lg mb-2.5">
      <div
        className="group bg-gray-200 dark:bg-gray-900 rounded-lg p-2.5 cursor-pointer border border-transparent hover:border-gray-400 transition-transform duration-150 ease-in-out"
        onClick={() => order.order_id && handleClick(order.order_id)}
      >
        <div className="flex">
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

      {order.order_id && <TagTechnician order_id={order.order_id} />}

      {order.order_id && <TagPlanTime order_id={order.order_id} />}
    </div>
  );
};

export default TechniciansOrder;
