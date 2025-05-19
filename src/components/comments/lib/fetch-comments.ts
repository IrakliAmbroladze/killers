"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchComments(task_id: string) {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("comments")
    .select("*")
    .eq("task_id", task_id);
  if (error instanceof Error) {
    console.log("Error: " + error.message);
  } else {
    console.log(error);
  }
  return data ? data : [];
}
