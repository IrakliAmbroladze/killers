"use client";

import React, { useState, JSX } from "react";
import DatePicker from "react-datepicker";
import { getDeliveryStyle } from "@/utils/getDeliveryStyle";
import { OrderExtended } from "@/types";
import { normalizeOrder } from "../order-table/utils/normalize";
import { editOrder } from "@/lib";
import { proceduresPathName } from "@/app/protected/procedures/constants/proceduresPathName";

const TagPlanTime = ({
  order_id,
  order,
}: {
  order_id: string;
  order: OrderExtended;
}): JSX.Element => {
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

    const updatedOrder = normalizeOrder({
      ...order,
      plan_time: selectedDate ? selectedDate.toISOString() : "",
    });
    editOrder(updatedOrder, proceduresPathName);
  };

  if (!order) return <div>Order not found</div>;

  return (
    <div
      style={getDeliveryStyle(order.delivery_date ?? "", order.approve ?? "")}
      className={`flex gap-0.5 ${
        order.delivery_date
          ? "bg-green-200 dark:bg-green-950"
          : "bg-gray-200 dark:bg-gray-900"
      } items-center`}
    >
      <label htmlFor={`plan-time-${order_id}`} className="text-xs font-medium">
        {order.delivery_date ? "done: " : "plan: "}
      </label>

      {order.delivery_date ? (
        <span>
          {selectedDate
            ? `${selectedDate.getFullYear()}-${String(
                selectedDate.getMonth() + 1
              ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
                2,
                "0"
              )} ${String(selectedDate.getHours()).padStart(2, "0")}:${String(
                selectedDate.getMinutes()
              ).padStart(2, "0")}`
            : "თარიღი არ არის არჩეული"}
        </span>
      ) : (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="აირჩიე დღე და საათი"
          isClearable
          className="pr-4 w-40"
        />
      )}
      <button
        onClick={handleApprove}
        className={`active:scale-90 duration-100 border rounded-full p-1 ease-in-out ${
          order.delivery_date && "hidden"
        }`}
        style={{
          fontSize: "6px",
        }}
      >
        OK
      </button>
    </div>
  );
};

export default TagPlanTime;
