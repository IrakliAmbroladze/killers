import { Sheets_Invoice } from "@/types/invoices";

export const mapOrdersToTasks = (orders: Sheets_Invoice[]) => {
  return orders.map((order) => {
    const status_id =
      order.delivery_date === "" && order.plan_time === ""
        ? 0
        : order.delivery_date === "" && order.plan_time !== ""
        ? 1
        : 2;

    return { status_id, ...order };
  });
};
