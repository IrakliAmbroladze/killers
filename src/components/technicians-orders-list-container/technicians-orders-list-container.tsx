"use client";
import React from "react";
import { useOrders } from "@/context/orders-context";
import TechniciansOrdersList from "./technicians-orders-list";

const TechniciansOrdersListCotainer = () => {
  const orders = useOrders();
  const toBePlannedOrders =
    orders && orders.filter((order) => order.delivery_date === "");
  const doneOrders =
    orders && orders.filter((order) => order.delivery_date !== "");
  return (
    <div className="flex gap-5">
      <TechniciansOrdersList
        orders={toBePlannedOrders}
        title="მიღებული შეკვეთები"
      />
      <TechniciansOrdersList orders={null} title="დაგეგმილი შეკვეთები" />
      <TechniciansOrdersList orders={doneOrders} title="შესრულებული" />
    </div>
  );
};

export default TechniciansOrdersListCotainer;
