"use client";

import React, { JSX } from "react";
import { useOrders } from "@/hooks/useOrders";

const CheckBoxOfPlanned = ({ order_id }: { order_id: string }): JSX.Element => {
  const { orders } = useOrders();
  const order = orders.find((o) => o.order_id === order_id);
  const { updateOrder } = useOrders();

  const togglePlannedStatus = async () => {
    if (!order) return;

    const newDeliveryDate =
      order.delivery_date?.toString().trim().toLowerCase() === "planned"
        ? ""
        : "planned";

    const updatedOrder = {
      ...order,
      delivery_date: newDeliveryDate,
    };

    try {
      updateOrder(updatedOrder);
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to update the backend");
      }

      const data = await response.json();
      console.log("Backend update successful:", data);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  return (
    <input
      type="checkbox"
      checked={
        order?.delivery_date?.toString().trim().toLowerCase() === "planned"
      }
      onChange={togglePlannedStatus}
    />
  );
};

export default CheckBoxOfPlanned;
