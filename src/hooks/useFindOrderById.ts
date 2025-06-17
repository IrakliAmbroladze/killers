import { findOrder } from "@/utils/findOrder";
import { useOrders } from "./useOrders";

export const useFindOrderById = (id: string) => {
  const { orders } = useOrders();
  return findOrder(orders, id);
};
