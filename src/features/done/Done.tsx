import { useOrders } from "@/hooks/useOrders";
import { findOrder } from "@/utils/findOrder";
import { updateOrderInDB } from "@/utils/updateOrderInDB";
import React, { JSX, useEffect, useState } from "react";

const Done = ({ order_id }: { order_id: string }): JSX.Element => {
  const { orders, updateOrder } = useOrders();
  const order = findOrder(orders, order_id);

  const [done, setDone] = useState<boolean>(false);

  const date = new Date(order?.plan_time ?? "");

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const localDateString = `${year}-${month}-${day}`;
  useEffect(() => {
    if (order?.delivery_date !== "") {
      setDone(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (!order) return;

    if (!order.plan_time && !done) {
      alert("თარიღი არაა მითითებული");
      return;
    }

    const newDone = !done;
    setDone(newDone);

    const updatedOrder = {
      ...order,
      delivery_date: newDone ? localDateString : "",
    };

    updateOrder(updatedOrder);
    updateOrderInDB(updatedOrder);
  };

  if (!order) return <div>Order not found</div>;

  return (
    <button onClick={handleClick} className="text-sm">
      {done ? "done" : "waiting"}
    </button>
  );
};

export default Done;
