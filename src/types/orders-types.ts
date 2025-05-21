import type { Sheets_Invoice } from "@/types/invoices";
import type { OrdersAction } from "@/types/OrdersActionType";

export interface OrdersContextType {
  orders: Sheets_Invoice[];
  dispatch: React.Dispatch<OrdersAction>;
}
