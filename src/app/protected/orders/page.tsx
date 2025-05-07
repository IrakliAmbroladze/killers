"use client";
import Calendar from "@/components/calendar/Calendar";
import { useOrders } from "@/context/orders-context";

const OrdersPage = () => {
  const orders = useOrders();
  const toBePlannedOrders =
    orders && orders.filter((order) => order.delivery_date === "");

  return (
    <div>
      <Calendar />
      <pre>{JSON.stringify(orders, null, 2)}</pre>
      {toBePlannedOrders?.map((order) => (
        <div key={order.order_id}>{order.customer}</div>
      ))}
    </div>
  );
};

export default OrdersPage;
