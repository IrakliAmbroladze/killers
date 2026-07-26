import { ToDosBoard } from "@/features/to-dos-board";
import {
  Task,
  ToDoColumn,
} from "@/features/to-dos-board/types/ToDosBoardProps";

export default function TasksPage(): React.ReactElement {
  const Card1: Task = {
    id: "1",
    node: <div>Card1</div>,
  };
  const Card2: Task = {
    id: "2",
    node: <div>Card2</div>,
  };
  const Card3: Task = {
    id: "3",
    node: <div>Card3</div>,
  };
  const Card4: Task = {
    id: "4",
    node: <div>Card4</div>,
  };
  const taskColumns: ToDoColumn[] = [
    { id: 0, title: "To do", taskList: [Card1, Card2] },
    { id: 1, title: "In Progress", taskList: [Card3, Card4] },
  ];
  return (
    <div>
      This is tasks page
      <ToDosBoard board={taskColumns} />
    </div>
  );
}
