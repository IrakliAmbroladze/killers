"use server";

import type { Customer } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const getCustomers = async () => {
  const supabase = await createClient();

  const { count, error: countError } = await supabase
    .from("customers")
    .select("*", { count: "exact", head: true });

  if (countError) {
    throw new Error("Failed to count ");
  }

  if (!count) {
    return { customers: [], totalCount: 0 };
  }

  const batchSize = 1000;
  let allData: Customer[] = [];

  for (let i = 0; i < count; i += batchSize) {
    const { data: customers, error } = await supabase
      .from("customers")
      .select("*")
      .range(i, i + batchSize - 1);

    if (error) {
      console.error("Error fetching batch of customers:", error);
      throw new Error("Error while fetching batch of sutomers");
    }
    allData = allData.concat(customers ?? []);
  }

  return { customers: allData as Customer[], totalCount: count };
};
