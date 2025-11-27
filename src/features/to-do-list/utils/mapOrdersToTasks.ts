import { OrderExtended } from "@/types";

export const mapOrdersToTasks = (orders: OrderExtended[]) => {
  return orders.map((order) => {
    const status_id = !order.delivery_date ? (!order.plan_time ? 0 : 1) : 2;

    return { status_id, ...order };
  });
};
