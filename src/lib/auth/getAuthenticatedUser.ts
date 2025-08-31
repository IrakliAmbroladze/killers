"use server";

import { createClient } from "@/utils/supabase/server";

export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    if (error instanceof Error) console.warn(error.message);
  }

  return user;
}
