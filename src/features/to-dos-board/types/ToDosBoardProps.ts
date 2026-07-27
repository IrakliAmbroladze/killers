export type Task = {
  id: string;
  node: React.ReactElement;
};
export type ToDoColumn = {
  id: number;
  title: string;
  taskList: Task[];
  hasCreateNewTaskBtn?: boolean;
};

export type ToDosBoardProps = {
  board: ToDoColumn[];
};
