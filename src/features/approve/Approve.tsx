import { OrderExtended } from "@/types";
import React, { JSX, useEffect, useState } from "react";
import { normalizeOrder } from "../order-table/utils/normalize";
import { editOrder } from "@/lib";
import { proceduresPathName } from "@/app/protected/procedures/constants/proceduresPathName";

const Approve = ({ order }: { order: OrderExtended }): JSX.Element => {
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
    const updatedOrder = normalizeOrder({
      ...order,
      approve: newApproveStatus ? "TRUE" : "FALSE",
      created_at: order?.created_at ?? "", // Ensure date is always a string
    });

    editOrder(updatedOrder, proceduresPathName);
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

export default Approve;
