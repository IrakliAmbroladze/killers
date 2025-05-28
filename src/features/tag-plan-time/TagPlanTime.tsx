"use client";

import React, { JSX } from "react";
import { useOrders } from "@/hooks/useOrders";
import { findOrder } from "@/utils/findOrder";
import DatePicker from "react-datepicker";
import { updateOrderInDB } from "@/utils/updateOrderInDB";

const TagPlanTime = ({ order_id }: { order_id: string }): JSX.Element => {
  const { orders, updateOrder } = useOrders();
  const order = findOrder(orders, order_id);

  const selectedDate = order?.plan_time ? new Date(order.plan_time) : null;

  const handleChange = async (date: Date | null) => {
    if (order) {
      const updatedOrder = {
        ...order,
        plan_time: date ? date.toISOString() : "",
      };
      updateOrder(updatedOrder);
      updateOrderInDB(updatedOrder);
    }
  };

  if (!order) return <div>Order not found</div>;

  return (
    <div className="flex gap-2 max-w-xs">
      <label htmlFor={`plan-time-${order_id}`} className="text-s font-medium">
        დრო:
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="yyyy-MM-dd HH:mm"
        placeholderText="აირჩიე დღე და საათი"
        isClearable
      />
    </div>
  );
};

export default TagPlanTime;
