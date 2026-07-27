"use server";

import { createClient } from "@/utils/supabase/server";

export const getTask = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("teams_tasks")
    .select("id, title, description")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
