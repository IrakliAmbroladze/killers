//api//orders/insert/route.ts

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("start of fetchCustomer GET function");
    const supabase = await createClient();
    const id = req.headers.get("id");
    console.log("customer id is:", id);

    const { data: customer, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id);
    if (error) {
      throw new Error("Error while fetching customer data");
    }

    return NextResponse.json(
      { success: true, data: customer },
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
