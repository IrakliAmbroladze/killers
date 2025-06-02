"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function updateComment(commentId: string, newText: string) {
  const supabase = createClient();
  const {
    data: { session },
  } = await (await supabase).auth.getSession();

  if (!session?.access_token) {
    throw new Error("User is not authenticated");
  }

  const { error } = await (await supabase)
    .from("comments")
    .update({ text: newText })
    .eq("id", commentId);

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error("Failed to update comment");
  }

  revalidatePath("/comments");
}
