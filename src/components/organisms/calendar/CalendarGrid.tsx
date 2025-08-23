"use client";
import { dayOfWeekOfFirstDayOfMonth } from "@/utils";
import React from "react";
import { DayGrid } from "./DayGrid";
import { CalendarTasksArray, OrderExtended } from "@/types";

export const CalendarGrid = ({
  month,
  year,
  days,
  setSelectedDate,
  tasks,
  setTasks,
  handleEditClick,
  handleSaveClick,
  editingTask,
  orders,
  techNames,
  commentsQuantities,
  toggleTask,
  TaskInput,
  selectedWeek,
  viewMode,
}: {
  month: number;
  year: number;
  days: Date[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  tasks: CalendarTasksArray;
  setTasks: React.Dispatch<React.SetStateAction<CalendarTasksArray>>;
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
  selectedWeek: number;
  viewMode: "month" | "week";
}) => {
  const filteredDays = days.filter((date) => {
    const dayIndex =
      date.getDate() + dayOfWeekOfFirstDayOfMonth(year, month) - 1;
    const week = Math.floor(dayIndex / 7) + 1;
    return week === selectedWeek;
  });
  const visibleDays = viewMode === "month" ? days : filteredDays;

  const emptyDays = Array.from(
    { length: dayOfWeekOfFirstDayOfMonth(year, month) },
    (_, i) => <div key={`empty-${i} `} className="border p-2" />
  );
  return (
    <>
      <div
        className={`grid ${
          viewMode === "month" ? "grid-cols-7" : "grid-cols-1"
        } gap-1 min-w-[1500px] text-xs border`}
      >
        {viewMode === "month" && emptyDays}
        {visibleDays.map((day, index) => (
          <DayGrid
            key={index}
            date={day}
            setSelectedDate={setSelectedDate}
            tasks={tasks}
            setTasks={setTasks}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
            editingTask={editingTask}
            orders={orders}
            techNames={techNames}
            commentsQuantities={commentsQuantities}
            toggleTask={toggleTask}
            TaskInput={TaskInput}
          />
        ))}
      </div>
    </>
  );
};
