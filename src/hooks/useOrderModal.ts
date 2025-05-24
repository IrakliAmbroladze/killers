import { useContext } from "react";
import { Context } from "@/context/order-modal/Context";

export const useOrderModal = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useOrderModal must be used within OrderModalProvider");
  return context;
};
