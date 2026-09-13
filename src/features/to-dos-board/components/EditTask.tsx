// src/features/to-dos-board/EditTask.tsx
import { FormEvent, useEffect, useState } from "react";
import { getTask } from "@/lib/getTask";
import Comments from "@/features/comments/components/comments";

type EditTaskProps = {
  id: string | null;
  onSubmit: (task: {
    id: string;
    title: string;
    description: string;
    column_id: number;
  }) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
};

const buttonStyles =
  "cursor-pointer text-sm border whitespace-nowrap hover:underline rounded-lg p-2 active:opacity-60";

export const EditTask = ({
  id,
  onSubmit,
  onCancel,
  onDelete,
}: EditTaskProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [statusId, setStatusId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    setIsLoading(true);

    getTask(id)
      .then((task) => {
        if (cancelled) return;
        setTitle(task?.title ?? "");
        setDescription(task?.description ?? "");
        setStatusId(task?.column_id ?? 0);
      })
      .catch((err) => {
        console.error("Failed to load task:", err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!id) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      id,
      title: title.trim(),
      description: description.trim(),
      column_id: statusId,
    });
  };

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading task…</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="task-title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label
            htmlFor="task-description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="task-description"
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter task description"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onDelete(id)}
            className={`${buttonStyles} text-red-700 dark:text-red-300`}
          >
            delete
          </button>
          <select
            name="todolist-status"
            id="todolist-status"
            className={`${buttonStyles} dark:bg-blue-900 bg-gray-400`}
            value={statusId}
            onChange={(e) => {
              setStatusId(Number(e?.target?.value));
            }}
          >
            <option value={0}>To do</option>
            <option value={1}>In progress</option>
            <option value={2}>Done</option>
          </select>
          <button
            type="button"
            onClick={onCancel}
            className={`${buttonStyles} border-gray-300 `}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className={`${buttonStyles} bg-blue-600 text-white`}
          >
            Save changes
          </button>
        </div>
      </form>
      <Comments id={id} />
    </div>
  );
};
