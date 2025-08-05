import type { Order } from "@/types";

export const updateOrder = async (updatedOrder: Order) => {
  await fetch("/api/orders/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ updatedOrder }),
  });
};
