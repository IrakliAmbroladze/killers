//getORders.ts

import { createClient } from "@/utils/supabase/server";
import { OrderExtended } from "@/types/Order";
export const getOrders = async ({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
}): Promise<{
  orders: OrderExtended[];
  totalCount: number;
}> => {
  const supabase = await createClient();

  const toDateObj = new Date(toDate);
  toDateObj.setDate(toDateObj.getDate() + 1);
  const adjustedToDate = toDateObj.toISOString();

  const { count, error: countError } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .gte("created_at", fromDate)
    .lt("created_at", adjustedToDate);

  if (countError) {
    throw new Error("Failed to count orders");
  }

  if (!count) {
    return { orders: [], totalCount: 0 };
  }

  const batchSize = 1000;
  let allData: OrderExtended[] = [];

  for (let i = 0; i < count; i += batchSize) {
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        customers (id, name, description),
        payment_types (id, name),
        providers (id, name),
        employees (id, display_name, role_id)
        `
      )
      .gte("created_at", fromDate)
      .lt("created_at", adjustedToDate)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(i, i + batchSize - 1);

    if (error) {
      console.error("Error fetching batch of orders:", error);
      throw new Error("Error while fetching batch of orders");
    }
    allData = allData.concat(orders ?? []);
  }

  return { orders: allData as OrderExtended[], totalCount: count };
};
