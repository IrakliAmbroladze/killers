import { createCalendarTask } from "@/lib/supabase/create-calendar-task";
import { CalendarTasksArray } from "@/types";
import { getDateKey } from "@/utils";

export const addTask = async (
  date: Date,
  taskText: string,
  setTasks: React.Dispatch<React.SetStateAction<CalendarTasksArray>>
) => {
  const key = getDateKey(date);
  const taskData = {
    date_key: key,
    task_text: taskText,
    checked: false,
  };
  try {
    await createCalendarTask(taskData);
    setTasks((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { text: taskText, checked: false }],
    }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error: " + error.message);
    } else {
      console.log("An unknown error occurred.");
    }
  }
};
