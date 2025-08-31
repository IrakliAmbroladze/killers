"use client";

import TechniciansOrder from "@/components/technicians-order";
import React from "react";
import { useCommentsQuantities } from "@/hooks/useCommentsQuantities";
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
  const tasks = mapOrdersToTasks(orders);
  return (
    <>
      {tasks.map((task) => {
        //i disable eslint as i just need order without status_id
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { status_id, ...order } = task;
        return (
          task.status_id === statusId && (
            <div key={task.id}>
              <TechniciansOrder
                order={order}
                comments_num={commentsQuantities[task.id ?? ""] ?? 0}
              />
            </div>
          )
        );
      })}
    </>
  );
};

export default List;
