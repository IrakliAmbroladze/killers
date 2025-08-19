// lib/actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import type { Customer } from "@/types";

export async function insertCustomer(prevState: unknown, formData: FormData) {
  const newCustomer: Customer = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    description: (formData.get("description") as string) ?? "",
  };

  const supabase = await createClient();
  const { error } = await supabase.from("customers").insert([newCustomer]);

  if (error) {
    return { message: `❌ შეცდომა: ${error.message}` };
  }

  return {
    message: "✅ მომხმარებელი წარმატებით დაემატა",
  };
}
