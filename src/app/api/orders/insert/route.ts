//api//orders/insert/route.ts

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { newOrders } = body;
    console.log("new order is:", newOrders);

    const { data: inserted, error } = await supabase
      .from("orders")
      .insert(newOrders)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const ids = inserted.map((d) => d.id);

    const { data: orders, error: fetchError } = await supabase
      .from("orders")
      .select(
        `
        *,
        customers (
          id,
          name,
          description
          ),
          payment_types (
            id,
            name
            ),
            providers (
              id,
              name
              ),
              employees (
                id,
                display_name,
                role_id
                )
                `
      )
      .in("id", ids);

    if (fetchError) {
      throw new Error("Error while fetching batch of orders");
    }

    return NextResponse.json({ success: true, data: orders }, { status: 200 });
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
