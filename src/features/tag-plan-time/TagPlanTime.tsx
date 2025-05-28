"use client";

import React, { JSX, useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { findOrder } from "@/utils/findOrder";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TagPlanTime = ({ order_id }: { order_id: string }): JSX.Element => {
  const { orders, updateOrder } = useOrders();
  const order = findOrder(orders, order_id);

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    order?.plan_time ? new Date(order.plan_time) : null
  );

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (order) {
      const updatedOrder = {
        ...order,
        plan_time: date ? date.toISOString() : "",
      };
      updateOrder(updatedOrder);
      console.log(updatedOrder);
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <div className="font-medium">{order?.customer}</div>

      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="yyyy-MM-dd HH:mm"
        placeholderText="Plan time"
        isClearable
      />
    </div>
  );
};

export default TagPlanTime;
