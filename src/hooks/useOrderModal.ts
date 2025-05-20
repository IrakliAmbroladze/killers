import { useContext } from "react";
import { OrderModalContext } from "@/context/order-modal-context";

export const useOrderModal = () => {
  const ctx = useContext(OrderModalContext);
  if (!ctx)
    throw new Error("useOrderModal must be used within OrderModalProvider");
  return ctx;
};
