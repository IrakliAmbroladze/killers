"use client";

// import { CalendarTasksArray } from "@/types";
// import { MdAddTask } from "react-icons/md";
// import { toggleTask } from "@/utils";
// import { useEffect, useRef, useState } from "react";
import * as utils from "@/features/calendar/utils/utils";
import { CalendarTasks, OrderExtended } from "@/types";
import { RxPencil1 } from "react-icons/rx";
import TechniciansOrder from "../technicians-order";

type DayGridProps = {
  date: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  tasks: CalendarTasks;
  setTasks: React.Dispatch<React.SetStateAction<CalendarTasks>>;
  handleEditClick: (key: string, idx: number) => void;
  handleSaveClick: (newText: string) => void;
  editingTask: {
    key: string;
    idx: number;
    text: string;
  } | null;
  orders: OrderExtended[];
  techNames: string[];
  commentsQuantities: Record<string, number>;
  toggleTask: (key: string, idx: number) => void;
  TaskInput: ({
    initialText,
    onSave,
  }: {
    initialText: string;
    onSave: (text: string) => void;
  }) => React.ReactElement;
};

export const DayGrid = ({
  date,
  setSelectedDate,
  tasks,
  // setTasks,
  handleEditClick,
  handleSaveClick,
  editingTask,
  orders,
  techNames,
  commentsQuantities,
  toggleTask,
  TaskInput,
}: DayGridProps) => {
  {
    const key = utils.getDateKey(date);
    const dayOrders = orders.filter((order) => {
      if (!order.plan_time) return false;
      const myDate = new Date(order.plan_time);
      return myDate.toLocaleDateString() === date.toLocaleDateString();
    });
    const ordersByGroup: { [groupKey: string]: typeof orders } = {};
    for (const order of dayOrders) {
      if (!order.technician) continue;
      let technicians = order.technician.split(" ");
      if (!technicians) continue;

      if (!Array.isArray(technicians)) {
        technicians = [technicians];
      }

      const validTechs = technicians.filter((t) => techNames.includes(t));

      const groupKey = validTechs.sort().join(" - ");
      if (!ordersByGroup[groupKey]) ordersByGroup[groupKey] = [];
      ordersByGroup[groupKey].push(order);
    }

    const todaysDay = date.toLocaleString("ka-GE", { weekday: "long" });
    const todaysDayInGeo = () => {
      switch (todaysDay) {
        case "Sunday":
          return "კვირა";
        case "Monday":
          return "ორშაბათი";
        case "Tuesday":
          return "სამშაბათი";
        case "Wednesday":
          return "ოთხშაბათი";
        case "Thursday":
          return "ხუთშაბათი";
        case "Friday":
          return "პარასკევი";
        case "Saturday":
          return "შაბათი";

        default:
          return todaysDay;
      }
    };

    return (
      <div
        key={key}
        className={`border ${
          todaysDay == "Sunday" || todaysDay == "Saturday"
            ? "bg-[#e0a8fb] dark:bg-[#15031e]"
            : "bg-white dark:bg-black"
        }`}
      >
        <div className="flex justify-between items-center border-b px-1.5">
          <div
            onClick={() => setSelectedDate(date)}
            className="cursor-pointer font-bold flex justify-center gap-4 text-xs"
          >
            <RxPencil1 />
          </div>
          <span className="text-xs">{todaysDayInGeo()}</span>
          <span className="text-xs">
            {" "}
            {date.getDate()} {date.toLocaleString("ka-GE", { month: "short" })}{" "}
          </span>
        </div>

        <div className="flex flex-col">
          {Object.entries(ordersByGroup).map(([groupKey, groupOrders]) => (
            <div key={groupKey}>
              <div
                className="text-xs font-semibold underline text-center"
                style={{
                  background: "rgb(255, 100, 0)",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {groupKey}
              </div>
              {groupOrders
                .sort((a, b) => {
                  return (
                    new Date(a.plan_time! ?? 0).getTime() -
                    new Date(b.plan_time! ?? 0).getTime()
                  );
                })
                .map((order) => (
                  <TechniciansOrder
                    key={order.id}
                    order={order}
                    comments_num={
                      order.id !== undefined
                        ? commentsQuantities[order.id] || 0
                        : 0
                    }
                  />
                ))}
            </div>
          ))}
          {(tasks[key] || []).map((task, index) => {
            return (
              <div
                key={`${key}-${index}`}
                className="flex justify-between gap-1 w-full break-words border-b overflow-auto"
              >
                <label
                  className={`whitespace-normal break-words cursor-pointer flex gap-1 ${
                    task.checked && "text-green-600"
                  }`}
                  style={{ overflowWrap: "anywhere" }}
                >
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => toggleTask(key, index)}
                    className="mt-0.5"
                  />
                </label>
                {editingTask?.key === key && editingTask?.idx === index ? (
                  <TaskInput
                    initialText={editingTask.text}
                    onSave={(newText) => {
                      handleSaveClick(newText);
                    }}
                  />
                ) : (
                  <>
                    <span
                      className={`break-words whitespace-pre-wrap w-full overflow-wrap-anywhere ${
                        task.checked && "text-green-600"
                      }`}
                    >
                      {task.text}
                    </span>
                    <button onClick={() => handleEditClick(key, index)}>
                      edit
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
