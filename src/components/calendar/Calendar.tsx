"use client";
import { useState, useEffect } from "react";
import TaskModal from "./TaskModal";
import { MdAddTask } from "react-icons/md";
import { createClient } from "@/utils/supabase/client";
import { createCalendarTask } from "./create-calendar-task";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  }, []);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<{
    [key: string]: { text: string; checked: boolean }[];
  }>({});
  const [selectedWeek, setSelectedWeek] = useState(1);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const days = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1)
  );
  const weeks = Math.ceil((firstDayOfWeek + daysInMonth) / 7);

  const getDateKey = (date: Date) =>
    `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const addTask = async (date: Date, taskText: string) => {
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

  const renderDay = (date: Date) => {
    const key = getDateKey(date);
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
          {(tasks[key] || []).map((task, index) => (
            <div
              key={index}
              className="flex items-start gap-1 w-full break-words border-b"
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
                {task.text}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekdays = () => (
    <>
      {weekdays.map((d) => (
        <div key={d} className="font-bold hidden lg:block">
          {d}
        </div>
      ))}
    </>
  );

  const renderMonthGrid = () => {
    const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => (
      <div key={`empty-${i}`} />
    ));
    return (
      <div className="lg:grid gap-1 lg:grid-cols-7 hidden">
        {renderWeekdays()}
        {emptyDays}
        {days.map(renderDay)}
      </div>
    );
  };

  const renderWeekGrid = () => {
    const filtered = days.filter((date) => {
      const dayIndex = date.getDate() + firstDayOfWeek - 1;
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
          {months.map((m, index) => (
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
              Week {idx + 1}
            </option>
          ))}
        </select>
      </div>

      {renderMonthGrid()}
      {renderWeekGrid()}

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
