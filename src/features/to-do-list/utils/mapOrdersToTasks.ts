import { OrderExtended } from "@/types";

export const mapOrdersToTasks = (orders: OrderExtended[]) => {
  return orders.map((order) => {
    const status_id =
      order.delivery_date === null && order.plan_time === null
        ? 0
        : order.delivery_date === null && order.plan_time !== null
        ? 1
        : 2;

    return { status_id, ...order };
  });
};
