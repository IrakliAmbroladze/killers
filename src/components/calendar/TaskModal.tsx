"use client";
import { useState } from "react";

export default function TaskModal({
  date,
  onAdd,
  onClose,
}: {
  date: Date;
  onAdd: (text: string) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-4 rounded w-80 text-black">
        <h2 className="text-lg font-bold mb-2">
          Add Task for {date.toDateString()}
        </h2>
        <textarea
          className="w-full border p-1 mb-2"
          placeholder="Task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-600">
            Cancel
          </button>
          <button
            onClick={() => {
              if (text.trim()) {
                onAdd(text.trim());
                setText("");
              }
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
