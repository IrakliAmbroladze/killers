"use client";

import TechniciansOrder from "@/components/technicians-order";
import React from "react";
import { useCommentsQuantities } from "@/hooks/useCommentsQuantities";
// import useOrdersFilteredByMonth from "@/hooks/useOrdersFilteredByMonth";
import { mapOrdersToTasks } from "../utils/mapOrdersToTasks";
import { OrderExtended } from "@/types";

const List = ({
  statusId,
  orders,
}: {
  statusId: number;
  orders: OrderExtended[];
}) => {
  const { commentsQuantities } = useCommentsQuantities();
  // const ordersFilteredByMonth = useOrdersFilteredByMonth();
  const tasks = mapOrdersToTasks(orders);
  return (
    <>
      {tasks.map(
        (task) =>
          task.status_id === statusId && (
            <div key={task.id}>
              <TechniciansOrder
                order={task}
                comments_num={commentsQuantities[task.id ?? ""] ?? 0}
              />
            </div>
          )
      )}
    </>
  );
};

export default List;
