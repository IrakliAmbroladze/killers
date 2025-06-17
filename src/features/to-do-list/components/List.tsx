"use client";

import TechniciansOrder from "@/components/technicians-order";
import React from "react";
import { useCommentsQuantities } from "@/hooks/useCommentsQuantities";
import useOrdersFilteredByMonth from "@/hooks/useOrdersFilteredByMonth";
import { mapOrdersToTasks } from "../utils/mapOrdersToTasks";

const List = ({ statusId }: { statusId: number }) => {
  const { commentsQuantities } = useCommentsQuantities();
  const ordersFilteredByMonth = useOrdersFilteredByMonth();
  const tasks = mapOrdersToTasks(ordersFilteredByMonth);
  return (
    <>
      {tasks.map(
        (task) =>
          task.status_id === statusId && (
            <div key={task.order_id}>
              <TechniciansOrder
                order={task}
                comments_num={commentsQuantities[task.order_id ?? ""] ?? 0}
              />
            </div>
          )
      )}
    </>
  );
};

export default List;
