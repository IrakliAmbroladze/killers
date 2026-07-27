"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const editTask = async ({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: string;
}) => {
  const supabase = await createClient();

  const editedTask = {
    title,
    description,
    id,
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
