// lib/actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";

export async function deleteOrders(ids: string[]) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .delete()
    .in("id", ids)
    .select();

  if (error) {
    return { message: `❌ შეცდომა: ${error.message}` };
  }
  if (data.length == 0) {
    return { message: `❌ წაშლა არ განხორციელდა` };
  }

  return {
    message: "✅ წაშლა დასრულდა წარმატებით",
  };
}
