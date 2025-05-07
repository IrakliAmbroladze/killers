import { Sheets_Invoice } from "@/types/invoices";

export const viewOrder = (order: Sheets_Invoice) => {
  alert(`clicked! "${order.order_id}"`);
};
