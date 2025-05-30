import React from "react";
import { TechniciansOrderProps } from "./types/technicians-order-props";
// import { FiAlignLeft } from "react-icons/fi";
// import { FaRegComment } from "react-icons/fa";
// import { useOrders } from "@/hooks/useOrders";
import { useOrderModal } from "@/hooks/useOrderModal";
import TagTechnician from "@/features/TagTechnician/TagTechnician";
import TagPlanTime from "@/features/tag-plan-time/TagPlanTime";
import Done from "@/features/done/Done";

const TechniciansOrder = ({ order }: TechniciansOrderProps) => {
  const { openOrder } = useOrderModal();

  const handleClick = (id: string) => {
    openOrder(id);
  };

  return (
    <div className="border-b">
      <div
        className={`group ${
          order.delivery_date
            ? "bg-green-200 dark:bg-green-950"
            : "bg-gray-200 dark:bg-gray-900"
        } p-0.5 cursor-pointer border border-transparent hover:border-gray-400 transition-transform duration-150 ease-in-out`}
        onClick={() => order.order_id && handleClick(order.order_id)}
      >
        <div>
          {order.customer} - {order.identity} - {order.address}
        </div>
        {/* <div className="flex">
          <FiAlignLeft />
          <div className="px-5">
            <FaRegComment />
          </div>
        </div> */}
      </div>

      {order.order_id && <TagPlanTime order_id={order.order_id} />}
      <div
        className={`justify-between items-center ${
          order.delivery_date
            ? "bg-green-200 dark:bg-green-950"
            : "bg-gray-200 dark:bg-gray-900"
        } `}
      >
        {order.delivery_date
          ? order.technician
          : order.order_id && <TagTechnician order_id={order.order_id} />}
      </div>
      <div
        className={`mt-[-10px] flex justify-end ${
          order.delivery_date
            ? "bg-green-200 dark:bg-green-950"
            : "bg-gray-200 dark:bg-gray-900"
        } `}
      >
        {order.order_id && <Done order_id={order.order_id} />}
      </div>
    </div>
  );
};

export default TechniciansOrder;
