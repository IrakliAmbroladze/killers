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
  const supabase = createClient();
  const { count, error: countError } = await (await supabase)
    .from("orders")
    .select("*", { count: "exact", head: true })
    .gte("created_at", fromDate)
    .lte("created_at", toDate);

  if (countError) {
    throw new Error("Failed to count orders");
  }

  const batchSize = 1000;
  let allData: OrderExtended[] = [];

  if (count && count > batchSize) {
    for (let i = 0; i < count; i += batchSize) {
      const { data: orders, error } = await (
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
            ),
            providers (
              id,
              name
              ),
              employees (
                id,
                display_name,
                role_id
                )
                `
        )
        .gte("created_at", fromDate)
        .lte("created_at", toDate)
        .order("created_at", { ascending: false })
        .order("id", { ascending: false }) // Ensure stable sort
        .range(i, i + batchSize - 1);

      if (error) {
        throw new Error("Error while fetching batch of orders");
      }
      allData = allData.concat(orders ?? []);
    }
  } else {
    const { data: orders, error } = await (
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
        ),
        providers (
          id,
          name
        ),
        employees (
          id,
          display_name,
          role_id
        )
      `
      )
      .gte("created_at", fromDate)
      .lte("created_at", toDate)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false });

    if (error) {
      throw new Error("Error while fetching full order list");
    }

    allData = orders ?? [];
  }

  return { orders: allData as OrderExtended[], totalCount: count ?? 0 };
};
