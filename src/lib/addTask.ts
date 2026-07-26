"use server";

import { createClient } from "@/utils/supabase/server";

export const addTask = async ({
  title,
  description,
  column_id,
}: {
  title: string;
  description: string;
  column_id: number;
}) => {
  const newTask = { title, description, column_id };

  const supabase = await createClient();
  const { error } = await supabase.from("teams_tasks").insert([newTask]);

  if (error) {
    return { message: `❌ შეცდომა: ${error.message}` };
  }
  return {
    message: "✅ დავალება წარმატებით დაემატა",
  };
};
