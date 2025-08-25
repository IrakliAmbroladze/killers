import { OrderExtended } from "@/types";

const openOrder = (orderId: string, order: OrderExtended) => ({
  type: "OPEN_ORDER" as const,
  payload: {
    openOrderId: orderId,
    order,
  },
});

const closeOrder = () => ({
  type: "CLOSE_ORDER" as const,
  payload: null,
});

export { openOrder, closeOrder };
