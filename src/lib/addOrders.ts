"use server";
import { createClient } from "@/utils/supabase/server";
import { Order } from "@/types";
import { revalidatePath } from "next/cache";

export const addOrders = async (newOrders: Partial<Order>[]) => {
  const supabase = await createClient();

  const { error } = await supabase.from("orders").insert(newOrders);

  if (error) {
    return { message: `❌ შეცდომა: ${error.message}` };
  }

  revalidatePath("/test");

  return {
    message: "✅ დამატება წარმატებით განხორციელდა",
    status: "OK",
  };
};
