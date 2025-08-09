//api//orders/fetchCustomers/route.ts

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("start of fetchCustomers GET function");
    const supabase = await createClient();
    const id = req.nextUrl.searchParams.get("id")?.trim() ?? "";
    const mode = req.nextUrl.searchParams.get("mode"); // "exact" or "search"

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id parameter" },
        { status: 400 }
      );
    }

    let query = supabase.from("customers").select("*");

    if (mode === "exact") {
      query = query.eq("id", id);
    } else {
      query = query.or(`id.ilike.%${id}%,name.ilike.%${id}%`);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message || "Error fetching customers data");
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
