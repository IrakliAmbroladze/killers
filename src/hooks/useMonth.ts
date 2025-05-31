import { Context } from "@/context/month/Context";
import { useContext } from "react";

export const useMonth = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useMonthContext must be used within a Provider");
  }
  return context;
};
