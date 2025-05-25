import { useContext } from "react";
import { Context } from "@/context/orders/Context";

export const useOrders = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useOrders must be used within Orders provider");
  return context;
};
