"use server";
import { createClient } from "@/utils/supabase/server";
import { Order } from "@/types";
import { revalidatePath } from "next/cache";

export const editOrder = async (
  updatedOrder: Partial<Order>,
  revalidatePathName: string | null = null
) => {
  const supabase = await createClient();

  const { error, count } = await supabase
    .from("orders")
    .update(updatedOrder)
    .eq("id", updatedOrder.id);
  if (error) {
    return { message: `❌ შეცდომა: ${error.message}` };
  }

  if (count === 0) {
    return {
      message: "ℹ️ ცვლილებები არ არის, მონაცემები არ შენახულა",
      status: "NO_CHANGE",
    };
  }

  if (!!revalidatePathName) revalidatePath(revalidatePathName);

  return {
    message: "✅ ოპერაცია წარმატებით განხორციელდა",
    status: "OK",
  };
};
