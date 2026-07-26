import { ReactElement } from "react";
import { Task, ToDoColumn } from "./types/ToDosBoardProps";

type ColumnProps = Omit<ToDoColumn, "id">;

export const Column = ({ title, taskList }: ColumnProps): ReactElement => {
  return (
    <div>
      <h2>{title}</h2>
      {taskList.map(
        (task: Task): ReactElement => (
          <div key={task.id}>{task.node}</div>
        ),
      )}
    </div>
  );
};
