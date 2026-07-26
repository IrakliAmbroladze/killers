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
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const newTask = {
    title,
    description,
    column_id,
    author_id: session?.user.id,
  };
  const { error } = await supabase.from("teams_tasks").insert([newTask]);

  if (error) {
    return { message: `❌ შეცდომა: ${error.message}` };
  }
  return {
    message: "✅ დავალება წარმატებით დაემატა",
  };
};
