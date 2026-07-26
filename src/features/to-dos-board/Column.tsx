"use client";
import { ReactElement } from "react";
import { Task, ToDoColumn } from "./types/ToDosBoardProps";
import { Header } from "./Header";

type ColumnProps = Omit<ToDoColumn, "id">;

export const Column = ({ title, taskList }: ColumnProps): ReactElement => {
  const handleClick = (): void => {
    console.log("clicked");
  };
  return (
    <div className="flex flex-col w-80 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg p-2.5 ">
      <Header status={title} onHandleClick={handleClick} />
      {taskList.map(
        (task: Task): ReactElement => (
          <div key={task.id}>{task.node}</div>
        ),
      )}
    </div>
  );
};
