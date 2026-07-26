"use client";
import { ReactElement, useState } from "react";
import { Task, ToDoColumn } from "./types/ToDosBoardProps";
import { Header } from "./Header";

export const Column = ({ id, title, taskList }: ToDoColumn): ReactElement => {
  const [visibleStatusArray, setVisibleStatusArray] = useState(() => [0, 1]);
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const id = Number(target.id);
    setVisibleStatusArray((prev) =>
      prev.includes(id)
        ? prev.filter((columnId) => columnId !== id)
        : [...prev, id],
    );
  };
  return (
    <div className="flex flex-col w-80 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg p-2.5 ">
      <Header id={id.toString()} status={title} onHandleClick={handleClick} />
      {visibleStatusArray.includes(id) &&
        taskList.map(
          (task: Task): ReactElement => <div key={task.id}>{task.node}</div>,
        )}
    </div>
  );
};
