"use client";
import { useMonth } from "@/hooks/useMonth";
import { useYear } from "@/hooks/useYear";
import { dayOfWeekOfFirstDayOfMonth } from "@/utils";
import React from "react";
import { DayGrid } from "./DayGrid";
import { CalendarTasksArray, OrderExtended } from "@/types";

export const CalendarGrid = ({
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
}: {
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
}) => {
  const { year } = useYear();
  const { month } = useMonth();
  const emptyDays = Array.from(
    { length: dayOfWeekOfFirstDayOfMonth(year, month) },
    (_, i) => <div key={`empty-${i} `} className="border p-2" />
  );
  return (
    <div className="lg:grid grid-cols-7 hidden min-w-[1500px] text-xs border">
      {emptyDays}
      {days.map((day, index) => (
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
  );
};
