import React from "react";
import { TechniciansOrderProps } from "./types/technicians-order-props";
import { FaRegComment } from "react-icons/fa";
import { useOrderModal } from "@/hooks/useOrderModal";
import TagTechnician from "@/features/TagTechnician/TagTechnician";
import TagPlanTime from "@/features/tag-plan-time/TagPlanTime";
import Done from "@/features/done/Done";
import { getDeliveryStyle } from "@/utils/getDeliveryStyle";
import CommentsQtyUI from "../ui/CommentsQtyUI";

const TechniciansOrder = ({ order, comments_num }: TechniciansOrderProps) => {
  const { openOrder } = useOrderModal();

  const handleClick = (id: string) => {
    openOrder(id);
  };

  return (
    <div className="border-b">
      <div
        className={`group p-0.5 cursor-pointer border border-transparent hover:border-gray-400 transition-transform duration-150 ease-in-out`}
        style={getDeliveryStyle(order.delivery_date)}
        onClick={() => order.order_id && handleClick(order.order_id)}
      >
        <div className="flex justify-between">
          <div>
            {order.customer} - {order.identity} - {order.address}
          </div>
          <div className="flex flex-col justify-center items-center">
            <FaRegComment />
            <CommentsQtyUI>{comments_num}</CommentsQtyUI>
          </div>
        </div>
      </div>

      {order.order_id && <TagPlanTime order_id={order.order_id} />}
      <div
        className={`justify-between items-center `}
        style={getDeliveryStyle(order.delivery_date)}
      >
        {order.delivery_date
          ? order.technician
          : order.order_id && <TagTechnician order_id={order.order_id} />}
      </div>
      <div
        style={getDeliveryStyle(order.delivery_date)}
        className={`mt-[-10px] flex justify-end `}
      >
        {order.order_id && <Done order_id={order.order_id} />}
      </div>
    </div>
  );
};

export default TechniciansOrder;
