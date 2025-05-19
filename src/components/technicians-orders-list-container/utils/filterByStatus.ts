import { Sheets_Invoice } from "@/types/invoices";

export const filterByStatus = (
  orders: Sheets_Invoice[],
  status: "empty" | "planned" | "done"
) => {
  switch (status) {
    case "empty":
      return orders.filter((order) => order.delivery_date === "");
    case "planned":
      return orders.filter((order) => order.delivery_date === "planned");
    case "done":
    default:
      return orders.filter(
        (order) =>
          order.delivery_date !== "" && order.delivery_date !== "planned"
      );
  }
};
