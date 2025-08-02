//getORders.ts

import { createClient } from "@/utils/supabase/server";
import { OrderExtended } from "@/types/Order";
export const getOrders = async (
  page = 0,
  pageSize = 50
): Promise<{ orders: OrderExtended[]; totalCount: number }> => {
  console.time("getOrders");
  const supabase = createClient();

  const from = page * pageSize;
  const to = from + pageSize - 1;

  const {
    data: orders,
    error,
    count,
  } = await (
    await supabase
  )
    .from("orders")
    .select(
      `
      *,
      customers (
        id,
        name,
        description
      ),
      payment_types (
      id,
      name
      )
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  console.timeEnd("getOrders");
  if (error) {
    throw new Error("Error while fetching orders data");
  }

  if (!count) {
    throw new Error("Error while fetching data count");
  }

  return { orders: orders as OrderExtended[], totalCount: count };
};
