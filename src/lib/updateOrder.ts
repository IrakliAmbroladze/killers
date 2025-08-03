import type { OrderExtended } from "@/types/Order";

export const updateOrder = async (updatedOrder: OrderExtended) => {
  // try {
  //   const response = await fetch("/api/proxy", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedOrder),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to update the backend");
  //   }

  //   const data = await response.json();
  //   console.log("Backend update successful:", data);
  // } catch (error) {
  //   console.error("Error updating order:", error);
  // }
  console.log("we are in updateOrder. ", updatedOrder);
};
