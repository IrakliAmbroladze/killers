import { useOrders } from "@/hooks/useOrders";
import { findOrder } from "@/utils/findOrder";
import { updateOrderInDB } from "@/utils/updateOrderInDB";
import React, { JSX, useEffect, useState } from "react";

const Done = ({ order_id }: { order_id: string }): JSX.Element => {
  const { orders, updateOrder } = useOrders();
  const order = findOrder(orders, order_id);

  const [done, setDone] = useState<boolean>(false);
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
      delivery_date: newDone ? "2025-05-30" : "",
    };

    updateOrder(updatedOrder);
    updateOrderInDB(updatedOrder);
  };

  if (!order) return <div>Order not found</div>;

  return <button onClick={handleClick}>{done ? "done" : "waiting"}</button>;
};

export default Done;
