import { Sheets_Invoice } from "@/types/invoices";
import { Action } from "@/types/orders/Action";

export const updateOrder = (order: Sheets_Invoice): Action => ({
  type: "UPDATE_ORDER" as const,
  payload: order,
});
