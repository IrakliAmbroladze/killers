"use client";

import React, { JSX } from "react";
import { useOrders } from "@/hooks/useOrders";
import { findOrder } from "@/utils/findOrder";

const TagPlanTime = ({ order_id }: { order_id: string }): JSX.Element => {
  const { orders } = useOrders();
  const order = findOrder(orders, order_id);
  return (
    <>
      <div>{order?.customer}</div>
    </>
  );
};

export default TagPlanTime;
