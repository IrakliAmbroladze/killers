import { ToDoColumn, ToDosBoardProps } from "./types/ToDosBoardProps";
import { Column } from "./Column";

export const ToDosBoard = ({ board }: ToDosBoardProps): React.ReactElement => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-around w-full gap-2.5 overflow-auto items-center sm:items-start">
      {board.map(
        (column: ToDoColumn): React.ReactElement => (
          <Column
            key={column.id}
            title={column.title}
            taskList={column.taskList}
          />
        ),
      )}
    </div>
  );
};
