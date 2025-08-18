import { FaRegComment } from "react-icons/fa";
import { useOrderModal } from "@/hooks/useOrderModal";
// import TagTechnician from "@/features/TagTechnician/TagTechnician";
import TagPlanTime from "@/features/tag-plan-time/TagPlanTime";
// import Done from "@/features/done/Done";
import { getDeliveryStyle } from "@/utils/getDeliveryStyle";
import CommentsQtyUI from "./ui/CommentsQtyUI";
// import Approve from "@/features/approve/Approve";
import { OrderExtended } from "@/types";

interface TechniciansOrderProps {
  order: OrderExtended & { status_id: number };
  comments_num: number;
}

const TechniciansOrder = ({ order, comments_num }: TechniciansOrderProps) => {
  const { openOrder } = useOrderModal();

  const handleClick = (id: string) => {
    openOrder(id);
  };

  return (
    <div className="border-b">
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
        {/* {order.delivery_date
          ? order.technician
          : order.id && <TagTechnician order_id={order.id} />}{" "}
        {order.id && <Approve order_id={order.id} />} */}
      </div>
      <div
        style={getDeliveryStyle(order.delivery_date ?? "", order.approve ?? "")}
        className={`mt-[-10px] flex justify-end `}
      >
        {/* {order.id && <Done order_id={order.id} />} */}
      </div>
    </div>
  );
};

export default TechniciansOrder;
