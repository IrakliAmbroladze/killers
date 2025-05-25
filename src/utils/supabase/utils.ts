import { UserResponse } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { createClient } from "./server";

export const isTechnician = async (user: UserResponse) => {
  const supabase = await createClient();
  const { data: roleData } = await supabase
    .from("roles")
    .select("role")
    .eq("user_id", user.data.user?.id)
    .single();
  const role = roleData?.role;
  return role === "technician";
};

export const isSalesPage = (request: NextRequest) =>
  request.nextUrl.pathname.startsWith("/protected/sales") ||
  request.nextUrl.pathname.startsWith("/protected/orders");
