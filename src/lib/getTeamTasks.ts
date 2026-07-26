// lib/tasks.ts
import { TeamTask } from "@/types";
import { createClient } from "@/utils/supabase/server";

export async function getTasks(): Promise<TeamTask[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("teams_tasks").select("*");

  if (error) {
    throw error;
  }

  return data;
}
