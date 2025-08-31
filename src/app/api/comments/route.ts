import { NextResponse } from "next/server";
import { getCommentsQuantities } from "@/lib/getCommentsQuantities";

export async function GET() {
  try {
    const commentsQuantities = await getCommentsQuantities();
    return NextResponse.json(commentsQuantities);
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
