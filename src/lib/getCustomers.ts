"use server";

import { createClient } from "@/utils/supabase/server";

export const getCustomers = async () => {
  const supabase = await createClient();
  const { data: customer, error } = await supabase
    .from("customers")
    .select("*");
  if (error) {
    throw new Error("Error while fetching customers data");
  }
  return customer;
};
