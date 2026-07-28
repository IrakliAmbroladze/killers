import { ToDosBoard, TaskCard } from "@/features/to-dos-board";
import {
  Task,
  ToDoColumn,
} from "@/features/to-dos-board/types/ToDosBoardProps";
import { getTeamTasks } from "@/lib/getTeamTasks";

const COLUMN_DEFS: Omit<ToDoColumn, "taskList">[] = [
  { id: 0, title: "To do", hasCreateNewTaskBtn: true },
  { id: 1, title: "In Progress", hasCreateNewTaskBtn: true },
  { id: 2, title: "Done" },
];

export default async function TasksPage(): Promise<React.ReactElement> {
  const tasks = await getTeamTasks();
  const taskColumns: ToDoColumn[] = COLUMN_DEFS.map((col) => ({
    ...col,
    taskList: (tasks ?? [])
      .filter((t) => t.column_id === col.id)
      .map(
        (t): Task => ({
          id: t.id,
          node: <TaskCard title={t.title} description={t.description} />,
        }),
      ),
  }));

  return (
    <div>
      <ToDosBoard board={taskColumns} />
    </div>
  );
}
