import { OrderExtended } from "@/modules/orders/types";

export interface Context {
  order: OrderExtended | null;
  openOrderId: string | null;
  openOrder: (orderId: string) => void;
  refreshOrder: (orderId: string) => void;
  closeOrder: () => void;
}
