"use server";
import { createClient } from "@/utils/supabase/server";
import { Customer } from "@/types";

export const editCustomer = async (updatedCustomer: Customer) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("customers")
    .update(updatedCustomer)
    .eq("id", updatedCustomer.id);
  if (error) {
    return { message: `❌ შეცდომა: ${error.message}` };
  }
  return {
    message: "✅ ოპერაცია წარმატებით განხორციელდა",
    status: "OK",
  };
};
