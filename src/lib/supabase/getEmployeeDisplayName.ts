"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export const getEmployeeDisplayName = async (
  user: User | null
): Promise<string | null> => {
  if (!user) {
    console.warn("No user data is provided in getEmployeeDisplayName function");
    return null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("employees")
    .select("display_name")
    .eq("id", user.id)
    .select();
  if (error) {
    if (error instanceof Error) console.warn(error.message);
  }
  console.log("data is: ", data);
  if (!data) {
    console.warn("No display name data");
    return null;
  }
  return data[0].display_name;
};
