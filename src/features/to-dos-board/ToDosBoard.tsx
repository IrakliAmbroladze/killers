import { ReactElement } from "react";
import { Task, ToDoColumn, ToDosBoardProps } from "./types/ToDosBoardProps";

export const ToDosBoard = ({ board }: ToDosBoardProps): React.ReactElement => {
  return (
    <>
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
    </>
  );
};
