import React, { useCallback, useMemo } from "react";
import { FaRegComment } from "react-icons/fa";
import { useOrderModal } from "@/hooks/useOrderModal";
import TagTechnician from "@/features/TagTechnician/TagTechnician";
import TagPlanTime from "@/features/tag-plan-time/TagPlanTime";
import Done from "@/features/done/Done";
import { getDeliveryStyle } from "@/utils/getDeliveryStyle";
import CommentsQtyUI from "./ui/CommentsQtyUI";
import Approve from "@/features/approve/Approve";
import { OrderExtended } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import Cancel from "@/features/cancel/Cancel";
import { Documents } from "./molecules/Documents";

interface TechniciansOrderProps {
  order: OrderExtended;
  comments_num: number;
  isInModal?: boolean;
}

const TechniciansOrder = ({
  order,
  comments_num,
  isInModal = false,
}: TechniciansOrderProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: order.id,
    data: { ...order },
  });

  const { openOrder } = useOrderModal();

  const handleClick = useCallback(
    (id: string) => {
      openOrder(id);
    },
    [openOrder],
  );

  const deliveryStyle = useMemo(
    () =>
      getDeliveryStyle(
        order.delivery_date ?? "",
        order.approve ?? "",
        order.cancel,
      ),
    [order.delivery_date, order.approve, order.cancel],
  );

  return (
    <div className="border-b">
      <div
        className={`group p-0.5 cursor-pointer border border-transparent hover:border-gray-400 transition-transform duration-150 ease-in-out`}
        style={deliveryStyle}
        onClick={() => order.id && handleClick(order.id)}
      >
        <div className="flex justify-between">
          <div>
            {order.customers.name} - {order.customer_id} - {order.address}
          </div>
          <div className="flex flex-col justify-center items-center">
            <FaRegComment />
            <CommentsQtyUI>{comments_num}</CommentsQtyUI>
          </div>
        </div>
      </div>

      {order.id && (
        <TagPlanTime order_id={order.id} order={order} isInModal={isInModal} />
      )}
      <div className={`justify-between items-center`} style={deliveryStyle}>
        {order.delivery_date ? (
          order.technician
        ) : (
          <TagTechnician order={order} isInModal={isInModal} />
        )}{" "}
        <Approve order={order} isInModal={isInModal} />
        <Cancel order={order} isInModal={isInModal} />
      </div>
      <div
        style={deliveryStyle}
        className={`mt-[-10px] flex justify-end gap-1.5`}
      >
        <button
          {...listeners}
          {...attributes}
          ref={setNodeRef}
          className="border"
        >
          drag me
        </button>
        <Done order={order} isInModal={isInModal} />
      </div>
      <div style={deliveryStyle}>
        <Documents order={order} isInModal={isInModal} />
      </div>
    </div>
  );
};

TechniciansOrder.displayName = "TechniciansOrder";

export default React.memo(TechniciansOrder);
