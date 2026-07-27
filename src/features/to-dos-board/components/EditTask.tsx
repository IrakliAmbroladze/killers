// src/features/to-dos-board/EditTask.tsx
import { FormEvent, useEffect, useState } from "react";
import { getTask } from "@/lib/getTask";

type EditTaskProps = {
  id: string | null;
  onSubmit: (task: { id: string; title: string; description: string }) => void;
  onCancel: () => void;
};

export const EditTask = ({ id, onSubmit, onCancel }: EditTaskProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    setIsLoading(true);

    getTask(id)
      .then((task) => {
        if (cancelled) return;
        setTitle(task.title ?? "");
        setDescription(task.description ?? "");
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

    onSubmit({ id, title: title.trim(), description: description.trim() });
  };

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading task…</p>;
  }

  return (
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

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save changes
        </button>
      </div>
    </form>
  );
};
