import { Sheets_Invoice } from "@/types/invoices";

export const filterByStatus = (
  orders: Sheets_Invoice[],
  status: "empty" | "planned" | "done"
) => {
  switch (status) {
    case "empty":
      return orders.filter(
        (order) => order.delivery_date === "" && order.plan_time === ""
      );
    case "planned":
      return orders.filter(
        (order) => order.delivery_date === "" && order.plan_time !== ""
      );
    case "done":
    default:
      return orders.filter((order) => order.delivery_date !== "");
  }
};
