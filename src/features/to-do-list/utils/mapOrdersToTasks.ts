import { OrderExtended } from "@/types";

export const mapOrdersToTasks = (orders: OrderExtended[]) => {
  return orders.map((order) => {
    const isCanceled = order.cancel;
    const hasDelivery = !!order.delivery_date;
    const hasPlan = !!order.plan_time;

    const status_id = isCanceled || hasDelivery ? 2 : hasPlan ? 1 : 0;

    return { status_id, ...order };
  });
};
