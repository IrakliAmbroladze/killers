//api//orders/insert/route.ts

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("start of fetchCustomers GET function");
    const supabase = await createClient();
    const partialId = req.nextUrl.searchParams.get("id");

    console.log("partialId is: ", partialId);

    const { data: customers, error } = await supabase
      .from("customers")
      .select("*")
      .or(`id.ilike.%${partialId}%,name.ilike.%${partialId}%`);
    if (error) {
      throw new Error("Error while fetching customers data");
    }

    return NextResponse.json(
      { success: true, data: customers },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Unknown server error" },
      { status: 500 }
    );
  }
}
