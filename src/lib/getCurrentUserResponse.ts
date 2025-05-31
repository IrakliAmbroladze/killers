import { createClient } from "@/utils/supabase/server";

export const getCurrentUserResponse = async () => {
  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser();

  return { userResponse };
};
