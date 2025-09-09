"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { CalendarGrid, CalendarHeader, TaskModal } from "@/components";
import { createClient } from "@/utils/supabase/client";
import { createCalendarTask } from "../../../lib/supabase/create-calendar-task";
import { useTechniciansAndManagersDisplayNames } from "@/hooks/useTechniciansAndManagersDisplayNames";
import { useYear } from "@/hooks/useYear";
import { useCommentsQuantities } from "@/hooks/useCommentsQuantities";
import { CalendarTasksArray, OrderExtended } from "@/types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { editOrder } from "@/lib";
import { normalizeOrder } from "@/features/order-table/utils/normalize";
import { proceduresPathName } from "@/app/protected/procedures/constants/proceduresPathName";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import {
  currentWeek,
  daysInMonth,
  getDateKey,
  weeksNumberInMonth,
} from "@/utils";
import { useMonth } from "@/hooks/useMonth";

export function Calendar({
  orders,
  calendarTasks,
}: {
  orders: OrderExtended[];
  calendarTasks: CalendarTasksArray;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = createClient();
  const isSmallScreen = useIsSmallScreen();
  const viewMode = isSmallScreen ? "week" : "month";

  const [editingTask, setEditingTask] = useState<{
    key: string;
    idx: number;
    text: string;
  } | null>(null);
  const { month } = useMonth();
  const { year } = useYear();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<CalendarTasksArray>(calendarTasks);

  const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const days = Array.from(
    { length: daysInMonth(year, month) },
    (_, i) => new Date(year, month, i + 1)
  );

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

  const techNames = useTechniciansAndManagersDisplayNames();

  function formatDate(input: string) {
    const [year, month, day] = input.split("-");
    const newMonth = Number(month) + 1;
    const mm = String(newMonth).padStart(2, "0");
    const dd = day.padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  }

  const [activeOrder, setActiveOrder] = useState<OrderExtended | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveOrder((active.data as { current: OrderExtended }).current);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setIsLoading(true);
    setActiveOrder(null);
    const { active, over } = event;

    if (!over) {
      console.warn("Dropped outside any droppable");
      alert("❌ შეცდომა: ადგილი არაა განკუთვნილი გადასატანად");
      return;
    }

    try {
      const order = active.data.current;
      if (!order) throw new Error("Order data missing");

      const timePart = order.plan_time?.includes("T")
        ? order.plan_time.split("T")[1]
        : "00:00:00";

      const updatedOrder = normalizeOrder({
        ...order,
        plan_time: `${formatDate(`${String(over.id)}`)}T${timePart}`,
      });

      await editOrder(updatedOrder, proceduresPathName);
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="w-full flex justify-center items-center"></div>
      <Suspense fallback={<div>waiting for headers</div>}>
        <CalendarHeader
          showCalendar={showCalendar}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
          weeks={weeksNumberInMonth(year, month)}
          setShowCalendar={setShowCalendar}
        />
      </Suspense>
      {showCalendar && (
        <>
          <div className="w-full overflow-auto">
            {isLoading && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 text-white">
                <div className="loader">Loading...</div>
              </div>
            )}
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
              <CalendarGrid
                month={month}
                year={year}
                days={days}
                setSelectedDate={setSelectedDate}
                tasks={tasks}
                setTasks={setTasks}
                handleEditClick={handleEditClick}
                handleSaveClick={handleSaveClick}
                editingTask={editingTask}
                orders={orders}
                techNames={techNames}
                commentsQuantities={commentsQuantities}
                toggleTask={toggleTask}
                TaskInput={TaskInput}
                selectedWeek={selectedWeek}
                viewMode={viewMode}
              />
              <DragOverlay>
                {activeOrder ? (
                  <div className="bg-white border shadow-lg p-2 rounded text-black font-semibold w-48" style={{transform: "translate(-50%, -50%)"}}>
                    {activeOrder.customers?.name} - {activeOrder.customer_id}
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>

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
