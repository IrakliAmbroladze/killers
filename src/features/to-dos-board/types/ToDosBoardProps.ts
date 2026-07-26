export type Task = {
  id: string;
  node: React.ReactElement;
};
export type ToDoColumn = {
  id: number;
  title: string;
  taskList: Task[];
};

export type ToDosBoardProps = {
  board: ToDoColumn[];
};
