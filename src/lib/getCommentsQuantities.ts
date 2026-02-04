"use server";

import { createClient } from "@/utils/supabase/server";

export async function getCommentsQuantities() {
  const supabase = await createClient();

  const { count, error: countError } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true });

  if (countError) {
    throw new Error("Failed to count comments");
  }

  if (!count) {
    return [];
  }

  const batchSize = 1000;
  let allData: { id: string; comments_num: number }[] = [];

  for (let i = 0; i < count; i += batchSize) {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .range(i, i + batchSize - 1);

    if (error) {
      console.error("Error fetching batch of comments:", error);
      throw new Error("Error while fetching batch of comments");
    }
    allData = allData.concat(data ?? []);
  }

  return allData ? allData : [];
}
