import { Order, OrderExtended } from "@/types/Order";

export const insertOrder = async (newOrders: Partial<Order>[]) => {
  const response = await fetch("/api/orders/insert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newOrders }),
  });
  const responseObj: {
    success: boolean;
    data: OrderExtended[];
    error?: string;
  } = await response.json();
  if (responseObj.success) {
    return responseObj;
  } else {
    alert(`❌ შეცდომა: \n ${responseObj.error}`);
  }
};
