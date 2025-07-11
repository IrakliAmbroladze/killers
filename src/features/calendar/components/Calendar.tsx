"use client";
import { useState, useEffect, useRef } from "react";
import TaskModal from "./TaskModal";
import { createClient } from "@/utils/supabase/client";
import { createCalendarTask } from "../lib/create-calendar-task";
import * as utils from "../utils/utils";
import { useOrders } from "@/hooks/useOrders";
import TechniciansOrder from "../../../components/technicians-order";
import { useTechniciansAndManagersDisplayNames } from "@/hooks/useTechniciansAndManagersDisplayNames";
import { RxPencil1 } from "react-icons/rx";
import { useMonth } from "@/hooks/useMonth";
import { useYear } from "@/hooks/useYear";
import { useCommentsQuantities } from "@/hooks/useCommentsQuantities";
import { months } from "../utils";

interface Task {
  [key: string]: { text: string; checked: boolean }[];
}

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
  const { month, setMonth } = useMonth();
  const { year, setYear } = useYear();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task>({});
  const [selectedWeek, setSelectedWeek] = useState<number>(utils.currentWeek);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
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
  const { commentsQuantities } = useCommentsQuantities();

  const { orders } = useOrders();
  const techNames = useTechniciansAndManagersDisplayNames();
  const renderDay = (date: Date) => {
    const key = utils.getDateKey(date);
    const dayOrders = orders.filter((order) => {
      if (!order.plan_time) return false;
      const myDate = new Date(order.plan_time);
      return myDate.toLocaleDateString() === date.toLocaleDateString();
    });
    const ordersByGroup: { [groupKey: string]: typeof orders } = {};
    for (const order of dayOrders) {
      if (!order.technician) continue;
      let technicians = order.technician.split(" ");
      if (!technicians) continue;

      if (!Array.isArray(technicians)) {
        technicians = [technicians];
      }

      const validTechs = technicians.filter((t) => techNames.includes(t));

      const groupKey = validTechs.sort().join(" - ");
      if (!ordersByGroup[groupKey]) ordersByGroup[groupKey] = [];
      ordersByGroup[groupKey].push(order);
    }

    const todaysDay = date.toLocaleString("ka-GE", { weekday: "long" });
    const todaysDayInGeo = () => {
      switch (todaysDay) {
        case "Sunday":
          return "კვირა";
        case "Monday":
          return "ორშაბათი";
        case "Tuesday":
          return "სამშაბათი";
        case "Wednesday":
          return "ოთხშაბათი";
        case "Thursday":
          return "ხუთშაბათი";
        case "Friday":
          return "პარასკევი";
        case "Saturday":
          return "შაბათი";

        default:
          return todaysDay;
      }
    };

    return (
      <div
        key={key}
        className={`border ${
          todaysDay == "Sunday" || todaysDay == "Saturday"
            ? "bg-[#e0a8fb] dark:bg-[#15031e]"
            : "bg-white dark:bg-black"
        }`}
      >
        <div className="flex justify-between items-center border-b px-1.5">
          <div
            onClick={() => setSelectedDate(date)}
            className="cursor-pointer font-bold flex justify-center gap-4 text-xs"
          >
            <RxPencil1 />
          </div>
          <span className="text-xs">{todaysDayInGeo()}</span>
          <span className="text-xs">
            {" "}
            {date.getDate()} {date.toLocaleString("ka-GE", { month: "short" })}{" "}
          </span>
        </div>

        <div className="flex flex-col">
          {Object.entries(ordersByGroup).map(([groupKey, groupOrders]) => (
            <div key={groupKey}>
              <div
                className="text-xs font-semibold underline text-center"
                style={{
                  background: "rgb(255, 100, 0)",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {groupKey}
              </div>
              {groupOrders
                .sort((a, b) => {
                  return (
                    new Date(a.plan_time! ?? 0).getTime() -
                    new Date(b.plan_time! ?? 0).getTime()
                  );
                })
                .map((order) => (
                  <TechniciansOrder
                    key={order.order_id}
                    order={order}
                    comments_num={
                      order.order_id !== undefined
                        ? commentsQuantities[order.order_id] || 0
                        : 0
                    }
                  />
                ))}
            </div>
          ))}
          {(tasks[key] || []).map((task, index) => {
            return (
              <div
                key={`${key}-${index}`}
                className="flex justify-between gap-1 w-full break-words border-b overflow-auto"
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

  const MonthGrid = () => {
    const emptyDays = Array.from(
      { length: utils.dayOfWeekOfFirstDayOfMonth(year, month) },
      (_, i) => <div key={`empty-${i} `} className="border p-2" />
    );
    return (
      <div className="lg:grid grid-cols-7 hidden min-w-[1500px] text-xs border">
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
    <>
      <div className="w-full flex justify-center items-center"></div>
      <div className="flex my-2 justify-between text-xs">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border w-12"
        />
        <button
          className="border rounded-sm text-xs"
          onClick={() => setShowCalendar((prev) => !prev)}
        >
          {showCalendar ? "Hide Calendar" : "Show Calendar"}
        </button>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="text-black bg-gray-100 text-xs"
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
              კვირა {idx + 1}
            </option>
          ))}
        </select>
      </div>
      {showCalendar && (
        <>
          <div className="w-full overflow-auto">
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
        </>
      )}
    </>
  );
}
