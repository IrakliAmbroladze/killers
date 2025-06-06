import { TechniciansOrdersListProps } from "./types/technicians-orders-list-props";
import TechniciansOrder from "./technicians-order";
import { useCommentsQuantities } from "@/hooks/useCommentsQuantities";

const TechniciansOrdersList = ({
  orders,
  title,
}: TechniciansOrdersListProps) => {
  const loading = false;
  const { commentsQuantities } = useCommentsQuantities();

  return (
    <div className="flex flex-col w-80 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-2xl mt-5 p-2.5 ">
      <div className="flex justify-between mb-2.5">
        <span>{title}</span>
        <span>{loading ? "Loading..." : "..."}</span>
      </div>
      {orders?.map((order) => (
        <div key={order.order_id} className="mb-2.5">
          <TechniciansOrder
            order={order}
            comments_num={
              order.order_id !== undefined
                ? commentsQuantities[order.order_id] || 0
                : 0
            }
          />
        </div>
      ))}
    </div>
  );
};

export default TechniciansOrdersList;
