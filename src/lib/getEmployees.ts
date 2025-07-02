import { createClient } from "@/utils/supabase/server";

export const getEmployees = async () => {
  console.time("getEmployees");
  const supabase = createClient();
  const { data: employees, error } = await (await supabase)
    .from("employees")
    .select("*");
  console.timeEnd("getEmployees");
  if (error) {
    throw new Error("Error while fetching employees data");
  }
  console.log("getEmployees:", employees?.length);
  return employees;
};
