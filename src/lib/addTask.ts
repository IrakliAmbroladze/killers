"use server";

import { createClient } from "@/utils/supabase/server";

export const addTask = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const newTask = { title, description };
  console.log({ newTask });

  const supabase = await createClient();
  const { error } = await supabase.from("teams_tasks").insert([newTask]);

  if (error) {
    return { message: `❌ შეცდომა: ${error.message}` };
  }
  return {
    message: "✅ დავალება წარმატებით დაემატა",
  };
};
