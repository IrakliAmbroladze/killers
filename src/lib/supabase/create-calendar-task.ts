"use server";

import { createClient } from "@/utils/supabase/server";

interface CalendarTask {
  id?: string;
  user_id?: string;
  date_key: string;
  task_text: string;
  checked: boolean;
  created_at?: string;
}

export async function createCalendarTask(taskData: CalendarTask) {
  const supabase = createClient();
  const {
    data: { session },
  } = await (await supabase).auth.getSession();

  if (!session?.access_token) {
    throw new Error("User is not authenticated");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/calendar_tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        apikey: `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(taskData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  // revalidatePath("/tasks");
  // redirect("/protected");
}
