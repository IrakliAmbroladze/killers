"use server";

import { createClient } from "@/utils/supabase/server";

export const getCustomer = async (id: string) => {
  const supabase = await createClient();
  const { data: customer, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id);
  if (error) {
    throw new Error("Error while fetching employees data");
  }
  return customer;
};
