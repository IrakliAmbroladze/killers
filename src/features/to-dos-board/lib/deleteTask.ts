"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteTask = async ({ id }: { id: string }) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("teams_tasks")
    .delete()
    .eq("id", id)
    .select();

  revalidatePath("/protected/tasks");

  if (error) {
    return { message: `❌ შეცდომა: ${error.message}` };
  }
  if (data.length === 0) {
    return { message: "არც ერთი მონაცემი წაშლილა" };
  }
  return {
    message: "✅ დავალება წარმატებით წაიშალა",
  };
};
