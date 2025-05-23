"use client";

import React from "react";
import { splitStr } from "@/utils/splitStr";
import InitialTechniciansContainer from "./InitialTechniciansContainer";
import { useOrders } from "@/hooks/useOrders";

const TagTechnician = ({ order_id }: { order_id: string }) => {
  const { orders } = useOrders();
  const order = orders.find((o) => o.order_id === order_id);
  const assignedTechnicians: string[] =
    (order && order.technician && splitStr(order.technician)) || [];

  return (
    <>
      {order && (
        <InitialTechniciansContainer
          initialTechnicians={assignedTechnicians}
          order={order}
        />
      )}
    </>
  );
};

export default TagTechnician;
