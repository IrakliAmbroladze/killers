import { useContext } from "react";
import { Context } from "@/context/comments-quantities/Context";

export const useCommentsQuantities = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "useCommentsQuantity must be used within CommentsQuantityProvider"
    );
  return context;
};
