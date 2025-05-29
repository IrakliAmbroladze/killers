import { Sheets_Invoice } from "@/types/invoices";

export const findOrder = (orders: Sheets_Invoice[], order_id: string) => {
  return orders.find((o) => o.order_id === order_id);
};
