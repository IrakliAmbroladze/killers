import { createClient } from "@/utils/supabase/server";

export const getEmployees = async () => {
  const supabase = createClient();
  const { data: employees, error } = await (await supabase)
    .from("employees")
    .select("*");

  if (error) {
    throw new Error("Error while fetching employees data");
  }

  return employees;
};
