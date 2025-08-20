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

interface TechniciansOrderProps {
  order: OrderExtended;
  comments_num: number;
}

const TechniciansOrder = ({ order, comments_num }: TechniciansOrderProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: order.id,
    data: { ...order },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const { openOrder } = useOrderModal();

  const handleClick = (id: string) => {
    openOrder(id);
  };

  return (
    <div
      className="border-b"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div
        className={`group p-0.5 cursor-pointer border border-transparent hover:border-gray-400 transition-transform duration-150 ease-in-out`}
        style={getDeliveryStyle(order.delivery_date ?? "", order.approve ?? "")}
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

      {order.id && <TagPlanTime order_id={order.id} order={order} />}
      <div
        className={`justify-between items-center `}
        style={getDeliveryStyle(order.delivery_date ?? "", order.approve ?? "")}
      >
        {order.delivery_date ? (
          order.technician
        ) : (
          <TagTechnician order={order} />
        )}{" "}
        <Approve order={order} />
      </div>
      <div
        style={getDeliveryStyle(order.delivery_date ?? "", order.approve ?? "")}
        className={`mt-[-10px] flex justify-end `}
      >
        <Done order={order} />
      </div>
    </div>
  );
};

export default TechniciansOrder;
