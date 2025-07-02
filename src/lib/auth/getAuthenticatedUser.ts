"use server";

import { createClient } from "@/utils/supabase/server";

export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    throw new Error("Unauthorized. You do not have access to the data");
  }

  return user;
}
