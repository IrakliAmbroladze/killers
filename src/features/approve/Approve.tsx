import { useOrders } from "@/hooks/useOrders";
import { Sheets_Invoice } from "@/types/invoices";
import { findOrder } from "@/utils/findOrder";
import { updateOrderInDB } from "@/utils/updateOrderInDB";
import React, { JSX, useEffect, useState } from "react";

const Done = ({ order_id }: { order_id: string }): JSX.Element => {
  const { orders, updateOrder } = useOrders();
  const order = findOrder(orders, order_id);

  const [approveStatus, setApproveStatus] = useState<boolean>(false);

  useEffect(() => {
    if (order?.approve === "TRUE") {
      setApproveStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = () => {
    const newApproveStatus = !approveStatus;
    setApproveStatus(newApproveStatus);
    const updatedOrder = {
      ...order,
      approve: newApproveStatus ? "TRUE" : "FALSE",
      date: order?.date ?? "", // Ensure date is always a string
    };

    updateOrder(updatedOrder as Sheets_Invoice);
    updateOrderInDB(updatedOrder as Sheets_Invoice);
  };

  if (!order) return <div>Order not found</div>;

  return (
    <button
      onClick={handleApprove}
      className="text-xs active:scale-90 ease-in-out transition-transform duration-150"
    >
      approve
    </button>
  );
};

export default Done;
