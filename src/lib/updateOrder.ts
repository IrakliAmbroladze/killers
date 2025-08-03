"use server";

import type { Order } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const updateOrder = async (updatedOrder: Order) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("orders")
    .update(updatedOrder)
    .eq("id", updatedOrder.id);

  if (error) {
    console.error("Supabase error:", error.message);
  } else {
    console.log("Order updated successfully:", updatedOrder);
  }
};
