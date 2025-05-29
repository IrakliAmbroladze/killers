"use client";

import React, { useState, JSX } from "react";
import { useOrders } from "@/hooks/useOrders";
import { findOrder } from "@/utils/findOrder";
import DatePicker from "react-datepicker";
import { updateOrderInDB } from "@/utils/updateOrderInDB";
import { FaCheck } from "react-icons/fa6";

const TagPlanTime = ({ order_id }: { order_id: string }): JSX.Element => {
  const { orders, updateOrder } = useOrders();
  const order = findOrder(orders, order_id);

  const currentDate = order?.plan_time ? new Date(order.plan_time) : null;
  const [selectedDate, setSelectedDate] = useState<Date | null>(currentDate);

  const handleApprove = () => {
    if (!order) return;
    if (order.delivery_date) {
      alert("შესრულებულ შეკვეთას დაგეგმვის თარიღს ვერ შეუცვლი");
      return;
    }
    if (!order.technician) {
      alert(
        "ტექნიკოსი არაა მონიშნული. დაჯგუფებისთვის აუცილებელია ჯერ ვიცოდეთ ვინ აკეთებს პროცედურას"
      );
      return;
    }

    const updatedOrder = {
      ...order,
      plan_time: selectedDate ? selectedDate.toISOString() : "",
    };

    updateOrder(updatedOrder);
    updateOrderInDB(updatedOrder);
  };

  if (!order) return <div>Order not found</div>;

  return (
    <div className="flex gap-0.5 max-w-xs">
      <label htmlFor={`plan-time-${order_id}`} className="text-sm font-medium">
        Plan:
      </label>

      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="yyyy-MM-dd HH:mm"
        placeholderText="აირჩიე დღე და საათი"
        isClearable
      />

      <button
        onClick={handleApprove}
        className=" bg-blue-600 text-white rounded hover:bg-green-700"
      >
        <FaCheck />
      </button>
    </div>
  );
};

export default TagPlanTime;
