import { Context } from "@/context/year/Context";
import { useContext } from "react";

export const useYear = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useYear must be used within a Provider");
  }
  return context;
};
