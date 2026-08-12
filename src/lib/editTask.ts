"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const editTask = async ({
  title,
  description,
  id,
  column_id,
}: {
  title: string;
  description: string;
  id: string;
  column_id: number;
}) => {
  const supabase = await createClient();

  const editedTask = {
    title,
    description,
    id,
    column_id,
  };
  const { error } = await supabase
    .from("teams_tasks")
    .update(editedTask)
    .eq("id", id);
  revalidatePath("/protected/tasks");

  if (error) {
    return { message: `❌ შეცდომა: ${error.message}` };
  }
  return {
    message: "✅ დავალება წარმატებით განახლდა",
  };
};
