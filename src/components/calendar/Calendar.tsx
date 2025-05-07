"use client";
import { useState, useEffect, useRef } from "react";
import TaskModal from "./TaskModal";
import { MdAddTask } from "react-icons/md";
import { createClient } from "@/utils/supabase/client";
import { createCalendarTask } from "./create-calendar-task";
import * as utils from "./utils";
import { Task } from "./type";

export default function Calendar() {
  const supabase = createClient();
  useEffect(() => {
    async function loadTasks() {
      const { data, error } = await supabase.from("calendar_tasks").select("*");

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        const grouped: typeof tasks = {};
        data.forEach(({ date_key, task_text, checked }) => {
          if (!grouped[date_key]) grouped[date_key] = [];
          grouped[date_key].push({ text: task_text, checked });
        });
        setTasks(grouped);
      }
    }

    loadTasks();
  }, [supabase]);

  const [editingTask, setEditingTask] = useState<{
    key: string;
    idx: number;
    text: string;
  } | null>(null);
  // const [updatedTaskText, setUpdatedTaskText] = useState<string>("");
  // const [isEditing, setIsEditing] = useState<boolean>(false);
  const [month, setMonth] = useState<number>(utils.currentMonth);
  const [year, setYear] = useState<number>(utils.currentYear);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task>({});
  const [selectedWeek, setSelectedWeek] = useState<number>(utils.currentWeek);
  const days = Array.from(
    { length: utils.daysInMonth(year, month) },
    (_, i) => new Date(year, month, i + 1)
  );
  const weeks = Math.ceil(
    (utils.dayOfWeekOfFirstDayOfMonth(year, month) +
      utils.daysInMonth(year, month)) /
      7
  );

  const addTask = async (date: Date, taskText: string) => {
    const key = utils.getDateKey(date);
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

  const toggleTask = async (key: string, idx: number) => {
    const taskToToggle = tasks[key][idx];

    // Find the matching task in Supabase
    const { data, error } = await supabase
      .from("calendar_tasks")
      .select("id")
      .eq("date_key", key)
      .eq("task_text", taskToToggle.text)
      .maybeSingle();

    if (error || !data) {
      console.error("Error finding task to toggle:", error);
      return;
    }

    const { id } = data;
    const updatedChecked = !taskToToggle.checked;

    const { error: updateError } = await supabase
      .from("calendar_tasks")
      .update({ checked: updatedChecked })
      .eq("id", id);

    if (updateError) {
      console.error("Error updating task:", updateError);
    } else {
      const updated = tasks[key].map((task, i) =>
        i === idx ? { ...task, checked: updatedChecked } : task
      );
      setTasks((prev) => ({ ...prev, [key]: updated }));
    }
  };
  const handleEditClick = (key: string, idx: number) => {
    const taskToEdit = tasks[key][idx];
    setEditingTask({ key, idx, text: taskToEdit.text });
  };

  const handleSaveClick = async (newText: string) => {
    if (!editingTask) return;
    const { key, idx } = editingTask;
    const taskToEdit = tasks[key][idx];

    const { data, error } = await supabase
      .from("calendar_tasks")
      .select("id")
      .eq("date_key", key)
      .eq("task_text", taskToEdit.text)
      .maybeSingle();

    if (error || !data) {
      console.error("Error finding task:", error);
      return;
    }

    const { id } = data;
    const { error: updateError } = await supabase
      .from("calendar_tasks")
      .update({ task_text: newText })
      .eq("id", id);

    if (updateError) {
      console.error("Error updating task:", updateError);
    } else {
      const updated = tasks[key].map((task, i) =>
        i === idx ? { ...task, text: newText } : task
      );
      setTasks((prev) => ({ ...prev, [key]: updated }));
    }
    setEditingTask(null);
  };

  const TaskInput = ({
    initialText,
    onSave,
  }: {
    initialText: string;
    onSave: (text: string) => void;
  }) => {
    const [text, setText] = useState(initialText);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Resize textarea on input
    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto"; // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
      }
    }, [text]);

    return (
      <>
        <textarea
          ref={textareaRef}
          className="w-full p-1 border rounded resize-none overflow-hidden"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={() => onSave(text)} className="border mt-1 px-2 py-1">
          Save
        </button>
      </>
    );
  };

  const renderDay = (date: Date) => {
    const key = utils.getDateKey(date);

    return (
      <div key={key} className="border p-2">
        <div
          onClick={() => setSelectedDate(date)}
          className="cursor-pointer font-bold flex justify-between pb-2.5"
        >
          <div className="flex gap-5">
            {date.getDate()}
            <span className="lg:hidden">
              {date.toLocaleString("en-US", { weekday: "short" })}
            </span>
          </div>
          <MdAddTask />
        </div>
        <div className="flex flex-col gap-2">
          {(tasks[key] || []).map((task, index) => {
            return (
              <div
                key={`${key}-${index}`}
                className="flex justify-between gap-1 w-full break-words border-b"
              >
                <label
                  className={`whitespace-normal break-words cursor-pointer flex gap-1 ${
                    task.checked && "text-green-600"
                  }`}
                  style={{ overflowWrap: "anywhere" }}
                >
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => toggleTask(key, index)}
                    className="mt-0.5"
                  />
                </label>
                {editingTask?.key === key && editingTask?.idx === index ? (
                  <TaskInput
                    initialText={editingTask.text}
                    onSave={(newText) => {
                      handleSaveClick(newText);
                    }}
                  />
                ) : (
                  <>
                    <span
                      className={`break-words whitespace-pre-wrap w-full overflow-wrap-anywhere ${
                        task.checked && "text-green-600"
                      }`}
                    >
                      {task.text}
                    </span>
                    <button onClick={() => handleEditClick(key, index)}>
                      edit
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekdays = () => (
    <>
      {utils.weekdays.map((d) => (
        <div key={d} className="font-bold hidden lg:block">
          {d}
        </div>
      ))}
    </>
  );

  const MonthGrid = () => {
    const emptyDays = Array.from(
      { length: utils.dayOfWeekOfFirstDayOfMonth(year, month) },
      (_, i) => <div key={`empty-${i}`} />
    );
    return (
      <div className="lg:grid gap-1 lg:grid-cols-7 hidden">
        {renderWeekdays()}
        {emptyDays}
        {days.map(renderDay)}
      </div>
    );
  };

  const WeekGrid = ({ days }: { days: Date[] }) => {
    const filtered = days.filter((date) => {
      const dayIndex =
        date.getDate() + utils.dayOfWeekOfFirstDayOfMonth(year, month) - 1;
      const week = Math.floor(dayIndex / 7) + 1;
      return week === selectedWeek;
    });
    return (
      <div className="grid grid-cols-1 gap-1 lg:hidden">
        {filtered.map(renderDay)}
      </div>
    );
  };

  return (
    <div className="w-full px-2.5">
      <div className="flex mb-4 justify-between">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border px-2 w-24"
        />
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="px-2 text-black bg-gray-100"
        >
          {utils.months.map((m, index) => (
            <option key={index} value={index}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(Number(e.target.value))}
          className="px-2 lg:hidden text-black bg-gray-100"
        >
          {Array.from({ length: weeks }, (_, idx) => (
            <option key={idx} value={idx + 1}>
              კვირა {idx + 1}
            </option>
          ))}
        </select>
      </div>

      <MonthGrid />
      <WeekGrid days={days} />

      {selectedDate && (
        <TaskModal
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onAdd={(text) => {
            addTask(selectedDate, text);
            setSelectedDate(null);
          }}
        />
      )}
    </div>
  );
}
