// pages/api/orders/update.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { updatedOrder } = body;

    const { data, error } = await supabase
      .from("orders")
      .update(updatedOrder)
      .eq("id", updatedOrder.id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const updatedRow = data?.[0];
    if (!updatedRow) {
      return NextResponse.json(
        { error: "Update failed: no data returned" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedRow },
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
