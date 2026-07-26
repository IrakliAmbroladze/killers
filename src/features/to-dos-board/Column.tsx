"use client";
import { ReactElement, useState } from "react";
import { Task, ToDoColumn } from "./types/ToDosBoardProps";
import { Header } from "./Header";

export const Column = ({
  id,
  title,
  taskList,
  hasCreateNewTaskBtn = false,
}: ToDoColumn): ReactElement => {
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
  const handleCreateNewTaskBtnClick = () => {
    console.log("Handle create new task");
  };

  return (
    <div className="flex flex-col w-80 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg p-2.5 ">
      <Header id={id.toString()} status={title} onHandleClick={handleClick} />
      {visibleStatusArray.includes(id) &&
        taskList.map(
          (task: Task): ReactElement => <div key={task.id}>{task.node}</div>,
        )}
      {hasCreateNewTaskBtn && (
        <button
          onClick={handleCreateNewTaskBtnClick}
          className="cursor-pointer bg-blue-300 opacity-80 my-1.5 rounded-md hover:opacity-100 ease-in-out duration-150 active:scale-[0.97]"
        >
          add new task
        </button>
      )}
    </div>
  );
};
