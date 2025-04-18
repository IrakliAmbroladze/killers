import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("invoices")
      .select("*, customers (*),products (*)");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
