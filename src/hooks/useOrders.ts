import { useContext } from "react";
import { OrdersContext } from "@/context/orders-context";

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
};
