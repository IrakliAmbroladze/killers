"use server";

import { createClient } from "@/utils/supabase/server";

export async function getCommentsQuantities() {
  console.time("getCommentsQuantities");

  const supabase = createClient();
  const { data, error } = await (await supabase).from("tasks").select("*");
  console.timeEnd("getCommentsQuantities");
  if (error instanceof Error) {
    console.log("Error: " + error.message);
  } else {
    console.log(error);
  }
  console.log("getCommentsQuantities:", data?.length);

  return data ? data : [];
}
