import { ReactElement } from "react";
import { Task, ToDoColumn, ToDosBoardProps } from "./types/ToDosBoardProps";

export const ToDosBoard = ({ board }: ToDosBoardProps): React.ReactElement => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-around w-full gap-2.5 overflow-auto items-center sm:items-start">
      {board.map(
        (column: ToDoColumn): React.ReactElement => (
          <div key={column.id}>
            <h2>{column.title}</h2>
            {column.taskList.map(
              (task: Task): ReactElement => (
                <div key={task.id}>{task.node}</div>
              ),
            )}
          </div>
        ),
      )}
    </div>
  );
};
