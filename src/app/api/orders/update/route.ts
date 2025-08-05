// pages/api/orders/update.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

function deepEqual(a: object, b: object): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { updatedOrder } = body;
    console.log("updatedOrder in api:", updatedOrder);

    const { data, error } = await supabase
      .from("orders")
      .update(updatedOrder)
      .eq("id", updatedOrder.id)
      .select();

    console.log("Supabase update result:", { data, error });

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

    const areEqual = deepEqual(updatedOrder, updatedRow);

    if (areEqual) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      console.warn("Update mismatch", {
        sent: updatedOrder,
        saved: updatedRow,
      });
      return NextResponse.json(
        {
          success: false,
          message: "Data mismatch — update may have failed or been modified.",
          saved: updatedRow,
        },
        { status: 409 } // 409 Conflict is a good fit
      );
    }
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
